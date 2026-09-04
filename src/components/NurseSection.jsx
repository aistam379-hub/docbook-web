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
import mark from '../assets/brand/docbook-mark.png'

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

function NurseMock() {
  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-line bg-paper shadow-xl shadow-slate-200/60">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <img src={mark} alt="" className="h-6 w-6 rounded-md" />
        <div className="text-[11px] font-bold text-ink-soft">لوحة الممرّضة</div>
      </div>

      <div className="space-y-4 p-4">
        {/* تبويبات */}
        <div className="flex gap-1 text-[11px] font-bold">
          <span className="rounded-lg bg-brand-600 px-3 py-1.5 text-white">
            طلبات جديدة · ٢
          </span>
          <span className="rounded-lg px-3 py-1.5 text-ink-faint">مواعيد اليوم</span>
          <span className="rounded-lg px-3 py-1.5 text-ink-faint">الروزنامة</span>
        </div>

        {/* طلب حجز */}
        <div className="rounded-xl border border-line p-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-extrabold text-ink">سارة الأحمد</div>
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
              قيد الانتظار
            </span>
          </div>
          <div className="mt-1 text-[10px] text-ink-faint">الأربعاء · ١٠:٣٠ ص · مراجعة</div>
          <div className="mt-2.5 flex gap-2">
            <span className="flex-1 rounded-md bg-brand-600 py-1.5 text-center text-[10px] font-bold text-white">
              قبول
            </span>
            <span className="flex-1 rounded-md border border-line py-1.5 text-center text-[10px] font-bold text-ink-soft">
              اعتذار + بدائل
            </span>
          </div>
        </div>

        {/* موعد اليوم */}
        <div className="flex items-center justify-between rounded-xl border border-line bg-canvas/70 p-3">
          <div>
            <div className="text-xs font-extrabold text-ink">أحمد خليل</div>
            <div className="mt-0.5 text-[10px] text-ink-faint">١٠:٠٠ ص · حاضر</div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-lg bg-brand-600 px-2.5 py-1.5 text-[10px] font-bold text-white">
            <Check className="h-3 w-3" /> تسجيل الزيارة
          </span>
        </div>
      </div>
    </div>
  )
}

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
          {/* اللقطة — يسار على الديسكتوب */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="lg:order-1"
          >
            <NurseMock />
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
        </div>
      </div>
    </section>
  )
}
