import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X, MessageCircle } from 'lucide-react'
import { SECTIONS, WHATSAPP_LINK } from '../config'
import mark from '../assets/brand/docbook-mark.png'

const EASE = [0.22, 1, 0.36, 1]
const rise = (reduce, delay = 0) => ({
  initial: reduce ? false : { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
})

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? 'border-b border-line bg-canvas/85 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="relative mx-auto flex h-[74px] max-w-6xl items-center justify-between px-6">
        {/* الشعار — إشارة يسار بارزة */}
        <motion.a
          {...rise(reduce)}
          href="#top"
          aria-label="DocBook"
          className="flex items-center gap-2.5"
        >
          <img src={mark} alt="" className="h-11 w-11 rounded-xl" />
          <span className="text-lg font-semibold tracking-tight text-ink">DocBook</span>
        </motion.a>

        {/* الروابط — وسط، نصّ هادئ */}
        <motion.div
          {...rise(reduce)}
          className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-7 md:flex"
        >
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="pointer-events-auto text-[15px] font-normal text-ink-faint transition-colors hover:text-ink"
            >
              {s.label}
            </a>
          ))}
        </motion.div>

        {/* CTA — بيل يمين */}
        <div className="flex items-center gap-2">
          <motion.a
            {...rise(reduce)}
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-11 items-center gap-2 rounded-full bg-brand-600 px-6 text-[15px] font-semibold text-white transition-transform hover:scale-[1.03] active:scale-95 sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4" />
            احجز عرض على واتساب
          </motion.a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-xl text-ink transition-colors hover:bg-brand-50 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden border-t border-line bg-canvas md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-700"
                >
                  {s.label}
                </a>
              ))}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-brand-600 px-4 py-3 text-sm font-bold text-white"
              >
                <MessageCircle className="h-4 w-4" />
                احجز عرض على واتساب
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
