import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  User,
  ClipboardList,
  CalendarCheck,
  CalendarX2,
  DoorOpen,
  FolderOpen,
  Activity,
  Check,
} from 'lucide-react'
import mark from '../assets/brand/docbook-mark.png'

const EASE = [0.16, 1, 0.3, 1]

/* ————————————————————————————————————————————
   الشاشات — موك خفيف مبني بالكود (تُستبدل بلقطات حقيقية لاحقاً)
———————————————————————————————————————————— */

function Frame({ label, children }) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-line bg-paper shadow-2xl shadow-slate-300/40 ring-1 ring-black/[0.03]">
      <div className="flex items-center gap-2 border-b border-line px-3 py-2.5">
        <img src={mark} alt="" className="h-5 w-5 rounded-md" />
        <span className="text-[11px] font-bold text-ink-soft">{label}</span>
        <span className="ms-auto flex gap-1">
          <i className="h-1.5 w-1.5 rounded-full bg-slate-200" />
          <i className="h-1.5 w-1.5 rounded-full bg-slate-200" />
          <i className="h-1.5 w-1.5 rounded-full bg-slate-200" />
        </span>
      </div>
      <div className="min-h-[200px] p-4">{children}</div>
    </div>
  )
}

function BookingScreen() {
  const slots = ['٩:٠٠', '٩:٣٠', '١٠:٠٠', '١٠:٣٠', '١١:٠٠', '١١:٣٠', '١٢:٠٠', '١٢:٣٠']
  return (
    <Frame label="صفحة الحجز — عامّة">
      <div className="space-y-3">
        <div className="text-sm font-extrabold text-ink">احجز موعدك</div>
        <div className="h-9 rounded-lg border border-line bg-canvas px-3 text-[11px] leading-9 text-ink-faint">
          الاسم الكامل
        </div>
        <div className="h-9 rounded-lg border border-line bg-canvas px-3 text-[11px] leading-9 text-ink-faint">
          رقم الهاتف
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {slots.map((t, i) => (
            <span
              key={t}
              className={`rounded-md border px-1 py-1.5 text-center text-[10px] ${
                i === 3
                  ? 'border-brand-500 bg-brand-50 font-bold text-brand-700'
                  : i < 2
                    ? 'border-line text-ink-faint line-through'
                    : 'border-line text-ink-soft'
              }`}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="rounded-lg bg-brand-600 py-2 text-center text-[11px] font-bold text-white">
          تأكيد الحجز
        </div>
      </div>
    </Frame>
  )
}

function RequestScreen() {
  return (
    <Frame label="لوحة الممرّضة">
      <div className="space-y-2">
        <div className="text-[11px] font-bold text-ink-soft">طلبات حجز جديدة · ١</div>
        <div className="rounded-xl border border-line p-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-extrabold text-ink">سارة ح.</div>
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
              قيد الانتظار
            </span>
          </div>
          <div className="mt-1 text-[10px] text-ink-faint">الأربعاء · ١٠:٣٠ ص · مراجعة</div>
        </div>
      </div>
    </Frame>
  )
}

function DecideScreen({ choice }) {
  return (
    <Frame label="لوحة الممرّضة">
      <div
        className={`rounded-xl border p-3 transition-colors ${
          choice === 'accept'
            ? 'border-emerald-300 bg-emerald-50/40'
            : choice === 'apologize'
              ? 'border-amber-300 bg-amber-50/40'
              : 'border-line'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="text-xs font-extrabold text-ink">سارة ح.</div>
          {choice === 'accept' && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
              <Check className="h-3 w-3" /> مؤكّد
            </span>
          )}
          {choice === 'apologize' && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
              اعتذار
            </span>
          )}
          {!choice && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-ink-faint">
              بانتظار القرار
            </span>
          )}
        </div>
        <div className="mt-1 text-[10px] text-ink-faint">الأربعاء · ١٠:٣٠ ص</div>

        {choice === 'accept' && (
          <div className="mt-2 rounded-lg bg-white/70 px-2 py-1.5 text-[10px] text-emerald-800">
            أُرسلت رسالة تأكيد للمريض عبر واتساب
          </div>
        )}
        {choice === 'apologize' && (
          <div className="mt-2 space-y-1">
            <div className="text-[10px] text-amber-800">مواعيد تعويض أُرسلت للمريض:</div>
            <div className="flex flex-wrap gap-1">
              {['الخميس ٩:٣٠', 'الخميس ١١:٠٠', 'الأحد ١٠:٠٠'].map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-amber-200 bg-white px-1.5 py-1 text-[9px] font-medium text-amber-800"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
        {!choice && (
          <div className="mt-2 flex gap-2">
            <span className="flex-1 rounded-md bg-brand-600 py-1.5 text-center text-[10px] font-bold text-white">
              تقبل
            </span>
            <span className="flex-1 rounded-md border border-line py-1.5 text-center text-[10px] font-bold text-ink-soft">
              تعتذر
            </span>
          </div>
        )}
      </div>
    </Frame>
  )
}

function ReceiveScreen() {
  return (
    <Frame label="لوحة الممرّضة — اليوم">
      <div className="space-y-2">
        <div className="text-[11px] font-bold text-ink-soft">مواعيد اليوم</div>
        <div className="flex items-center justify-between rounded-xl border border-line p-3">
          <div>
            <div className="text-xs font-extrabold text-ink">سارة ح.</div>
            <div className="mt-0.5 text-[10px] text-ink-faint">١٠:٣٠ ص · مراجعة</div>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
            حاضرة
          </span>
        </div>
        <div className="inline-flex items-center gap-1 rounded-lg bg-brand-600 px-3 py-2 text-[11px] font-bold text-white">
          <Check className="h-3.5 w-3.5" /> تسجيل الزيارة
        </div>
      </div>
    </Frame>
  )
}

function HandoffScreen({ reduce }) {
  return (
    <Frame label="لوحة الطبيب">
      <div className="relative min-h-[136px]">
        <div className="space-y-2 opacity-40">
          <div className="h-3 w-24 rounded bg-slate-200" />
          <div className="flex gap-1.5">
            <div className="h-5 w-14 rounded bg-slate-100" />
            <div className="h-5 w-14 rounded bg-slate-100" />
            <div className="h-5 w-14 rounded bg-slate-100" />
          </div>
          <div className="h-16 rounded-lg bg-slate-100" />
        </div>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
          className="absolute inset-x-0 top-6 mx-auto flex w-[92%] items-center gap-2 rounded-xl border border-brand-200 bg-white p-3 shadow-lg shadow-brand-600/10"
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            {!reduce && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
            )}
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-600" />
          </span>
          <div className="text-[11px] leading-tight">
            <span className="font-extrabold text-ink">اضبارة سارة ح.</span>
            <span className="text-ink-faint"> — فُتحت الآن تلقائياً</span>
          </div>
        </motion.div>
      </div>
    </Frame>
  )
}

function ChartScreen({ reduce }) {
  return (
    <Frame label="لوحة الطبيب — الاضبارة">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-sm font-extrabold text-ink">سارة ح. · ٣٤ سنة</div>
          <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700">
            زيارة اليوم
          </span>
        </div>
        <div className="flex gap-1.5">
          {['زمرة الدم +A', 'ضغط مزمن', '٨ زيارات'].map((t) => (
            <span
              key={t}
              className="rounded-lg border border-line bg-canvas px-2 py-1 text-[10px] font-medium text-ink-soft"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="rounded-xl border border-line bg-canvas p-3">
          <div className="mb-1 text-[10px] font-bold text-ink-soft">منحنى الضغط الانقباضي</div>
          <svg viewBox="0 0 200 60" className="w-full" preserveAspectRatio="none">
            <rect x="0" y="18" width="200" height="22" fill="#0d9488" opacity="0.08" />
            <polyline
              points="8,40 46,34 84,42 122,30 160,34 190,24"
              fill="none"
              stroke="#0d9488"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {[
              [8, 40],
              [84, 42],
              [160, 34],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="2.6" fill="#0d9488" />
            ))}
            <motion.circle
              cx={190}
              cy={24}
              r="4"
              fill="#0d9488"
              initial={reduce ? false : { scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
              style={{ transformOrigin: '190px 24px' }}
            />
          </svg>
          <div className="mt-1 text-[9px] text-brand-700">+ نقطة جديدة من زيارة اليوم</div>
        </div>
      </div>
    </Frame>
  )
}

function Screen({ step, choice, reduce }) {
  switch (step) {
    case 0:
      return <BookingScreen />
    case 1:
      return <RequestScreen />
    case 2:
      return <DecideScreen choice={choice} />
    case 3:
      return <ReceiveScreen />
    case 4:
      return <HandoffScreen reduce={reduce} />
    default:
      return <ChartScreen reduce={reduce} />
  }
}

function BranchButtons({ choice, setChoice }) {
  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setChoice('accept')}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-bold transition-all active:scale-95 ${
            choice === 'accept'
              ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/25'
              : 'border border-line bg-paper text-ink hover:border-brand-300'
          }`}
        >
          <CalendarCheck className="h-4 w-4" /> تقبل الموعد
        </button>
        <button
          type="button"
          onClick={() => setChoice('apologize')}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-bold transition-all active:scale-95 ${
            choice === 'apologize'
              ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/25'
              : 'border border-line bg-paper text-ink hover:border-amber-300'
          }`}
        >
          <CalendarX2 className="h-4 w-4" /> تعتذر + مواعيد تعويض
        </button>
      </div>
      {choice && (
        <p className="mt-3 rounded-lg bg-canvas px-3 py-2 text-[13px] leading-relaxed text-ink-soft">
          {choice === 'accept'
            ? 'يتثبّت الموعد بالروزنامة، وتُرسل رسالة تأكيد للمريض عبر واتساب أو SMS بنصّ تعدّله العيادة.'
            : 'تُرسل رسالة اعتذار مع مواعيد تعويض بديلة تختارها الممرّضة من الروزنامة — والمريض يختار المناسب له.'}
        </p>
      )}
    </div>
  )
}

/* ————————————————————————————————————————————
   قسم مع موك متراكب — منقول من البرومت (section-with-mockup) بهوية DocBook
———————————————————————————————————————————— */

function SectionWithMockup({ hat, HatIcon, station, title, description, branch, reverseLayout, children }) {
  const reduce = useReducedMotion()

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  }
  const itemVariants = reduce
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
      }

  const layoutClasses = reverseLayout
    ? 'md:grid-cols-2 md:grid-flow-col-dense'
    : 'md:grid-cols-2'
  const textOrderClass = reverseLayout ? 'md:col-start-2' : ''
  const imageOrderClass = reverseLayout ? 'md:col-start-1' : ''

  return (
    <div className="relative py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1120px] px-6 md:px-10">
        <motion.div
          className={`grid grid-cols-1 items-center gap-14 md:gap-10 ${layoutClasses}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* النص */}
          <motion.div
            className={`mx-auto flex w-full max-w-[520px] flex-col items-start gap-4 md:mx-0 ${textOrderClass}`}
            variants={itemVariants}
          >
            <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1 text-[11px] font-bold text-white">
              <HatIcon className="h-3.5 w-3.5" />
              {hat} · المحطّة {station}
            </div>
            <h2 className="text-2xl font-semibold leading-tight text-ink md:text-[34px] md:leading-[1.2]">
              {title}
            </h2>
            <p className="text-sm leading-6 text-ink-soft md:text-[15px]">{description}</p>
            {branch}
          </motion.div>

          {/* الموك المتراكب */}
          <motion.div
            className={`relative mx-auto w-full max-w-[300px] md:max-w-[430px] ${imageOrderClass}`}
            variants={itemVariants}
          >
            {/* الطبقة الخلفية الزخرفية */}
            <motion.div
              aria-hidden
              className="absolute h-full w-full rounded-[32px] bg-gradient-to-br from-brand-100 to-brand-50 blur-[2px]"
              style={{
                zIndex: 0,
                top: reverseLayout ? 'auto' : '8%',
                bottom: reverseLayout ? '8%' : 'auto',
                left: reverseLayout ? 'auto' : '-14%',
                right: reverseLayout ? '-14%' : 'auto',
              }}
              initial={reduce ? false : { y: 0 }}
              whileInView={reduce ? {} : { y: reverseLayout ? -18 : -26 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.5 }}
            />

            {/* البطاقة الرئيسية */}
            <motion.div
              className="relative z-10"
              initial={reduce ? false : { y: 0 }}
              whileInView={reduce ? {} : { y: reverseLayout ? 18 : 26 }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* خط متدرّج سفلي */}
      <div
        className="absolute bottom-0 left-0 z-0 h-px w-full"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(15,118,110,0.18) 0%, rgba(15,118,110,0) 100%)',
        }}
      />
    </div>
  )
}

/* ———————————————————————————————————————————— */

const STAGES = [
  {
    hat: 'المريض',
    icon: User,
    title: 'المريض يحجز موعده',
    body: 'يفتح رابط الحجز العام — بلا حساب — يختار اليوم والوقت ويؤكّد. الأوقات الماضية والأيام المغلقة لا تظهر أصلاً.',
  },
  {
    hat: 'الممرّضة',
    icon: ClipboardList,
    title: 'الطلب يصل الممرّضة',
    body: 'يظهر عندها بحالة «قيد الانتظار» — لا يدخل الروزنامة تلقائياً. القرار قرارها.',
  },
  {
    hat: 'الممرّضة',
    icon: CalendarCheck,
    title: 'تقبل الموعد أو تعتذر',
    body: 'اختر بنفسك لتشوف الفرعين:',
    branch: true,
  },
  {
    hat: 'الممرّضة',
    icon: DoorOpen,
    title: 'يوم الموعد — تستقبل المريض',
    body: 'تسجّل حضوره وتضغط «تسجيل الزيارة» لتسلّمه للطبيب.',
  },
  {
    hat: 'الطبيب',
    icon: FolderOpen,
    title: 'الاضبارة تُفتح عند الطبيب',
    body: 'لحظة ما تسجّل الممرّضة الزيارة، تنفتح اضبارة المريض على شاشة الطبيب تلقائياً — بلا مناداة ولا ورق.',
  },
  {
    hat: 'الطبيب',
    icon: Activity,
    title: 'يعاين ويكتب — والحالة تُرسم',
    body: 'شكوى، فحص، تشخيص، وصفة، تحاليل. كل زيارة تتراكم فتبني خطّاً زمنياً ومنحنى يوضّح تطوّر الحالة بنظرة.',
  },
]

export default function PatientJourney() {
  const reduce = useReducedMotion()
  const [choice, setChoice] = useState(null)

  return (
    <section id="journey" className="scroll-mt-16 overflow-x-clip border-t border-line/70 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
          كيف يعمل
        </span>
        <h2 className="mt-4 text-2xl text-ink sm:text-3xl">
          رحلة المريض — من الحجز لاضبارته عند الطبيب
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
          نفس المسار اللي يمشيه كل مريض داخل DocBook — محطّة محطّة.
        </p>
      </div>

      <div className="mt-6">
        {STAGES.map((s, i) => (
          <SectionWithMockup
            key={i}
            hat={s.hat}
            HatIcon={s.icon}
            station={i + 1}
            title={s.title}
            description={s.body}
            reverseLayout={i % 2 === 1}
            branch={s.branch ? <BranchButtons choice={choice} setChoice={setChoice} /> : null}
          >
            <Screen step={i} choice={choice} reduce={reduce} />
          </SectionWithMockup>
        ))}
      </div>
    </section>
  )
}
