"use client"

import { useState } from "react"
import { useProgress } from "@/hooks/useProgress"
import { StepProgress } from "@/components/shared/StepProgress"
import { KolbMapper } from "@/components/amaliy-ish/KolbMapper"
import { StepBuilder, InstructionStep, RubricCriterion } from "@/components/amaliy-ish/StepBuilder"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowRight, CheckCircle2, Bot, LayoutList, RefreshCw, Layers } from "lucide-react"

export default function AmaliyIsh5Page() {
  const amaliyId = 5
  const { progress, isLoaded, completeStep, markCompleted } = useProgress()
  const [currentStep, setCurrentStep] = useState(0)
  
  // States
  const [topic, setTopic] = useState("")
  const [kolbValues, setKolbValues] = useState<Record<string, string>>({})
  const [steps, setSteps] = useState<InstructionStep[]>([])
  const [rubrics, setRubrics] = useState<RubricCriterion[]>([])
  const [reflection, setReflection] = useState("")
  
  // AI Tools
  const [aiLoading, setAiLoading] = useState(false)
  const [aiResult, setAiResult] = useState("")

  const workProgress = progress[`amaliy_${amaliyId}`]

  if (!isLoaded || !workProgress) return <div className="p-8 text-center text-muted-foreground">Yuklanmoqda...</div>

  const handleNext = () => {
    completeStep(amaliyId, currentStep)
    if (currentStep < workProgress.total_steps - 1) {
      setCurrentStep(prev => prev + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      markCompleted(amaliyId)
      alert("Tabriklaymiz! Siz Amaliy Ish №5 ni muvaffaqiyatli yakunladingiz.")
    }
  }

  const handleGenerateAI = async () => {
    if (!topic.trim()) {
      alert("Iltimos qo'llanma generatsiya qilish uchun mavzu kiriting.")
      return
    }
    
    setAiLoading(true)
    setAiResult("")
    
    try {
      const res = await fetch("/api/ai/generate-lab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, subject: "Axborot Texnologiyalari" })
      })
      if (!res.ok) throw new Error("API xatosi")
      
      const data = await res.json()
      setAiResult(data.result)
    } catch {
      alert("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.")
    } finally {
      setAiLoading(false)
    }
  }

  const isKolbComplete = Object.keys(kolbValues).length === 4 && Object.values(kolbValues).every(v => v.trim().length > 5)
  const isStepsComplete = steps.length >= 3 && rubrics.length >= 1

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
          Amaliy Ish №5: {workProgress.title}
        </h1>
        <p className="text-muted-foreground">
          Ushbu amaliy ishda siz Devid Kolbning O'rganish Sikli asosida amaliy va laboratoriya mashg'ulotlarini loyihalashni, qo'llanma va baxolash rubrikasini tuzishni o'rganasiz.
        </p>
      </div>

      <div className="bg-card border rounded-xl p-4 shadow-sm mb-8 top-0 z-10 sticky">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Progress: {workProgress.steps_done.length} / {workProgress.total_steps} qadam
          </span>
          <span className="text-sm font-bold text-primary">
            {workProgress.score} XP
          </span>
        </div>
        <StepProgress 
          currentStep={currentStep} 
          totalSteps={workProgress.total_steps} 
          stepsDone={workProgress.steps_done} 
          onStepClick={(step) => setCurrentStep(step)}
        />
      </div>

      <div className="min-h-[500px]">
        {currentStep === 0 && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">1-qadam: Kolb Sikli orqali mashg'ulotni qoliplash</h2>
                <p className="text-muted-foreground mt-1">Tajribali o'rganish nazariyasi (Experiential Learning) bo'yicha laboratoriya ishingiz qanday kechadi?</p>
              </div>
              <Button onClick={handleNext} disabled={!isKolbComplete} className="gap-2">
                Keyingi qadam <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            
            {!isKolbComplete && (
              <div className="bg-warning/15 text-warning-foreground p-3 rounded-lg text-sm border border-warning/30 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 shrink-0" />
                Davom etish uchun Kolb siklining barcha 4 bosqichini to'ldiring.
              </div>
            )}

            <div className="bg-muted/10 border border-primary/10 rounded-xl p-6 shadow-sm">
              <KolbMapper values={kolbValues} onChange={setKolbValues} />
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">2-qadam: Yo'riqnoma va Rubrika yaratish</h2>
                <p className="text-muted-foreground mt-1">Talabalar lab ishi davomida nima ish qilishini qadamba-qadam yozing va baholash mezonlarini belgilang.</p>
              </div>
              <Button onClick={handleNext} disabled={!isStepsComplete} className="gap-2 shrink-0">
                Keyingi qadam <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {!isStepsComplete && (
              <div className="bg-warning/15 text-warning-foreground p-3 rounded-lg text-sm border border-warning/30 flex items-center gap-2 mb-4">
                <LayoutList className="w-4 h-4 shrink-0" />
                Davom etish uchun kamida 3 ta qadam va 1 ta baholash mezoni kiritishingiz kerak.
              </div>
            )}

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <StepBuilder onStepsChange={setSteps} onRubricChange={setRubrics} />
              </div>
              
              <div className="space-y-4">
                <Card className="border-primary/20 bg-muted/5 shadow-sm sticky top-32">
                  <CardHeader className="bg-primary/5 pb-4">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Bot className="w-4 h-4 text-primary" /> AI Yo'riqnoma Generatori
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Mavzuni bering va AI Kolb sikliga moslab sizga laboratoriya yo'riqnomasi tuzib beradi.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs">Laboratoriya ishi mavzusi:</Label>
                      <Input 
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Masalan: 'Figma yordamida UI yaratish'" 
                        className="text-sm bg-background h-9"
                      />
                    </div>
                    <Button 
                      className="w-full h-9 text-sm" 
                      onClick={handleGenerateAI}
                      disabled={aiLoading || !topic}
                    >
                      {aiLoading ? "Jeneratsiya qilinmoqda..." : "AI orqali yaratish"}
                    </Button>

                    {(aiLoading || aiResult) && (
                      <div className="pt-4 border-t border-dashed mt-4">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                          AI Xulosasi
                        </span>
                        {aiLoading ? (
                          <div className="bg-background border p-3 rounded-md animate-pulse space-y-2">
                            <div className="h-2 bg-muted-foreground/20 rounded w-full"></div>
                            <div className="h-2 bg-muted-foreground/20 rounded w-5/6"></div>
                            <div className="h-2 bg-muted-foreground/20 rounded w-4/6"></div>
                          </div>
                        ) : (
                          <div className="bg-background border border-primary/20 p-3 rounded-md text-xs whitespace-pre-wrap text-foreground/90 max-h-[300px] overflow-y-auto">
                            {aiResult}
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="max-w-3xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <Card className="border-success/30">
              <CardHeader className="bg-success/5 border-b border-success/10 text-center py-8">
                <div className="mx-auto w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mb-4">
                  <Layers className="w-8 h-8 text-success" />
                </div>
                <CardTitle className="text-2xl">Yakuniy O'zini Tekshirish</CardTitle>
                <CardDescription className="text-base mt-2">
                  Amaliy ish davomida o'rganganlaringiz bo'yicha qisqacha xulosa yozing.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-semibold">Kolb siklining to'rt bosqichi siz tuzmoqchi bo'lgan laboratoriya ishini qanday o'zgartirdi?</Label>
                    <p className="text-sm text-muted-foreground mt-1 mb-2">Faqat instruktsiya berish bilan ssenariyni Kolbga ko'ra tuzish orasida nima farq ko'rdingiz?</p>
                    <Textarea 
                      value={reflection}
                      onChange={(e) => setReflection(e.target.value)}
                      placeholder="Xulosangizni bu yerga yozing..."
                      className="min-h-[120px] text-base resize-none mt-2"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end pt-2 pb-6 px-6 bg-muted/10 border-t">
                <Button onClick={handleNext} className="gap-2" size="lg" disabled={reflection.length < 15}>
                  Amaliy ishni yakunlash <CheckCircle2 className="w-5 h-5" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
