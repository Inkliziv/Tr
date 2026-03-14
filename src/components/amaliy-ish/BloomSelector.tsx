"use client"

import { useState } from "react"
import { Check } from "lucide-react"

export type BloomLevel = "Eslab qolish" | "Tushunish" | "Qo'llash" | "Tahlil" | "Baholash" | "Yaratish"

const bloomData: Record<BloomLevel, { color: string, verbs: string, examples: string[] }> = {
  "Eslab qolish": {
    color: "bg-red-500",
    verbs: "Ta'riflash, sanab o'tish, eslash, takrorlash, nomlash, topish",
    examples: [
      "Fotosintez jarayoni nima?",
      "O'zbekiston qachon mustaqillikka erishgan?",
      "Yer qaysi sayyora?"
    ]
  },
  "Tushunish": {
    color: "bg-orange-500",
    verbs: "Tushuntirish, o'z so'zi bilan aytish, xulosa qilish, misol keltirish",
    examples: [
      "Global isishning asosiy sabablarini tushuntirib bering.",
      "Matnning asosiy g'oyasini o'z so'zingiz bilan yozing.",
      "Ushbu grafik nimani anglatishini izohlang."
    ]
  },
  "Qo'llash": {
    color: "bg-yellow-500",
    verbs: "Foydalanish, hisoblash, hal qilish, ko'rsatish, amalda qo'llash",
    examples: [
      "Nyutonning ikkinchi qonunidan foydalanib masalani yeching.",
      "Yangi o'rgangan qoidangiz asosida ingliz tilida gap tuzing.",
      "Ushbu formulani amaliyotda qanday ishlashini ko'rsating."
    ]
  },
  "Tahlil": {
    color: "bg-green-500",
    verbs: "Taqqoslash, ajratish, tahlil qilish, bog'liqlikni topish, farqlash",
    examples: [
      "Ikkita kitob qahramonining xarakterini taqqoslang.",
      "Muammoni qismlarga ajratib tahlil qiling.",
      "Ushbu matndagi mantiqiy xatolarni toping."
    ]
  },
  "Baholash": {
    color: "bg-blue-500",
    verbs: "Baholash, himoya qilish, hukm chiqarish, asoslash, bahslashish",
    examples: [
      "Qaysi dasturlash tili bu loyiha uchun eng yaxshi? Asoslab bering.",
      "Muallifning fikriga qo'shilasizmi? Nega?",
      "Qabul qilingan qarorning to'g'riligini baholang."
    ]
  },
  "Yaratish": {
    color: "bg-purple-500",
    verbs: "Yaratish, loyihalash, o'ylab topish, rejalashtirish, tuzish",
    examples: [
      "Yangi ijtimoiy tarmoq konsepsiyasini ishlab chiqing.",
      "Ekologik muammoni hal qilish uchun yangi reja tuzing.",
      "Berilgan mavzuda qisqa hikoya yozing."
    ]
  }
}

export function BloomSelector({
  selected,
  onSelect
}: {
  selected: BloomLevel | null
  onSelect: (level: BloomLevel) => void
}) {
  const levels = Object.keys(bloomData) as BloomLevel[]

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        {levels.map(level => {
          const isSelected = selected === level
          const { color } = bloomData[level]
          
          return (
            <button
              key={level}
              onClick={() => onSelect(level)}
              className={`relative px-4 py-2.5 rounded-full font-medium text-sm transition-all duration-200 transform hover:scale-105 flex items-center gap-2
                ${isSelected 
                  ? `${color} text-white shadow-lg ring-2 ring-offset-2 ring-${color.replace('bg-', '')}` 
                  : `bg-muted/50 text-foreground hover:bg-muted`
                }
              `}
            >
              {isSelected && <Check className="w-4 h-4" />}
              {level}
            </button>
          )
        })}
      </div>

      {selected && (
        <div className="bg-muted/30 border rounded-xl p-5 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-3 h-3 rounded-full ${bloomData[selected].color}`}></div>
            <h4 className="font-semibold text-lg">{selected} darajasi</h4>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Harakat fe'llari (Vazifa berish uchun):</p>
              <p className="text-sm border-l-2 border-primary/40 pl-3 py-1 bg-background/50 rounded-r-md">
                {bloomData[selected].verbs}
              </p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Namunaviy savollar:</p>
              <ul className="space-y-2">
                {bloomData[selected].examples.map((ex, i) => (
                  <li key={i} className="text-sm flex items-start gap-2 bg-background p-2 rounded-md border shadow-sm">
                    <span className="text-muted-foreground/50 select-none">•</span>
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
