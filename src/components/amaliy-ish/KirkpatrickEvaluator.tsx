"use client"

import { useState } from "react"
import { CheckCircle2, MessageCircle, BookOpen, Activity, Target } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

const levels = [
  {
    id: "reaction",
    level: "1-daraja",
    title: "Reaksiya (Reaction)",
    description: "Talabalar o'quv mashg'ulotini qanday qabul qildi? Ularga yoqdimi? Dizayn va jarayon qulaymidimi?",
    icon: MessageCircle,
    color: "bg-blue-500",
    placeholder: "Masalan: Kurs so'ngida yulduzchalar va bitta ochiq savoldan iborat qisqa so'rovnoma o'tkazaman..."
  },
  {
    id: "learning",
    level: "2-daraja",
    title: "O'rganish (Learning)",
    description: "Ular aniq nimani o'rgandilar? O'quv maqsadlariga erishildimi? Bilim va ko'nikmalar darajasi oshdimi?",
    icon: BookOpen,
    color: "bg-purple-500",
    placeholder: "Masalan: Kursdan oldin va keyin test olaman. Loyiha himoyasi orqali amaliy bilimini tekshiraman..."
  },
  {
    id: "behavior",
    level: "3-daraja",
    title: "Xulq-atvor (Behavior)",
    description: "O'rgangan bilimlari amalda (ishda) qo'llanilyaptimi? O'qishdan so'ng odatlari ijobiy tomonga o'zgardimi?",
    icon: Activity,
    color: "bg-orange-500",
    placeholder: "Masalan: Treningdan so'ng xodimlarning ishini 1 oy davomida kuzataman. Qanchalik yangi bilimlarni mustaqil ishlata olyapti..."
  },
  {
    id: "results",
    level: "4-daraja",
    title: "Natija (Results)",
    description: "Yakuniy ijobiy ta'sir qanday bo'ldi? Kompaniya daromadi oshdimi? Mijozlar shikoyati kamaydimi? Haqiqiy muammo hal bo'ldimi?",
    icon: Target,
    color: "bg-green-500",
    placeholder: "Masalan: Platforma joriy etilgach, kompaniyadagi xatolar soni 20% ga kamayganini statistikadan tekshiraman..."
  }
]

export function KirkpatrickEvaluator({ onComplete }: { onComplete: (isComplete: boolean) => void }) {
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const handleChange = (id: string, value: string) => {
    const updated = { ...answers, [id]: value }
    setAnswers(updated)
    
    // Check if all 4 are answered with min 10 chars
    const passed = Object.keys(updated).length === 4 && Object.values(updated).every(v => v.trim().length >= 10)
    onComplete(passed)
  }

  return (
    <div className="space-y-4">
      {levels.map((lvl) => {
        const Icon = lvl.icon
        const isAnswered = (answers[lvl.id] || "").trim().length >= 10

        return (
          <div 
            key={lvl.id} 
            className={`border rounded-xl p-5 bg-card transition-colors ${isAnswered ? 'border-success/50 bg-success/5 shadow-sm' : ''}`}
          >
            <div className="flex gap-4">
              <div className={`mt-1 w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 ${lvl.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{lvl.level}</span>
                    <h3 className="font-bold text-lg leading-tight">{lvl.title}</h3>
                  </div>
                  {isAnswered && <CheckCircle2 className="w-6 h-6 text-success animate-in zoom-in" />}
                </div>

                <p className="text-sm text-foreground/80 leading-relaxed">{lvl.description}</p>
                
                <div className="pt-2">
                  <Textarea 
                    value={answers[lvl.id] || ""}
                    onChange={(e) => handleChange(lvl.id, e.target.value)}
                    placeholder={lvl.placeholder}
                    className={`resize-none min-h-[80px] bg-background ${isAnswered ? 'border-success/30' : ''}`}
                  />
                  {!isAnswered && (answers[lvl.id]?.length > 0) && (
                    <p className="text-xs text-warning mt-2">Batafsilroq fikr bildiring (kamida 10 ta belgi).</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
