import { motion, useReducedMotion } from 'framer-motion'
import {
  Inbox,
  CalendarDays,
  CalendarClock,
  ArrowLeftRight,
  MessageSquare,
  Bell,
  Check,
} from 'lucide-react'
import illustration from '../assets/illustrations/appointments.webp'

const EASE = [0.16, 1, 0.3, 1]

const POINTS = [
  {
    icon: Inbox,
    title: 'طلبات الحجز الواردة',
    body: 'كل طلب من صفحة الحجز يوصلها «قيد الانتظار» — تقبله أو تعتذر مع مواعيد بديلة.',
  },
  {
    icon: CalendarDays,
    title: 'الروزنامة — يوم وأسبوع',
    body: 'جدول العيادة كامل أمامها، وتسجّل مريضاً جديداً أو تضيف موعداً يدوياً لمن يحجز على الاستقبال مباشرة.',
  },
  {
    icon: CalendarClock,
    title: 'مواعيد اليوم بيد وحدة',
    body: 'من المؤكّد ← الحاضر ← الزيارة. تعرف مين وصل ومين تأخّر بنظرة.',
  },
  {
    icon: ArrowLeftRight,
    title: 'تسجيل الزيارة = تسليم فوري',
    body: 'لحظة ما تسجّل زيارة المريض، اضبارته تُفتح عند الطبيب تلقائياً — بلا مناداة.',
  },
  {
    icon: MessageSquare,
    title: 'تذكير المرضى واتساب / SMS',
    body: 'نصّ التذكير والتأكيد والاعتذار تكتبه العيادة مرّة، ويُعاد لكل المرضى.',
  },
  {
    icon: Bell,
    title: 'زرّ تنبيه سريع للطبيب',
    body: 'تنبّه الطبيب بضغطة، ونصّ الزرّ نفسه تختاره العيادة («جاهز» / «المريض دخل»...).',
  },
]

export default function NurseSection() {
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
    <section id="nurse" className="scroll-mt-16 border-t border-line/70 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* الرسم التوضيحي — يسار على الديسكتوب */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="lg:order-1"
          >
            <img
              src={illustration}
              alt="طلبات الحجز تتحوّل إلى مواعيد مؤكّدة في لوحة الممرّضة"
              className="mx-auto w-full max-w-xl"
              loading="lazy"
            />
          </motion.div>

          {/* النص — يمين على الديسكتوب */}
          <motion.div
            variants={list}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:order-2"
          >
            <motion.span
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700"
            >
              الممرّضة
            </motion.span>

            <motion.h2 variants={item} className="mt-4 text-2xl text-ink sm:text-3xl">
              لوحة الممرّضة — تستقبل، تنظّم، وتسلّم للطبيب
            </motion.h2>

            <motion.p
              variants={item}
              className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base"
            >
              كل طلب حجز يمرّ فيها. تأكّد المواعيد، تجهّز المريض، وبضغطة وحدة تسلّمه
              للطبيب باضبارته — بلا ورق ولا مناداة على الممرّ.
            </motion.p>

            <ul className="mt-6 space-y-3">
              {POINTS.map(({ icon: Icon, title, body }) => (
                <motion.li
                  key={title}
                  variants={item}
                  className="group -mx-2.5 flex gap-3 rounded-xl p-2.5 transition-colors duration-200 hover:bg-brand-50/60"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white">
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
        </div>
      </div>
    </section>
  )
}
