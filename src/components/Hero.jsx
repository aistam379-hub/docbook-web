import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { MessageCircle, ArrowLeft, WifiOff, ShieldCheck, Stethoscope } from 'lucide-react'
import { WHATSAPP_LINK } from '../config'
import ScrollFrames from './ScrollFrames'

const EASE = [0.22, 1, 0.36, 1]

const TRUST = [
  { icon: Stethoscope, text: '٨ تخصّصات مدعومة' },
  { icon: MessageCircle, text: 'صفحة حجز للمرضى' },
  { icon: WifiOff, text: 'يعمل بلا إنترنت' },
  { icon: ShieldCheck, text: 'عزل كامل لبيانات كل عيادة' },
]

export default function Hero() {
  const reduce = useReducedMotion()
  const trackRef = useRef(null)

  // نمط الدخول: rise = opacity 0 + translateY(14) ، مع تدرّج زمني محدَّد
  const rise = (delay, { duration = 0.9 } = {}) =>
    reduce
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration, ease: EASE, delay },
        }
  const fadeIn = (delay) =>
    reduce
      ? { initial: false, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 1.1, ease: EASE, delay },
        }

  return (
    <section
      id="top"
      ref={trackRef}
      className="relative h-[130vh] overflow-clip sm:h-[148vh] lg:h-[162vh]"
    >
      <div className="sticky top-0 flex min-h-svh items-center overflow-hidden bg-canvas pt-[74px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_0%,theme(colors.brand.100)_0%,transparent_70%)]"
        />

        <div className="mx-auto grid w-full max-w-6xl items-center gap-6 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          <div>
            <motion.span
              {...rise(0, { duration: 0.8 })}
              className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700"
            >
              نظام إدارة عيادة · عربي بالكامل
            </motion.span>

            <motion.h1
              {...rise(0.06)}
              className="mt-6 text-[2rem] font-medium leading-[1.14] text-ink sm:text-[2.5rem] lg:text-[3rem]"
            >
              <span className="block">عيادتك كلها بمكان واحد</span>
              <span className="block">
                من الحجز <span className="text-brand-600">لاضبارة الطبيب</span>
              </span>
            </motion.h1>

            <motion.p
              {...rise(0.14)}
              className="mt-6 max-w-xl text-[15px] leading-[1.8] text-ink-soft sm:text-base"
            >
              المريض يحجز بنفسه من رابط، الممرّضة تقبل وتنظّم المواعيد، والطبيب يفتح
              اضبارة جاهزة لكل مريض مع خطّ زياراته ومنحنى حالته. ويشتغل حتى والإنترنت
              مقطوع.
            </motion.p>

            <motion.div {...rise(0.22)} className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-brand-600 px-6 text-[15px] font-semibold text-white shadow-sm shadow-brand-600/25 transition-transform hover:scale-[1.03] active:scale-95"
              >
                <MessageCircle className="h-4 w-4" />
                احجز عرض على واتساب
              </a>
              <a
                href="#journey"
                className="inline-flex items-center gap-1.5 text-[15px] font-medium text-ink transition-colors hover:text-brand-700"
              >
                شوف كيف يعمل
                <ArrowLeft className="h-4 w-4" />
              </a>
            </motion.div>

            <motion.ul
              {...fadeIn(0.34)}
              className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-ink-faint"
            >
              {TRUST.map(({ icon: Icon, text }) => (
                <li key={text} className="inline-flex items-center gap-1.5">
                  <Icon className="h-4 w-4 text-brand-600" />
                  {text}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            {...fadeIn(0.15)}
            className="order-first h-[36vh] sm:h-[44vh] lg:order-none lg:h-[62vh]"
          >
            <ScrollFrames trackRef={trackRef} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
