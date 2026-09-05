import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import {
  User,
  ClipboardList,
  CalendarCheck,
  CalendarX2,
  CalendarDays,
  FolderOpen,
  Activity,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react'
import BookingScreen from './journey-screens/BookingScreen'
import './journey-screens/screens.css'
import requestImg from '../assets/journey/request.webp'
import acceptImg from '../assets/journey/accept.webp'
import apologizeImg from '../assets/journey/apologize.webp'
import calendarImg from '../assets/journey/calendar.webp'
import chartImg from '../assets/journey/chart.webp'
import visitImg from '../assets/journey/visit.webp'

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
    img: requestImg,
    title: 'الطلب يصل الممرّضة',
    body: 'يظهر عندها بحالة «قيد الانتظار» — لا يدخل الروزنامة تلقائياً. تتّصل، تقبل، أو تعتذر — القرار قرارها.',
  },
  {
    hat: 'الممرّضة',
    icon: CalendarCheck,
    branch: true,
    title: 'تقبل الموعد أو تعتذر',
    body: 'اختر بنفسك لتشوف الفرعين:',
  },
  {
    hat: 'الممرّضة',
    icon: CalendarDays,
    img: calendarImg,
    title: 'الموعد يتثبّت بالروزنامة',
    body: 'لمّا تقبل الممرّضة، الموعد يدخل روزنامة العيادة — يوم وأسبوع — ويصير جاهز ليوم الزيارة.',
  },
  {
    hat: 'الطبيب',
    icon: FolderOpen,
    img: chartImg,
    title: 'الاضبارة تُفتح عند الطبيب',
    body: 'تسجيل الزيارة يفتح اضبارة المريض على شاشة الطبيب تلقائياً — معلوماته وأرشيف زياراته أمامه، بلا مناداة ولا ورق.',
  },
  {
    hat: 'الطبيب',
    icon: Activity,
    img: visitImg,
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
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-bold transition-all active:scale-95 ${
            choice === 'accept'
              ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/25'
              : 'border border-line bg-paper text-ink hover:border-brand-300'
          }`}
        >
          <CalendarCheck className="h-3.5 w-3.5" /> تقبل
        </button>
        <button
          type="button"
          onClick={() => setChoice('apologize')}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-bold transition-all active:scale-95 ${
            choice === 'apologize'
              ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/25'
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

function ScreenFrame({ children, designW = 460, clipH = 470 }) {
  const ref = useRef(null)
  const [scale, setScale] = useState(0.74)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / designW))
    ro.observe(el)
    return () => ro.disconnect()
  }, [designW])

  return (
    <div
      ref={ref}
      className="relative overflow-hidden bg-white"
      style={{ height: Math.round(clipH * scale) }}
    >
      <div
        className="dbx-screen"
        style={{
          width: designW,
          padding: '18px 20px 0',
          transform: `scale(${scale})`,
          transformOrigin: 'top right',
        }}
      >
        {children}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent" />
    </div>
  )
}

function JourneyCard({ s, index, active, choice, setChoice }) {
  const Icon = s.icon
  const img = s.branch ? (choice === 'apologize' ? apologizeImg : acceptImg) : s.img

  return (
    <div
      className={`flex h-full flex-col overflow-hidden rounded-2xl border bg-paper transition-all duration-300 ${
        active
          ? 'border-brand-200 shadow-lg shadow-brand-600/10'
          : 'border-line shadow-sm shadow-slate-200/50'
      }`}
    >
      <div className="border-b border-line bg-canvas">
        {s.screen ? (
          <ScreenFrame>{s.screen}</ScreenFrame>
        ) : (
          <img
            src={img}
            alt={s.title}
            loading="lazy"
            className="aspect-[16/10] w-full object-contain"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-600 text-white">
            <Icon className="h-4 w-4" />
          </span>
          <div className="text-[11px] font-bold text-ink-faint">
            {s.hat} · المحطّة {index + 1}
          </div>
        </div>

        <h3 className="mt-3 text-lg font-extrabold text-ink">{s.title}</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{s.body}</p>

        {s.branch && <BranchControls choice={choice} setChoice={setChoice} />}
      </div>
    </div>
  )
}

export default function PatientJourney() {
  const reduce = useReducedMotion()
  const scroller = useRef(null)
  const slides = useRef([])
  const [step, setStep] = useState(0)
  const [choice, setChoice] = useState(null)

  const syncStep = useCallback(() => {
    const box = scroller.current
    if (!box) return
    const center = box.getBoundingClientRect().left + box.clientWidth / 2
    let best = 0
    let min = Infinity
    slides.current.forEach((el, i) => {
      if (!el) return
      const r = el.getBoundingClientRect()
      const d = Math.abs(r.left + r.width / 2 - center)
      if (d < min) {
        min = d
        best = i
      }
    })
    setStep(best)
  }, [])

  useEffect(() => {
    const box = scroller.current
    if (!box) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(syncStep)
    }
    box.addEventListener('scroll', onScroll, { passive: true })
    syncStep()
    return () => {
      box.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [syncStep])

  const goTo = (i) => {
    const n = Math.max(0, Math.min(STAGES.length - 1, i))
    setStep(n)
    slides.current[n]?.scrollIntoView({
      behavior: reduce ? 'auto' : 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      goTo(step + 1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      goTo(step - 1)
    }
  }

  return (
    <section
      id="journey"
      className="scroll-mt-16 overflow-x-clip border-t border-line/70 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
            كيف يعمل
          </span>
          <h2 className="mt-4 text-2xl text-ink sm:text-3xl">
            رحلة المريض — من الحجز لاضبارته عند الطبيب
          </h2>
          <p className="mt-3 text-sm text-ink-soft sm:text-base">
            نفس المسار اللي يمشيه كل مريض داخل DocBook. اسحب أو استخدم الأسهم لتشوفه
            محطّة‑محطّة.
          </p>
        </div>

        <div
          ref={scroller}
          tabIndex={0}
          onKeyDown={onKeyDown}
          role="group"
          aria-roledescription="carousel"
          aria-label="رحلة المريض"
          className="mt-10 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto pb-3 outline-none [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-brand-400 [&::-webkit-scrollbar]:hidden"
        >
          {STAGES.map((s, i) => (
            <article
              key={i}
              ref={(el) => (slides.current[i] = el)}
              aria-roledescription="slide"
              aria-label={`المحطّة ${i + 1} من ${STAGES.length}`}
              className={`w-[86%] shrink-0 snap-center transition-all duration-500 sm:w-[340px] lg:w-[370px] ${
                i === step ? 'blur-0 opacity-100' : 'scale-[0.92] opacity-50 blur-[3px]'
              }`}
            >
              <JourneyCard
                s={s}
                index={i}
                active={i === step}
                choice={choice}
                setChoice={setChoice}
              />
            </article>
          ))}
        </div>

        {/* أدوات التنقّل */}
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => goTo(step - 1)}
            disabled={step === 0}
            aria-label="المحطّة السابقة"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-paper text-ink shadow-sm shadow-slate-200/50 transition-all duration-200 hover:border-brand-300 hover:text-brand-700 hover:shadow-md active:scale-90 disabled:opacity-40 disabled:hover:shadow-sm"
          >
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-0.5">
            {STAGES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`اذهب للمحطّة ${i + 1}`}
                aria-current={i === step}
                className="group grid h-9 place-items-center px-1.5"
              >
                <span
                  className={`block h-2 rounded-full transition-all duration-300 ${
                    i === step ? 'w-6 bg-brand-600' : 'w-2 bg-line group-hover:bg-brand-300'
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(step + 1)}
            disabled={step === STAGES.length - 1}
            aria-label="المحطّة التالية"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-paper text-ink shadow-sm shadow-slate-200/50 transition-all duration-200 hover:border-brand-300 hover:text-brand-700 hover:shadow-md active:scale-90 disabled:opacity-40 disabled:hover:shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
