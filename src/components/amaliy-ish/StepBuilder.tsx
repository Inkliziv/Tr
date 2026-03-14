"use client"

import { useState } from "react"
import { Plus, Trash2, ListOrdered, Award, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export type InstructionStep = {
  id: string
  title: string
  description: string
}

export type RubricCriterion = {
  id: string
  name: string
  points: number
}

export function StepBuilder({
  onStepsChange,
  onRubricChange
}: {
  onStepsChange: (steps: InstructionStep[]) => void
  onRubricChange: (rubric: RubricCriterion[]) => void
}) {
  const [steps, setSteps] = useState<InstructionStep[]>([])
  const [rubrics, setRubrics] = useState<RubricCriterion[]>([])

  const addStep = () => {
    const newStep: InstructionStep = {
      id: Date.now().toString(),
      title: "",
      description: ""
    }
    const updated = [...steps, newStep]
    setSteps(updated)
    onStepsChange(updated)
  }

  const removeStep = (id: string) => {
    const updated = steps.filter(s => s.id !== id)
    setSteps(updated)
    onStepsChange(updated)
  }

  const updateStep = (id: string, field: keyof InstructionStep, value: string) => {
    const updated = steps.map(s => s.id === id ? { ...s, [field]: value } : s)
    setSteps(updated)
    onStepsChange(updated)
  }

  const addRubric = () => {
    const newRubric: RubricCriterion = {
      id: Date.now().toString(),
      name: "",
      points: 10
    }
    const updated = [...rubrics, newRubric]
    setRubrics(updated)
    onRubricChange(updated)
  }

  const removeRubric = (id: string) => {
    const updated = rubrics.filter(r => r.id !== id)
    setRubrics(updated)
    onRubricChange(updated)
  }

  const updateRubric = (id: string, field: keyof RubricCriterion, value: string | number) => {
    const updated = rubrics.map(r => r.id === id ? { ...r, [field]: value } : r)
    setRubrics(updated)
    onRubricChange(updated)
  }

  const totalPoints = rubrics.reduce((sum, r) => sum + (Number(r.points) || 0), 0)

  return (
    <div className="border rounded-xl bg-card shadow-sm overflow-hidden">
      <Tabs defaultValue="steps" className="w-full">
        <TabsList className="w-full justify-start rounded-none border-b bg-muted/20 h-auto p-0">
          <TabsTrigger value="steps" className="data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-b-primary rounded-none py-3 px-6 gap-2">
            <ListOrdered className="w-4 h-4" /> Lab yo'riqnomasi
          </TabsTrigger>
          <TabsTrigger value="rubric" className="data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-b-primary rounded-none py-3 px-6 gap-2">
            <Award className="w-4 h-4" /> Baholash rubrikasi
          </TabsTrigger>
        </TabsList>

        <TabsContent value="steps" className="p-4 m-0 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm font-semibold">Qadamlar ketma-ketligi</h3>
              <p className="text-xs text-muted-foreground">Talabalar nima qabul qilishini ketma-ket yozib chiqing.</p>
            </div>
            <Button size="sm" onClick={addStep} variant="outline" className="gap-2">
              <Plus className="w-3.5 h-3.5" /> Qadam qo'shish
            </Button>
          </div>

          <div className="space-y-3">
            {steps.length === 0 ? (
              <div className="text-center py-6 border border-dashed rounded-lg text-muted-foreground text-sm">
                Hozircha qadamlar qo'shilmagan.
              </div>
            ) : (
              steps.map((step, index) => (
                <div key={step.id} className="flex gap-3 bg-muted/30 p-3 rounded-lg border group relative">
                  <div className="pt-2 text-muted-foreground/50 cursor-grab active:cursor-grabbing">
                    <GripVertical className="w-4 h-4" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 text-primary font-bold w-6 h-6 rounded flex items-center justify-center text-xs shrink-0">
                        {index + 1}
                      </div>
                      <Input 
                        value={step.title} 
                        onChange={(e) => updateStep(step.id, "title", e.target.value)} 
                        placeholder="Qadam sarlavhasi (Masalan: 'Muhitni sozlash')" 
                        className="h-8 bg-background"
                      />
                    </div>
                    <Textarea 
                      value={step.description}
                      onChange={(e) => updateStep(step.id, "description", e.target.value)}
                      placeholder="Aniq ko'rsatmalar bering..."
                      className="min-h-[60px] resize-none text-sm bg-background"
                    />
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeStep(step.id)} className="text-destructive hover:bg-destructive/10 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="rubric" className="p-4 m-0 space-y-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm font-semibold">Mezonlar va ballar</h3>
              <p className="text-xs text-muted-foreground">Talaba ishini qanday baholaysiz? Maksimal ball o'rnatishni unutmang.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary px-3 py-1.5 rounded-md font-medium text-sm">
                Jami: {totalPoints} ball
              </div>
              <Button size="sm" onClick={addRubric} variant="outline" className="gap-2">
                <Plus className="w-3.5 h-3.5" /> Mezon qo'shish
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {rubrics.length === 0 ? (
              <div className="text-center py-6 border border-dashed rounded-lg text-muted-foreground text-sm">
                Hozircha mezonlar yo'q.
              </div>
            ) : (
              <div className="border rounded-md overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted text-muted-foreground text-xs uppercase">
                    <tr>
                      <th className="px-4 py-2 font-medium">Baholash mezoni (Nimasi uchun baho beriladi?)</th>
                      <th className="px-4 py-2 font-medium w-24">Ball</th>
                      <th className="px-4 py-2 w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {rubrics.map((rubric) => (
                      <tr key={rubric.id} className="border-t bg-background">
                        <td className="p-2">
                          <Input 
                            value={rubric.name}
                            onChange={(e) => updateRubric(rubric.id, "name", e.target.value)}
                            placeholder="Masalan: 'Kodning to'g'ri ishlashi'"
                            className="bg-transparent border-transparent hover:border-border focus:bg-background"
                          />
                        </td>
                        <td className="p-2">
                          <Input 
                            type="number"
                            value={rubric.points}
                            onChange={(e) => updateRubric(rubric.id, "points", parseInt(e.target.value) || 0)}
                            className="bg-transparent text-center"
                            min="0"
                            max="100"
                          />
                        </td>
                        <td className="p-2 text-center">
                          <Button variant="ghost" size="icon" onClick={() => removeRubric(rubric.id)} className="h-8 w-8 text-destructive hover:bg-destructive/10">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
