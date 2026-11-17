import type { Draft, Env } from './types.js'
import { recognize } from './ai.js'
import { publishToGithub } from './github.js'
import { loadImage, storeImage } from './images.js'
import { preview, button } from './preview.js'
import { enqueue, notify, telegram } from './telegram.js'
import { BotError, digest, errorCode, imageInfo } from './utils.js'
import { knownImageHashes } from './known-images.js'

export async function failDraft(env: Env, draft: Draft, code: string): Promise<void> {
  await env.DB.prepare("UPDATE drafts SET status='failed',failure_code=?,lease_until=0,updated_at=? WHERE id=? AND status NOT IN ('published','skipped')").bind(code, Date.now(), draft.id).run()
  const explanation = code === 'DUPLICATE_IMAGE' ? 'Этот скриншот уже есть в отзывах или в очереди.'
    : code === 'DAILY_AI_LIMIT' ? 'Достигнут дневной лимит распознавания. Можно повторить завтра.'
    : code === 'AI_NO_CREDITS' ? 'У сервиса распознавания закончились доступные кредиты. Скриншот сохранён. После пополнения можно повторить обработку.'
    : code === 'AI_HTTP_429' ? 'Сервис распознавания временно ограничил запросы. Скриншот сохранён. Попробуйте позже.'
    : code === 'MISSING_AI_KEY' ? 'Сервис распознавания ещё не подключён. Скриншот сохранён.'
    : code === 'NO_REVIEW' ? 'Не удалось уверенно выделить отзыв клиента. Пришлите более чёткий скриншот.'
    : code === 'INVALID_IMAGE' ? 'Нужен корректный скриншот JPG или PNG.'
    : code === 'IMAGE_TOO_LARGE' ? 'Изображение больше допустимых 5 МБ.'
    : 'Не удалось завершить обработку. Если запрос к распознаванию уже был отправлен, я не повторяю его автоматически.'
  await enqueue(env, `failure:${draft.id}:${draft.revision}`, draft.chat_id, {
    chat_id: draft.chat_id, text: `${explanation}\n\nОтзыв: ${draft.id}\nКод: ${code}\nНа сайт ничего не добавлено.`,
    reply_markup: { inline_keyboard: [
      ...(!['DUPLICATE_IMAGE', 'NO_REVIEW', 'INVALID_IMAGE', 'IMAGE_TOO_LARGE'].includes(code) ? [[button('Повторить распознавание (ещё запрос)', `retry:${draft.id}:${draft.revision}`)]] : []),
      [button('Пропустить', `skip:${draft.id}:${draft.revision}`)],
    ] },
  })
}

async function download(env: Env, fileId: string): Promise<Uint8Array> {
  const file = await telegram<{ file_path?: string; file_size?: number }>(env, 'getFile', { file_id: fileId })
  if (!file.file_path || !/^[a-zA-Z0-9_./-]+$/.test(file.file_path) || file.file_path.includes('..')) throw new BotError('INVALID_TELEGRAM_FILE')
  if ((file.file_size ?? 0) > Number(env.MAX_UPLOAD_BYTES)) throw new BotError('IMAGE_TOO_LARGE')
  const response = await fetch(`https://api.telegram.org/file/bot${env.TELEGRAM_BOT_TOKEN}/${file.file_path}`, { signal: AbortSignal.timeout(20000), redirect: 'manual' })
  if (!response.ok || !response.body) throw new BotError('DOWNLOAD_FAILED')
  const reader = response.body.getReader()
  const parts: Uint8Array[] = []
  let length = 0
  while (true) {
    const chunk = await reader.read()
    if (chunk.done) break
    length += chunk.value.length
    if (length > Number(env.MAX_UPLOAD_BYTES)) { await reader.cancel(); throw new BotError('IMAGE_TOO_LARGE') }
    parts.push(chunk.value)
  }
  const bytes = new Uint8Array(length)
  let offset = 0
  for (const part of parts) { bytes.set(part, offset); offset += part.length }
  return bytes
}

export async function processDraft(env: Env): Promise<void> {
  const now = Date.now()
  const expired = await env.DB.prepare("SELECT * FROM drafts WHERE status='processing' AND lease_until<? AND ai_started=1 LIMIT 5").bind(now).all<Draft>()
  for (const draft of expired.results) await failDraft(env, draft, 'AI_RESULT_UNKNOWN')
  const draft = await env.DB.prepare("UPDATE drafts SET status='processing',lease_until=?,updated_at=? WHERE id=(SELECT id FROM drafts WHERE status='received' OR (status='processing' AND lease_until<? AND ai_started=0) ORDER BY created_at LIMIT 1) RETURNING *")
    .bind(now + 240000, now, now).first<Draft>()
  if (!draft) return
  try {
    const bytes = draft.image_key ? await loadImage(env, draft.id) : await download(env, draft.file_id)
    const info = imageInfo(bytes)
    const hash = await digest(bytes)
    if (knownImageHashes.has(hash)) throw new BotError('DUPLICATE_IMAGE')
    const duplicate = await env.DB.prepare('SELECT id FROM drafts WHERE image_hash=? AND id!=?').bind(hash, draft.id).first()
    if (duplicate) throw new BotError('DUPLICATE_IMAGE')
    if (!draft.image_key) await storeImage(env, draft.id, bytes)
    await env.DB.prepare('UPDATE drafts SET image_hash=?,image_key=?,mime_type=?,width=?,height=? WHERE id=?').bind(hash, `${hash}.${info.extension}`, info.mime, info.width, info.height, draft.id).run()
    const apiKey = (env.AI_PROVIDER ?? 'openai') === 'kie' ? env.KIE_API_KEY : env.OPENAI_API_KEY
    if (!apiKey) throw new BotError('MISSING_AI_KEY')
    const day = new Date().toISOString().slice(0, 10)
    const cap = Math.max(1, Math.min(100, Number(env.MAX_AI_REQUESTS_PER_DAY) || 10))
    const reserved = await env.DB.prepare('INSERT INTO ai_usage (day,requests) VALUES (?,1) ON CONFLICT(day) DO UPDATE SET requests=requests+1 WHERE requests<? RETURNING requests').bind(day, cap).first()
    if (!reserved) throw new BotError('DAILY_AI_LIMIT')
    await env.DB.prepare('UPDATE drafts SET ai_started=1 WHERE id=?').bind(draft.id).run()
    const result = await recognize(env, bytes, info.mime)
    if (!result.hasReview) throw new BotError('NO_REVIEW')
    const ready = await env.DB.prepare("UPDATE drafts SET status='review',payload=?,lease_until=0,updated_at=? WHERE id=? AND status='processing' RETURNING *").bind(JSON.stringify(result), Date.now(), draft.id).first<Draft>()
    if (ready) await preview(env, ready)
  } catch (error) { await failDraft(env, draft, errorCode(error)) }
}

export async function processPublication(env: Env): Promise<boolean> {
  if (!env.GITHUB_TOKEN) return false
  const now = Date.now()
  const draft = await env.DB.prepare("UPDATE drafts SET status='publishing',lease_until=?,updated_at=? WHERE id=(SELECT id FROM drafts WHERE status='publish_queued' OR (status='publishing' AND lease_until<?) ORDER BY updated_at LIMIT 1) RETURNING *")
    .bind(now + 180000, now, now).first<Draft>()
  if (!draft) return false
  try {
    const bytes = await loadImage(env, draft.id)
    if (await digest(bytes) !== draft.image_hash) throw new BotError('IMAGE_HASH_MISMATCH')
    const commit = await publishToGithub(env, draft, bytes)
    await env.DB.prepare("UPDATE drafts SET status='deploying',commit_sha=?,lease_until=0,updated_at=? WHERE id=? AND status='publishing'").bind(commit, Date.now(), draft.id).run()
  } catch (error) {
    // A network failure can hide a successful ref update. Retry reconciliation, not a second review.
    const code = errorCode(error)
    await env.DB.prepare("UPDATE drafts SET status='publish_queued',failure_code=?,lease_until=0,updated_at=? WHERE id=? AND status='publishing'").bind(code, Date.now(), draft.id).run()
    await notify(env, `publication-error:${draft.id}`, draft.chat_id, `Публикация задерживается. Подтверждённая версия сохранена; повторно нажимать кнопку не нужно.\nКод: ${code}`)
  }
  return true
}

export async function verifyPublications(env: Env): Promise<void> {
  const rows = await env.DB.prepare("SELECT * FROM drafts WHERE status='deploying' AND lease_until<? ORDER BY lease_until,updated_at LIMIT 1").bind(Date.now()).all<Draft>()
  if (!rows.results.length) return
  const base = env.SITE_URL.replace(/\/$/, '')
  try {
    const response = await fetch(`${base}/reviews-release.json?bot_check=${Date.now()}`, { cache: 'no-store', signal: AbortSignal.timeout(15000) })
    if (!response.ok) return
    const manifest = await response.json() as { reviewIds?: string[] }
    if (!Array.isArray(manifest.reviewIds)) return
    for (const draft of rows.results) {
      await env.DB.prepare("UPDATE drafts SET lease_until=? WHERE id=? AND status='deploying'").bind(Date.now() + 1000, draft.id).run()
      const id = `tg-${draft.image_hash?.slice(0, 24)}`
      if (!manifest.reviewIds.includes(id)) {
        if (Date.now() - draft.updated_at > 15 * 60000) await notify(env, `deploy-delayed:${draft.id}`, draft.chat_id, `Сайт пока не подтвердил обновление отзыва ${draft.id}. Проверка продолжится автоматически; отзыв повторно не добавляю.`)
        continue
      }
      const image = await fetch(`${base}/images/reviews/${id}.${draft.mime_type === 'image/png' ? 'png' : 'jpg'}`, { signal: AbortSignal.timeout(15000) })
      if (!image.ok || await digest(await image.arrayBuffer()) !== draft.image_hash) continue
      const result = await env.DB.prepare("UPDATE drafts SET status='published',updated_at=? WHERE id=? AND status='deploying'").bind(Date.now(), draft.id).run()
      if (result.meta.changes) await notify(env, `published:${draft.id}`, draft.chat_id, `Отзыв опубликован!\n\n${base}/opiniones#${id}\n\nОн также добавлен в начало блока отзывов на главной.`)
    }
  } catch { console.warn('publication_verification_deferred') }
}
