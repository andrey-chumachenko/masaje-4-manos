import type { Draft, Env, PublishedReview } from './types.js'
import { base64, BotError, decode64, validateText } from './utils.js'

async function github<T>(env: Env, path: string, method = 'GET', body?: unknown): Promise<T> {
  const response = await fetch(`https://api.github.com/repos/${env.GITHUB_REPOSITORY}/${path}`, {
    method, signal: AbortSignal.timeout(25000),
    headers: { Authorization: `Bearer ${env.GITHUB_TOKEN}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'User-Agent': 'MasajeReviewBot', 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  if (!response.ok) throw new BotError(`GITHUB_HTTP_${response.status}`)
  return await response.json() as T
}
export async function publishToGithub(env: Env, draft: Draft, bytes: Uint8Array): Promise<string> {
  if (!draft.approved_payload || draft.approved_revision !== draft.revision || !draft.image_hash || !draft.width || !draft.height || !draft.image_key) throw new BotError('UNAPPROVED_DRAFT')
  const data = validateText(JSON.parse(draft.approved_payload))
  if (!data.hasReview) throw new BotError('UNAPPROVED_DRAFT')
  const id = `tg-${draft.image_hash.slice(0, 24)}`
  const image = `/images/reviews/${id}.${draft.mime_type === 'image/png' ? 'png' : 'jpg'}`
  const record: PublishedReview = { id, image, width: draft.width, height: draft.height, originalLanguage: data.originalLanguage, originalText: data.originalText, text: data.text, imageHash: draft.image_hash }
  // Re-read the branch after a non-fast-forward response; never force-update main.
  for (let attempt = 0; attempt < 3; attempt++) {
    const ref = await github<{ object: { sha: string } }>(env, `git/ref/heads/${encodeURIComponent(env.GITHUB_BRANCH)}`)
    const parent = ref.object.sha
    const current = await github<{ content: string; encoding: string }>(env, `contents/src/data/generated-reviews.json?ref=${parent}`)
    if (current.encoding !== 'base64') throw new BotError('INVALID_REVIEW_FILE')
    const records: PublishedReview[] = JSON.parse(decode64(current.content))
    if (!Array.isArray(records) || records.length > 2000) throw new BotError('INVALID_REVIEW_FILE')
    // A prior request may have committed successfully before its response was lost.
    if (records.some(item => item.id === id || item.imageHash === draft.image_hash)) return parent
    const commit = await github<{ tree: { sha: string } }>(env, `git/commits/${parent}`)
    const imageBlob = await github<{ sha: string }>(env, 'git/blobs', 'POST', { content: base64(bytes), encoding: 'base64' })
    const next = [record, ...records]
    const tree = await github<{ sha: string }>(env, 'git/trees', 'POST', { base_tree: commit.tree.sha, tree: [
      { path: `public${image}`, mode: '100644', type: 'blob', sha: imageBlob.sha },
      { path: 'src/data/generated-reviews.json', mode: '100644', type: 'blob', content: JSON.stringify(next, null, 2) + '\n' },
      { path: 'public/reviews-release.json', mode: '100644', type: 'blob', content: JSON.stringify({ reviewIds: next.map(item => item.id) }) + '\n' },
    ] })
    const created = await github<{ sha: string }>(env, 'git/commits', 'POST', { message: `Publish approved client review ${id}`, tree: tree.sha, parents: [parent], author: { name: env.GIT_AUTHOR_NAME, email: env.GIT_AUTHOR_EMAIL } })
    try {
      await github(env, `git/refs/heads/${encodeURIComponent(env.GITHUB_BRANCH)}`, 'PATCH', { sha: created.sha, force: false })
      return created.sha
    } catch (error) {
      if (!(error instanceof BotError) || !['GITHUB_HTTP_409', 'GITHUB_HTTP_422'].includes(error.code)) throw error
    }
  }
  throw new BotError('GITHUB_CONFLICT')
}
