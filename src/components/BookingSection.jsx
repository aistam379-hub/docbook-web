import { motion, useReducedMotion } from 'framer-motion'
import { Link2, Clock, CalendarOff, Inbox, BellRing } from 'lucide-react'
import illustration from '../assets/illustrations/booking.webp'

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

          {/* الرسم التوضيحي */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <img
              src={illustration}
              alt="مريضة تحجز موعداً من هاتفها عبر رابط الحجز"
              className="mx-auto w-full max-w-xl"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
