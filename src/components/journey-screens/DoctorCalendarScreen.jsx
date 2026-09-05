import { ChevronRight, ChevronLeft, ZoomOut, ZoomIn, Calendar, Plus } from 'lucide-react'

/* الجدول الأسبوعي من لوحة الطبيب — بنية sched-head/sched-daycol/sched-appt
   من simple/doctor/{app.html, script.js, styles.css}. قراءة فقط، بلا JS التطبيق. */

const HOUR_PX = 46
const START = 15 // ٣ مساءً
const HOURS = [15, 16, 17, 18, 19, 20] // حتى ٨ مساءً
const BODY_H = (HOURS.length - 1) * HOUR_PX

// الأحد ٣٠ آب → السبت ٥ أيلول (الأسبوع يبدأ الأحد)
const DAYS = [
  { en: 'SUN', num: '٣٠' },
  { en: 'MON', num: '٣١' },
  { en: 'TUE', num: '١' },
  { en: 'WED', num: '٢' },
  { en: 'THU', num: '٣' },
  { en: 'FRI', num: '٤' },
  { en: 'SAT', num: '٥', today: true },
]

// مواعيد نموذجية: [colIndex, دقائق من الساعة ١٥, نص, وقت, لون]
const APPTS = [
  { col: 1, mins: 38, name: 'عمر', time: '14:38', bg: '#dcfce7', bd: '#16a34a', tx: '#166534' },
  { col: 6, mins: 120, name: 'أحمد النجّار', time: '17:00', bg: '#f3e8ff', bd: '#7c3aed', tx: '#5b21b6' },
]

const gridCols = `56px repeat(7, minmax(0, 1fr))`

export default function DoctorCalendarScreen() {
  return (
    <div className="cal-week-card" style={{ '--sched-hour': `${HOUR_PX}px` }}>
      <div className="cal-week-toolbar">
        <div className="sched-toggle">
          <button type="button" tabIndex={-1}>
            يوم
          </button>
          <button type="button" className="active" tabIndex={-1}>
            أسبوع
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button className="compact-nav-btn" type="button" tabIndex={-1}>
            <ChevronRight size={14} />
          </button>
          <span className="sched-range">٣٠ آب – ٥ أيلول ٢٠٢٦</span>
          <button className="compact-nav-btn" type="button" tabIndex={-1}>
            <ChevronLeft size={14} />
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button className="compact-nav-btn" type="button" tabIndex={-1}>
            <ZoomOut size={14} />
          </button>
          <button className="compact-nav-btn" type="button" tabIndex={-1}>
            <ZoomIn size={14} />
          </button>
          <button className="sched-btn-today" type="button" tabIndex={-1}>
            <Calendar size={13} /> اليوم
          </button>
          <button className="sched-btn-add" type="button" tabIndex={-1}>
            <Plus size={13} /> موعد
          </button>
        </div>
      </div>

      <div className="sched-head-row" style={{ gridTemplateColumns: gridCols }}>
        <div className="sched-head-gmt">GMT+3</div>
        {DAYS.map((d) => (
          <div key={d.en} className={`sched-head-cell${d.today ? ' is-today' : ''}`}>
            <div className="sched-head-name">{d.en}</div>
            <div className={`sched-head-num${d.today ? ' today' : ''}`}>{d.num}</div>
          </div>
        ))}
      </div>

      <div className="sched-body" style={{ gridTemplateColumns: gridCols }}>
        <div className="sched-gutter" style={{ height: BODY_H }}>
          {HOURS.map((h) => {
            const h12 = h % 12 || 12
            return (
              <div
                key={h}
                className="sched-gutter-lbl"
                style={{ top: (h - START) * HOUR_PX }}
              >
                {h12}
                <span className="sched-mer">{h < 12 ? 'AM' : 'PM'}</span>
              </div>
            )
          })}
        </div>

        {DAYS.map((d, ci) => (
          <div
            key={d.en}
            className={`sched-daycol${d.today ? ' today-col' : ''}`}
            style={{ height: BODY_H }}
          >
            {APPTS.filter((a) => a.col === ci).map((a, i) => (
              <div
                key={i}
                className="sched-appt"
                style={{
                  top: (a.mins / 60) * HOUR_PX,
                  height: HOUR_PX * 0.5 - 3,
                  left: 2,
                  right: 3,
                  background: a.bg,
                  borderColor: a.bd,
                  color: a.tx,
                }}
              >
                <div className="sched-appt-name">{a.name}</div>
                <div className="sched-appt-time">{a.time}</div>
              </div>
            ))}
            {d.today && <div className="sched-now-line" style={{ top: 2.4 * HOUR_PX }} />}
          </div>
        ))}
      </div>
    </div>
  )
}
