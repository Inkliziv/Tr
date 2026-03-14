"use client"

import { useState } from "react"
import { CheckCircle2, Save, Download, Package, Star, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useProgress } from "@/hooks/useProgress"

const checklistItems = [
  "Barcha amaliy ishlar (4-14) muvaffaqiyatli yakunlandi.",
  "O'quv kursi maqsadi, tuzilmasi va auditoriyasi aniqlandi.",
  "AI yordamida test savollari va o'quv materiallari yaratildi.",
  "Mayerning multimedia qoidalariga rioya qilindi.",
  "Inklyuzivlik va WCAG AA standartida ranglar tekshirildi.",
  "Kirkpatrick va PDCA orqali sifat nazorati o'rnatildi.",
  "AIDA modelida marketing strategiyasi tuzildi."
]

export function CapstoneChecklist({ onComplete }: { onComplete: () => void }) {
  const { progress } = useProgress()
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set())
  const [exporting, setExporting] = useState(false)
  const [exported, setExported] = useState(false)

  // Calculate actual progress stats
  const completedWorks = Object.values(progress).filter(p => 
    p.steps_done.length === p.total_steps
  ).length
  
  const totalScore = Object.values(progress).reduce((sum, p) => sum + p.score, 0)

  const toggleCheck = (idx: number) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(idx)) newChecked.delete(idx)
    else newChecked.add(idx)
    setCheckedItems(newChecked)
  }

  const handleExport = () => {
    setExporting(true)
    setTimeout(() => {
      setExporting(false)
      setExported(true)
      onComplete()
    }, 2500)
  }

  const isAllChecked = checkedItems.size === checklistItems.length

  return (
    <div className="grid md:grid-cols-5 gap-6">
      <div className="md:col-span-3 space-y-4">
        <div className="bg-card border rounded-xl overflow-hidden shadow-sm p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" /> Yakuniy Tekshiruv (Checklist)
          </h3>
          <p className="text-sm text-muted-foreground mb-6">Loyihani eksport qilishdan oldin hamma narsa tayyor ekanligiga ishonch hosil qiling.</p>
          
          <div className="space-y-3">
            {checklistItems.map((item, idx) => {
              const isChecked = checkedItems.has(idx)
              return (
                <label 
                  key={idx} 
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${isChecked ? 'bg-primary/5 border-primary text-primary-foreground' : 'hover:bg-muted bg-background border-border'}`}
                >
                  <input 
                    type="checkbox" 
                    checked={isChecked}
                    onChange={() => toggleCheck(idx)}
                    className="mt-1 w-4 h-4 accent-primary shrink-0"
                  />
                  <span className={`text-sm leading-tight flex-1 font-medium ${isChecked ? 'text-foreground' : 'text-foreground/80'}`}>{item}</span>
                </label>
              )
            })}
          </div>
        </div>
      </div>

      <div className="md:col-span-2 space-y-4">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-4 relative">
            <Star className="w-8 h-8 text-yellow-500 fill-yellow-500 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">
              {completedWorks}
            </div>
          </div>
          <h3 className="font-bold text-xl mb-1">Mening Portfoliom</h3>
          <p className="text-sm text-muted-foreground mb-4">To'plangan umumiy ball: <strong className="text-primary">{totalScore} XP</strong></p>
          
          <div className="w-full h-px bg-primary/10 my-2"></div>
          
          {!exported ? (
            <Button 
              className="w-full mt-4 gap-2 h-12" 
              onClick={handleExport}
              disabled={!isAllChecked || exporting || completedWorks === 0}
            >
              {exporting ? (
                <><RefreshCw className="w-5 h-5 animate-spin" /> Arxivlanmoqda...</>
              ) : (
                <><Package className="w-5 h-5" /> SCORM Paket sifatida yuklash</>
              )}
            </Button>
          ) : (
            <div className="w-full mt-4 bg-success/10 text-success border border-success/30 p-3 rounded-xl flex items-center justify-center gap-2 font-bold animate-in shrink-0">
              <Download className="w-5 h-5" /> Muvaffaqiyatli saqlandi
            </div>
          )}

          {!isAllChecked && !exported && (
            <p className="text-[11px] text-muted-foreground mt-3">Eksport qilish uchun chapdagi ro'yxatni to'liq belgilang.</p>
          )}
        </div>
      </div>
    </div>
  )
}
