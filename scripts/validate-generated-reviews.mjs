import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import { createHash } from 'node:crypto'

const root = new URL('../', import.meta.url)
const reviews = JSON.parse(await fs.readFile(new URL('src/data/generated-reviews.json', root), 'utf8'))
const manifest = JSON.parse(await fs.readFile(new URL('public/reviews-release.json', root), 'utf8'))
assert.ok(Array.isArray(reviews) && reviews.length <= 2000, 'Invalid generated reviews list')
assert.deepEqual(manifest.reviewIds, reviews.map(review => review.id), 'Release manifest does not match review data')
const ids = new Set()
const hashes = new Set()
for (const review of reviews) {
  assert.match(review.id, /^tg-[a-f0-9]{24}$/)
  assert.match(review.imageHash, /^[a-f0-9]{64}$/)
  assert.equal(review.id, 'tg-' + review.imageHash.slice(0, 24))
  assert.ok(!ids.has(review.id) && !hashes.has(review.imageHash), 'Duplicate generated review')
  ids.add(review.id); hashes.add(review.imageHash)
  assert.ok(review.image === '/images/reviews/' + review.id + '.jpg' || review.image === '/images/reviews/' + review.id + '.png', 'Unexpected image path')
  assert.ok(Number.isInteger(review.width) && review.width > 0 && review.width <= 12000 && Number.isInteger(review.height) && review.height > 0 && review.height <= 12000 && review.width * review.height <= 40000000, 'Invalid image dimensions')
  assert.ok(['es', 'ru', 'en', 'ua', 'es-en', 'other'].includes(review.originalLanguage), 'Invalid source language')
  assert.ok(typeof review.originalText === 'string' && review.originalText.trim() && review.originalText.length <= 6000, 'Missing original customer text')
  for (const language of ['es', 'ru', 'ua', 'en']) assert.ok(typeof review.text?.[language] === 'string' && review.text[language].trim() && review.text[language].length <= 6000, 'Missing translation: ' + language)
  const image = await fs.readFile(new URL('public' + review.image, root))
  assert.equal(createHash('sha256').update(image).digest('hex'), review.imageHash, 'Image hash does not match original')
}
console.log(`Validated ${reviews.length} approved bot reviews.`)
