"use client"

import { useState } from "react"
import { Plus, Trash2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export type UsabilityTask = {
  id: string
  scenario: string
  successCriteria: string
}

export function UsabilityTaskBuilder({ onChangeCount }: { onChangeCount: (count: number) => void }) {
  const [tasks, setTasks] = useState<UsabilityTask[]>([
    { id: "1", scenario: "Kursga kirib, birinchi darsning videosini oxirigacha ko'rish va testni yechish.", successCriteria: "Test natijasi ekranda chiqishi va keyingi dars ochilishi." }
  ])

  const addTask = () => {
    const fresh: UsabilityTask = { id: Date.now().toString(), scenario: "", successCriteria: "" }
    const updated = [...tasks, fresh]
    setTasks(updated)
    onChangeCount(updated.filter(t => t.scenario.trim() && t.successCriteria.trim()).length)
  }

  const removeTask = (id: string) => {
    const updated = tasks.filter(t => t.id !== id)
    setTasks(updated)
    onChangeCount(updated.filter(t => t.scenario.trim() && t.successCriteria.trim()).length)
  }

  const updateTask = (id: string, field: keyof UsabilityTask, value: string) => {
    const updated = tasks.map(t => t.id === id ? { ...t, [field]: value } : t)
    setTasks(updated)
    onChangeCount(updated.filter(t => t.scenario.trim() && t.successCriteria.trim()).length)
  }

  return (
    <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
      <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-sm">Usability Testing ssenariylari</h4>
          <p className="text-xs text-muted-foreground">Foydalanuvchilardan tizimni tekshirish uchun nima qilishini so'raysiz?</p>
        </div>
        <Button size="sm" onClick={addTask} variant="outline" className="gap-2">
          <Plus className="w-3.5 h-3.5" /> Vazifa qo'shish
        </Button>
      </div>

      <div className="p-4 space-y-4">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
            Hozircha vazifalar yo'q. Tepadagi tugma orqali test ssenariysini qo'shing.
          </div>
        ) : (
          tasks.map((task, idx) => (
            <div key={task.id} className="relative p-4 border rounded-xl bg-background shadow-sm group">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" onClick={() => removeTask(task.id)} className="text-destructive w-8 h-8 hover:bg-destructive/10">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Ssenariy / Vazifa</Label>
                  <Textarea 
                    value={task.scenario}
                    onChange={(e) => updateTask(task.id, "scenario", e.target.value)}
                    placeholder="Masalan: 'Parolni tiklash sahifasiga o'ting va yangi parol o'rnating.'"
                    className="resize-none min-h-[60px] text-sm"
                  />
                </div>
              </div>

              <div className="pl-9">
                <div className="space-y-1 bg-success/5 border border-success/20 p-3 rounded-lg">
                  <Label className="text-xs text-success flex items-center gap-1.5 font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Muvaffaqiyat mezoni
                  </Label>
                  <Input 
                    value={task.successCriteria}
                    onChange={(e) => updateTask(task.id, "successCriteria", e.target.value)}
                    placeholder="Qachon bu vazifa bajarildi deb hisoblanadi?"
                    className="bg-transparent border-t-0 border-x-0 border-b border-success/30 rounded-none px-0 focus-visible:ring-0 shadow-none text-sm"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
