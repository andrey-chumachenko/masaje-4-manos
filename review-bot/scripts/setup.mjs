import fs from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import { randomBytes } from 'node:crypto'
import { fileURLToPath } from 'node:url'

const directory = new URL('../', import.meta.url)
const varsPath = new URL('.dev.vars', directory)
export async function readSecrets() {
  const source = await fs.readFile(varsPath, 'utf8')
  return Object.fromEntries(source.split(/\r?\n/).filter(line => /^[A-Z_]+=/.test(line)).map(line => {
    const index = line.indexOf('=')
    return [line.slice(0, index), line.slice(index + 1).replace(/^['"]|['"]$/g, '')]
  }))
}
export async function loadConfiguration() { return JSON.parse(await fs.readFile(new URL('wrangler.jsonc', directory), 'utf8')) }
if (process.argv[1] !== fileURLToPath(import.meta.url)) process.exitCode = undefined
else {
  const args = process.argv.slice(2)
  const values = await readSecrets()
  const config = await loadConfiguration()
  const aiKeyName = config.vars.AI_PROVIDER === 'kie' ? 'KIE_API_KEY' : 'OPENAI_API_KEY'
  const names = ['TELEGRAM_BOT_TOKEN', 'TELEGRAM_WEBHOOK_SECRET', aiKeyName, 'GITHUB_TOKEN']
  values[aiKeyName] ||= process.env[aiKeyName]
  if (!values.TELEGRAM_WEBHOOK_SECRET) values.TELEGRAM_WEBHOOK_SECRET = randomBytes(32).toString('hex')
  if (args.includes('--check')) {
    for (const name of names) console.log(name + ': ' + (values[name] ? 'configured' : 'MISSING'))
    if (values.TELEGRAM_BOT_TOKEN) {
      const response = await fetch(`https://api.telegram.org/bot${values.TELEGRAM_BOT_TOKEN}/getMe`, { signal: AbortSignal.timeout(20000) })
      const data = await response.json()
      if (!data.ok) throw new Error('Telegram authentication failed')
      console.log('Bot: @' + data.result.username)
    }
    if (values.GITHUB_TOKEN) {
      const response = await fetch(`https://api.github.com/repos/${config.vars.GITHUB_REPOSITORY}`, { headers: { Authorization: 'Bearer ' + values.GITHUB_TOKEN, 'User-Agent': 'MasajeReviewBot' }, signal: AbortSignal.timeout(20000) })
      if (!response.ok) throw new Error('GitHub repository authentication failed: HTTP ' + response.status)
      const data = await response.json()
      console.log('Repository: ' + data.full_name)
    }
  } else if (args.includes('--upload-secrets')) {
    if (names.some(name => !values[name])) throw new Error('Fill the missing secrets before deployment; run npm run check.')
    const result = spawnSync(process.execPath, [fileURLToPath(new URL('node_modules/wrangler/bin/wrangler.js', directory)), 'secret', 'bulk'], {
      cwd: fileURLToPath(directory), input: JSON.stringify(Object.fromEntries(names.map(name => [name, values[name]]))), encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'],
    })
    if (result.status) throw new Error('Secret upload failed; inspect Cloudflare authorization. Secret values are not logged.')
    console.log('Uploaded four Worker secrets.')
  } else if (args.includes('--webhook')) {
    const origin = args[args.indexOf('--webhook') + 1]
    if (!origin?.startsWith('https://') || !values.GITHUB_TOKEN) throw new Error('Worker HTTPS URL and all secrets are required.')
    const api = async (method, body) => {
      const response = await fetch(`https://api.telegram.org/bot${values.TELEGRAM_BOT_TOKEN}/${method}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const data = await response.json()
      if (!data.ok) throw new Error('Telegram configuration failed: ' + method)
      return data.result
    }
    await api('setWebhook', { url: new URL('/telegram/webhook', origin).href, secret_token: values.TELEGRAM_WEBHOOK_SECRET, allowed_updates: ['message', 'callback_query'], max_connections: 2, drop_pending_updates: false })
    await api('setMyCommands', { commands: [{ command: 'start', description: 'Как добавить отзыв' }, { command: 'drafts', description: 'Последние отзывы и статусы' }, { command: 'cancel', description: 'Отменить исправление' }] })
    await api('setMyDescription', { description: 'Приватная загрузка отзывов Masaje 4 Manos: скриншоты, предпросмотр переводов и публикация после подтверждения.' })
    const info = await api('getWebhookInfo', {})
    console.log(JSON.stringify({ webhook: info.url, pendingUpdates: info.pending_update_count }))
  } else console.log('Use --check, --upload-secrets, or --webhook https://WORKER.workers.dev. See README.md.')
}
