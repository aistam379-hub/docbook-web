import { motion, useReducedMotion } from 'framer-motion'
import { Link2, Clock, CalendarOff, Inbox, BellRing } from 'lucide-react'
import mark from '../assets/brand/docbook-mark.png'

const EASE = [0.16, 1, 0.3, 1]

const POINTS = [
  {
    icon: Link2,
    title: 'رابط عام — بلا حساب',
    body: 'المريض يفتح الرابط، يكتب اسمه ورقمه، يختار موعد، ويؤكّد. لا تسجيل ولا تطبيق.',
  },
  {
    icon: Clock,
    title: 'الأوقات الماضية تُقفل لحالها',
    body: 'حسب توقيت المنطقة — ما يقدر أحد يحجز وقتاً فات من اليوم الحالي.',
  },
  {
    icon: CalendarOff,
    title: 'الأيام المغلقة لا تظهر',
    body: 'العطل والإجازات التي يحدّدها الطبيب مخفيّة أصلاً عن صفحة الحجز.',
  },
  {
    icon: Inbox,
    title: 'الطلب يصل الممرّضة',
    body: 'لا يدخل الروزنامة تلقائياً — الممرّضة تؤكّده أو تعتذر مع مواعيد بديلة.',
  },
  {
    icon: BellRing,
    title: 'تذكير تلقائي للمريض',
    body: 'الممرّضة تُرسل تذكير الموعد عبر واتساب أو SMS بنصّ تعدّله العيادة.',
  },
]

function BookingMock() {
  const days = [
    ['السبت', '٦'],
    ['الأحد', '٧'],
    ['الاثنين', '٨'],
    ['الثلاثاء', '٩'],
    ['الأربعاء', '١٠'],
  ]
  const slots = ['٩:٠٠', '٩:٣٠', '١٠:٠٠', '١٠:٣٠', '١١:٠٠', '١١:٣٠']
  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-line bg-paper shadow-xl shadow-slate-200/60">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <img src={mark} alt="" className="h-6 w-6 rounded-md" />
        <div className="text-[11px] font-bold text-ink-soft">حجز موعد — عيادة د. أحمد</div>
      </div>

      <div className="space-y-4 p-4">
        <div className="space-y-2">
          <div className="h-10 rounded-lg border border-line bg-canvas px-3 text-[12px] leading-10 text-ink-faint">
            الاسم الكامل
          </div>
          <div className="h-10 rounded-lg border border-line bg-canvas px-3 text-[12px] leading-10 text-ink-faint">
            رقم الهاتف
          </div>
        </div>

        <div>
          <div className="mb-2 text-[11px] font-bold text-ink-soft">اختر اليوم</div>
          <div className="grid grid-cols-5 gap-1.5">
            {days.map(([d, n], i) => (
              <div
                key={d}
                className={`rounded-lg border py-2 text-center ${
                  i === 4
                    ? 'border-brand-500 bg-brand-50'
                    : i === 0
                      ? 'border-line opacity-40'
                      : 'border-line'
                }`}
              >
                <div className="text-[9px] text-ink-faint">{d}</div>
                <div
                  className={`text-[13px] font-extrabold ${i === 4 ? 'text-brand-700' : 'text-ink'}`}
                >
                  {n}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 text-[11px] font-bold text-ink-soft">اختر الوقت</div>
          <div className="grid grid-cols-3 gap-1.5">
            {slots.map((t, i) => (
              <span
                key={t}
                className={`rounded-md border py-1.5 text-center text-[11px] ${
                  i === 2
                    ? 'border-brand-500 bg-brand-50 font-bold text-brand-700'
                    : i < 1
                      ? 'border-line text-ink-faint line-through'
                      : 'border-line text-ink-soft'
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-brand-600 py-2.5 text-center text-[12px] font-bold text-white">
          تأكيد الطلب
        </div>
        <p className="text-center text-[10px] text-ink-faint">
          يصل الطلب للممرّضة — تؤكّده وتوصلك رسالة
        </p>
      </div>
    </div>
  )
}

export default function BookingSection() {
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
    <section
      id="booking"
      className="scroll-mt-16 border-t border-line/70 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* النص */}
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
              ملف الحجز
            </motion.span>

            <motion.h2
              variants={item}
              className="mt-4 text-2xl text-ink sm:text-3xl"
            >
              صفحة حجز لمرضاك — رابط تشاركه، وهو يحجز بنفسه
            </motion.h2>

            <motion.p
              variants={item}
              className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base"
            >
              رابط واحد عام تحطّه بحالتك على واتساب أو بالبطاقة. المريض يحجز خلال ثانية،
              والطلب يوصل الممرّضة منظّماً — لا مكالمات ولا دفتر مواعيد.
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

          {/* اللقطة */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <BookingMock />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
