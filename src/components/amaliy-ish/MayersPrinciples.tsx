"use client"

import { useState } from "react"
import { CheckCircle2, ChevronDown, ChevronUp, Image as ImageIcon, Volume2, Type, LayoutTemplate, Layers, MousePointerClick, UserCircle, Mic, Monitor} from "lucide-react"

export type Principle = {
  id: number
  name: string
  uzbekName: string
  description: string
  badExample: string
  goodExample: string
  icon: any
}

const principles: Principle[] = [
  { id: 1, name: "Multimedia Principle", uzbekName: "Multimedia tamoyili", description: "Odamlar faqat so'zlarning o'zidan ko'ra so'zlar va rasmlar orqali yaxshiroq o'rganadilar.", badExample: "Faqat uzun matnli slayd.", goodExample: "Matnni tushuntiruvchi rasm yoki sxema bilan berish.", icon: ImageIcon },
  { id: 2, name: "Spatial Contiguity", uzbekName: "Fazoviy yondoshuv", description: "Bir-biriga tegishli matn va rasmlar ekranda bir-biriga yaqin joylashishi kerak.", badExample: "Rasm slaydning bir chetida, uning izohi boshqa chetida.", goodExample: "Rasmning aynan o'sha qismida izoh (matn) joylashishi.", icon: LayoutTemplate },
  { id: 3, name: "Temporal Contiguity", uzbekName: "Vaqt yondoshuvi", description: "Bir-biriga tegishli matn va rasm (yoki ovoz) ekranda bir vaqtda chiqishi kerak.", badExample: "Avval gapirib bo'lib, keyin rasmni ko'rsatish.", goodExample: "Mavzu haqida gapirilayotgan aynan o'sha paytda animatsiya yoki rasmni ekranga chiqarish.", icon: Layers },
  { id: 4, name: "Coherence Principle", uzbekName: "Muvofiqlik tamoyili", description: "Mavzuga aloqador bo'lmagan so'z, rasm va tovushlarni olib tashlash kerak.", badExample: "Ahamiyatsiz fon musiqasi yoki \"chiroyli\" fon rasmlari.", goodExample: "Faqat mavzuni yorituvchi oddiy, keraksiz bezaklarsiz kontent.", icon: Monitor },
  { id: 5, name: "Modality Principle", uzbekName: "Modallik tamoyili", description: "Odamlar animatsiyani ekrandagi matn bilan emas, balki ovozli tushuntirish bilan yaxshiroq o'rganadilar.", badExample: "Ekranda murakkab jarayon harakatlanyapti va pastda uzun matn bor.", goodExample: "Ekranda jarayon harakatlanyapti va uni kadr orti ovozi tushuntirib beryapti.", icon: Volume2 },
  { id: 6, name: "Redundancy Principle", uzbekName: "Ortiqchalik tamoyili", description: "Odamlar animatsiya va kadr orti ovozidan yaxshiroq o'rganadilar, agar ekranda aynan o'sha ovoz matni takrorlanmasa.", badExample: "O'qituvchi ekrandagi hamma yozuvni so'zma-so'z o'qib berishi.", goodExample: "Ekranda faqat kalit so'zlar/rasmlar va unga batafsil og'zaki izoh.", icon: Type },
  { id: 7, name: "Spatial Contiguity", uzbekName: "Sementlash (Segmenting)", description: "Odamlar uzluksiz uzun darsdan ko'ra qismlarga bo'lingan qisqa darslarni yaxshiroq o'zlashtiradi.", badExample: "45 daqiqalik to'xtovsiz monolog video.", goodExample: "Videoni mantiqiy qismlarga (5-7 daqiqadan) va boblarga bo'lish.", icon: MousePointerClick },
  { id: 8, name: "Pre-training Principle", uzbekName: "Dastlabki tayyorgarlik", description: "Agar talabalar asosiy tushunchalar va xususiyatlarni oldindan bilsalar, murakkab darsni yaxshiroq tushunishadi.", badExample: "Birdaniga murakkab jarayonni tushuntirishni boshlash.", goodExample: "Dars boshida so'z boyligi yoki asosiy qoidalarni tanishtirib o'tish.", icon: BookOpen },
  { id: 9, name: "Signaling Principle", uzbekName: "Signalizatsiya tamoyili", description: "Muhim ma'lumotlarga qanday ishoralar (strelkalar, ranglar) berilsa, odamlar shuncha yaxshi o'rganadi.", badExample: "Hech qanday urg'usiz bir xil qora rangdagi uzun matn yoki ulkan sxema.", goodExample: "Gapirilayotgan qism sariq rangda yonishi, qizil strelka bilan ko'rsatilishi.", icon: Target },
  { id: 10, name: "Personalization Principle", uzbekName: "Shaxsiylashtirish", description: "Rasmiy tilli (akademik) so'zlashuvdan ko'ra, norasmiy (suhbatdoshdek) muloqot samaraliroq.", badExample: "Ushbu jarayonda quyidagilar amalga oshiriladi...", goodExample: "Keling, bu jarayonda biz nima qilishimizni ko'rib chiqamiz...", icon: UserCircle },
  { id: 11, name: "Voice Principle", uzbekName: "Inson ovozi tamoyili", description: "Odamlar standart kompyuter ovozidan (TTS) ko'ra do'stona odam ovozi orqali o'rganishni ma'qul ko'radi.", badExample: "Hissiyotsiz, qotib qolgan robot ovozidan foydalanish.", goodExample: "Hissiyotlarga ega, jonli insonning audioni o'qishi.", icon: Mic },
  { id: 12, name: "Image Principle", uzbekName: "Tasvir tamoyili", description: "Ekranda o'qituvchining yuzi doim ko'rinib turishi shart emas.", badExample: "O'qituvchi yuzi slaydning eng muhim qismini to'sib turishi.", goodExample: "O'qituvchini faqat kirish yoki muhim e'tibor talab qiladigan joydagina ko'rsatish.", icon: UserCircle },
]

// Wait, I forgot to import Target and BookOpen from lucide-react. I'll just adjust below.

import { Target, BookOpen } from "lucide-react"

export function MayersPrinciples({ onChange }: { onChange: (checkedCount: number) => void }) {
  const [checkedIds, setCheckedIds] = useState<Set<number>>(new Set())
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const toggleCheck = (id: number) => {
    const newChecked = new Set(checkedIds)
    if (newChecked.has(id)) {
      newChecked.delete(id)
    } else {
      newChecked.add(id)
    }
    setCheckedIds(newChecked)
    onChange(newChecked.size)
  }

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {principles.map((p) => {
          const isChecked = checkedIds.has(p.id)
          const isExpanded = expandedId === p.id
          const Icon = p.icon

          return (
            <div 
              key={p.id} 
              className={`border rounded-xl overflow-hidden transition-all duration-300 ${isChecked ? 'bg-success/5 border-success/30' : 'bg-card'}`}
            >
              <div 
                className="p-4 cursor-pointer hover:bg-muted/50"
                onClick={() => setExpandedId(isExpanded ? null : p.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex gap-3">
                    <div className={`mt-1 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full ${isChecked ? 'bg-success text-white' : 'bg-primary/10 text-primary'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{p.id}. {p.uzbekName}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{p.name}</p>
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />}
                </div>
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t bg-muted/20 animate-in slide-in-from-top-2">
                  <p className="text-sm mb-4 leading-relaxed text-foreground/90">{p.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="bg-destructive/10 border border-destructive/20 p-2.5 rounded-md text-xs">
                      <span className="font-bold text-destructive block mb-1">❌ Noto'g'ri (Yomon):</span>
                      {p.badExample}
                    </div>
                    <div className="bg-success/10 border border-success/20 p-2.5 rounded-md text-xs">
                      <span className="font-bold text-success block mb-1">✅ To'g'ri (Yaxshi):</span>
                      {p.goodExample}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleCheck(p.id)
                    }}
                    className={`w-full py-2 flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors ${isChecked ? 'bg-success text-white' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}
                  >
                    {isChecked ? (
                      <><CheckCircle2 className="w-4 h-4" /> Tushundim va qo'llayman</>
                    ) : (
                      "Qoidani o'zlashtirish"
                    )}
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
