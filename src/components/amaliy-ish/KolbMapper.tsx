"use client"

import { useState } from "react"
import { Eye, Brain, Play, Hand, Info } from "lucide-react"

export type KolbStage = {
  id: string
  title: string
  description: string
  icon: any
  color: string
}

export const kolbStages: KolbStage[] = [
  {
    id: "concrete",
    title: "Konkret tajriba",
    description: "His qilish va tana orqali o'rgantish (Yangi tajriba orttirish).",
    icon: Hand,
    color: "bg-orange-500",
  },
  {
    id: "reflective",
    title: "Kuzatish va fikrlash",
    description: "Kuzatish va tajribani tahlil qilish (Nimani o'rganganligi haqida o'ylash).",
    icon: Eye,
    color: "bg-blue-500",
  },
  {
    id: "abstract",
    title: "Abstrakt konsepsiya",
    description: "Nazariy xulosalar chiqarish (Qoidalar, gipotezalar shakllantirish).",
    icon: Brain,
    color: "bg-purple-500",
  },
  {
    id: "active",
    title: "Faol tajriba",
    description: "Amalda qo'llab ko'rish (Yangi bilimlarni sinovdan o'tkazish).",
    icon: Play,
    color: "bg-green-500",
  }
]

export function KolbMapper({
  values,
  onChange
}: {
  values: Record<string, string>
  onChange: (newValues: Record<string, string>) => void
}) {
  const handleChange = (id: string, text: string) => {
    onChange({ ...values, [id]: text })
  }

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {kolbStages.map((stage) => {
        const Icon = stage.icon
        return (
          <div key={stage.id} className="border rounded-xl bg-card overflow-hidden shadow-sm flex flex-col">
            <div className="p-3 border-b flex items-center gap-2 bg-muted/20">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${stage.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-sm leading-tight">{stage.title}</h4>
                <p className="text-[10px] text-muted-foreground">{stage.description}</p>
              </div>
            </div>
            <div className="p-3 flex-1 flex flex-col">
              <textarea
                value={values[stage.id] || ""}
                onChange={(e) => handleChange(stage.id, e.target.value)}
                placeholder="Bu bosqichda talaba qanday vazifa bajaradi?"
                className="w-full flex-1 min-h-[80px] text-sm resize-none bg-transparent outline-none placeholder:text-muted-foreground/50 border-0 focus:ring-0 p-0"
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
