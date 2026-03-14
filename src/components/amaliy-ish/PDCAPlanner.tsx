"use client"

import { useState } from "react"
import { CheckCircle2, ClipboardList, PlaySquare, LineChart, RefreshCw } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

const cycleSteps = [
  {
    id: "plan",
    title: "Plan (Rejalashtirish)",
    description: "Muammoni aniqlang va yechim maqsadini qo'ying. Nima o'zgaradi?",
    icon: ClipboardList,
    color: "bg-blue-500 text-white",
    border: "border-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    id: "do",
    title: "Do (Bajarish)",
    description: "Rejani kichik miqyosda amalga oshiring (sinab ko'ring).",
    icon: PlaySquare,
    color: "bg-orange-500 text-white",
    border: "border-orange-500",
    bg: "bg-orange-500/10"
  },
  {
    id: "check",
    title: "Check (Tekshirish)",
    description: "Natijani oldingi holat bilan solishtiring. Maqsadga erishildimi?",
    icon: LineChart,
    color: "bg-purple-500 text-white",
    border: "border-purple-500",
    bg: "bg-purple-500/10"
  },
  {
    id: "act",
    title: "Act (Harakat qilish/Joriy etish)",
    description: "Agar ishlagan bo'lsa - asosiy standartga aylantiring. Yo'qsa - qaytadan Plan qiling.",
    icon: RefreshCw,
    color: "bg-green-500 text-white",
    border: "border-green-500",
    bg: "bg-green-500/10"
  }
]

export function PDCAPlanner({ onChange }: { onChange: (isComplete: boolean) => void }) {
  const [data, setData] = useState<Record<string, string>>({})

  const handleChange = (id: string, text: string) => {
    const newData = { ...data, [id]: text }
    setData(newData)
    
    // completed if all 4 are length > 10
    const pass = Object.keys(newData).length === 4 && Object.values(newData).every(v => v.trim().length >= 10)
    onChange(pass)
  }

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {cycleSteps.map(step => {
        const Icon = step.icon
        const val = data[step.id] || ""
        const isDone = val.trim().length >= 10

        return (
          <div key={step.id} className={`border-2 rounded-xl overflow-hidden transition-all ${isDone ? step.border : 'border-border bg-card'}`}>
            <div className={`p-3 flex items-center gap-3 ${isDone ? step.bg : 'bg-muted/30'} border-b ${isDone ? step.border : 'border-border'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDone ? step.color : 'bg-muted-foreground/20 text-muted-foreground'}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm tracking-tight">{step.title}</h4>
                  {isDone && <CheckCircle2 className={`w-4 h-4 ${step.color.split(' ')[0].replace('bg-', 'text-')}`} />}
                </div>
                <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">{step.description}</p>
              </div>
            </div>
            <div className="p-3">
              <Textarea 
                value={val}
                onChange={(e) => handleChange(step.id, e.target.value)}
                placeholder="Fikringizni bu yerga yozing..."
                className="min-h-[80px] text-sm resize-none bg-transparent border-0 focus-visible:ring-0 p-1 px-2"
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
