import { IdCard, Pen, Phone, CalendarDays, Hourglass, Droplet, MapPin, History, HeartPulse } from 'lucide-react'

/* بطاقة «معلومات المريض» من اضبارة الطبيب — مقتبسة من renderChartInfoTiles
   في simple/doctor/script.js + بنية .glass-card/.pf-tiles من app.html.
   بيانات ثابتة، بلا JS التطبيق. */

function Tile({ icon: Icon, label, value, empty, full, iconColor, valColor }) {
  return (
    <div className={`pf-tile${full ? ' full' : ''}`}>
      <span className="lab">
        <Icon style={iconColor ? { color: iconColor } : undefined} />
        {label}
      </span>
      <span className={`val${empty ? ' empty' : ''}`} style={valColor ? { color: valColor } : undefined}>
        {empty ? 'غير مسجّل' : value}
      </span>
    </div>
  )
}

export default function DoctorProfileScreen() {
  return (
    <div className="glass-card" style={{ maxWidth: 360, margin: '0 auto' }}>
      <div className="pf-cardhead">
        <h4>
          <IdCard size={14} />
          معلومات المريض
        </h4>
        <button className="pf-editbtn" type="button" tabIndex={-1}>
          <Pen size={11} /> تعديل
        </button>
      </div>

      <div className="pf-tiles">
        <Tile icon={Phone} label="رقم الهاتف" value={<span dir="ltr">0965 342 7828</span>} />
        <Tile icon={CalendarDays} label="تاريخ الميلاد" value="٤ نيسان ٢٠٠٠" />
        <Tile icon={Hourglass} label="العمر" value="٢٦ سنة" />
        <Tile icon={Droplet} label="زمرة الدم" empty iconColor="#dc2626" />
        <Tile icon={MapPin} label="العنوان" value="جبلة" />
        <Tile icon={History} label="إجمالي الزيارات" value="١" />
        <Tile
          icon={HeartPulse}
          label="أمراض مزمنة"
          value="لا يوجد"
          full
          iconColor="#d97706"
          valColor="var(--text-muted)"
        />
      </div>
    </div>
  )
}
