"use client"

import { useState } from "react"
import { CheckCircle2, Eye, Hand, Brain, LayoutTemplate } from "lucide-react"

type POURPrinciple = {
  id: string
  name: string
  uzbekName: string
  description: string
  icon: any
  checks: string[]
}

const principles: POURPrinciple[] = [
  {
    id: "perceivable",
    name: "Perceivable",
    uzbekName: "Qabul qilinuvchan",
    description: "Foydalanuvchilar axborotni turli sezgi a'zolari orqali qabul qila olishi kerak (ko'rish, eshitish).",
    icon: Eye,
    checks: [
      "Barcha rasmlar uchun muqobil matn (alt text) yozilgan.",
      "Video darsliklar uchun subtitr (taglavha) va transkript qo'shilgan.",
      "Matn va fon o'rtasida yetarlicha rang kontrasti mavjud (WCAG 4.5:1)."
    ]
  },
  {
    id: "operable",
    name: "Operable",
    uzbekName: "Boshqariluvchan",
    description: "Foydalanuvchilar interfeysni o'zlari xohlagan usulda (faqat klaviatura orqali, sichqonchasiz) boshqara olishi kerak.",
    icon: Hand,
    checks: [
      "Saytdagi barcha tugmalar faqat klaviaturadagi 'Tab' tugmasi orqali ham ishlaydi.",
      "O'qish uchun yetarlicha vaqt berilgan, vaqt bilan chegaralangan harakatlar yo'q.",
      "Miltillovchi yoki tez harakatlanuvchi (tutqanoq chaqiruvchi) elementlar yo'q."
    ]
  },
  {
    id: "understandable",
    name: "Understandable",
    uzbekName: "Tushunarli",
    description: "Axborot va interfeysning ishlashi oson tushuniladigan va oldindan taxmin qilsa bo'ladigan bo'lishi kerak.",
    icon: Brain,
    checks: [
      "Matnlar oddiy, tushunarli tillarda va qisqa jumlalarda yozilgan.",
      "Saytning xarita (navigatsiyasi) har bir sahifada bir xil joylashgan.",
      "Foydalanuvchi xato qilsa (masalan shakl to'ldirishda), unga tushunarli yordam ko'rsatiladi."
    ]
  },
  {
    id: "robust",
    name: "Robust",
    uzbekName: "Mustahkam",
    description: "Kontent turli xil texnologiyalar (shu jumladan yordamchi texnologiyalar: screen reader) tomonidan to'g'ri o'qila olishi kerak.",
    icon: LayoutTemplate,
    checks: [
      "Sayt mobil telefon, planshet va kompyuterlarda birdek to'g'ri ishlaydi.",
      "HTML kodlar standartlarga mos (h1, h2, ul, li kabi teglardan to'g'ri foydalanilgan).",
      "Yordamchi texnologiyalar (ekran o'quvchilar) elementning nima ekanligini, qanday holatdaligini o'qiy oladi."
    ]
  }
]

export function POURChecklist({ onProgressUpdate }: { onProgressUpdate: (checkedCount: number) => void }) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  const toggleCheck = (id: string, idx: number) => {
    const key = `${id}-${idx}`
    const newChecked = new Set(checkedItems)
    if (newChecked.has(key)) {
      newChecked.delete(key)
    } else {
      newChecked.add(key)
    }
    setCheckedItems(newChecked)
    onProgressUpdate(newChecked.size)
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {principles.map((p) => {
          const Icon = p.icon
          const allCheckedInGroup = p.checks.every((_, idx) => checkedItems.has(`${p.id}-${idx}`))

          return (
            <div 
              key={p.id} 
              className={`border rounded-xl p-5 bg-card shadow-sm transition-colors ${allCheckedInGroup ? 'border-primary shadow-primary/10 bg-primary/5' : ''}`}
            >
              <div className="flex items-center justify-between mb-4 border-b pb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${allCheckedInGroup ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{p.name}</h3>
                    <p className="text-sm text-muted-foreground font-medium">{p.uzbekName}</p>
                  </div>
                </div>
                {allCheckedInGroup && <CheckCircle2 className="w-6 h-6 text-primary animate-in zoom-in" />}
              </div>
              
              <p className="text-sm text-foreground/80 mb-4 h-10">{p.description}</p>
              
              <div className="space-y-2">
                {p.checks.map((checkText, idx) => {
                  const key = `${p.id}-${idx}`
                  const isChecked = checkedItems.has(key)
                  return (
                    <label 
                      key={key} 
                      className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${isChecked ? 'bg-primary border-primary text-primary-foreground' : 'hover:bg-muted bg-background border-border/50'}`}
                    >
                      <input 
                        type="checkbox" 
                        checked={isChecked}
                        onChange={() => toggleCheck(p.id, idx)}
                        className="mt-1 w-4 h-4 accent-primary"
                      />
                      <span className="text-sm leading-tight flex-1 font-medium">{checkText}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
