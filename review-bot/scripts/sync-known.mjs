import fs from 'node:fs/promises'
import { createHash } from 'node:crypto'
const directory = new URL('../../public/images/reviews/', import.meta.url)
const names = (await fs.readdir(directory)).filter(name => /\.(jpg|png)$/i.test(name)).sort()
const hashes = []
for (const name of names) hashes.push(createHash('sha256').update(await fs.readFile(new URL(name, directory))).digest('hex'))
await fs.writeFile(new URL('../src/known-images.ts', import.meta.url), '// Existing public screenshots: do not send duplicates to the translation API.\nexport const knownImageHashes = new Set(' + JSON.stringify(hashes, null, 2) + ')\n')
console.log(`Indexed ${hashes.length} published screenshots.`)
