import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { MessageCircle, ArrowDown, WifiOff, ShieldCheck, Stethoscope } from 'lucide-react'
import { WHATSAPP_LINK } from '../config'
import ScrollFrames from './ScrollFrames'

const TRUST = [
  { icon: Stethoscope, text: '٨ تخصّصات مدعومة' },
  { icon: MessageCircle, text: 'صفحة حجز للمرضى' },
  { icon: WifiOff, text: 'يعمل بلا إنترنت' },
  { icon: ShieldCheck, text: 'عزل كامل لبيانات كل عيادة' },
]

export default function Hero() {
  const reduce = useReducedMotion()
  const trackRef = useRef(null)

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.05 },
    },
  }
  const item = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
      }

  return (
    <section
      id="top"
      ref={trackRef}
      className="relative h-[130vh] overflow-clip sm:h-[148vh] lg:h-[162vh]"
    >
      <div className="sticky top-0 flex min-h-svh items-center overflow-hidden bg-canvas pt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_0%,theme(colors.brand.100)_0%,transparent_70%)]"
        />

        <div className="mx-auto grid w-full max-w-6xl items-center gap-6 px-5 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
                نظام إدارة عيادة · عربي بالكامل
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-5 text-3xl leading-tight text-ink sm:text-4xl lg:text-[2.9rem]"
            >
              عيادتك كلها بمكان واحد — من حجز المريض
              <span className="text-brand-600"> لاضبارته عند الطبيب</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg"
            >
              المريض يحجز بنفسه من رابط، الممرّضة تقبل وتنظّم المواعيد، والطبيب يفتح
              اضبارة جاهزة لكل مريض مع خطّ زياراته ومنحنى حالته. ويشتغل حتى والإنترنت
              مقطوع.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-bold text-white shadow-sm shadow-brand-600/25 transition-transform hover:scale-[1.03] active:scale-95"
              >
                <MessageCircle className="h-4 w-4" />
                احجز عرض على واتساب
              </a>
              <a
                href="#journey"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-paper px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                شوف كيف يعمل
                <ArrowDown className="h-4 w-4" />
              </a>
            </motion.div>

            <motion.ul
              variants={item}
              className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-ink-soft"
            >
              {TRUST.map(({ icon: Icon, text }) => (
                <li key={text} className="inline-flex items-center gap-1.5">
                  <Icon className="h-4 w-4 text-brand-600" />
                  {text}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="order-first h-[36vh] sm:h-[44vh] lg:order-none lg:h-[62vh]"
          >
            <ScrollFrames trackRef={trackRef} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
