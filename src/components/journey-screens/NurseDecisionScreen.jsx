import { X, CalendarX2, UserX, CalendarDays, ChevronRight, ChevronLeft, Info } from 'lucide-react'

/* فرعا القرار — مقتبسان من simple/nurse:
   - القبول  → ورقة appConfirm («قبول هذا الموعد؟»)
   - الاعتذار → مودال الرفض + روزنامة التعويض (rejectModal)
   بيانات ثابتة، بلا JS التطبيق. */

const ar = (n) => new Intl.NumberFormat('ar-EG').format(n)

// روزنامة أيلول — الأعمدة: الجمعة السبت الأحد الإثنين الثلاثاء الأربعاء الخميس
const RWEEKS = [
  [null, null, null, null, 1, 2, 3],
  [4, 5, 6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15, 16, 17],
  [18, 19, 20, 21, 22, 23, 24],
  [25, 26, 27, 28, 29, 30, null],
]
const RPAST = new Set([1, 2, 3, 4])
const RCLOSED = new Set([11, 25])
const RTODAY = 5
const RPICKS = { 21: 2, 24: 1 } // أيام فيها مواعيد تعويض مختارة + عددها

function AcceptSheet() {
  return (
    <div className="confirm-sheet">
      <p
        style={{
          fontWeight: 700,
          fontSize: '.95rem',
          color: 'var(--text)',
          marginBottom: 18,
          textAlign: 'center',
          lineHeight: 1.5,
        }}
      >
        قبول هذا الموعد؟
      </p>
      <div style={{ display: 'flex', gap: 10 }}>
        <button
          type="button"
          tabIndex={-1}
          style={{
            flex: 1,
            padding: 11,
            border: '1.5px solid var(--border)',
            borderRadius: 12,
            background: 'var(--bg)',
            color: 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '.88rem',
            fontFamily: 'inherit',
          }}
        >
          إلغاء
        </button>
        <button
          type="button"
          tabIndex={-1}
          style={{
            flex: 1,
            padding: 11,
            border: 'none',
            borderRadius: 12,
            background: 'var(--red)',
            color: '#fff',
            fontWeight: 800,
            fontSize: '.88rem',
            fontFamily: 'inherit',
          }}
        >
          قبول
        </button>
      </div>
    </div>
  )
}

function RejectModal() {
  return (
    <div className="rmodal">
      <div className="rmodal-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: 'var(--red-light)',
              border: '1.5px solid #fca5a5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <CalendarX2 size={15} color="var(--red)" />
          </div>
          <div>
            <h3 style={{ fontWeight: 800, fontSize: '.95rem', color: 'var(--text)', lineHeight: 1.2 }}>
              رفض طلب الزيارة
            </h3>
            <p style={{ fontSize: '.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
              اختاري مواعيد بديلة لإرسالها للمريض (اختياري)
            </p>
          </div>
        </div>
        <button className="rmodal-close-btn" type="button" tabIndex={-1}>
          <X size={15} />
        </button>
      </div>

      <div className="rmodal-body">
        <div
          style={{
            background: 'var(--red-light)',
            border: '1.5px solid #fca5a5',
            borderRadius: 12,
            padding: '10px 12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'var(--red)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <UserX size={13} color="#fff" />
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: '.88rem', color: 'var(--text)' }}>أحمد النجّار</p>
              <p style={{ fontSize: '.72rem', color: 'var(--red)', marginTop: 1, fontWeight: 600 }}>
                الجمعة ١٨ أيلول ٢٠٢٦ — ١٧:٠٠
              </p>
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: 10, padding: '8px 10px', border: '1px solid #fca5a5' }}>
            <p style={{ fontSize: '.74rem', color: '#7f1d1d', lineHeight: 1.55 }}>
              <Info size={12} style={{ verticalAlign: -2, marginInlineEnd: 5, color: 'var(--red)' }} />
              سيتم إرسال رسالة للمريض برفض موعده. يمكنك اختيار مواعيد بديلة من الروزنامة.
            </p>
          </div>
        </div>

        <p style={{ fontWeight: 700, fontSize: '.82rem', color: 'var(--text)' }}>
          <CalendarDays size={12} style={{ verticalAlign: -1, marginInlineEnd: 6, color: 'var(--primary)' }} />
          اختاري مواعيد التعويض
        </p>

        <div className="compact-calendar-container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <button className="compact-nav-btn" type="button" tabIndex={-1}>
              <ChevronRight size={14} />
            </button>
            <span style={{ fontWeight: 700, fontSize: '.85rem', color: 'var(--text)' }}>أيلول ٢٠٢٦</span>
            <button className="compact-nav-btn" type="button" tabIndex={-1}>
              <ChevronLeft size={14} />
            </button>
          </div>

          <div className="rcal-grid" style={{ marginBottom: 3 }}>
            {['الجمعة', 'السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'].map((d) => (
              <div key={d} className="rcal-day-name">
                {d}
              </div>
            ))}
          </div>

          <div className="rcal-grid">
            {RWEEKS.flat().map((n, i) => {
              if (n == null) return <span key={i} className="rcal-day rcal-other" />
              const cls = ['rcal-day']
              if (RPAST.has(n)) cls.push('rcal-past')
              if (RCLOSED.has(n)) cls.push('rcal-closed')
              if (n === RTODAY) cls.push('rcal-today')
              const picks = RPICKS[n]
              if (picks) cls.push('rcal-pickactive')
              return (
                <span key={i} className={cls.join(' ')}>
                  <span className="rcal-num">{ar(n)}</span>
                  {picks ? <span className="rcal-count">{ar(picks)}</span> : null}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NurseDecisionScreen({ choice }) {
  return choice === 'apologize' ? <RejectModal /> : <AcceptSheet />
}
