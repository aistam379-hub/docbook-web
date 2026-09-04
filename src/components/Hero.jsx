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
      className="relative h-[132vh] overflow-clip sm:h-[150vh] lg:h-[166vh]"
    >
      <div className="sticky top-0 h-svh overflow-hidden bg-white">
        {/* الأنيميشن — ملء الشاشة، خلفية */}
        <ScrollFrames
          trackRef={trackRef}
          fit="cover"
          focusY={0.42}
          className="absolute inset-0"
        />

        {/* تدرّج جانبي (ديسكتوب): أبيض كثيف على اليمين خلف النص، يصفو لليسار */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(to_left,#fff_0%,#fff_28%,rgba(255,255,255,0.78)_46%,rgba(255,255,255,0)_74%)] lg:block"
        />
        {/* تدرّج سفلي (كل المقاسات): يذوّب القسم بالتالي */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_52%,rgba(255,255,255,0.55)_76%,#fff_100%)]"
        />
        {/* تدرّج الموبايل: نصف سفلي أبيض قوي ليقرأ النص فوقه */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,#fff_0%,#fff_32%,rgba(255,255,255,0.85)_48%,rgba(255,255,255,0.25)_76%,rgba(255,255,255,0)_100%)] lg:hidden"
        />

        {/* المحتوى */}
        <div className="relative mx-auto flex h-full max-w-6xl items-end px-6 pb-14 pt-[74px] lg:items-center lg:pb-0">
          <div className="w-full text-center lg:max-w-[54%] lg:text-right">
            <motion.span
              {...rise(0, { duration: 0.8 })}
              className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50/80 px-3 py-1 text-xs font-bold text-brand-700 backdrop-blur-sm"
            >
              نظام إدارة عيادة · عربي بالكامل
            </motion.span>

            <motion.h1
              {...rise(0.06)}
              className="mt-5 text-[1.6rem] font-medium leading-[1.16] text-ink sm:text-[2.2rem] lg:mt-6 lg:text-[3rem]"
            >
              <span className="block">عيادتك كلها بمكان واحد</span>
              <span className="block">
                من الحجز <span className="text-brand-600">لاضبارة الطبيب</span>
              </span>
            </motion.h1>

            <motion.p
              {...rise(0.14)}
              className="mx-auto mt-5 max-w-md text-[14px] leading-[1.75] text-ink-soft sm:text-[15px] lg:mx-0 lg:mt-6 lg:max-w-xl lg:text-base"
            >
              المريض يحجز بنفسه من رابط، الممرّضة تنظّم المواعيد، والطبيب يفتح اضبارة
              جاهزة لكل مريض. ويشتغل حتى والإنترنت مقطوع.
            </motion.p>

            <motion.div
              {...rise(0.22)}
              className="mt-7 flex flex-wrap items-center justify-center gap-4 lg:mt-8 lg:justify-start"
            >
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
              className="mt-8 hidden flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-ink-faint sm:flex lg:justify-start"
            >
              {TRUST.map(({ icon: Icon, text }) => (
                <li key={text} className="inline-flex items-center gap-1.5">
                  <Icon className="h-4 w-4 text-brand-600" />
                  {text}
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  )
}
