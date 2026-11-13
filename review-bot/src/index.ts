import type { Env, Update } from './types.js'
import { isAllowed, processInbox } from './handlers.js'
import { processDraft, processPublication, verifyPublications } from './jobs.js'
import { deliverOutbox } from './telegram.js'
import { digest } from './utils.js'

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url)
    if (url.pathname === '/health' && request.method === 'GET') return Response.json({ service: 'masaje-review-bot', ok: true })
    if (url.pathname !== '/telegram/webhook' || request.method !== 'POST') return new Response('Not found', { status: 404 })
    const provided = request.headers.get('X-Telegram-Bot-Api-Secret-Token') ?? ''
    if (!env.TELEGRAM_WEBHOOK_SECRET || await digest(new TextEncoder().encode(provided)) !== await digest(new TextEncoder().encode(env.TELEGRAM_WEBHOOK_SECRET))) return new Response('Forbidden', { status: 403 })
    if (Number(request.headers.get('content-length')) > 262144) return new Response('Too large', { status: 413 })
    let update: Update
    try {
      const body = await request.text()
      if (body.length > 262144) return new Response('Too large', { status: 413 })
      update = JSON.parse(body) as Update
    } catch { return new Response('Invalid JSON', { status: 400 }) }
    if (!update || !Number.isSafeInteger(update.update_id) || update.update_id < 0) return new Response('Invalid update', { status: 400 })
    const sender = update.callback_query?.from.id ?? update.message?.from?.id
    const chat = update.callback_query?.message?.chat ?? update.message?.chat
    if (!isAllowed(env, sender) || chat?.type !== 'private') return new Response('OK')
    await env.DB.prepare('INSERT OR IGNORE INTO inbox (update_id,payload,created_at) VALUES (?,?,?)').bind(update.update_id, JSON.stringify(update), Date.now()).run()
    ctx.waitUntil((async () => { await processInbox(env); await deliverOutbox(env) })().catch(() => console.warn('webhook_processing_deferred')))
    return new Response('OK')
  },
  async scheduled(_controller: ScheduledController, env: Env, ctx: ExecutionContext): Promise<void> {
    ctx.waitUntil((async () => {
      if (await processInbox(env)) { await deliverOutbox(env); return }
      if (!await processPublication(env)) await processDraft(env)
      await verifyPublications(env)
      await deliverOutbox(env)
    })())
  },
}
