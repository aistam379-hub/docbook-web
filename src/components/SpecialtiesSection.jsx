import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Activity,
  Flower2,
  Baby,
  Eye,
  Smile,
  HeartPulse,
  Stethoscope,
  Hand,
  Bone,
} from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1]

const SPECIALTIES = [
  {
    key: 'نسائية',
    icon: Flower2,
    tool: 'متابعة الحمل',
    metric: 'عمر الحمل يُحسب تلقائياً من LMP',
    fixed: ['GPA', 'Gravida / Parity', 'الإسقاطات', 'القيصريات', 'موانع الحمل'],
    perVisit: ['LMP', 'EDD', 'Pap Smear', 'Echo'],
  },
  {
    key: 'أطفال',
    icon: Baby,
    tool: 'مخطّط النمو',
    metric: 'الوزن والطول ومحيط الرأس على منحنى نموّ',
    fixed: ['الجنس', 'وزن الولادة', 'نوع الولادة', 'الإرضاع', 'اللقاحات', 'ولي الأمر'],
    perVisit: ['الوزن', 'الطول', 'محيط الرأس', 'التطوّر الروحي‑الحركي'],
  },
  {
    key: 'عيون',
    icon: Eye,
    tool: 'متابعة البصر',
    metric: 'ضغط العين يُرسم فوق نطاق ١٠–٢١ mmHg، والعينان على منحنى واحد',
    fixed: ['سوابق جراحة عينية', 'عدسات لاصقة', 'تاريخ عائلي'],
    perVisit: ['حدّة الإبصار OD/OS', 'ضغط العين لكل عين', 'Sph/Cyl/Axis', 'قعر العين'],
  },
  {
    key: 'أسنان',
    icon: Smile,
    tool: 'مخطّط الأسنان + التقويم',
    metric: 'رسم تفاعلي للأسنان بترقيم FDI، وحالة كل سنّ',
    fixed: ['حساسية أدوية'],
    perVisit: ['موقع/مدّة/شدّة الألم', 'اللثة', 'التسوّس', 'حركة الأسنان', 'الإجراءات'],
  },
  {
    key: 'قلبية',
    icon: HeartPulse,
    tool: 'سجلّ الفحوص القلبية',
    metric: 'ضغط الدم ونتائج الفحوص عبر الزمن',
    fixed: ['تاريخ أمراض القلب', 'الأدوية القلبية'],
    perVisit: ['ضغط الدم', 'ECG', 'Echo', 'اختبار الجهد'],
  },
  {
    key: 'باطنية',
    icon: Stethoscope,
    tool: 'مقارنة القياسات',
    metric: 'ضغط الدم وسكر الدم على منحنى مقارنة',
    fixed: ['عوامل الخطورة', 'الأمراض المزمنة'],
    perVisit: ['ضغط الدم', 'سكر الدم', 'نتائج مخبرية', 'نتائج شعاعية'],
  },
  {
    key: 'جلدية',
    icon: Hand,
    tool: 'مقارنة القياسات',
    metric: 'تطوّر الآفة موثّق زيارة بزيارة',
    fixed: ['تاريخ جلدي', 'علاجات سابقة', 'التعرّض للشمس'],
    perVisit: ['وصف الآفة', 'توزّعها', 'شكلها', 'الحكّة'],
  },
  {
    key: 'عظمية',
    icon: Bone,
    tool: 'مقارنة القياسات',
    metric: 'الوظيفة الحركية والألم عبر جلسات المتابعة',
    fixed: ['تاريخ الإصابات', 'العمليات العظمية'],
    perVisit: ['آلية الإصابة', 'وصف الألم', 'الوظيفة الحركية', 'العلاج الفيزيائي'],
  },
]

function ToolCard({ s }) {
  return (
    <div className="group rounded-2xl border border-line bg-paper p-5 shadow-sm shadow-slate-200/40 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-600/10">
      <div className="flex items-center gap-2">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white">
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

  const rows = [
    { start: 0, items: SPECIALTIES.slice(0, 3) },
    { start: 3, items: SPECIALTIES.slice(3, 5) },
    { start: 5, items: SPECIALTIES.slice(5, 8) },
  ]

  return (
    <section id="specialties" className="scroll-mt-16 border-t border-line/70 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* النص */}
          <div className="text-center lg:text-right">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
              التخصصات
            </span>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">
              النظام يتقولب على تخصّصك — مش العكس
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
              ٨ تخصّصات، كل واحد بخاناته وأداته السريرية الجاهزة من أوّل دخول — قابلة
              للتعديل. اختر تخصّصاً لتشوف تفاصيله.
            </p>
          </div>

          {/* عنقود التخصصات */}
          <div className="mx-auto w-fit" role="group" aria-label="اختيار التخصّص">
            {rows.map((row, r) => (
              <div
                key={r}
                className={`flex justify-center gap-2 sm:gap-3 ${r > 0 ? 'mt-2 sm:mt-3' : ''}`}
              >
                {row.items.map((sp, k) => {
                  const idx = row.start + k
                  const Icon = sp.icon
                  const active = idx === i
                  return (
                    <button
                      key={sp.key}
                      type="button"
                      onClick={() => setI(idx)}
                      aria-pressed={active}
                      className={`group flex size-[72px] flex-col items-center justify-center gap-1 rounded-xl border transition-all duration-300 sm:size-20 ${
                        active
                          ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-md shadow-brand-600/15'
                          : 'border-line bg-paper text-ink-soft hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700 hover:shadow-sm'
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 transition-transform duration-300 ${
                          active ? '' : 'group-hover:scale-110'
                        }`}
                        strokeWidth={2}
                      />
                      <span className="text-[10px] font-bold leading-none">{sp.key}</span>
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* البطاقة */}
        <div className="mx-auto mt-10 max-w-2xl">
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
