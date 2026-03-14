"use client"

import { useState } from "react"
import { CircleDot, CheckSquare, ToggleLeft, ArrowLeftRight, TextCursorInput, Bot, Plus, Save, Trash2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export type Question = {
  id: string
  type: "mcq" | "multi" | "tf" | "matching" | "fill"
  text: string
  options: string[]
  correctIndex?: number
  correctIndices?: number[]
  tfAnswer?: boolean
  matchingPairs?: { left: string, right: string }[]
  fillAnswer?: string
  explanation: string
  bloomLevel: string
  difficulty: "Oson" | "O'rta" | "Qiyin"
}

export function QuestionBuilder({
  onQuestionsUpdate
}: {
  onQuestionsUpdate: (qs: Question[]) => void
}) {
  const [questions, setQuestions] = useState<Question[]>([])
  
  // Builder state
  const [activeType, setActiveType] = useState<Question["type"]>("mcq")
  const [qText, setQText] = useState("")
  const [qOptions, setQOptions] = useState<string[]>(["", "", "", ""])
  const [qCorrectIndex, setQCorrectIndex] = useState(0)
  const [qExplanation, setQExplanation] = useState("")
  const [qBloom, setQBloom] = useState("Tushunish")
  const [qDiff, setQDiff] = useState<"Oson" | "O'rta" | "Qiyin">("O'rta")
  
  // AI state
  const [aiText, setAiText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleAddQuestion = () => {
    if (!qText.trim()) return

    const newQ: Question = {
      id: Date.now().toString(),
      type: activeType,
      text: qText,
      options: qOptions.filter(o => o.trim() !== ""),
      correctIndex: qCorrectIndex,
      explanation: qExplanation,
      bloomLevel: qBloom,
      difficulty: qDiff
    }

    const updated = [...questions, newQ]
    setQuestions(updated)
    onQuestionsUpdate(updated)
    
    // Reset basic fields
    setQText("")
    setQExplanation("")
  }

  const handleDelete = (id: string) => {
    const updated = questions.filter(q => q.id !== id)
    setQuestions(updated)
    onQuestionsUpdate(updated)
  }

  const handleGenerateAI = async () => {
    if (!aiText.trim()) return
    setIsGenerating(true)
    
    try {
      const res = await fetch("/api/ai/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: aiText })
      })
      
      if (!res.ok) throw new Error("Tarmoq xatosi")
      
      const data = await res.json()
      // Map AI array of objects to Question type
      const generatedQs: Question[] = data.map((item: any, i: number) => ({
        id: `ai_${Date.now()}_${i}`,
        type: "mcq",
        text: item.question,
        options: item.options,
        correctIndex: item.correct_index,
        explanation: item.explanation,
        bloomLevel: item.bloom_level || "Tushunish",
        difficulty: item.difficulty || "O'rta"
      }))

      const updated = [...questions, ...generatedQs]
      setQuestions(updated)
      onQuestionsUpdate(updated)
      setAiText("")
    } catch (error) {
      alert("Savollarni yaratishda xato yuz berdi. Matnni qisqartirib ko'ring.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left Column: Tools */}
      <div className="space-y-6">
        <Card className="border-primary/20 shadow-sm">
          <CardHeader className="bg-primary/5 pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              AI yordamida generatsiya
            </CardTitle>
            <CardDescription>
              Mavzu matnini kiriting va AI avtomatik ravishda 5 ta sifatli savol tuzib beradi.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <Textarea 
              placeholder="Masalan: 'Kompyuter xotirasi ikki turga bo'linadi: operativ (RAM) va doimiy (ROM)...'"
              className="min-h-[120px] resize-none"
              value={aiText}
              onChange={(e) => setAiText(e.target.value)}
            />
            <Button onClick={handleGenerateAI} disabled={isGenerating || !aiText.trim()} className="w-full">
              {isGenerating ? "Generatsiya qilinmoqda..." : "Savollarni yaratish"}
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Qo'lda savol tuzish</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex bg-muted/50 p-1 rounded-lg gap-1 overflow-x-auto">
              <Button variant={activeType === "mcq" ? "default" : "ghost"} size="sm" onClick={() => setActiveType("mcq")} className="shrink-0">
                <CircleDot className="w-4 h-4 mr-2" /> Bitta javob
              </Button>
              <Button variant={activeType === "multi" ? "default" : "ghost"} size="sm" onClick={() => setActiveType("multi")} className="shrink-0" disabled title="Tez orada">
                <CheckSquare className="w-4 h-4 mr-2" /> Ko'p javob
              </Button>
              <Button variant={activeType === "tf" ? "default" : "ghost"} size="sm" onClick={() => setActiveType("tf")} className="shrink-0" disabled title="Tez orada">
                <ToggleLeft className="w-4 h-4 mr-2" /> Rost/Yolg'on
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Savol matni</Label>
                <Textarea 
                  value={qText} 
                  onChange={(e) => setQText(e.target.value)} 
                  placeholder="Savolni kiriting..."
                  className="resize-none"
                />
              </div>

              {activeType === "mcq" && (
                <div className="space-y-3">
                  <Label>Variantlar (to'g'ri javobni belgilang)</Label>
                  {qOptions.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="flex items-center justify-center pt-1">
                        <input 
                          type="radio" 
                          name="correct_option" 
                          checked={qCorrectIndex === idx}
                          onChange={() => setQCorrectIndex(idx)}
                          className="w-4 h-4 text-primary cursor-pointer border-gray-300 focus:ring-primary"
                        />
                      </div>
                      <Input 
                        value={opt} 
                        onChange={(e) => {
                          const newOpts = [...qOptions]
                          newOpts[idx] = e.target.value
                          setQOptions(newOpts)
                        }}
                        placeholder={`${idx + 1}-variant...`}
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Bloom darajasi</Label>
                  <Select value={qBloom} onValueChange={setQBloom}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Eslab qolish">Eslab qolish</SelectItem>
                      <SelectItem value="Tushunish">Tushunish</SelectItem>
                      <SelectItem value="Qo'llash">Qo'llash</SelectItem>
                      <SelectItem value="Tahlil">Tahlil</SelectItem>
                      <SelectItem value="Baholash">Baholash</SelectItem>
                      <SelectItem value="Yaratish">Yaratish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Qiyinlik (Qiyinlik darajasi)</Label>
                  <Select value={qDiff} onValueChange={(v: any) => setQDiff(v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Oson">Oson</SelectItem>
                      <SelectItem value="O'rta">O'rta</SelectItem>
                      <SelectItem value="Qiyin">Qiyin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tushuntirish (Fidbek)</Label>
                <Input 
                  value={qExplanation} 
                  onChange={(e) => setQExplanation(e.target.value)} 
                  placeholder="Agar talaba xato qilsa, ko'rsatiladigan yordamchi matn" 
                />
                <p className="text-xs text-muted-foreground mt-1 text-primary">👍 Yaxshi amaliyot: To'g'ri javob sababini doim yozib qoldiring.</p>
              </div>

              <Button onClick={handleAddQuestion} className="w-full">
                <Plus className="w-4 h-4 mr-2" /> Savollar bankiga qo'shish
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Question Bank */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Savollar banki</h2>
          <Badge variant="secondary" className="px-3 py-1 text-sm">{questions.length} ta savol</Badge>
        </div>

        {questions.length === 0 ? (
          <div className="text-center p-12 border-2 border-dashed rounded-xl text-muted-foreground bg-muted/20 flex flex-col items-center">
            <TextCursorInput className="w-12 h-12 mb-4 opacity-20" />
            <p>Hozircha savollar yo'q.</p>
            <p className="text-sm mt-1">AI orqali generatsiya qiling yoki qo'lda qo'shing.</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 pb-4">
            {questions.map((q, i) => (
              <Card key={q.id} className="relative group border-border/60 hover:border-primary/40 transition-colors">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(q.id)} className="h-8 w-8 text-destructive hover:bg-destructive/10">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <CardHeader className="pb-3 pt-4 px-5">
                  <div className="flex gap-2 mb-2">
                    <Badge variant="outline" className="text-[10px] uppercase bg-background">{q.difficulty}</Badge>
                    <Badge variant="secondary" className="text-[10px] uppercase bg-blue-50 text-blue-700 hover:bg-blue-100">{q.bloomLevel}</Badge>
                  </div>
                  <CardTitle className="text-base font-medium leading-relaxed pr-8">
                    {i + 1}. {q.text}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-4 space-y-2">
                  {q.type === "mcq" && q.options.map((opt, optIdx) => (
                    <div key={optIdx} className={`p-2.5 rounded-md text-sm flex items-start gap-3 border ${optIdx === q.correctIndex ? 'bg-success/10 border-success/30 font-medium' : 'bg-background border-border/50'}`}>
                      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] border ${optIdx === q.correctIndex ? 'bg-success text-white border-success' : 'bg-muted text-muted-foreground border-border'}`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      {opt}
                    </div>
                  ))}
                  {q.explanation && (
                    <div className="mt-4 p-3 bg-muted/40 rounded-md text-sm text-foreground/80 flex gap-2">
                      <Bot className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{q.explanation}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
