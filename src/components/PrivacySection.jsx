import { motion, useReducedMotion } from 'framer-motion'
import { Database, Lock, EyeOff, WifiOff } from 'lucide-react'
import illustration from '../assets/illustrations/offline.webp'

const EASE = [0.16, 1, 0.3, 1]

const CARDS = [
  {
    icon: Database,
    title: 'مشروع مستقلّ لكل عيادة',
    body: 'كل عيادة على مشروع Firebase خاصّ فيها — لا خادم مشترك ولا قاعدة بيانات مشتركة مع أي عيادة ثانية.',
  },
  {
    icon: Lock,
    title: 'الصلاحيات على الخادم',
    body: 'الطبيب والممرّضة فقط، كلٌّ بحدّه — منفّذة كقواعد أمان على الخادم، مش إعدادات بالواجهة.',
  },
  {
    icon: EyeOff,
    title: 'إحنا ما نشوف بياناتك',
    body: 'التجهيز يدوي مرّة وحدة، وبعدها بيانات مرضاك تبقى عندك — ما تمرّ علينا ولا نطّلع عليها.',
  },
  {
    icon: WifiOff,
    title: 'محفوظة محلياً — تشتغل أوفلاين',
    body: 'البيانات مخزّنة بجهازك كمان. الطبيب يفتح الاضبارة والنت مقطوع، واللي يُكتب يتزامن لمّا يرجع.',
  },
]

export default function PrivacySection() {
  const reduce = useReducedMotion()

  return (
    <section id="privacy" className="scroll-mt-16 bg-ink py-20 text-white sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-brand-200">
            الخصوصية والعزل
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl">
            بياناتك في عيادتك — معزولة تماماً، وما تمرّ علينا
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
            بيانات المرضى حسّاسة، فالعزل مش خيار. كل عيادة قائمة بذاتها — لا شبكة تجمع
            مرضى العيادات، ولا خادم واحد يحمل الكلّ.
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto mt-10 max-w-xs rounded-3xl bg-white/95 p-5 shadow-xl shadow-black/20 sm:max-w-sm"
        >
          <img
            src={illustration}
            alt="جهاز الطبيب يشتغل والإنترنت مقطوع ويتزامن لمّا يرجع"
            className="w-full"
            loading="lazy"
          />
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: EASE, delay: reduce ? 0 : i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500/15 text-brand-300">
                <Icon className="h-5 w-5" />
              </span>
              <div className="mt-3 text-sm font-extrabold">{title}</div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-white/65">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
