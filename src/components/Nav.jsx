import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X, MessageCircle } from 'lucide-react'
import { SECTIONS, WHATSAPP_LINK } from '../config'
import mark from '../assets/brand/docbook-mark.png'

function Wordmark() {
  return (
    <a
      href="#top"
      className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-ink"
    >
      <img src={mark} alt="" className="h-9 w-9 rounded-xl" />
      <span>DocBook</span>
    </a>
  )
}

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
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Wordmark />

        <div className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-700"
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition-transform hover:scale-[1.03] active:scale-95 sm:flex"
          >
            <MessageCircle className="h-4 w-4" />
            احجز عرض على واتساب
          </a>

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
            <div className="flex flex-col gap-1 px-5 py-4">
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
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-bold text-white"
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
