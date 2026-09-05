import { motion, useReducedMotion } from 'framer-motion'
import { MessageCircle, Check } from 'lucide-react'
import { WHATSAPP_LINK } from '../config'

const EASE = [0.16, 1, 0.3, 1]

const GROUPS = [
  {
    title: 'ملف الحجز',
    items: [
      'رابط عام بلا حساب',
      'الأوقات الماضية والأيام المغلقة تُدار تلقائياً',
      'الطلب يصل الممرّضة — لا يدخل الروزنامة',
    ],
  },
  {
    title: 'الممرّضة',
    items: [
      'قبول أو اعتذار مع مواعيد تعويض',
      'روزنامة يوم/أسبوع + موعد يدوي',
      'تسجيل الزيارة = تسليم فوري للطبيب',
      'تذكير المرضى واتساب / SMS',
    ],
  },
  {
    title: 'الطبيب',
    items: [
      'اضبارة كاملة + خطّ زمني',
      'أداة سريرية مرسومة لكل تخصّص',
      'دفتر مرضى ذكي — بحث بأي جزء',
      'طباعة PDF + إرسال واتساب للصيدلية',
      'اضبارة قابلة للتخصيص',
    ],
  },
  {
    title: 'التخصصات',
    items: [
      '٨ قوالب جاهزة: نسائية، أطفال، عيون، أسنان',
      'قلبية، باطنية، جلدية، عظمية',
      'مخطّط أسنان تفاعلي + أرشيف جراحي',
    ],
  },
  {
    title: 'الخصوصية والثبات',
    items: [
      'مشروع Firebase مستقلّ لكل عيادة',
      'صلاحيات محكومة على الخادم',
      'يعمل بلا إنترنت ويتزامن لمّا يرجع',
    ],
  },
]

export default function SummarySection() {
  const reduce = useReducedMotion()

  return (
    <section className="border-t border-line/70 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
            الخلاصة
          </span>
          <h2 className="mt-4 text-2xl text-ink sm:text-3xl">DocBook باختصار</h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GROUPS.map((g, i) => (
            <motion.div
              key={g.title}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: EASE, delay: reduce ? 0 : (i % 3) * 0.07 }}
              className="rounded-2xl border border-line bg-paper p-5"
            >
              <div className="text-sm font-extrabold text-brand-700">{g.title}</div>
              <ul className="mt-3 space-y-2">
                {g.items.map((it) => (
                  <li key={it} className="flex gap-2 text-[13px] leading-relaxed text-ink-soft">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA ختامي */}
        <div className="mt-14 overflow-hidden rounded-3xl border border-brand-200 bg-brand-50 px-6 py-12 text-center sm:py-14">
          <h3 className="text-xl font-extrabold text-ink sm:text-2xl">جاهز تشوفه على عيادتك؟</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">
            احجز عرضاً قصيراً على واتساب — نجهّزلك نسخة ونمشي فيها سوا.
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-sm shadow-brand-600/25 transition-transform hover:scale-[1.03] active:scale-95"
          >
            <MessageCircle className="h-4 w-4" />
            احجز عرض على واتساب
          </a>
        </div>
      </div>
    </section>
  )
}
