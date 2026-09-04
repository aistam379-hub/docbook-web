// ————— إعدادات التواصل —————
// ضع رقم واتساب الحقيقي بصيغة دولية بلا + ولا مسافات، مثال: 963991234567
export const WHATSAPP_NUMBER = '000000000000' // TODO: رقم العيادة / المبيعات

export const WHATSAPP_TEXT = 'مرحبا، حابب أعرف أكتر عن DocBook وأشوف عرض.'

export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_TEXT,
)}`

// روابط أقسام الصفحة (للتنقّل)
export const SECTIONS = [
  { id: 'journey', label: 'كيف يعمل' },
  { id: 'booking', label: 'الحجز' },
  { id: 'nurse', label: 'الممرّضة' },
  { id: 'doctor', label: 'الطبيب' },
  { id: 'specialties', label: 'التخصصات' },
  { id: 'start', label: 'كيف تبدأ' },
]
