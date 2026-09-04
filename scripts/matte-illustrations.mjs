// يزيل الخلفية البيضاء من الإليستريشنات (خطوط نظيفة) ويقصّها لحدود المحتوى → WebP شفاف.
//   node scripts/matte-illustrations.mjs

import { Jimp } from 'jimp'
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'

const SRC = 'C:/Users/cd/Desktop/docbook-site'
const OUT = 'src/assets/illustrations'
mkdirSync(OUT, { recursive: true })

// [file, name, modulate?] — modulate يطابق التركوازي الأغمق للطقم الثاني مع #0d9488
const CM = { hue: -7, saturation: 1.08, brightness: 1.03 }
const MAP = [
  ['docbook-illustration-05-patient-booking.png', 'booking'],
  ['docbook-illustration-02-appointments.png', 'appointments'],
  ['docbook-illustration-04-teamwork.png', 'teamwork'],
  ['docbook-illustration-03-patient-file.png', 'privacy'],
  ['docbook-illustration-01-chaos-to-order.png', 'chaos'],
  ['_ill2/docbook-illustration-06-specialties.png', 'specialties', CM],
  ['_ill2/docbook-illustration-07-offline.png', 'offline', CM],
  ['_ill2/docbook-illustration-08-onboarding.png', 'onboarding', CM],
]

const TOL = 34
const FEATHER = 26

for (const [file, name, modulate] of MAP) {
  const img = await Jimp.read(`${SRC}/${file}`)
  const { data, width: w, height: h } = img.bitmap
  const N = w * h
  // مرجع الخلفية = متوسّط الأركان
  let rr = 0, gg = 0, bb = 0, c = 0
  for (const [x, y] of [[4, 4], [w - 5, 4], [4, h - 5], [w - 5, h - 5]]) {
    const i = (y * w + x) * 4
    rr += data[i]; gg += data[i + 1]; bb += data[i + 2]; c++
  }
  const ref = [rr / c, gg / c, bb / c]
  const dist = (i) => {
    const dr = data[i] - ref[0], dg = data[i + 1] - ref[1], db = data[i + 2] - ref[2]
    return Math.sqrt(dr * dr + dg * dg + db * db)
  }
  const alpha = new Uint8Array(N).fill(255)
  const state = new Uint8Array(N)
  const q = []
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return
    const p = y * w + x
    if (state[p]) return
    if (dist(p * 4) <= TOL) { state[p] = 1; alpha[p] = 0; q.push(p) }
  }
  for (let x = 0; x < w; x++) { push(x, 0); push(x, h - 1) }
  for (let y = 0; y < h; y++) { push(0, y); push(w - 1, y) }
  for (let k = 0; k < q.length; k++) {
    const p = q[k], x = p % w, y = (p / w) | 0
    push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1)
  }
  // feather boundary
  for (let y = 1; y < h - 1; y++)
    for (let x = 1; x < w - 1; x++) {
      const p = y * w + x
      if (state[p]) continue
      if (state[p - 1] || state[p + 1] || state[p - w] || state[p + w]) {
        const d = dist(p * 4)
        if (d < TOL + FEATHER) alpha[p] = Math.round(((d - TOL) / FEATHER) * 255)
      }
    }
  // 1 smooth pass
  const sm = new Uint8Array(alpha)
  for (let y = 1; y < h - 1; y++)
    for (let x = 1; x < w - 1; x++) {
      const p = y * w + x
      sm[p] = ((alpha[p] * 3 + alpha[p - 1] + alpha[p + 1] + alpha[p - w] + alpha[p + w]) / 7) | 0
    }
  for (let p = 0; p < N; p++) data[p * 4 + 3] = sm[p]

  let pipe = sharp(Buffer.from(data), { raw: { width: w, height: h, channels: 4 } })
  if (modulate) pipe = pipe.modulate(modulate)
  const info = await pipe
    .trim({ threshold: 6 })
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 86, alphaQuality: 100, effort: 5 })
    .toFile(`${OUT}/${name}.webp`)
  console.log(`${name}.webp  ${info.width}x${info.height}  ${(info.size / 1024) | 0}KB`)
}
console.log('done')
