import { motion, useReducedMotion } from 'framer-motion'
import { CalendarDays, FileText, Activity, Search, Printer, SlidersHorizontal } from 'lucide-react'
import mark from '../assets/brand/docbook-mark.png'

const EASE = [0.16, 1, 0.3, 1]

const POINTS = [
  {
    icon: CalendarDays,
    title: 'روزنامتك — يوم وأسبوع',
    body: 'جدولك ومواعيد اليوم أمامك، وتضيف موعداً يدوياً بنفسك وقت الحاجة. المواعيد المؤكّدة فقط تدخل هون.',
  },
  {
    icon: FileText,
    title: 'اضبارة كاملة + خطّ زمني',
    body: 'شكوى، فحص، تشخيص، وصفة، تحاليل، أشعة — كل زيارة موثّقة ومؤرّخة، ومرتّبة زمنياً تشوف تطوّر الحالة بنظرة.',
  },
  {
    icon: Activity,
    title: 'الأداة السريرية المرسومة',
    body: 'الأرقام لا تُخزَّن فقط — تُرسم عبر الزمن فوق نطاق مرجعي ملوّن (نمو، ضغط، سكر، ضغط العين...) حسب تخصّصك.',
  },
  {
    icon: Search,
    title: 'دفتر مرضى ذكي',
    body: 'بحث بأي جزء من الاسم أو الرقم — لا البادئة فقط — والمرضى مرتّبون من الأحدث زيارةً.',
  },
  {
    icon: Printer,
    title: 'طباعة وإرسال',
    body: 'الوصفة والاضبارة PDF بضغطة، وإرسال الوصفة/التحاليل/الأشعة للصيدلية أو المخبر عبر واتساب من دفتر جهاتك.',
  },
  {
    icon: SlidersHorizontal,
    title: 'اضبارة تخصّصها بنفسك',
    body: 'خانات ثابتة للمريض، وخانات تتكرّر كل زيارة ويُحفظ لكلٍّ تاريخها. قالب جاهز حسب تخصّصك، قابل للتعديل.',
  },
]

function ChartMock() {
  const visits = [
    ['١٢ آب', 'ضغط ١٣٥/٨٥ — تعديل الجرعة'],
    ['٤ تموز', 'تحاليل دم — ضمن الطبيعي'],
    ['١٨ أيار', 'مراجعة — الأعراض تحسّنت'],
    ['٢ نيسان', 'كشف جديد — بدء العلاج'],
  ]
  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-line bg-paper shadow-xl shadow-slate-200/60">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <img src={mark} alt="" className="h-6 w-6 rounded-md" />
        <div className="text-[11px] font-bold text-ink-soft">لوحة الطبيب — الاضبارة</div>
      </div>

      <div className="flex items-center justify-between border-b border-line bg-canvas/60 px-4 py-2 text-[10px] text-ink-faint">
        <span className="font-bold text-ink-soft">روزنامة اليوم</span>
        <span>٦ مواعيد · التالي ١١:٠٠ ص</span>
      </div>

      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-extrabold text-ink">سارة الأحمد · ٣٤ سنة</div>
          <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700">
            ٩ زيارات
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {['زمرة الدم +A', 'ارتفاع ضغط', 'حساسية بنسلين'].map((t) => (
            <span
              key={t}
              className="rounded-lg border border-line bg-canvas px-2 py-1 text-[10px] font-medium text-ink-soft"
            >
              {t}
            </span>
          ))}
        </div>

        {/* المنحنى */}
        <div className="rounded-xl border border-line bg-canvas p-3">
          <div className="mb-1 text-[10px] font-bold text-ink-soft">الضغط الانقباضي عبر الزيارات</div>
          <svg viewBox="0 0 220 64" className="w-full" preserveAspectRatio="none">
            <rect x="0" y="20" width="220" height="20" fill="#0d9488" opacity="0.09" />
            <text x="4" y="14" fontSize="7" fill="#94a3b8">١٦٠</text>
            <text x="4" y="52" fontSize="7" fill="#94a3b8">١١٠</text>
            <polyline
              points="24,48 66,38 108,44 150,30 192,26 212,24"
              fill="none"
              stroke="#0d9488"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {[
              [24, 48],
              [66, 38],
              [108, 44],
              [150, 30],
              [192, 26],
              [212, 24],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="2.6" fill="#0d9488" />
            ))}
          </svg>
        </div>

        {/* الخط الزمني */}
        <div>
          <div className="mb-2 text-[10px] font-bold text-ink-soft">الزيارات</div>
          <div className="space-y-2">
            {visits.map(([d, t], i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-500" />
                <div className="text-[11px] leading-tight">
                  <span className="font-bold text-ink">{d}</span>
                  <span className="text-ink-faint"> — {t}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DoctorSection() {
  const reduce = useReducedMotion()

  const list = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.07 } },
  }
  const item = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
      }

  return (
    <section id="doctor" className="scroll-mt-16 border-t border-line/70 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* النص — يمين */}
          <motion.div
            variants={list}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.span
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700"
            >
              الطبيب
            </motion.span>

            <motion.h2 variants={item} className="mt-4 text-2xl text-ink sm:text-3xl">
              لوحة الطبيب — اضبارة جاهزة، وحالة مرسومة
            </motion.h2>

            <motion.p
              variants={item}
              className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base"
            >
              تفتح شاشتك فتلاقي اضبارة المريض مفتوحة أمامك. تكتب زيارتك، والنظام يبني
              السجلّ الزمني ويرسم تطوّر الحالة — إنت بس تعاين.
            </motion.p>

            <ul className="mt-6 space-y-3">
              {POINTS.map(({ icon: Icon, title, body }) => (
                <motion.li key={title} variants={item} className="flex gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <div>
                    <div className="text-sm font-extrabold text-ink">{title}</div>
                    <div className="mt-0.5 text-[13px] leading-relaxed text-ink-soft">
                      {body}
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* اللقطة — يسار */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <ChartMock />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
