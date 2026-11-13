import type { Draft, Env, Language, Message, Update } from './types.js'
import { button, languageNames, preview, removeKeyboard } from './preview.js'
import { enqueue, notify } from './telegram.js'
import { validateText } from './utils.js'

export function isAllowed(env: Env, userId: number | undefined): boolean {
  return !!userId && env.ALLOWED_USER_IDS.split(',').map(value => value.trim()).includes(String(userId))
}
async function getDraft(env: Env, id: string, userId: number, chatId: number): Promise<Draft | null> {
  return env.DB.prepare('SELECT * FROM drafts WHERE id=? AND user_id=? AND chat_id=?').bind(id, String(userId), String(chatId)).first<Draft>()
}
async function renewPreview(env: Env, draft: Draft): Promise<void> {
  const next = await env.DB.prepare("UPDATE drafts SET status='review',revision=revision+1,edit_field=NULL,edit_prompt_id=NULL,updated_at=? WHERE id=? AND status IN ('review','editing') RETURNING *")
    .bind(Date.now(), draft.id).first<Draft>()
  if (!next) return
  await env.DB.prepare("UPDATE outbox SET status='cancelled' WHERE draft_id=? AND status='pending'").bind(draft.id).run()
  await removeKeyboard(env, draft)
  await preview(env, next)
}

async function handleMessage(env: Env, message: Message, updateId: number): Promise<void> {
  if (message.chat.type !== 'private' || !isAllowed(env, message.from?.id) || message.from?.is_bot) return
  const chatId = String(message.chat.id)
  const userId = String(message.from!.id)
  const text = message.text?.trim() ?? ''
  const reply = (body: string) => notify(env, `update:${updateId}`, chatId, body)
  if (/^\/(start|help)(?:@\w+)?(?:\s|$)/.test(text)) {
    await reply('Пришлите скриншот отзыва как фото или файл JPG/PNG (до 5 МБ). Каждый скриншот из альбома обрабатывается отдельно.\n\nЯ распознаю сообщения клиента и подготовлю переводы. Публикация произойдёт только после кнопки «Опубликовать».\n\n/drafts — ваши последние отзывы\n/preview ID — снова показать предпросмотр\n/cancel — отменить исправление\n\nЧтобы сохранить исходное качество, отправляйте скриншоты как файлы.')
    return
  }
  if (/^\/drafts(?:@\w+)?$/.test(text)) {
    const rows = await env.DB.prepare('SELECT id,status FROM drafts WHERE user_id=? AND chat_id=? ORDER BY created_at DESC LIMIT 10').bind(userId, chatId).all<{ id: string; status: string }>()
    const names: Record<string, string> = { received: 'в очереди', processing: 'распознавание', review: 'ждёт проверки', editing: 'исправление', publish_queued: 'в очереди публикации', publishing: 'публикуется', deploying: 'обновляется сайт', published: 'на сайте', skipped: 'пропущен', failed: 'ошибка' }
    await reply(rows.results.length ? rows.results.map(row => `${row.id} — ${names[row.status] ?? row.status}`).join('\n') : 'Пока нет отзывов. Пришлите скриншот.')
    return
  }
  const previewCommand = text.match(/^\/preview(?:@\w+)?\s+([a-f0-9]{32})$/)
  if (previewCommand) {
    const draft = await getDraft(env, previewCommand[1], message.from!.id, message.chat.id)
    if (draft && ['review', 'editing'].includes(draft.status)) await renewPreview(env, draft)
    else await reply('Этот отзыв пока недоступен для предпросмотра. Проверьте /drafts.')
    return
  }
  if (/^\/cancel(?:@\w+)?$/.test(text)) {
    const draft = await env.DB.prepare("SELECT * FROM drafts WHERE user_id=? AND chat_id=? AND status='editing' ORDER BY updated_at DESC LIMIT 1").bind(userId, chatId).first<Draft>()
    if (draft) await renewPreview(env, draft)
    else await reply('Сейчас нет незавершённого исправления.')
    return
  }
  if (text && message.reply_to_message) {
    const draft = await env.DB.prepare("SELECT * FROM drafts WHERE user_id=? AND chat_id=? AND status='editing' AND edit_prompt_id=?").bind(userId, chatId, message.reply_to_message.message_id).first<Draft>()
    if (draft?.edit_field && draft.payload) {
      if (text.length > 6000) { await reply('Текст слишком длинный. Максимум — 6000 символов.'); return }
      const data = validateText(JSON.parse(draft.payload))
      const field = draft.edit_field as Language
      data.text[field] = text
      if (data.originalLanguage === field) data.originalText = text
      const updated = await env.DB.prepare("UPDATE drafts SET payload=?,revision=revision+1,status='review',edit_field=NULL,edit_prompt_id=NULL,updated_at=? WHERE id=? AND revision=? AND status='editing' AND edit_prompt_id=? RETURNING *")
        .bind(JSON.stringify(data), Date.now(), draft.id, draft.revision, message.reply_to_message.message_id).first<Draft>()
      if (updated) {
        await env.DB.prepare("UPDATE outbox SET status='cancelled' WHERE draft_id=? AND status='pending'").bind(draft.id).run()
        await removeKeyboard(env, draft)
        await preview(env, updated)
      }
      return
    }
  }
  const file = message.photo?.length ? message.photo[message.photo.length - 1] : message.document
  if (!file) { await reply('Пришлите скриншот JPG/PNG или используйте /drafts. Для исправления ответьте именно на сообщение с запросом нового текста.'); return }
  if (file.file_size && file.file_size > Number(env.MAX_UPLOAD_BYTES)) { await reply('Изображение больше 5 МБ. Пришлите скриншот меньшего размера.'); return }
  const existing = await env.DB.prepare('SELECT id,status FROM drafts WHERE file_unique_id=?').bind(file.file_unique_id).first<{ id: string; status: string }>()
  if (existing) { await reply(`Этот файл уже получен.\nОтзыв: ${existing.id}\nПроверьте /drafts.`); return }
  const id = crypto.randomUUID().replaceAll('-', '')
  const now = Date.now()
  await env.DB.prepare('INSERT OR IGNORE INTO drafts (id,chat_id,user_id,file_id,file_unique_id,file_kind,source_message_id,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?)')
    .bind(id, chatId, userId, file.file_id, file.file_unique_id, message.photo?.length ? 'photo' : 'document', message.message_id, now, now).run()
  await reply('Скриншот принят. Готовлю оригинал и переводы для проверки. Это может занять несколько минут.')
}

async function handleCallback(env: Env, callback: NonNullable<Update['callback_query']>): Promise<void> {
  if (!callback.message || callback.message.chat.type !== 'private' || !isAllowed(env, callback.from.id)) return
  const ack = async (text: string) => enqueue(env, `callback:${callback.id}`, String(callback.message!.chat.id), { callback_query_id: callback.id, text }, { method: 'answerCallbackQuery' })
  const match = callback.data?.match(/^(publish|skip|edit|field|retry|language|source):([a-f0-9]{32}):(\d+)(?::(es|ru|ua|en|es-en|other))?$/)
  if (!match) { await ack('Неизвестная кнопка.'); return }
  const [, action, id, revisionText, field] = match
  const revision = Number(revisionText)
  const draft = await getDraft(env, id, callback.from.id, callback.message.chat.id)
  if (!draft) { await ack('Этот отзыв недоступен.'); return }
  if (draft.revision !== revision) { await ack('Это старая версия. Откройте новый предпросмотр через /drafts.'); return }
  if (action === 'publish') {
    const result = await env.DB.prepare("UPDATE drafts SET status='publish_queued',approved_payload=payload,approved_revision=revision,updated_at=? WHERE id=? AND revision=? AND status='review' AND payload IS NOT NULL")
      .bind(Date.now(), id, revision).run()
    await ack(result.meta.changes ? 'Отзыв подтверждён. Начинаю публикацию.' : 'Отзыв уже обрабатывается или недоступен для публикации.')
    if (result.meta.changes) {
      await removeKeyboard(env, draft)
      await notify(env, `approved:${id}:${revision}`, draft.chat_id, 'Версия подтверждена. Обновляю сайт; сообщу, когда отзыв появится по ссылке.')
    }
    return
  }
  if (action === 'skip') {
    const result = await env.DB.prepare("UPDATE drafts SET status='skipped',updated_at=? WHERE id=? AND revision=? AND status IN ('review','editing','failed')").bind(Date.now(), id, revision).run()
    await ack(result.meta.changes ? 'Отзыв пропущен. На сайт он не добавлен.' : 'Отзыв уже обрабатывается.')
    if (result.meta.changes) await removeKeyboard(env, draft)
    return
  }
  if (action === 'retry') {
    const result = await env.DB.prepare("UPDATE drafts SET status='received',ai_started=0,revision=revision+1,lease_until=0,failure_code=NULL,updated_at=? WHERE id=? AND revision=? AND status='failed'").bind(Date.now(), id, revision).run()
    await ack(result.meta.changes ? 'Повторное распознавание добавлено в очередь.' : 'Этот запрос уже обрабатывается.')
    return
  }
  if (!['review', 'editing'].includes(draft.status)) { await ack('Сейчас отзыв нельзя исправить.'); return }
  if (action === 'language') {
    await ack('Выберите язык исходных сообщений клиента.')
    await enqueue(env, `language-menu:${callback.id}`, draft.chat_id, { chat_id: draft.chat_id, text: 'Язык оригинала. После выбора появится новый предпросмотр; проверить и подтвердить его нужно заново.', reply_markup: { inline_keyboard: [
      [button('Испанский', `source:${id}:${revision}:es`), button('Русский', `source:${id}:${revision}:ru`)],
      [button('Английский', `source:${id}:${revision}:en`), button('Украинский', `source:${id}:${revision}:ua`)],
      [button('Испанский + английский', `source:${id}:${revision}:es-en`), button('Другой / смешанный', `source:${id}:${revision}:other`)],
    ] } })
    return
  }
  if (action === 'source' && field && draft.payload) {
    const data = validateText(JSON.parse(draft.payload))
    data.originalLanguage = field as typeof data.originalLanguage
    const changed = await env.DB.prepare("UPDATE drafts SET payload=?,revision=revision+1,status='review',edit_field=NULL,edit_prompt_id=NULL,updated_at=? WHERE id=? AND revision=? AND status IN ('review','editing') RETURNING *").bind(JSON.stringify(data), Date.now(), id, revision).first<Draft>()
    if (changed) {
      await env.DB.prepare("UPDATE outbox SET status='cancelled' WHERE draft_id=? AND status='pending'").bind(draft.id).run()
      await removeKeyboard(env, draft)
      await preview(env, changed)
    }
    await ack(changed ? 'Язык изменён. Проверьте новый предпросмотр.' : 'Отзыв уже изменён. Откройте новый предпросмотр.')
    return
  }
  if (action === 'edit') {
    await env.DB.prepare("UPDATE drafts SET status='editing',edit_field=NULL,edit_prompt_id=NULL,updated_at=? WHERE id=? AND revision=? AND status IN ('review','editing')").bind(Date.now(), id, revision).run()
    await ack('Выберите язык для исправления.')
    await enqueue(env, `edit-menu:${callback.id}`, draft.chat_id, { chat_id: draft.chat_id, text: 'Какой текст исправить? Для возврата используйте /cancel.', reply_markup: { inline_keyboard: [
      [button('Русский', `field:${id}:${revision}:ru`), button('Испанский', `field:${id}:${revision}:es`)],
      [button('Английский', `field:${id}:${revision}:en`), button('Украинский', `field:${id}:${revision}:ua`)],
    ] } })
    return
  }
  if (action === 'field' && field && ['es', 'ru', 'ua', 'en'].includes(field)) {
    await env.DB.prepare("UPDATE drafts SET status='editing',edit_field=?,edit_prompt_id=NULL,updated_at=? WHERE id=? AND revision=? AND status IN ('review','editing')").bind(field, Date.now(), id, revision).run()
    await ack('Ответьте новым текстом на следующее сообщение.')
    await enqueue(env, `edit-prompt:${callback.id}`, draft.chat_id, {
      chat_id: draft.chat_id, text: `${languageNames[field as Language]}: ответьте на это сообщение полным исправленным текстом (до 6000 символов).\n\nИзменится только выбранный текст. Остальные переводы сохранятся — проверьте их в новом предпросмотре.`,
      reply_markup: { force_reply: true, selective: true },
    }, { draftId: id, kind: `editprompt:${field}` })
  }
}

export async function processInbox(env: Env): Promise<number> {
  const now = Date.now()
  const rows = await env.DB.prepare("SELECT update_id,payload FROM inbox WHERE status='pending' OR (status='processing' AND lease_until<?) ORDER BY update_id LIMIT 2").bind(now).all<{ update_id: number; payload: string }>()
  for (const row of rows.results) {
    const claim = await env.DB.prepare("UPDATE inbox SET status='processing',lease_until=? WHERE update_id=? AND (status='pending' OR (status='processing' AND lease_until<?))").bind(now + 120000, row.update_id, now).run()
    if (!claim.meta.changes) continue
    try {
      const update = JSON.parse(row.payload) as Update
      if (update.message) await handleMessage(env, update.message, update.update_id)
      else if (update.callback_query) await handleCallback(env, update.callback_query)
      await env.DB.prepare("UPDATE inbox SET status='done',payload='{}' WHERE update_id=?").bind(row.update_id).run()
    } catch {
      console.warn('inbox_processing_failed', row.update_id)
      // Leave the persisted update for a later attempt; external sends use an outbox key.
    }
  }
  return rows.results.length
}
