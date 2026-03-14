"use client"

import { useState } from "react"
import { useProgress } from "@/hooks/useProgress"
import { StepProgress } from "@/components/shared/StepProgress"
import { PDCAPlanner } from "@/components/amaliy-ish/PDCAPlanner"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowRight, CheckCircle2, TrendingUp, RefreshCw, Bot } from "lucide-react"

export default function AmaliyIsh13Page() {
  const amaliyId = 13
  const { progress, isLoaded, completeStep, markCompleted } = useProgress()
  const [currentStep, setCurrentStep] = useState(0)
  
  // States
  const [pdcaPassed, setPdcaPassed] = useState(false)
  
  const [problemText, setProblemText] = useState("")
  const [aiLoading, setAiLoading] = useState(false)
  const [aiResult, setAiResult] = useState("")
  
  const [reflection, setReflection] = useState("")

  const workProgress = progress[`amaliy_${amaliyId}`]

  if (!isLoaded || !workProgress) return <div className="p-8 text-center text-muted-foreground">Yuklanmoqda...</div>

  const handleNext = () => {
    completeStep(amaliyId, currentStep)
    if (currentStep < workProgress.total_steps - 1) {
      setCurrentStep(prev => prev + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      markCompleted(amaliyId)
      alert("Tabriklaymiz! Siz Amaliy Ish №13 ni muvaffaqiyatli yakunladingiz.")
    }
  }

  const getAIFeedback = async () => {
    if (!problemText.trim()) return
    setAiLoading(true)
    setAiResult("")
    try {
      const res = await fetch("/api/ai/analyze-pedagogy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem: problemText })
      })
      if (!res.ok) throw new Error("API Xato")
      const data = await res.json()
      setAiResult(data.result)
    } catch {
      alert("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.")
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
          Amaliy Ish №13: {workProgress.title}
        </h1>
        <p className="text-muted-foreground">
          Ushbu amaliy ishda siz sifatni uzluksiz oshirish uchun W. Deming'ning PDCA halqasidan foydalanishni va tahliliy yechimlar topishni o'rganasiz.
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
                <h2 className="text-2xl font-bold mb-1">1-qadam: PDCA Simulyatori o'tkazish</h2>
                <p className="text-muted-foreground">O'quv kursi sifati tushib ketyaptimi? Biror muammoni aniqlab, ushbu sikl bo'yicha rejalashtiring.</p>
              </div>
              <Button onClick={handleNext} disabled={!pdcaPassed} className="gap-2 shrink-0">
                Keyingi qadam <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            
            {!pdcaPassed && (
              <div className="bg-warning/15 text-warning-foreground p-3 rounded-lg text-sm border border-warning/30 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 shrink-0" />
                Davom etish uchun barcha 4 bosqichga matn kiritishingiz shart.
              </div>
            )}

            <PDCAPlanner onChange={setPdcaPassed} />
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">2-qadam: AI Tahliliy Yechimi</h2>
                <p className="text-muted-foreground mt-1">Haqiqiy holatdagi muammoingizni yozing. AI sizga PDCA uslubida qanday harakat qilishni rejalab beradi.</p>
              </div>
              <Button onClick={handleNext} disabled={!aiResult} className="gap-2 shrink-0">
                Keyingi qadam <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Darsingizdagi muammo</CardTitle>
                  <CardDescription>Masalan: Talabalar baholash testlarida past ball olyapti, tushunmayapti.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea 
                    value={problemText}
                    onChange={(e) => setProblemText(e.target.value)}
                    placeholder="Muammoni qisqacha tavsiflang..."
                    className="min-h-[120px] resize-none text-base"
                  />
                  <Button onClick={getAIFeedback} disabled={problemText.length < 10 || aiLoading} className="w-full gap-2 font-semibold h-11">
                    <Bot className="w-5 h-5" />
                    {aiLoading ? "Yechim izlanmoqda..." : "AI Taklifini Olish"}
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-muted/30 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">PDCA AI Natijasi</CardTitle>
                </CardHeader>
                <CardContent>
                  {aiLoading ? (
                    <div className="space-y-3 animate-pulse">
                      <div className="h-4 bg-muted-foreground/20 rounded w-full"></div>
                      <div className="h-4 bg-muted-foreground/20 rounded w-5/6"></div>
                      <div className="h-4 bg-muted-foreground/20 rounded w-4/6"></div>
                      <div className="h-4 bg-muted-foreground/20 rounded w-5/6"></div>
                    </div>
                  ) : aiResult ? (
                    <div className="text-sm leading-relaxed whitespace-pre-wrap text-foreground/90 bg-background p-4 rounded-lg border shadow-sm">
                      {aiResult}
                    </div>
                  ) : (
                    <div className="h-[120px] flex items-center justify-center text-muted-foreground text-sm flex-col">
                      Tahlil olish uchun chapdagi tugmani bosing.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="max-w-3xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <Card className="border-success/30">
              <CardHeader className="bg-success/5 border-b border-success/10 text-center py-8">
                <div className="mx-auto w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="w-8 h-8 text-success" />
                </div>
                <CardTitle className="text-2xl">Yakuniy O'zini Tekshirish</CardTitle>
                <CardDescription className="text-base mt-2">
                  Amaliy ish davomida o'rganganlaringiz bo'yicha qisqacha xulosa yozing.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-semibold text-foreground leading-relaxed block mb-2">
                      “Ko'p hollarda o'qituvchilar P (Plan) va D (Do) bosqichida to'xtab qoladi. Nega C (Check - Natijani o'lchash) qadami ta'lim jarayonida muhim deb o'ylaysiz?”
                    </Label>
                    <Textarea 
                      value={reflection}
                      onChange={(e) => setReflection(e.target.value)}
                      placeholder="Fikringizni shu yerda batafsil yozing..."
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
