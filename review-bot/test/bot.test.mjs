import assert from 'node:assert/strict'
import test from 'node:test'
import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'
import { Miniflare, Log, LogLevel } from 'miniflare'
import { MockAgent } from 'undici'
import { imageInfo, splitText, validateText } from '../dist/utils.js'
import { storeImage, loadImage } from '../dist/images.js'

const migration = await fs.readFile(new URL('../migrations/0001_initial.sql', import.meta.url), 'utf8')
const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aP1kAAAAASUVORK5CYII=', 'base64')
const translated = { hasReview: true, originalLanguage: 'es', originalText: 'Muchas gracias. Me siento muy bien.', text: { es: 'Muchas gracias. Me siento muy bien.', ru: 'Большое спасибо. Чувствую себя очень хорошо.', en: 'Thank you so much. I feel very well.', ua: 'Дуже дякую. Почуваюся дуже добре.' }, notes: [] }

// Workerd forwards request bodies as streams; buffer them before undici's synchronous mock callback.
class BufferedMockAgent extends MockAgent {
  dispatch(options, handler) {
    if (options.body?.getReader) {
      new Response(options.body).text().then(body => super.dispatch({ ...options, body }, handler), error => handler.onError(error))
      return true
    }
    return super.dispatch(options, handler)
  }
}

async function setup(options = {}) {
  const state = { sent: [], aiCalls: 0, commits: 0, patches: 0, records: [], head: 'base0', serveRelease: false, failAI: false, ambiguousPatch: false, failSendAt: 0, files: new Map(), blobs: new Map(), trees: new Map() }
  const mock = new BufferedMockAgent()
  mock.disableNetConnect()
  let telegramId = 1000
  mock.get('https://api.telegram.org').intercept({ path: /\/bottest-token\/.+/, method: 'POST' }).reply(({ path, body }) => {
    const method = path.split('/').at(-1)
    const data = JSON.parse(body)
    if (method === 'getFile') return { statusCode: 200, data: JSON.stringify({ ok: true, result: { file_path: 'screens/' + data.file_id + '.png' } }) }
    if (method === 'sendMessage') {
      state.sent.push(data)
      if (state.failSendAt === state.sent.length) return { statusCode: 500, data: '{}' }
    }
    return { statusCode: 200, data: JSON.stringify({ ok: true, result: { message_id: ++telegramId } }) }
  }).persist()
  mock.get('https://api.telegram.org').intercept({ path: /\/file\/bottest-token\/screens\/.+/, method: 'GET' }).reply(({ path }) => ({ statusCode: 200, data: state.files.get(path.split('/').at(-1).slice(0, -4)) ?? png })).persist()
  mock.get('https://api.openai.com').intercept({ path: '/v1/responses', method: 'POST' }).reply(({ body }) => {
    state.aiCalls++
    const input = JSON.parse(body)
    assert.equal(input.store, false)
    assert.equal(input.text.format.strict, true)
    assert.ok(input.input[0].content[0].image_url.startsWith('data:image/png;base64,'))
    if (state.failAI) return { statusCode: 200, data: JSON.stringify({ status: 'incomplete', output: [] }) }
    return { statusCode: 200, data: JSON.stringify({ status: 'completed', output: [{ type: 'message', content: [{ type: 'output_text', text: JSON.stringify(translated) }] }] }) }
  }).persist()
  if (options.kie) mock.get('https://api.kie.ai').intercept({ path: '/openai/v1/responses', method: 'POST' }).reply(({ body }) => {
    state.aiCalls++
    const input = JSON.parse(body)
    assert.equal(input.model, 'deepseek-v4-1-flash')
    assert.equal(input.reasoning.effort, 'none')
    assert.equal(input.text.format.type, 'json_schema')
    assert.equal(input.input[0].role, 'system')
    assert.ok(input.input[1].content.some(part => part.type === 'input_image' && part.image_url.startsWith('data:image/png;base64,')))
    const data = options.noKieCredits ? { code: 402, msg: 'Insufficient credits' } : {
      status: 'completed', output: [{ type: 'message', content: [{ type: 'output_text', text: JSON.stringify(translated) }] }],
    }
    return { statusCode: 200, data: JSON.stringify(data) }
  }).persist()
  mock.get('https://api.github.com').intercept({ path: /\/repos\/test\/site\/.+/, method: /GET|POST|PATCH/ }).reply(({ path, method, body }) => {
    const data = body ? JSON.parse(body) : undefined
    let result = {}
    if (path.includes('/git/ref/heads/')) result = { object: { sha: state.head } }
    else if (path.includes('/contents/')) result = { encoding: 'base64', content: Buffer.from(JSON.stringify(state.records)).toString('base64') }
    else if (method === 'GET' && path.includes('/git/commits/')) result = { tree: { sha: 'tree-base' } }
    else if (path.endsWith('/git/blobs')) { const sha = 'blob-' + state.blobs.size; state.blobs.set(sha, Buffer.from(data.content, 'base64')); result = { sha } }
    else if (path.endsWith('/git/trees')) { const sha = 'tree-' + state.trees.size; state.trees.set(sha, data); result = { sha } }
    else if (method === 'POST' && path.endsWith('/git/commits')) { state.commits++; state.pendingTree = data.tree; assert.equal(data.author.name, 'ChumDesign'); result = { sha: 'commit-' + state.commits } }
    else if (path.includes('/git/refs/heads/')) {
      state.patches++
      assert.equal(data.force, false)
      state.head = data.sha
      state.records = JSON.parse(state.trees.get(state.pendingTree).tree.find(item => item.path === 'src/data/generated-reviews.json').content)
      if (state.ambiguousPatch) { state.ambiguousPatch = false; return { statusCode: 503, data: '{}' } }
      result = { object: { sha: state.head } }
    } else throw new Error('Unexpected GitHub call: ' + method + ' ' + path)
    return { statusCode: 200, data: JSON.stringify(result) }
  }).persist()
  mock.get('https://site.example').intercept({ path: /\/reviews-release.json.*/, method: 'GET' }).reply(() => ({ statusCode: 200, data: JSON.stringify({ reviewIds: state.serveRelease ? state.records.map(record => record.id) : [] }) })).persist()
  mock.get('https://site.example').intercept({ path: /\/images\/reviews\/.+/, method: 'GET' }).reply(() => {
    const tree = state.trees.get(state.pendingTree)
    const image = tree.tree.find(item => item.path.startsWith('public/images/'))
    return { statusCode: 200, data: state.blobs.get(image.sha) }
  }).persist()
  const mf = new Miniflare({
    log: new Log(LogLevel.ERROR), modules: true, modulesRules: [{ type: 'ESModule', include: ['**/*.js', '**/*.mjs'] }],
    scriptPath: fileURLToPath(new URL('harness.mjs', import.meta.url)), compatibilityDate: '2026-07-30',
    d1Databases: ['DB'], fetchMock: mock,
    bindings: { TELEGRAM_BOT_TOKEN: 'test-token', TELEGRAM_WEBHOOK_SECRET: 'test-secret', ...(options.kie ? { AI_PROVIDER: 'kie', KIE_API_KEY: 'test-kie-key' } : { OPENAI_API_KEY: 'test-key', OPENAI_MODEL: 'test-model' }), GITHUB_TOKEN: 'test-github', GITHUB_REPOSITORY: 'test/site', GITHUB_BRANCH: 'main', GIT_AUTHOR_NAME: 'ChumDesign', GIT_AUTHOR_EMAIL: 'test@example.com', SITE_URL: 'https://site.example', ALLOWED_USER_IDS: '42', MAX_AI_REQUESTS_PER_DAY: String(options.dailyLimit ?? 10), MAX_UPLOAD_BYTES: '5242880' },
  })
  const db = await mf.getD1Database('DB')
  await db.exec(migration.replaceAll('\n', ' '))
  let updateId = 0
  const update = async (data, secret = 'test-secret') => mf.dispatchFetch('https://bot.example/telegram/webhook', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Telegram-Bot-Api-Secret-Token': secret }, body: JSON.stringify({ update_id: ++updateId, ...data }) })
  const message = (extra = {}, user = 42) => ({ message_id: updateId + 100, chat: { id: user, type: 'private' }, from: { id: user }, ...extra })
  const upload = async (file = 'image1') => update({ message: message({ photo: [{ file_id: file, file_unique_id: 'unique-' + file, width: 1, height: 1 }] }) })
  const tick = async () => {
    // Synthetic ticks represent subsequent minutes, not several requests in the same millisecond.
    await db.prepare("UPDATE drafts SET lease_until=0 WHERE status='deploying'").run()
    const response = await mf.dispatchFetch('https://bot.example/test-tick'); assert.equal(response.status, 200)
  }
  const draft = () => db.prepare('SELECT * FROM drafts ORDER BY created_at LIMIT 1').first()
  const callback = async (action, revision = 1, field) => {
    const row = await draft()
    return update({ callback_query: { id: 'cb-' + updateId, from: { id: 42 }, message: message(), data: action + ':' + row.id + ':' + revision + (field ? ':' + field : '') } })
  }
  return { mf, db, state, update, message, upload, tick, draft, callback, dispose: async () => { await mf.dispose(); await mock.close() } }
}

test('image validation and long Telegram text splitting preserve content', () => {
  assert.deepEqual(imageInfo(png), { mime: 'image/png', extension: 'png', width: 1, height: 1 })
  assert.throws(() => imageInfo(Buffer.from('not an image')))
  const text = '🙂Русский español '.repeat(1000)
  const chunks = splitText(text)
  assert.equal(chunks.join(''), text)
  assert.ok(chunks.every(chunk => chunk.length <= 3500))
  assert.throws(() => validateText({ ...translated, text: { es: 'only Spanish' } }))
})

test('rejects wrong webhook secret and unauthorized users without any AI call', async () => {
  const bot = await setup()
  try {
    assert.equal((await bot.update({ message: bot.message({ text: '/start' }) }, 'wrong')).status, 403)
    assert.equal((await bot.update({ message: bot.message({ text: '/start' }, 99) })).status, 200)
    assert.equal(await bot.db.prepare('SELECT count(*) AS n FROM inbox').first('n'), 0)
    assert.equal(bot.state.aiCalls, 0)
  } finally { await bot.dispose() }
})

test('upload → four-language preview; no publication without a Publish click; duplicate files do not use AI', async () => {
  const bot = await setup()
  try {
    await bot.upload()
    await bot.tick()
    assert.equal((await bot.draft()).status, 'review', JSON.stringify({ draft: await bot.draft(), sent: bot.state.sent }))
    assert.equal(bot.state.aiCalls, 1)
    for (const lang of ['es', 'ru', 'ua', 'en']) assert.ok(bot.state.sent.some(message => message.text.includes(translated.text[lang])))
    assert.ok(bot.state.sent.some(message => message.reply_markup?.inline_keyboard?.flat().some(button => button.text === 'Опубликовать')))
    await bot.tick()
    await bot.upload()
    assert.equal(bot.state.aiCalls, 1)
    assert.equal(bot.state.commits, 0)
    assert.equal(await bot.db.prepare('SELECT count(*) AS n FROM drafts').first('n'), 1)
  } finally { await bot.dispose() }
})

test('Kie works with its own key and still queues a preview before any publication', async () => {
  const bot = await setup({ kie: true })
  try {
    await bot.upload()
    await bot.tick()
    assert.equal((await bot.draft()).status, 'review')
    assert.equal(bot.state.aiCalls, 1)
    assert.ok(bot.state.sent.some(message => message.text.includes(translated.text.ru)))
    assert.ok(bot.state.sent.some(message => message.reply_markup?.inline_keyboard?.[0]?.[0]?.text === 'Опубликовать'))
    assert.equal(bot.state.commits, 0)
  } finally { await bot.dispose() }
})

test('Kie quota errors inside HTTP 200 keep the image and tell the owner what happened', async () => {
  const bot = await setup({ kie: true, noKieCredits: true })
  try {
    await bot.upload()
    await bot.tick()
    await bot.tick()
    const draft = await bot.draft()
    assert.equal(draft.status, 'failed')
    assert.equal(draft.failure_code, 'AI_NO_CREDITS')
    assert.ok(draft.image_hash)
    assert.equal(bot.state.aiCalls, 1)
    assert.ok(bot.state.sent.some(message => message.text.includes('закончились доступные кредиты')))
    assert.equal(bot.state.commits, 0)
  } finally { await bot.dispose() }
})

test('editing invalidates old approval; confirmed snapshot publishes once and success waits for live image parity', async () => {
  const bot = await setup()
  try {
    await bot.upload(); await bot.tick()
    await bot.callback('edit'); await bot.callback('field', 1, 'en')
    const row = await bot.draft()
    await bot.update({ message: bot.message({ text: 'A manually corrected English review.', reply_to_message: { message_id: row.edit_prompt_id } }) })
    assert.equal((await bot.draft()).revision, 2)
    await bot.callback('publish', 1); await bot.tick()
    assert.equal(bot.state.commits, 0)
    await bot.callback('publish', 2); await bot.callback('publish', 2)
    await bot.tick()
    assert.equal(bot.state.commits, 1)
    assert.equal(bot.state.records[0].text.en, 'A manually corrected English review.')
    assert.equal((await bot.draft()).status, 'deploying')
    assert.ok(!bot.state.sent.some(message => message.text.startsWith('Отзыв опубликован!')))
    bot.state.serveRelease = true
    await bot.tick(); await bot.tick()
    assert.equal((await bot.draft()).status, 'published')
    assert.equal(bot.state.commits, 1)
    assert.equal(bot.state.sent.filter(message => message.text.startsWith('Отзыв опубликован!')).length, 1)
    assert.equal(bot.state.records[0].imageHash, createHash('sha256').update(png).digest('hex'))
  } finally { await bot.dispose() }
})

test('unknown GitHub ref-update result is reconciled without a duplicate commit', async () => {
  const bot = await setup()
  try {
    await bot.upload(); await bot.tick(); await bot.callback('publish')
    bot.state.ambiguousPatch = true
    await bot.tick()
    assert.equal((await bot.draft()).status, 'publish_queued')
    await bot.tick()
    assert.equal(bot.state.records.length, 1)
    assert.equal(bot.state.commits, 1)
    assert.equal((await bot.draft()).status, 'deploying')
  } finally { await bot.dispose() }
})

test('skipped reviews are never published', async () => {
  const bot = await setup()
  try {
    await bot.upload(); await bot.tick(); await bot.callback('skip'); await bot.callback('publish'); await bot.tick()
    assert.equal((await bot.draft()).status, 'skipped')
    assert.equal(bot.state.commits, 0)
  } finally { await bot.dispose() }
})

test('incomplete AI result is not automatically retried or made publishable', async () => {
  const bot = await setup()
  try {
    bot.state.failAI = true
    await bot.upload(); await bot.tick(); await bot.tick()
    assert.equal((await bot.draft()).status, 'failed')
    assert.equal(bot.state.aiCalls, 1)
    assert.ok(!bot.state.sent.some(message => message.reply_markup?.inline_keyboard?.flat().some(button => button.text === 'Опубликовать')))
  } finally { await bot.dispose() }
})

test('daily request cap stops a second charge, including concurrent work', async () => {
  const bot = await setup({ dailyLimit: 1 })
  try {
    await bot.upload(); await bot.tick()
    bot.state.files.set('image2', Buffer.concat([png, Buffer.from('second image')]))
    await bot.upload('image2'); await bot.tick()
    assert.equal(bot.state.aiCalls, 1)
    const second = await bot.db.prepare("SELECT * FROM drafts WHERE file_id='image2'").first()
    assert.equal(second.failure_code, 'DAILY_AI_LIMIT')
  } finally { await bot.dispose() }
})

test('a failed preview delivery cannot be followed by a Publish button', async () => {
  const bot = await setup()
  try {
    await bot.upload()
    bot.state.failSendAt = bot.state.sent.length + 2
    await bot.tick(); await bot.tick()
    assert.ok(!bot.state.sent.some(message => message.reply_markup?.inline_keyboard?.flat().some(button => button.text === 'Опубликовать')))
    assert.equal(bot.state.commits, 0)
  } finally { await bot.dispose() }
})

test('changing source language replaces the revision and invalidates old buttons', async () => {
  const bot = await setup()
  try {
    await bot.upload(); await bot.tick()
    await bot.callback('source', 1, 'other')
    assert.equal((await bot.draft()).revision, 2)
    await bot.callback('publish', 1); await bot.tick()
    assert.equal(bot.state.commits, 0)
    assert.equal(JSON.parse((await bot.draft()).payload).originalLanguage, 'other')
  } finally { await bot.dispose() }
})

test('already published screenshot is detected before using paid recognition', async () => {
  const bot = await setup()
  try {
    bot.state.files.set('known', await fs.readFile(new URL('../../public/images/reviews/warm-hands.jpg', import.meta.url)))
    await bot.upload('known'); await bot.tick()
    assert.equal((await bot.draft()).failure_code, 'DUPLICATE_IMAGE')
    assert.equal(bot.state.aiCalls, 0)
  } finally { await bot.dispose() }
})

test('private image chunking round-trips a large original byte-for-byte', async () => {
  const bot = await setup()
  try {
    await bot.upload()
    const row = await bot.draft()
    const bytes = Buffer.alloc(1100000)
    for (let i = 0; i < bytes.length; i++) bytes[i] = i % 251
    await storeImage({ DB: bot.db }, row.id, bytes)
    const restored = await loadImage({ DB: bot.db }, row.id)
    assert.deepEqual(Buffer.from(restored), bytes)
    assert.equal(await bot.db.prepare('SELECT count(*) AS n FROM image_chunks').first('n'), 5)
  } finally { await bot.dispose() }
})
