import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  User,
  ClipboardList,
  CalendarCheck,
  CalendarX2,
  CalendarDays,
  FolderOpen,
  Activity,
} from 'lucide-react'
import BookingScreen from './journey-screens/BookingScreen'
import NurseRequestScreen from './journey-screens/NurseRequestScreen'
import NurseDecisionScreen from './journey-screens/NurseDecisionScreen'
import DoctorProfileScreen from './journey-screens/DoctorProfileScreen'
import DoctorVisitScreen from './journey-screens/DoctorVisitScreen'
import DoctorCalendarScreen from './journey-screens/DoctorCalendarScreen'
import './journey-screens/screens.css'

const EASE = [0.16, 1, 0.3, 1]
const NUMS = ['٠١', '٠٢', '٠٣', '٠٤', '٠٥', '٠٦']

const STAGES = [
  {
    hat: 'المريض',
    icon: User,
    screen: <BookingScreen />,
    title: 'المريض يحجز موعده',
    body: 'يفتح رابط الحجز العام — بلا حساب — يختار اليوم والوقت ويؤكّد. الأوقات الماضية والأيام المغلقة لا تظهر أصلاً.',
  },
  {
    hat: 'الممرّضة',
    icon: ClipboardList,
    screen: <NurseRequestScreen />,
    title: 'الطلب يصل الممرّضة',
    body: 'يظهر عندها بحالة «قيد الانتظار» — لا يدخل الروزنامة تلقائياً. تتّصل، تقبل، أو تعتذر — القرار قرارها.',
  },
  {
    hat: 'الممرّضة',
    icon: CalendarCheck,
    branch: true,
    screenFn: (choice) => <NurseDecisionScreen choice={choice} />,
    title: 'تقبل الموعد أو تعتذر',
    body: 'اختر بنفسك لتشوف الفرعين:',
  },
  {
    hat: 'الممرّضة',
    icon: CalendarDays,
    screen: <DoctorCalendarScreen />,
    designW: 680,
    title: 'الموعد يتثبّت بالروزنامة',
    body: 'لمّا تقبل الممرّضة، الموعد يدخل روزنامة العيادة — يوم وأسبوع — ويصير جاهز ليوم الزيارة.',
  },
  {
    hat: 'الطبيب',
    icon: FolderOpen,
    screen: <DoctorProfileScreen />,
    title: 'الاضبارة تُفتح عند الطبيب',
    body: 'تسجيل الزيارة يفتح اضبارة المريض على شاشة الطبيب تلقائياً — معلوماته وأرشيف زياراته أمامه، بلا مناداة ولا ورق.',
  },
  {
    hat: 'الطبيب',
    icon: Activity,
    screen: <DoctorVisitScreen />,
    title: 'يعاين ويكتب — والحالة تُرسم',
    body: 'شكوى، فحص، تشخيص، وصفة، تحاليل، وحقول تخصّصه. كل زيارة تتراكم فتبني خطّاً زمنياً ومنحنى يوضّح تطوّر الحالة.',
  },
]

function BranchControls({ choice, setChoice }) {
  return (
    <div className="mt-3">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setChoice('accept')}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-bold transition-colors ${
            choice === 'accept'
              ? 'bg-brand-600 text-white'
              : 'border border-line bg-paper text-ink hover:border-brand-300'
          }`}
        >
          <CalendarCheck className="h-3.5 w-3.5" /> تقبل
        </button>
        <button
          type="button"
          onClick={() => setChoice('apologize')}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-bold transition-colors ${
            choice === 'apologize'
              ? 'bg-amber-500 text-white'
              : 'border border-line bg-paper text-ink hover:border-amber-300'
          }`}
        >
          <CalendarX2 className="h-3.5 w-3.5" /> تعتذر
        </button>
      </div>
      {choice && (
        <p className="mt-2 rounded-lg bg-canvas px-3 py-2 text-[12px] leading-relaxed text-ink-soft">
          {choice === 'accept'
            ? 'يتثبّت الموعد بالروزنامة، وتُرسل رسالة تأكيد للمريض عبر واتساب أو SMS بنصّ تعدّله العيادة.'
            : 'تُرسل رسالة اعتذار مع مواعيد تعويض بديلة تختارها الممرّضة من الروزنامة — والمريض يختار المناسب له.'}
        </p>
      )}
    </div>
  )
}

/* تُعرض شاشة التطبيق كاملة بإطارها الأصلي — تُصغَّر لعرض العمود بلا قصّ */
function ScreenFrame({ children, designW = 460 }) {
  const frameRef = useRef(null)
  const contentRef = useRef(null)
  const [scale, setScale] = useState(0.8)
  const [contentH, setContentH] = useState(0)

  useEffect(() => {
    const el = frameRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / designW))
    ro.observe(el)
    return () => ro.disconnect()
  }, [designW])

  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setContentH(el.offsetHeight))
    ro.observe(el)
    setContentH(el.offsetHeight)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={frameRef} className="relative" style={{ height: Math.round(contentH * scale) }}>
      <div
        ref={contentRef}
        className="dbx-screen"
        style={{
          width: designW,
          transform: `scale(${scale})`,
          transformOrigin: 'top right',
        }}
      >
        {children}
      </div>
    </div>
  )
}

/* نمط الكرت من hyperui/marketing/cards/1.html + سلّم الخطوط من نفس المكتبة */
function JourneyNote({ s, index, choice, setChoice, reduce }) {
  const Icon = s.icon
  const screenEl = s.screenFn ? s.screenFn(choice) : s.screen

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <div className="flex items-center gap-1.5 text-xs font-medium text-ink-faint">
        <Icon className="size-3.5" />
        <span>
          المحطّة {NUMS[index]} · {s.hat}
        </span>
      </div>

      <h3 className="mt-1 text-base font-semibold text-ink">{s.title}</h3>

      <div className="mt-3">
        <ScreenFrame designW={s.designW}>{screenEl}</ScreenFrame>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.body}</p>
      {s.branch && <BranchControls choice={choice} setChoice={setChoice} />}
    </motion.article>
  )
}

export default function PatientJourney() {
  const reduce = useReducedMotion()
  const [choice, setChoice] = useState(null)

  return (
    <section
      id="journey"
      className="scroll-mt-16 overflow-x-clip border-t border-line/70 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-2xl px-5 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
          كيف يعمل
        </span>
        <h2 className="mt-4 text-2xl text-ink sm:text-3xl">
          رحلة المريض — من الحجز لاضبارته عند الطبيب
        </h2>
        <p className="mt-3 text-sm text-ink-soft sm:text-base">
          نفس المسار اللي يمشيه كل مريض داخل DocBook — محطّة‑محطّة.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-4xl px-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {STAGES.map((s, i) => (
            <JourneyNote
              key={i}
              s={s}
              index={i}
              choice={choice}
              setChoice={setChoice}
              reduce={reduce}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
