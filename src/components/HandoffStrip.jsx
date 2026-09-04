import { motion, useReducedMotion } from 'framer-motion'
import illustration from '../assets/illustrations/teamwork.webp'

const EASE = [0.16, 1, 0.3, 1]

export default function HandoffStrip() {
  const reduce = useReducedMotion()
  return (
    <section className="border-t border-line/70 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <motion.img
          src={illustration}
          alt="الطبيب والممرّضة متّصلان بنفس ملف المريض"
          className="mx-auto w-full max-w-xl"
          loading="lazy"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
        />
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: EASE, delay: reduce ? 0 : 0.1 }}
          className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-soft sm:text-base"
        >
          الممرّضة والطبيب على <span className="font-bold text-ink">نفس ملف المريض</span> —
          تسجيل الزيارة يفتح الاضبارة عند الطبيب لحظياً، بلا ورق ولا مناداة.
        </motion.p>
      </div>
    </section>
  )
}
