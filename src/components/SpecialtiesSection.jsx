import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Activity } from 'lucide-react'
import illustration from '../assets/illustrations/specialties.webp'

const EASE = [0.16, 1, 0.3, 1]

const SPECIALTIES = [
  {
    key: 'نسائية',
    tool: 'متابعة الحمل',
    metric: 'عمر الحمل يُحسب تلقائياً من LMP',
    fixed: ['GPA', 'Gravida / Parity', 'الإسقاطات', 'القيصريات', 'موانع الحمل'],
    perVisit: ['LMP', 'EDD', 'Pap Smear', 'Echo'],
  },
  {
    key: 'أطفال',
    tool: 'مخطّط النمو',
    metric: 'الوزن والطول ومحيط الرأس على منحنى نموّ',
    fixed: ['الجنس', 'وزن الولادة', 'نوع الولادة', 'الإرضاع', 'اللقاحات', 'ولي الأمر'],
    perVisit: ['الوزن', 'الطول', 'محيط الرأس', 'التطوّر الروحي‑الحركي'],
  },
  {
    key: 'عيون',
    tool: 'متابعة البصر',
    metric: 'ضغط العين يُرسم فوق نطاق ١٠–٢١ mmHg، والعينان على منحنى واحد',
    fixed: ['سوابق جراحة عينية', 'عدسات لاصقة', 'تاريخ عائلي'],
    perVisit: ['حدّة الإبصار OD/OS', 'ضغط العين لكل عين', 'Sph/Cyl/Axis', 'قعر العين'],
  },
  {
    key: 'أسنان',
    tool: 'مخطّط الأسنان + التقويم',
    metric: 'رسم تفاعلي للأسنان بترقيم FDI، وحالة كل سنّ',
    fixed: ['حساسية أدوية'],
    perVisit: ['موقع/مدّة/شدّة الألم', 'اللثة', 'التسوّس', 'حركة الأسنان', 'الإجراءات'],
  },
  {
    key: 'قلبية',
    tool: 'سجلّ الفحوص القلبية',
    metric: 'ضغط الدم ونتائج الفحوص عبر الزمن',
    fixed: ['تاريخ أمراض القلب', 'الأدوية القلبية'],
    perVisit: ['ضغط الدم', 'ECG', 'Echo', 'اختبار الجهد'],
  },
  {
    key: 'باطنية',
    tool: 'مقارنة القياسات',
    metric: 'ضغط الدم وسكر الدم على منحنى مقارنة',
    fixed: ['عوامل الخطورة', 'الأمراض المزمنة'],
    perVisit: ['ضغط الدم', 'سكر الدم', 'نتائج مخبرية', 'نتائج شعاعية'],
  },
  {
    key: 'جلدية',
    tool: 'مقارنة القياسات',
    metric: 'تطوّر الآفة موثّق زيارة بزيارة',
    fixed: ['تاريخ جلدي', 'علاجات سابقة', 'التعرّض للشمس'],
    perVisit: ['وصف الآفة', 'توزّعها', 'شكلها', 'الحكّة'],
  },
  {
    key: 'عظمية',
    tool: 'مقارنة القياسات',
    metric: 'الوظيفة الحركية والألم عبر جلسات المتابعة',
    fixed: ['تاريخ الإصابات', 'العمليات العظمية'],
    perVisit: ['آلية الإصابة', 'وصف الألم', 'الوظيفة الحركية', 'العلاج الفيزيائي'],
  },
]

function ToolCard({ s }) {
  return (
    <div className="rounded-2xl border border-line bg-paper p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
          <Activity className="h-4 w-4" />
        </span>
        <div>
          <div className="text-[11px] font-bold text-ink-faint">الأداة السريرية · {s.key}</div>
          <div className="text-base font-extrabold text-ink">{s.tool}</div>
        </div>
      </div>

      <p className="mt-3 rounded-lg bg-brand-50/60 px-3 py-2 text-[13px] leading-relaxed text-brand-800">
        {s.metric}
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <div className="mb-1.5 text-[11px] font-bold text-ink-soft">خانات المريض (ثابتة)</div>
          <div className="flex flex-wrap gap-1.5">
            {s.fixed.map((f) => (
              <span
                key={f}
                className="rounded-md border border-line bg-canvas px-2 py-1 text-[11px] text-ink-soft"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-1.5 text-[11px] font-bold text-ink-soft">خانات الزيارة (تتكرّر)</div>
          <div className="flex flex-wrap gap-1.5">
            {s.perVisit.map((f) => (
              <span
                key={f}
                className="rounded-md border border-brand-200 bg-brand-50 px-2 py-1 text-[11px] font-medium text-brand-700"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SpecialtiesSection() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const s = SPECIALTIES[i]

  return (
    <section id="specialties" className="scroll-mt-16 border-t border-line/70 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
            التخصصات
          </span>
          <h2 className="mt-4 text-2xl text-ink sm:text-3xl">
            النظام يتقولب على تخصّصك — مش العكس
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
            ٨ تخصّصات، كل واحد بخاناته وأداته السريرية الجاهزة من أوّل دخول — قابلة
            للتعديل. اختر تخصّصاً لتشوف.
          </p>
        </div>

        <motion.img
          src={illustration}
          alt="ملف مريض واحد تتفرّع منه أدوات كل تخصّص — نمو، ضغط عين، أسنان، حمل، ضغط دم"
          className="mx-auto mt-10 w-full max-w-2xl"
          loading="lazy"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
        />

        {/* مبدّل التخصّص */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {SPECIALTIES.map((sp, idx) => (
            <button
              key={sp.key}
              type="button"
              onClick={() => setI(idx)}
              aria-pressed={idx === i}
              className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                idx === i
                  ? 'bg-brand-600 text-white'
                  : 'border border-line bg-paper text-ink-soft hover:border-brand-300 hover:text-brand-700'
              }`}
            >
              {sp.key}
            </button>
          ))}
        </div>

        {/* البطاقة */}
        <div className="mx-auto mt-8 max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={s.key}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <ToolCard s={s} />
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mt-6 text-center text-[13px] text-ink-faint">
          كمان: <span className="font-bold text-ink-soft">الأرشيف الجراحي</span> (يربط موعد
          العملية بالزيارة) متاح لأي تخصّص.
        </p>
      </div>
    </section>
  )
}
