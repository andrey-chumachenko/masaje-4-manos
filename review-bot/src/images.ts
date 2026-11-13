import type { Env } from './types.js'
import { BotError } from './utils.js'

// D1 values have a size limit. Each private image is stored in bounded binary chunks.
export async function storeImage(env: Env, id: string, bytes: Uint8Array): Promise<void> {
  const statements = [env.DB.prepare('DELETE FROM image_chunks WHERE draft_id=?').bind(id)]
  for (let offset = 0; offset < bytes.length; offset += 256 * 1024) {
    statements.push(env.DB.prepare('INSERT INTO image_chunks (draft_id,part,data) VALUES (?,?,?)').bind(id, offset / (256 * 1024), Uint8Array.from(bytes.subarray(offset, offset + 256 * 1024)).buffer))
  }
  await env.DB.batch(statements)
}
export async function loadImage(env: Env, id: string): Promise<Uint8Array> {
  const result = await env.DB.prepare('SELECT part,length(data) AS size FROM image_chunks WHERE draft_id=? ORDER BY part').bind(id).all<{ part: number; size: number }>()
  const total = result.results.reduce((sum, row) => sum + row.size, 0)
  if (!total || total > 5242880) throw new BotError('MISSING_IMAGE')
  const bytes = new Uint8Array(total)
  let offset = 0
  for (const row of result.results) {
    const data = await env.DB.prepare('SELECT hex(data) AS data FROM image_chunks WHERE draft_id=? AND part=?').bind(id, row.part).first<string>('data')
    if (!data || data.length !== row.size * 2) throw new BotError('MISSING_IMAGE')
    for (let i = 0; i < data.length; i += 2) bytes[offset++] = parseInt(data.slice(i, i + 2), 16)
  }
  return bytes
}
