import sharp from 'sharp'
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
const DIR = 'public/docbook_frames_240'
const files = readdirSync(DIR).filter((f) => f.endsWith('.webp')).sort()
let before = 0, after = 0
for (const f of files) {
  const p = join(DIR, f)
  before += statSync(p).size
  const src = readFileSync(p)               // full read -> handle released
  const buf = await sharp(src).resize({ width: 1200, kernel: 'lanczos3' })
    .webp({ quality: 74, alphaQuality: 100, effort: 4 }).toBuffer()
  writeFileSync(p, buf)
  after += buf.length
}
console.log(`${(before/1e6).toFixed(1)}MB -> ${(after/1e6).toFixed(1)}MB  (${files.length})`)
