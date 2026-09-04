// خط أنابيب الفريمات — بلا matte.
// نُبقي خلفية الفيديو البيضا وظلالها، والدمج يتمّ بـ mix-blend-mode:multiply في الواجهة.
//   node scripts/build-frames.mjs [srcDir] [outDir]

import sharp from 'sharp'
import { mkdirSync, readdirSync, readFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const SRC = process.argv[2] || 'C:/Users/cd/Desktop/docbook-site/_hnew'
const OUT = process.argv[3] || 'public/docbook_frames_240'
const OUT_W = 1200
const Q = 76

rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })

const files = readdirSync(SRC).filter((f) => /\.png$/i.test(f)).sort()
console.log(`building ${files.length} frames (no matte)...`)

let total = 0
let i = 0
for (const f of files) {
  i++
  const src = readFileSync(join(SRC, f))
  const info = await sharp(src)
    .resize({ width: OUT_W, kernel: 'lanczos3' })
    .flatten({ background: '#ffffff' }) // ثبّت الخلفية بيضا نقية
    .webp({ quality: Q, effort: 5 })
    .toFile(join(OUT, `frame_${String(i).padStart(3, '0')}.webp`))
  total += info.size
  if (i % 30 === 0) process.stdout.write(`${i} `)
}
console.log('')
console.log(`done: ${i} webp @ ${OUT_W}w, ${(total / 1e6).toFixed(1)}MB, COUNT=${i}`)
