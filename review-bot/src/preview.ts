import type { Draft, Env, Language } from './types.js'
import { enqueue } from './telegram.js'
import { splitText, validateText } from './utils.js'

export const languageNames: Record<Language, string> = { es: 'Испанский', ru: 'Русский', ua: 'Украинский', en: 'Английский' }
export const button = (text: string, data: string) => ({ text, callback_data: data })

export async function preview(env: Env, draft: Draft): Promise<void> {
  if (!draft.payload) return
  const data = validateText(JSON.parse(draft.payload))
  const group = `preview:${draft.id}:${draft.revision}`
  const sections = [
    `Отзыв ${draft.id}\n\nОригинальный скриншот — в сообщении, на которое отвечает этот предпросмотр.\nЯзык оригинала: ${data.originalLanguage}.\n\nРаспознанные сообщения клиента:\n${data.originalText}`,
    ...(['ru', 'es', 'en', 'ua'] as const).map(lang => `${languageNames[lang]}:\n\n${data.text[lang]}`),
    ...(data.notes.length ? [`Примечания к распознаванию:\n${data.notes.join('\n')}`] : []),
  ]
  let sequence = 0
  for (const section of sections) for (const chunk of splitText(section)) {
    await enqueue(env, `${group}:${sequence}`, draft.chat_id, {
      chat_id: draft.chat_id, text: chunk,
      ...(sequence === 0 ? { reply_parameters: { message_id: draft.source_message_id, allow_sending_without_reply: true } } : {}),
      link_preview_options: { is_disabled: true },
    }, { group, sequence: sequence++, draftId: draft.id })
  }
  await enqueue(env, `${group}:approve`, draft.chat_id, {
    chat_id: draft.chat_id,
    text: 'Проверьте оригинал и переводы выше. На сайт попадёт только эта версия после нажатия «Опубликовать».',
    reply_markup: { inline_keyboard: [
      [button('Опубликовать', `publish:${draft.id}:${draft.revision}`)],
      [button('Исправить', `edit:${draft.id}:${draft.revision}`), button('Пропустить', `skip:${draft.id}:${draft.revision}`)],
      [button('Язык оригинала', `language:${draft.id}:${draft.revision}`)],
    ] },
  }, { group, sequence, draftId: draft.id, kind: 'approval' })
}

export async function removeKeyboard(env: Env, draft: Draft): Promise<void> {
  if (!draft.preview_message_id) return
  await enqueue(env, `remove:${draft.id}:${draft.revision}`, draft.chat_id, {
    chat_id: draft.chat_id, message_id: draft.preview_message_id, reply_markup: { inline_keyboard: [] },
  }, { method: 'editMessageReplyMarkup' })
}
