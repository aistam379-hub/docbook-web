import { MessageCircle } from 'lucide-react'
import { SECTIONS, WHATSAPP_LINK } from '../config'
import mark from '../assets/brand/docbook-mark.png'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <img src={mark} alt="" className="h-9 w-9 rounded-xl" />
              <span className="text-lg font-extrabold text-ink">DocBook</span>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">
              نظام إدارة عيادة عربي بالكامل — حجز، ممرّضة، طبيب، واضبارة ذكية. يعمل حتى
              والإنترنت مقطوع.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-[13px] font-medium text-ink-soft transition-colors hover:text-brand-700"
              >
                {s.label}
              </a>
            ))}
          </nav>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-fit items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white"
          >
            <MessageCircle className="h-4 w-4" />
            تواصل على واتساب
          </a>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-[12px] text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} DocBook</span>
          <span>صُنع لعيادات المنطقة</span>
        </div>
      </div>
    </footer>
  )
}
