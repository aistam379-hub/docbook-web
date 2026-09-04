// يعيد تلوين البكسلات السماوية/التركوازية في الفريمات إلى تركوازي الهوية #0d9488،
// بلا لمس الأبيض/الرمادي/النص (فيبقى دمج multiply سليماً).
//   node scripts/recolor.mjs            -> يعالج كل الفريمات in-place
//   node scripts/recolor.mjs test       -> يكتب عيّنة للمعاينة فقط

import sharp from 'sharp'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const DIR = 'public/docbook_frames_240'
const TEST = process.argv[2] === 'test'
const BRAND = [13, 148, 136] // #0d9488

async function recolor(buf) {
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2]
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const sat = max ? (max - min) / max : 0
    // سماوي/تركوازي: أخضر وأزرق عاليان، أحمر أقل، ومُشبَع
    const isCyan = sat > 0.2 && g > 70 && b > 70 && g - r > 18 && b - r > 8
    if (!isCyan) continue
    const pxLuma = 0.3 * r + 0.59 * g + 0.11 * b
    const scale = Math.max(0.55, Math.min(1.12, pxLuma / 185))
    const tr = BRAND[0] * scale
    const tg = BRAND[1] * scale
    const tb = BRAND[2] * scale
    const k = Math.min(1, sat * 1.7) // قوة الاستبدال حسب الإشباع (لتنعيم الحواف)
    data[i] = Math.round(r * (1 - k) + tr * k)
    data[i + 1] = Math.round(g * (1 - k) + tg * k)
    data[i + 2] = Math.round(b * (1 - k) + tb * k)
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .webp({ quality: 76, effort: 4 })
    .toBuffer()
}

if (TEST) {
  const O = 'C:/Users/cd/AppData/Local/Temp/claude/c--Users-cd-Desktop-library/3968ef7f-cc9a-4c10-957a-a6bac9c7b954/scratchpad'
  for (const f of ['frame_100.webp', 'frame_004.webp', 'frame_060.webp']) {
    const out = await recolor(readFileSync(join(DIR, f)))
    writeFileSync(join(O, 'rc_' + f.replace('.webp', '.png')), await sharp(out).png().toBuffer())
  }
  console.log('test written')
} else {
  const files = readdirSync(DIR).filter((f) => f.endsWith('.webp')).sort()
  let i = 0
  for (const f of files) {
    i++
    const p = join(DIR, f)
    const out = await recolor(readFileSync(p))
    writeFileSync(p, out)
    if (i % 30 === 0) process.stdout.write(`${i} `)
  }
  console.log(`\nrecolored ${i} frames`)
}
