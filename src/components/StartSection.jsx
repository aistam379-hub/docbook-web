import { motion, useReducedMotion } from 'framer-motion'
import { MessageCircle, Settings2, LogIn, Share2 } from 'lucide-react'
import { WHATSAPP_LINK } from '../config'
import illustration from '../assets/illustrations/onboarding.webp'

const EASE = [0.16, 1, 0.3, 1]

const STEPS = [
  {
    icon: MessageCircle,
    title: 'تواصل على واتساب',
    body: 'رسالة وحدة — نتفق على التفاصيل ونجاوب أسئلتك.',
  },
  {
    icon: Settings2,
    title: 'نجهّزلك نسختك',
    body: 'مشروع مستقلّ، الروابط، وحسابات الطبيب والممرّضة — جاهزة نفس اليوم.',
  },
  {
    icon: LogIn,
    title: 'دخول بحساب جوجل',
    body: 'معالج إعداد من ٤ خطوات يقترح خانات تخصّصك وأداتك السريرية — عدّلها كيف ما بدك.',
  },
  {
    icon: Share2,
    title: 'شارك رابط الحجز',
    body: 'حطّه بحالتك على واتساب أو بالبطاقة — ومرضاك يبدأوا يحجزوا.',
  },
]

export default function StartSection() {
  const reduce = useReducedMotion()

  return (
    <section id="start" className="scroll-mt-16 border-t border-line/70 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
            كيف تبدأ
          </span>
          <h2 className="mt-4 text-2xl text-ink sm:text-3xl">من رسالة واتساب لعيادة تشتغل</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
            بلا خوادم تديرها ولا تنصيب. التجهيز يدوي مرّة وحدة من طرفنا.
          </p>
        </div>

        <motion.img
          src={illustration}
          alt="من رسالة واتساب، لتجهيز نسختك، لدخولك، لمشاركة رابط الحجز مع مرضاك"
          className="mx-auto mt-10 hidden w-full max-w-3xl sm:block"
          loading="lazy"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
        />

        <ol className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, body }, i) => (
            <motion.li
              key={title}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: EASE, delay: reduce ? 0 : i * 0.08 }}
              className="relative rounded-2xl border border-line bg-paper p-5"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-600 text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-2xl font-extrabold text-brand-200">{i + 1}</span>
              </div>
              <div className="mt-3 text-sm font-extrabold text-ink">{title}</div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{body}</p>
            </motion.li>
          ))}
        </ol>

        <div className="mt-10 text-center">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-bold text-white shadow-sm shadow-brand-600/25 transition-transform hover:scale-[1.03] active:scale-95"
          >
            <MessageCircle className="h-4 w-4" />
            ابدأ على واتساب
          </a>
        </div>
      </div>
    </section>
  )
}
