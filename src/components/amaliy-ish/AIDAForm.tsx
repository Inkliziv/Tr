"use client"

import { useState } from "react"
import { CheckCircle2, Megaphone, Lightbulb, Heart, MousePointerClick } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

const aidaSteps = [
  {
    id: "attention",
    title: "1. Attention (Diqqatni tortish)",
    description: "Sarlavhada qanday qilib o'quvchini qiziqtirib olasiz? Qanday og'riqli muammoga teginasiz?",
    icon: Megaphone,
    color: "bg-red-500",
    border: "border-red-500",
    bg: "bg-red-500/10",
    placeholder: "Masalan: 'Siz ham saytingizda xaridorlar kamligidan charchadingizmi? Unday bo'lsa...'"
  },
  {
    id: "interest",
    title: "2. Interest (Qiziqish uyg'otish)",
    description: "Muammoning yechimi borligini, qanday ma'lumot berishingizni ayting va faktlar keltiring.",
    icon: Lightbulb,
    color: "bg-yellow-500",
    border: "border-yellow-500",
    bg: "bg-yellow-500/10",
    placeholder: "Masalan: 'Bizning yangi UX/UI dizayn kursimiz sizga qanday qilib mijozlarni saytda olib qolishni orgatadi...'"
  },
  {
    id: "desire",
    title: "3. Desire (Xohish yaratish)",
    description: "Kursning afzalliklari nimada? Agar o'qisa nimalarga erishadi (emotsional)?",
    icon: Heart,
    color: "bg-pink-500",
    border: "border-pink-500",
    bg: "bg-pink-500/10",
    placeholder: "Masalan: 'Ushbu kursdan so'ng daromadingiz kamida 2 barobar oshadi, sababi mijozlar endi...'"
  },
  {
    id: "action",
    title: "4. Action (Harakatga undash)",
    description: "O'quvchi xozir roppa-rosa nima qilishi kerak? Havolani bosish? Ro'yxatdan o'tish?",
    icon: MousePointerClick,
    color: "bg-green-500",
    border: "border-green-500",
    bg: "bg-green-500/10",
    placeholder: "Masalan: 'Hoziroq profildagi havolaga o'ting va bepul darsni ko'ring!'"
  }
]

export function AIDAForm({ onChange }: { onChange: (data: Record<string, string>, isComplete: boolean) => void }) {
  const [data, setData] = useState<Record<string, string>>({})

  const handleChange = (id: string, text: string) => {
    const newData = { ...data, [id]: text }
    setData(newData)
    
    // completed if all 4 are > 10 chars
    const pass = Object.keys(newData).length === 4 && Object.values(newData).every(v => v.trim().length >= 10)
    onChange(newData, pass)
  }

  return (
    <div className="space-y-4">
      {aidaSteps.map(step => {
        const Icon = step.icon
        const val = data[step.id] || ""
        const isDone = val.trim().length >= 10

        return (
          <div key={step.id} className={`border-2 rounded-xl overflow-hidden transition-all flex flex-col md:flex-row ${isDone ? step.border : 'border-border bg-card'}`}>
            <div className={`p-4 md:w-1/3 flex flex-col justify-center ${isDone ? step.bg : 'bg-muted/30'} border-b md:border-b-0 md:border-r ${isDone ? step.border : 'border-border'}`}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${isDone ? step.color : 'bg-muted-foreground/30'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold tracking-tight">{step.title}</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
            <div className="p-4 md:w-2/3 flex flex-col relative">
              <Textarea 
                value={val}
                onChange={(e) => handleChange(step.id, e.target.value)}
                placeholder={step.placeholder}
                className="min-h-[100px] text-base resize-none bg-background focus-visible:ring-1"
              />
              {isDone && <CheckCircle2 className={`absolute top-6 right-6 w-5 h-5 ${step.color.split(' ')[0].replace('bg-', 'text-')}`} />}
            </div>
          </div>
        )
      })}
    </div>
  )
}
