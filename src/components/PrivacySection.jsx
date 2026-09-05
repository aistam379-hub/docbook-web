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
    <section id="privacy" className="scroll-mt-16 border-t border-line/70 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
            الخصوصية والعزل
          </span>
          <h2 className="mt-4 text-2xl text-ink sm:text-3xl">
            بياناتك في عيادتك — معزولة تماماً، وما تمرّ علينا
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
            بيانات المرضى حسّاسة، فالعزل مش خيار. كل عيادة قائمة بذاتها — لا شبكة تجمع
            مرضى العيادات، ولا خادم واحد يحمل الكلّ.
          </p>
        </motion.div>

        <motion.img
          src={illustration}
          alt="جهاز الطبيب يشتغل والإنترنت مقطوع ويتزامن لمّا يرجع"
          className="mx-auto mt-10 w-full max-w-xs sm:max-w-sm"
          loading="lazy"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: EASE, delay: reduce ? 0 : i * 0.08 }}
              className="group rounded-2xl border border-line bg-paper p-5 shadow-sm shadow-slate-200/40 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-600/10"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white">
                <Icon className="h-5 w-5" />
              </span>
              <div className="mt-3 text-sm font-extrabold text-ink">{title}</div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
