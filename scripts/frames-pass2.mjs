import sharp from 'sharp'
import { readdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const OUT = 'public/docbook_frames_240'
const TMP = join(OUT, '_tmp')
const SC = 2
const files = readdirSync(TMP).filter((f) => /\.png$/i.test(f)).sort()

// union alpha bbox across a sample (every 5th) of the matted frames
let minX = Infinity
let minY = Infinity
let maxX = -Infinity
let maxY = -Infinity
let W = 0
let H = 0
for (let i = 0; i < files.length; i += 5) {
  const img = sharp(join(TMP, files[i]))
  const m = await img.metadata()
  W = m.width
  H = m.height
  const data = await img.clone().ensureAlpha().raw().toBuffer()
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (data[(y * W + x) * 4 + 3] > 20) {
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
    }
  }
}

const cx = W / 2
const halfW = Math.max(cx - minX, maxX - cx)
const mX = Math.round(halfW * 0.04)
const mY = Math.round((maxY - minY) * 0.04)
let bx = Math.max(0, Math.round(cx - halfW - mX))
let bw = Math.min(W - bx, Math.round(2 * (halfW + mX)))
let by = Math.max(0, minY - mY)
let bh = Math.min(H - by, maxY - minY + 1 + mY * 2)
// keep even
bw -= bw % 2
bh -= bh % 2
console.log('union crop:', { bx, by, bw, bh, W, H })

let total = 0
let i = 0
for (const f of files) {
  i++
  const info = await sharp(join(TMP, f))
    .extract({ left: bx, top: by, width: bw, height: bh })
    .resize({ width: bw * SC, height: bh * SC, kernel: 'lanczos3' })
    .sharpen({ sigma: 0.5 })
    .webp({ quality: 90, alphaQuality: 100, effort: 5 })
    .toFile(join(OUT, `frame_${String(i).padStart(3, '0')}.webp`))
  total += info.size
  if (i % 30 === 0) process.stdout.write(`${i} `)
}
console.log('')
rmSync(TMP, { recursive: true, force: true })
console.log(`done: ${i} webp @ ${bw * SC}x${bh * SC}, ${(total / 1e6).toFixed(1)}MB, COUNT=${i}`)
