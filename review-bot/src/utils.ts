import type { ReviewText } from './types.js'

export class BotError extends Error {
  constructor(public code: string) { super(code) }
}
export async function digest(bytes: ArrayBuffer | Uint8Array): Promise<string> {
  const hash = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(hash), b => b.toString(16).padStart(2, '0')).join('')
}
export function base64(bytes: Uint8Array): string {
  let result = ''
  for (let i = 0; i < bytes.length; i += 8192) result += String.fromCharCode(...bytes.subarray(i, i + 8192))
  return btoa(result)
}
export function decode64(value: string): string {
  return new TextDecoder().decode(Uint8Array.from(atob(value.replace(/\s/g, '')), c => c.charCodeAt(0)))
}
export function splitText(value: string, size = 3500): string[] {
  const chunks: string[] = []
  let chunk = ''
  for (const point of value) {
    if (chunk.length + point.length > size) { chunks.push(chunk); chunk = '' }
    chunk += point
  }
  if (chunk) chunks.push(chunk)
  return chunks
}
export function validateText(value: unknown): ReviewText {
  if (!value || typeof value !== 'object') throw new BotError('INVALID_TRANSLATIONS')
  const data = value as ReviewText
  if (typeof data.hasReview !== 'boolean' || !['es', 'ru', 'ua', 'en', 'es-en', 'other'].includes(data.originalLanguage)) throw new BotError('INVALID_TRANSLATIONS')
  if (typeof data.originalText !== 'string' || data.originalText.length > 6000 || (data.hasReview && !data.originalText.trim())) throw new BotError('INVALID_TRANSLATIONS')
  for (const language of ['es', 'ru', 'ua', 'en'] as const) {
    if (typeof data.text?.[language] !== 'string' || data.text[language].length > 6000 || (data.hasReview && !data.text[language].trim())) throw new BotError('INVALID_TRANSLATIONS')
  }
  if (!Array.isArray(data.notes) || data.notes.length > 8 || data.notes.some(n => typeof n !== 'string' || n.length > 800)) throw new BotError('INVALID_TRANSLATIONS')
  const text = { es: data.text.es, ru: data.text.ru, ua: data.text.ua, en: data.text.en }
  if (['es', 'ru', 'ua', 'en'].includes(data.originalLanguage)) text[data.originalLanguage as keyof typeof text] = data.originalText
  return { hasReview: data.hasReview, originalLanguage: data.originalLanguage, originalText: data.originalText, text, notes: data.notes }
}
export function imageInfo(bytes: Uint8Array): { mime: string; extension: string; width: number; height: number } {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  let width = 0, height = 0, mime = '', extension = ''
  if (bytes.length > 24 && [137, 80, 78, 71, 13, 10, 26, 10].every((b, i) => bytes[i] === b) && String.fromCharCode(...bytes.subarray(12, 16)) === 'IHDR') {
    width = view.getUint32(16); height = view.getUint32(20); mime = 'image/png'; extension = 'png'
  } else if (bytes.length > 4 && bytes[0] === 255 && bytes[1] === 216) {
    let offset = 2
    while (offset + 4 <= bytes.length) {
      if (bytes[offset++] !== 255) throw new BotError('INVALID_IMAGE')
      while (bytes[offset] === 255) offset++
      const marker = bytes[offset++]
      if (marker === 217 || marker === 218) break
      if (marker === 1 || (marker >= 208 && marker <= 215)) continue
      if (offset + 2 > bytes.length) break
      const length = view.getUint16(offset)
      if (length < 2 || offset + length > bytes.length) throw new BotError('INVALID_IMAGE')
      if ([192, 193, 194, 195, 197, 198, 199, 201, 202, 203, 205, 206, 207].includes(marker)) {
        if (length < 8) throw new BotError('INVALID_IMAGE')
        height = view.getUint16(offset + 3); width = view.getUint16(offset + 5); mime = 'image/jpeg'; extension = 'jpg'; break
      }
      offset += length
    }
  }
  if (!width || !height || width > 12000 || height > 12000 || width * height > 40000000) throw new BotError('INVALID_IMAGE')
  return { mime, extension, width, height }
}
export function errorCode(error: unknown): string { return error instanceof BotError ? error.code : 'INTERNAL_ERROR' }
