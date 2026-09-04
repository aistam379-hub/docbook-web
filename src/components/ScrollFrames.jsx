import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const COUNT = 111
const framePath = (i) =>
  `${import.meta.env.BASE_URL}docbook_frames_240/frame_${String(i).padStart(3, '0')}.webp`

/**
 * تسلسل فريمات (WebP بشفافية، كلها بنفس الأبعاد) يُمشّى بالسكرول.
 * - كل الفريمات بنفس القصّ الثابت → صفر اهتزاز في الموضع.
 * - مؤشّر الفريم يُنعَّم بـ lerp داخل حلقة rAF → لا قفز عند السكرول السريع.
 */
export default function ScrollFrames({
  trackRef,
  className = '',
  fit = 'contain',
  focusY = 0.5,
}) {
  const canvasRef = useRef(null)
  const framesRef = useRef([])
  const loadedRef = useRef(null)
  const targetRef = useRef(0)
  const dispRef = useRef(0)
  const drawnRef = useRef(-1)
  const rafRef = useRef(0)
  const runningRef = useRef(false)
  const [ready, setReady] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    let cancelled = false
    let loaded = 0
    const arr = new Array(COUNT)
    const flags = new Uint8Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      const img = new Image()
      img.decoding = 'async'
      img.src = framePath(i + 1)
      const done = () => {
        if (cancelled) return
        flags[i] = 1
        loaded++
        if (drawnRef.current === -1) drawIndex(0)
        if (loaded >= Math.min(12, COUNT)) setReady(true)
      }
      img.onload = done
      img.onerror = done
      arr[i] = img
    }
    framesRef.current = arr
    loadedRef.current = flags
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const nearestLoaded = (target) => {
    const flags = loadedRef.current
    if (!flags) return -1
    for (let i = target; i >= 0; i--) if (flags[i]) return i
    for (let i = target; i < COUNT; i++) if (flags[i]) return i
    return -1
  }

  const drawIndex = (rawIndex) => {
    const index = nearestLoaded(Math.max(0, Math.min(COUNT - 1, rawIndex)))
    if (index === -1 || index === drawnRef.current) return
    const canvas = canvasRef.current
    const img = framesRef.current[index]
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const cssW = canvas.clientWidth
    const cssH = canvas.clientHeight
    if (!cssW || !cssH) return
    if (canvas.width !== Math.round(cssW * dpr) || canvas.height !== Math.round(cssH * dpr)) {
      canvas.width = Math.round(cssW * dpr)
      canvas.height = Math.round(cssH * dpr)
    }
    const ctx = canvas.getContext('2d')
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'medium'
    ctx.clearRect(0, 0, cssW, cssH)
    const iw = img.naturalWidth
    const ih = img.naturalHeight
    const scale =
      fit === 'cover'
        ? Math.max(cssW / iw, cssH / ih)
        : Math.min(cssW / iw, cssH / ih)
    const dw = iw * scale
    const dh = ih * scale
    ctx.drawImage(img, (cssW - dw) / 2, (cssH - dh) * focusY, dw, dh)
    drawnRef.current = index
  }

  useEffect(() => {
    const track = trackRef?.current
    if (!track) return

    const progress = () => {
      const rect = track.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      return total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0
    }

    if (reduce) {
      drawIndex(Math.round(progress() * (COUNT - 1)))
      return
    }

    const tick = () => {
      const diff = targetRef.current - dispRef.current
      if (Math.abs(diff) < 0.4) {
        dispRef.current = targetRef.current
        runningRef.current = false
      } else {
        dispRef.current += diff * 0.32
        rafRef.current = requestAnimationFrame(tick)
      }
      drawIndex(Math.round(dispRef.current))
    }
    const kick = () => {
      targetRef.current = progress() * (COUNT - 1)
      if (!runningRef.current) {
        runningRef.current = true
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    const onResize = () => {
      drawnRef.current = -1
      dispRef.current = targetRef.current = progress() * (COUNT - 1)
      drawIndex(Math.round(dispRef.current))
    }

    dispRef.current = targetRef.current = progress() * (COUNT - 1)
    drawIndex(Math.round(dispRef.current))
    window.addEventListener('scroll', kick, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', kick)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(rafRef.current)
      runningRef.current = false
    }
  }, [trackRef, reduce, ready])

  return (
    <canvas
      ref={canvasRef}
      className={`block h-full w-full ${className}`}
      aria-hidden="true"
    />
  )
}
