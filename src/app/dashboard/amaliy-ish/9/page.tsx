"use client"

import { useState } from "react"
import { useProgress } from "@/hooks/useProgress"
import { StepProgress } from "@/components/shared/StepProgress"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowRight, CheckCircle2, MessageSquare, Bot, AlertTriangle, ShieldAlert } from "lucide-react"

export default function AmaliyIsh9Page() {
  const amaliyId = 9
  const { progress, isLoaded, completeStep, markCompleted } = useProgress()
  const [currentStep, setCurrentStep] = useState(0)
  
  // States
  const [forumPrompt, setForumPrompt] = useState("")
  const [moderationReply, setModerationReply] = useState("")
  const [reflection, setReflection] = useState("")

  // AI states
  const [aiLoading, setAiLoading] = useState(false)
  const [promptFeedback, setPromptFeedback] = useState("")
  const [modFeedback, setModFeedback] = useState("")

  const workProgress = progress[`amaliy_${amaliyId}`]

  if (!isLoaded || !workProgress) return <div className="p-8 text-center text-muted-foreground">Yuklanmoqda...</div>

  const handleNext = () => {
    completeStep(amaliyId, currentStep)
    if (currentStep < workProgress.total_steps - 1) {
      setCurrentStep(prev => prev + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      markCompleted(amaliyId)
      alert("Tabriklaymiz! Siz Amaliy Ish №9 ni muvaffaqiyatli yakunladingiz.")
    }
  }

  const checkAI = async (text: string, type: "forum_prompt" | "moderation") => {
    if (!text) return
    setAiLoading(true)
    if (type === "forum_prompt") setPromptFeedback("")
    else setModFeedback("")
    
    try {
      const res = await fetch("/api/ai/analyze-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, type })
      })
      if (!res.ok) throw new Error("API xatosi")
      
      const data = await res.json()
      if (type === "forum_prompt") setPromptFeedback(data.result)
      else setModFeedback(data.result)
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
          Amaliy Ish №9: {workProgress.title}
        </h1>
        <p className="text-muted-foreground">
          Ushbu amaliy ishda siz LMS da forum muhokamalarini tashkil etish, ochiq savollar tuzish va murakkab/ziddiyatli vaziyatlarda to'g'ri moderatsiya qilishni o'rganasiz.
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
            <h2 className="text-2xl font-bold mb-2">1-qadam: Forum dizayni (Ochiq savollar)</h2>
            <p className="text-muted-foreground mb-6">
              O'quvchilarni baxslashishga va tanqidiy fikrlashga chorlaydigan muhokama savolini yozing. Savolingiz "Ha/Yo'q" deb javob beriladigan bo'lmasin. AI yordamida natijani tekshiring.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    Muhokama savoli
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea 
                    value={forumPrompt}
                    onChange={(e) => setForumPrompt(e.target.value)}
                    placeholder="Masalan: 'Agar sun'iy intellekt barcha kodlarni o'zi yoza olsa, kelajakda dasturchining asosiy vazifasi nima bo'ladi? Fikringizni asoslab bering.'"
                    className="min-h-[150px] resize-none"
                  />
                  <Button onClick={() => checkAI(forumPrompt, "forum_prompt")} disabled={forumPrompt.length < 15 || aiLoading} className="w-full">
                    {aiLoading && !modFeedback && !promptFeedback ? "Tekshirilmoqda..." : "Netiquette tahlili"}
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-muted/30 border-dashed">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bot className="w-5 h-5 text-primary" />
                    AI Tahlili (Ochiqlik va Netiquette)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {promptFeedback ? (
                    <div className="bg-background p-4 rounded-xl border text-sm leading-relaxed whitespace-pre-wrap shadow-sm">
                      {promptFeedback}
                    </div>
                  ) : (
                    <div className="h-[150px] flex flex-col items-center justify-center text-muted-foreground">
                      <AlertTriangle className="w-8 h-8 opacity-20 mb-2" />
                      <p className="text-sm text-center">Savolingiz qanchalik qiziqarli ekanligini bilish uchun uni tekshiring.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-end mt-8">
              <Button onClick={handleNext} disabled={!promptFeedback} className="gap-2">
                Davom etish <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold mb-2">2-qadam: Moderatsiya Simulyatori</h2>
            <p className="text-muted-foreground mb-6">
              Kurs forumida o'quvchilardan biri qoida buzilishi va norozilik ko'rsatmoqda. O'ziga xos tarzda unga qanday javob qaytarasiz?
            </p>

            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex gap-4 p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-destructive text-white flex items-center justify-center shrink-0">
                  S
                </div>
                <div>
                  <div className="font-bold text-destructive flex items-center gap-2">Student_77 <span className="text-xs font-normal text-muted-foreground">15 daqiqa oldin</span></div>
                  <p className="mt-1 text-sm text-foreground/90">"Bu darslikni kim tuzgan o'zi?! Hech narsani tushunib bo'lmaydi, hamma topshiriqlar xato. Vaqtimni bekorga ketkazyapsizlar! Menga umuman yoqmadi."</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-warning" />
                      Pedagog/Moderator javobi
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea 
                      value={moderationReply}
                      onChange={(e) => setModerationReply(e.target.value)}
                      placeholder="Javobingizni shu yerga yozing..."
                      className="min-h-[150px] resize-none"
                    />
                    <Button onClick={() => checkAI(moderationReply, "moderation")} disabled={moderationReply.length < 10 || aiLoading} className="w-full">
                      Professionalizmni baholash
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-muted/30 border-dashed">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Bot className="w-5 h-5 text-primary" />
                      AI Maslahati (De-eskalatsiya)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {modFeedback ? (
                      <div className="bg-background p-4 rounded-xl border text-sm leading-relaxed whitespace-pre-wrap shadow-sm">
                        {modFeedback}
                      </div>
                    ) : (
                      <div className="h-[150px] flex flex-col items-center justify-center text-muted-foreground">
                        <AlertTriangle className="w-8 h-8 opacity-20 mb-2" />
                        <p className="text-sm text-center">Javobingiz konflikni yumshatishga yoki avj oldirishga qaratilganini bilish uchun tekshiring.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button onClick={handleNext} disabled={!modFeedback} className="gap-2">
                  Davom etish <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="max-w-3xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <Card className="border-success/30">
              <CardHeader className="bg-success/5 border-b border-success/10 text-center py-8">
                <div className="mx-auto w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-success" />
                </div>
                <CardTitle className="text-2xl">Yakuniy O'zini Tekshirish</CardTitle>
                <CardDescription className="text-base mt-2">
                  Amaliy ish davomida o'rganganlaringiz bo'yicha qisqacha xulosa yozing.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-semibold">Internet trollari yoki g'azablangan o'quvchilar bilan ishlashda o'qituvchining eng muhim qoidasi (Netiquette) nima ekan deb o'ylaysiz?</Label>
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
