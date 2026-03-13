"use client"

import { useState } from "react"
import { Plus, Settings, Sparkles, GripVertical, Trash2, Settings2, CheckCircle2, ChevronDown, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { mockQuizQuestions, type QuizQuestion } from "@/lib/mock-data"

interface QuizBuilderProps {
  quizId?: string
}

export function QuizBuilder({ quizId }: QuizBuilderProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>(mockQuizQuestions)
  const [activeTab, setActiveTab] = useState("questions")
  const [isGenerating, setIsGenerating] = useState(false)
  const [sourceText, setSourceText] = useState("")
  const [isExporting, setIsExporting] = useState(false)

  const addQuestion = (type: QuizQuestion['type']) => {
    const newQuestion: QuizQuestion = {
      id: `q-${Date.now()}`,
      question: "Yangi savol...",
      type,
      options: type === 'MCQ_SINGLE' || type === 'MCQ_MULTIPLE' ? ["Variant 1", "Variant 2", "Variant 3", "Variant 4"] : undefined,
      correctAnswer: type === 'TRUE_FALSE' ? 0 : type === 'MCQ_SINGLE' ? 0 : undefined,
      difficulty: 'MEDIUM',
      points: 10
    }
    setQuestions([...questions, newQuestion])
  }

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id))
  }

  const generateAIQuestions = async () => {
    if (!sourceText) return
    setIsGenerating(true)
    try {
      const res = await fetch("/api/ai/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: sourceText, count: 10, difficulty: "mixed" }),
      })
      const data = await res.json()
      const generated: QuizQuestion[] = (data || []).map((q: any, idx: number) => ({
        id: `ai-${Date.now()}-${idx}`,
        question: q.question,
        type: "MCQ_SINGLE",
        options: q.options,
        correctAnswer: q.correct_index,
        explanation: q.explanation,
        difficulty: (q.difficulty || "MEDIUM").toUpperCase(),
        bloomLevel: q.bloom_level,
        points: 10,
      }))
      setQuestions(prev => [...prev, ...generated])
      setSourceText("")
    } catch (e) {
      console.error("AI_GENERATE_QUIZ_UI_ERROR", e)
    } finally {
      setIsGenerating(false)
    }
  }

  const exportToZukkoo = async () => {
    if (!quizId) return
    setIsExporting(true)
    try {
      const payload = questions
        .filter(q => q.options && typeof q.correctAnswer !== "undefined")
        .map(q => ({
          question: q.question,
          options: q.options,
          correct_index: typeof q.correctAnswer === "number" ? q.correctAnswer : 0,
          time_limit: 30,
        }))
      const res = await fetch(`/api/quizzes/${quizId}/export-zukkoo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questions: payload }),
      })
      const data = await res.json()
      console.log("Zukkoo JSON:", data)
      // Bu yerda data ni Zukkoo.uz ga yuborish yoki yangi oyna ochish mumkin.
    } catch (e) {
      console.error("ZUKKOO_EXPORT_ERROR", e)
    } finally {
      setIsExporting(false)
    }
  }

  const renderQuestionByType = (q: QuizQuestion, index: number) => {
    return (
      <Card key={q.id} className="mb-4 border-border/60 shadow-sm relative group overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 group-hover:bg-primary transition-colors"></div>
        <CardHeader className="py-3 px-4 flex flex-row items-start justify-between bg-muted/30 border-b">
          <div className="flex items-center gap-3">
            <GripVertical className="h-5 w-5 text-muted-foreground/40 cursor-grab hover:text-foreground" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold">{index + 1}.</span>
                <Badge variant="outline" className="text-[10px] font-semibold bg-background">{q.type.replace('_', ' ')}</Badge>
                <Badge variant="secondary" className={`text-[10px] ${
                  q.difficulty === 'HARD' ? 'bg-destructive/10 text-destructive' : 
                  q.difficulty === 'MEDIUM' ? 'bg-warning/10 text-warning-foreground' : 
                  'bg-success/10 text-success'
                }`}>{q.difficulty}</Badge>
                {q.bloomLevel && <span className="text-[10px] text-muted-foreground uppercase">{q.bloomLevel}</span>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
            <div className="flex items-center border rounded-md px-2 py-1 bg-background mr-2 h-8">
              <span className="text-xs text-muted-foreground mr-1">Points:</span>
              <Input type="number" defaultValue={q.points} className="w-12 h-5 p-0 text-center border-none text-xs font-medium" />
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><Settings2 className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeQuestion(q.id)}><Trash2 className="h-4 w-4" /></Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 space-y-4">
          <Textarea defaultValue={q.question} className="font-medium bg-background text-sm resize-none h-[60px]" placeholder="Savolni kiriting..." />
          
          {/* Answer Options based on Type */}
          {(q.type === 'MCQ_SINGLE' || q.type === 'MCQ_MULTIPLE') && (
            <div className="space-y-2 pl-4">
              {q.options?.map((opt, i) => (
                <div key={i} className={`flex items-center gap-3 border rounded-md p-2 pl-3 ${q.correctAnswer === i ? 'bg-success/5 border-success/30' : 'bg-background hover:bg-muted/50'}`}>
                  <div className={`h-4 w-4 shrink-0 border border-muted-foreground ${q.type === 'MCQ_SINGLE' ? 'rounded-full' : 'rounded-sm'} ${q.correctAnswer === i ? 'bg-success border-success text-success-foreground flex items-center justify-center' : ''}`}>
                    {q.correctAnswer === i && <CheckCircle2 className="h-3 w-3" />}
                  </div>
                  <Input defaultValue={opt} className="h-8 border-none bg-transparent focus-visible:ring-0 shadow-none px-0" />
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground opacity-50"><X className="h-3 w-3" /></Button>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="text-xs mt-1 text-primary"><Plus className="h-3 w-3 mr-1" /> Variant qo'shish</Button>
            </div>
          )}

          {q.type === 'TRUE_FALSE' && (
            <div className="flex gap-4 pl-4">
              {q.options?.map((opt, i) => (
                <div key={i} className={`flex-1 flex items-center justify-center gap-2 border rounded-md p-3 cursor-pointer ${q.correctAnswer === i ? 'bg-success/10 border-success shadow-sm' : 'bg-background hover:bg-muted'}`}>
                  <div className={`h-4 w-4 rounded-full border border-muted-foreground ${q.correctAnswer === i ? 'bg-success border-success' : ''}`}></div>
                  <span className="font-medium text-sm">{opt}</span>
                </div>
              ))}
            </div>
          )}

          {q.type === 'SHORT_ANSWER' && (
            <div className="pl-4 space-y-2">
              <label className="text-xs font-medium text-success dark:text-success-foreground flex items-center"><CheckCircle2 className="mr-1 h-3 w-3" /> To'g'ri javob:</label>
              <Input defaultValue={q.correctAnswer as string} className="bg-success/5 border-success/30" />
            </div>
          )}

          {q.explanation && (
            <div className="mt-4 pt-3 border-t pl-4">
              <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">Tushuntirish (Ixtiyoriy)</label>
              <Textarea defaultValue={q.explanation} className="text-sm min-h-[60px] max-h-[100px] text-muted-foreground italic" />
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Test Boshqaruvi</h2>
          <p className="text-muted-foreground text-sm">Savollar tuzing, sozlamalarni o'zgartiring va AI yordamidan foydalaning.</p>
        </div>
        <div className="flex items-center gap-2">
          {quizId && (
            <Button variant="outline" size="sm" onClick={exportToZukkoo} disabled={isExporting}>
              Zukkoo'da o'ynash
            </Button>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white">
                <Sparkles className="mr-2 h-4 w-4" /> AI Bilan Yaratish
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="flex items-center"><Sparkles className="mr-2 h-5 w-5 text-[#7C3AED]" /> AI Test Generatori</DialogTitle>
                <DialogDescription>
                  Dars matnini kiriting va AI avtomatik ravishda Bloom taksonomiyasiga mos test savollarini tuzib beradi.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Asosiy matn / Ma'lumot</label>
                  <Textarea 
                    placeholder="Masalan: Python bu yuqori darajali obyektga yo'naltirilgan dasturlash tili..." 
                    className="min-h-[150px]"
                    value={sourceText}
                    onChange={(e) => setSourceText(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Savollar soni</label>
                    <Select defaultValue="5">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 ta</SelectItem>
                        <SelectItem value="10">10 ta</SelectItem>
                        <SelectItem value="15">15 ta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Qiyinchilik</label>
                    <Select defaultValue="mixed">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Oson</SelectItem>
                        <SelectItem value="mixed">Aralash (Yaxshi)</SelectItem>
                        <SelectItem value="hard">Qiyin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Bekor qilish</Button>
                <Button onClick={generateAIQuestions} disabled={isGenerating || !sourceText} className="bg-[#7C3AED] hover:bg-[#6D28D9]">
                  {isGenerating ? "Jeneratsiya qilinmoqda..." : "Savollar Yaratish"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="questions">Savollar ({questions.length})</TabsTrigger>
          <TabsTrigger value="settings">Test Sozlamalari</TabsTrigger>
          <TabsTrigger value="bank">Savollar Banki</TabsTrigger>
        </TabsList>
        
        <TabsContent value="questions" className="space-y-4 mt-0 border rounded-lg bg-card/50 p-6 min-h-[500px]">
          {/* Question List */}
          <div className="space-y-4">
            {questions.map((q, i) => renderQuestionByType(q, i))}
            
            {questions.length === 0 && (
              <div className="text-center py-12 text-muted-foreground flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                  <Plus className="h-6 w-6 text-muted-foreground/50" />
                </div>
                <h3 className="text-lg font-medium text-foreground">Savollar yo'q</h3>
                <p className="text-sm mt-1 max-w-sm">Jadvalga savollar qo'shing yoki AI orqali generatsiya qiling.</p>
              </div>
            )}
          </div>

          {/* Add Question Options */}
          <div className="pt-6 border-t flex flex-wrap gap-2 justify-center">
            <Button variant="outline" size="sm" onClick={() => addQuestion('MCQ_SINGLE')} className="bg-background">
              <Plus className="h-4 w-4 mr-1" /> Bir nechta tanlov
            </Button>
            <Button variant="outline" size="sm" onClick={() => addQuestion('MCQ_MULTIPLE')} className="bg-background">
              <Plus className="h-4 w-4 mr-1" /> Ko'p tanlovli (Checkbox)
            </Button>
            <Button variant="outline" size="sm" onClick={() => addQuestion('TRUE_FALSE')} className="bg-background">
              <Plus className="h-4 w-4 mr-1" /> Rost / Yolg'on
            </Button>
            <Button variant="outline" size="sm" onClick={() => addQuestion('SHORT_ANSWER')} className="bg-background">
              <Plus className="h-4 w-4 mr-1" /> Qisqa javob
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="bg-background">
                  Ko'proq <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => addQuestion('MATCHING')}>Moslashtirish</DropdownMenuItem>
                <DropdownMenuItem onClick={() => addQuestion('ORDERING')}>Ketma-ketlik</DropdownMenuItem>
                <DropdownMenuItem onClick={() => addQuestion('ESSAY')}>Esse yozish</DropdownMenuItem>
                <DropdownMenuItem disabled>Kod bloki (Tez kunda)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="border rounded-lg bg-card p-6 min-h-[500px]">
           <div className="max-w-2xl space-y-8">
             <div>
               <h3 className="text-lg font-medium mb-4">Umumiy</h3>
               <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-sm font-medium">Vaqt chegarasi (daqiqalarda)</label>
                   <Input type="number" defaultValue="20" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-medium">Urinishlar soni</label>
                   <Select defaultValue="1">
                     <SelectTrigger><SelectValue /></SelectTrigger>
                     <SelectContent>
                       <SelectItem value="1">1 marta</SelectItem>
                       <SelectItem value="2">2 marta</SelectItem>
                       <SelectItem value="3">3 marta</SelectItem>
                       <SelectItem value="unlimited">Cheklanmagan</SelectItem>
                     </SelectContent>
                   </Select>
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-medium">O'tish bali (%)</label>
                   <Input type="number" defaultValue="60" />
                 </div>
               </div>
             </div>
             
             <div className="space-y-4">
               <h3 className="text-lg font-medium border-b pb-2">Talaba tajribasi (UX)</h3>
               
               <div className="flex items-center justify-between border p-3 rounded-lg bg-background">
                 <div className="space-y-0.5">
                   <div className="text-sm font-medium">Savollarni aralashtirish</div>
                   <div className="text-xs text-muted-foreground">Har bir talabaga savollar har xil ketma-ketlikda tushadi.</div>
                 </div>
                 <div className="h-5 w-9 rounded-full bg-primary relative flex items-center justify-end px-0.5"><div className="h-4 w-4 bg-white rounded-full"></div></div>
               </div>

               <div className="flex items-center justify-between border p-3 rounded-lg bg-background">
                 <div className="space-y-0.5">
                   <div className="text-sm font-medium">Variantlarni aralashtirish</div>
                   <div className="text-xs text-muted-foreground">A, B, C, D variantlar o'rnini almashtirish.</div>
                 </div>
                 <div className="h-5 w-9 rounded-full bg-primary relative flex items-center justify-end px-0.5"><div className="h-4 w-4 bg-white rounded-full"></div></div>
               </div>
               
               <div className="flex items-center justify-between border p-3 rounded-lg bg-background opacity-70">
                 <div className="space-y-0.5">
                   <div className="text-sm font-medium">Zukkoo.uz Gamification Integratsiyasi</div>
                   <div className="text-xs text-alert flex items-center"><Badge variant="outline" className="text-[9px] mr-2 text-[#7C3AED] border-[#7C3AED]">YANGI</Badge> Talabalar sinfda interaktiv o'ynashi uchun (O'chirilgan)</div>
                 </div>
                 <div className="h-5 w-9 rounded-full bg-muted relative flex items-center justify-start px-0.5"><div className="h-4 w-4 bg-white rounded-full shadow-sm"></div></div>
               </div>
             </div>
           </div>
        </TabsContent>
        
        <TabsContent value="bank" className="border rounded-lg bg-card p-6 min-h-[500px] flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground mb-2">
                <Settings className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight">Savollar banki ulanmoqda</h3>
              <p className="text-sm text-muted-foreground max-w-[300px] mx-auto">
                Kelgusida oldingi testlardagi savollarni qidirish va qayta ishlatish imkoniyati qo'shiladi.
              </p>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
