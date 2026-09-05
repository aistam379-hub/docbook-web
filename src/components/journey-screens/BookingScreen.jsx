import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight, CalendarDays, Clock, Check, CalendarCheck } from 'lucide-react'

/* ماركب مقتبس من simple/booking/index.html — الخطوة ٢ (اختيار التاريخ والوقت).
   بيانات ثابتة، بلا Firebase ولا JS التطبيق. */

// شبكة أيلول التقريبية — الأعمدة: سبت جمعة خميس أربعاء ثلاثاء إثنين أحد
const WEEKS = [
  [null, null, 1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, null, null, null],
]
const PAST = new Set([1, 2, 3, 4])
const CLOSED = new Set([11, 25]) // جمعات مغلقة
const TODAY = 5
const SELECTED = 18

export default function BookingScreen() {
  return (
    <>
      <div className="booking-steps-bar">
        <div className="booking-step-dot done">
          <Check size={11} strokeWidth={3} />
        </div>
        <div className="booking-step-line done" />
        <div className="booking-step-dot active">٢</div>
        <div className="booking-step-line" />
        <div className="booking-step-dot">٣</div>
      </div>

      <div className="booking-section-title">
        <CalendarDays size={13} /> اختر التاريخ والوقت
      </div>

      <div className="booking-cal-box">
        <div className="booking-cal-header">
          <button type="button" className="booking-cal-nav" tabIndex={-1}>
            <ChevronRight size={15} />
          </button>
          <span className="booking-cal-month">أيلول ٢٠٢٦</span>
          <button type="button" className="booking-cal-nav" tabIndex={-1}>
            <ChevronLeft size={15} />
          </button>
        </div>

        <div className="booking-cal-grid" style={{ marginBottom: 6 }}>
          {['سبت', 'جمعة', 'خميس', 'أربعاء', 'ثلاثاء', 'إثنين', 'أحد'].map((d) => (
            <div key={d} className="booking-cal-day-name">
              {d}
            </div>
          ))}
        </div>

        <div className="booking-cal-grid">
          {WEEKS.flat().map((n, i) => {
            if (n == null) return <span key={i} />
            const cls = ['booking-cal-day']
            if (n === SELECTED) cls.push('selected')
            else if (n === TODAY) cls.push('today')
            else if (PAST.has(n)) cls.push('disabled')
            else if (CLOSED.has(n)) cls.push('closed')
            return (
              <span key={i} className={cls.join(' ')}>
                {new Intl.NumberFormat('ar-EG').format(n)}
              </span>
            )
          })}
        </div>
      </div>

      <div className="booking-selected-date">
        <CalendarCheck size={13} /> الجمعة ١٨ أيلول ٢٠٢٦
      </div>

      <div style={{ marginBottom: 16 }}>
        <div className="booking-section-title">
          <Clock size={13} /> اختر الوقت
        </div>
        <div className="booking-form-input">
          <span>١٠:٣٠ ص</span>
          <ChevronLeft size={14} color="#999" style={{ transform: 'rotate(-90deg)' }} />
        </div>
      </div>

      <div className="booking-btns-row">
        <button type="button" className="booking-btn-secondary" tabIndex={-1}>
          <ArrowRight size={15} /> رجوع
        </button>
        <button type="button" className="booking-btn-primary" tabIndex={-1}>
          التالي <ArrowLeft size={15} />
        </button>
      </div>
    </>
  )
}
