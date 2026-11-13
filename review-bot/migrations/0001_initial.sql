CREATE TABLE drafts (
  id TEXT PRIMARY KEY,
  chat_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  file_id TEXT NOT NULL,
  file_unique_id TEXT NOT NULL UNIQUE,
  file_kind TEXT NOT NULL,
  source_message_id INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'received',
  payload TEXT,
  approved_payload TEXT,
  revision INTEGER NOT NULL DEFAULT 1,
  approved_revision INTEGER,
  image_key TEXT,
  image_hash TEXT UNIQUE,
  mime_type TEXT,
  width INTEGER,
  height INTEGER,
  ai_started INTEGER NOT NULL DEFAULT 0,
  lease_until INTEGER NOT NULL DEFAULT 0,
  preview_message_id INTEGER,
  edit_field TEXT,
  edit_prompt_id INTEGER,
  commit_sha TEXT,
  failure_code TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
CREATE INDEX drafts_work ON drafts(status, lease_until, created_at);
CREATE TABLE image_chunks (
  draft_id TEXT NOT NULL REFERENCES drafts(id),
  part INTEGER NOT NULL,
  data BLOB NOT NULL,
  PRIMARY KEY (draft_id, part)
);
CREATE TABLE inbox (
  update_id INTEGER PRIMARY KEY,
  payload TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  lease_until INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL
);
CREATE TABLE outbox (
  id TEXT PRIMARY KEY,
  chat_id TEXT NOT NULL,
  method TEXT NOT NULL DEFAULT 'sendMessage',
  payload TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  group_id TEXT,
  sequence INTEGER NOT NULL DEFAULT 0,
  draft_id TEXT,
  kind TEXT,
  created_at INTEGER NOT NULL
);
CREATE INDEX outbox_pending ON outbox(status, created_at);
CREATE TABLE ai_usage (
  day TEXT PRIMARY KEY,
  requests INTEGER NOT NULL DEFAULT 0
);
