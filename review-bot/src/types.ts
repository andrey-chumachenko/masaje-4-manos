export type Language = 'es' | 'ru' | 'ua' | 'en'
export type OriginalLanguage = Language | 'es-en' | 'other'
export interface ReviewText {
  hasReview: boolean
  originalLanguage: OriginalLanguage
  originalText: string
  text: Record<Language, string>
  notes: string[]
}
export interface PublishedReview {
  id: string
  image: string
  width: number
  height: number
  originalLanguage: OriginalLanguage
  originalText: string
  text: Record<Language, string>
  imageHash: string
}
export interface Draft {
  id: string
  chat_id: string
  user_id: string
  file_id: string
  file_unique_id: string
  file_kind: 'photo' | 'document'
  source_message_id: number
  status: string
  payload: string | null
  approved_payload: string | null
  revision: number
  approved_revision: number | null
  image_key: string | null
  image_hash: string | null
  mime_type: string | null
  width: number | null
  height: number | null
  ai_started: number
  lease_until: number
  preview_message_id: number | null
  edit_field: string | null
  edit_prompt_id: number | null
  commit_sha: string | null
  failure_code: string | null
  created_at: number
  updated_at: number
}
export interface Env {
  DB: D1Database
  TELEGRAM_BOT_TOKEN: string
  TELEGRAM_WEBHOOK_SECRET: string
  OPENAI_API_KEY: string
  OPENAI_MODEL: string
  GITHUB_TOKEN: string
  GITHUB_REPOSITORY: string
  GITHUB_BRANCH: string
  GIT_AUTHOR_NAME: string
  GIT_AUTHOR_EMAIL: string
  SITE_URL: string
  ALLOWED_USER_IDS: string
  MAX_AI_REQUESTS_PER_DAY: string
  MAX_UPLOAD_BYTES: string
}
export interface Message {
  message_id: number
  chat: { id: number; type: string }
  from?: { id: number; is_bot?: boolean }
  text?: string
  reply_to_message?: { message_id: number }
  photo?: { file_id: string; file_unique_id: string; file_size?: number; width: number; height: number }[]
  document?: { file_id: string; file_unique_id: string; file_size?: number; mime_type?: string }
}
export interface Update {
  update_id: number
  message?: Message
  callback_query?: { id: string; from: { id: number }; message?: Message; data?: string }
}
