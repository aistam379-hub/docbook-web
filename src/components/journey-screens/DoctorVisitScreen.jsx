import { ChevronUp } from 'lucide-react'

/* محرّر الزيارة (SOAP) من اضبارة الطبيب — مقتبس من بنية .ve-soap/.ve-step
   في simple/doctor/app.html. بيانات ثابتة، بلا JS التطبيق. */

const MEASURES = [
  ['تاريخ آخر طمث (LMP)', '٢٥ / ٦ / ٢٠٢٦'],
  ['موعد الولادة المتوقّع (EDD)', '١ / ٤ / ٢٠٢٧'],
  ['فحص عنق الرحم (Pap Smear)', 'ضمن الطبيعي'],
  ['ضغط الدم (mmHg)', '١٢٥ / ٨٠'],
]

export default function DoctorVisitScreen() {
  return (
    <div style={{ maxWidth: 380, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div className="ve-prev">
        <div className="ve-prev-top">
          <span>
            <b>الزيارة السابقة</b>
            <span className="when">١٨ تموز · قبل ٤٩ يوم</span>
          </span>
          <ChevronUp size={14} color="var(--text-muted)" />
        </div>
      </div>

      <div className="ve-soap">
        <div className="ve-step filled">
          <div className="ve-rail">
            <div className="ve-mark">S</div>
            <div className="ve-line" />
          </div>
          <div className="ve-card">
            <label className="ve-label">
              الشكوى{' '}
              <span style={{ fontWeight: 500, fontSize: '.74rem', color: 'var(--text-muted)' }}>
                — ماذا يقول المريض؟
              </span>
            </label>
            <div className="ve-value">حرارة وسعال منذ أسبوع، مع صداع خفيف.</div>
          </div>
        </div>

        <div className="ve-step filled">
          <div className="ve-rail">
            <div className="ve-mark">O</div>
            <div className="ve-line" />
          </div>
          <div className="ve-card">
            <label className="ve-label">
              القياسات{' '}
              <span style={{ fontWeight: 500, fontSize: '.74rem', color: 'var(--text-muted)' }}>
                — حقول تخصّصك
              </span>
            </label>
            <div className="ve-measures">
              {MEASURES.map(([k, v]) => (
                <div key={k} className="ve-measure">
                  <div className="mk">{k}</div>
                  <div className="mv">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="ve-step filled">
          <div className="ve-rail">
            <div className="ve-mark">P</div>
            <div className="ve-line" />
          </div>
          <div className="ve-card">
            <label className="ve-label">
              الخطة — الوصفة{' '}
              <span style={{ fontWeight: 500, fontSize: '.74rem', color: 'var(--text-muted)' }}>
                — ما يخرج به المريض
              </span>
            </label>
            <div className="ve-value">أموكسيسيلين ١غ — مرّتين يومياً × ٧ أيام</div>
          </div>
        </div>
      </div>
    </div>
  )
}
