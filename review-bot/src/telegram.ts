import type { Env } from './types.js'
import { BotError } from './utils.js'

export async function telegram<T>(env: Env, method: string, body: unknown): Promise<T> {
  const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/${method}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body), signal: AbortSignal.timeout(20000),
  })
  if (!response.ok) throw new BotError(`TELEGRAM_HTTP_${response.status}`)
  const data = await response.json() as { ok: boolean; result: T }
  if (!data.ok) throw new BotError('TELEGRAM_API_ERROR')
  return data.result
}

export async function enqueue(env: Env, id: string, chatId: string, payload: unknown, options: { method?: string; group?: string; sequence?: number; draftId?: string; kind?: string } = {}): Promise<void> {
  await env.DB.prepare('INSERT OR IGNORE INTO outbox (id,chat_id,method,payload,group_id,sequence,draft_id,kind,created_at) VALUES (?,?,?,?,?,?,?,?,?)')
    .bind(id, chatId, options.method ?? 'sendMessage', JSON.stringify(payload), options.group ?? null, options.sequence ?? 0, options.draftId ?? null, options.kind ?? null, Date.now()).run()
}
export async function notify(env: Env, id: string, chatId: string, text: string): Promise<void> {
  await enqueue(env, id, chatId, { chat_id: chatId, text, link_preview_options: { is_disabled: true } })
}

export async function deliverOutbox(env: Env): Promise<void> {
  const rows = await env.DB.prepare(`SELECT o.* FROM outbox o WHERE o.status='pending' AND (o.group_id IS NULL OR NOT EXISTS (SELECT 1 FROM outbox p WHERE p.group_id=o.group_id AND p.sequence<o.sequence AND p.status NOT IN ('pending','sent'))) ORDER BY o.rowid LIMIT 6`)
    .all<{ id: string; method: string; payload: string; group_id: string | null; draft_id: string | null; kind: string | null }>()
  const blocked = new Set<string>()
  for (const row of rows.results) {
    if (row.group_id && blocked.has(row.group_id)) continue
    const claim = await env.DB.prepare("UPDATE outbox AS target SET status='sending' WHERE id=? AND status='pending' AND (group_id IS NULL OR NOT EXISTS (SELECT 1 FROM outbox p WHERE p.group_id=target.group_id AND p.sequence<target.sequence AND p.status!='sent'))").bind(row.id).run()
    if (!claim.meta.changes) { if (row.group_id) blocked.add(row.group_id); continue }
    try {
      const result = await telegram<{ message_id?: number }>(env, row.method, JSON.parse(row.payload))
      await env.DB.prepare("UPDATE outbox SET status='sent' WHERE id=?").bind(row.id).run()
      if (row.draft_id && result.message_id && row.kind === 'approval') {
        await env.DB.prepare('UPDATE drafts SET preview_message_id=? WHERE id=?').bind(result.message_id, row.draft_id).run()
      } else if (row.draft_id && result.message_id && row.kind?.startsWith('editprompt:')) {
        await env.DB.prepare("UPDATE drafts SET edit_prompt_id=? WHERE id=? AND status='editing' AND edit_field=?").bind(result.message_id, row.draft_id, row.kind.split(':')[1]).run()
      }
    } catch {
      // Telegram has no sendMessage idempotency key: a lost response must not trigger an automatic resend.
      await env.DB.prepare("UPDATE outbox SET status='uncertain' WHERE id=?").bind(row.id).run()
      if (row.group_id) blocked.add(row.group_id)
      console.warn('telegram_delivery_uncertain', row.id)
    }
  }
}
