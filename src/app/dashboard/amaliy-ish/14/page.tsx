"use client"

import { useState } from "react"
import { useProgress } from "@/hooks/useProgress"
import { StepProgress } from "@/components/shared/StepProgress"
import { AIDAForm } from "@/components/amaliy-ish/AIDAForm"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowRight, CheckCircle2, Megaphone, Send, AtSign, Copy } from "lucide-react"

export default function AmaliyIsh14Page() {
  const amaliyId = 14
  const { progress, isLoaded, completeStep, markCompleted } = useProgress()
  const [currentStep, setCurrentStep] = useState(0)
  
  // States
  const [aidaPassed, setAidaPassed] = useState(false)
  const [aidaData, setAidaData] = useState<Record<string, string>>({})
  
  const [aiLoading, setAiLoading] = useState(false)
  const [aiResult, setAiResult] = useState("")
  const [copied, setCopied] = useState(false)
  
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
      alert("Tabriklaymiz! Siz Amaliy Ish №14 ni muvaffaqiyatli yakunladingiz.")
    }
  }

  const getAIFeedback = async () => {
    if (!aidaPassed) return
    setAiLoading(true)
    setAiResult("")
    try {
      const res = await fetch("/api/ai/generate-marketing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aidaData)
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

  const handleCopy = () => {
    if (aiResult) {
      navigator.clipboard.writeText(aiResult)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
          Amaliy Ish №14: {workProgress.title}
        </h1>
        <p className="text-muted-foreground">
          Ushbu amaliy ishda siz ta'limiy ijtimoiy tarmoqlardagi SMM va Copywriting qoidalari bilan tanishasiz. AIDA modelida o'quvchilarni jalb qiluvchi postlar tuzishni mashq qilasiz.
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
                <h2 className="text-2xl font-bold mb-1">1-qadam: AIDA reklama modelini to'ldirish</h2>
                <p className="text-muted-foreground">Qisqa javoblarni kiritib o'zingizning elektron kursingizni "sotish" rejasini tuzing.</p>
              </div>
              <Button onClick={handleNext} disabled={!aidaPassed} className="gap-2 shrink-0">
                Keyingi qadam <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            
            {!aidaPassed && (
              <div className="bg-warning/15 text-warning-foreground p-3 rounded-lg text-sm border border-warning/30 flex items-center gap-2">
                <AtSign className="w-4 h-4 shrink-0" />
                Davom etish uchun AIDA ning 4 ta elementiga javob bering.
              </div>
            )}

            <AIDAForm onChange={(data, pass) => { setAidaData(data); setAidaPassed(pass); }} />
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">2-qadam: AI orqali SMM Post yaratish</h2>
                <p className="text-muted-foreground mt-1">Oldingi qadamdagi ma'lumotlaringiz asosida Telegram yoki Instagram uchun tayyor post generatsiya qiling.</p>
              </div>
              <Button onClick={handleNext} disabled={!aiResult} className="gap-2 shrink-0">
                Keyingi qadam <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Card className="bg-muted/30 border-dashed">
                  <CardHeader>
                    <CardTitle className="text-lg">Kiritilgan AIDA rejangiz</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm"><strong>A:</strong> {aidaData.attention}</div>
                    <div className="text-sm"><strong>I:</strong> {aidaData.interest}</div>
                    <div className="text-sm"><strong>D:</strong> {aidaData.desire}</div>
                    <div className="text-sm"><strong>A:</strong> {aidaData.action}</div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={getAIFeedback} disabled={aiLoading} className="w-full gap-2 h-11">
                      <Send className="w-4 h-4" />
                      {aiLoading ? "Post yozilmoqda..." : "Post generatsiyasini boshlash"}
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <Card className="border-primary/20 bg-primary/5">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg text-primary flex items-center gap-2">
                    <Megaphone className="w-5 h-5" /> Tayyor Post
                  </CardTitle>
                  {aiResult && (
                    <Button variant="outline" size="sm" onClick={handleCopy} className="h-8">
                      {copied ? <CheckCircle2 className="w-4 h-4 text-success mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                      {copied ? 'Nusxalandi' : 'Nusxalash'}
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  {aiLoading ? (
                     <div className="space-y-3 animate-pulse bg-background p-4 rounded-xl border">
                       <div className="h-4 bg-muted-foreground/20 rounded w-1/3"></div>
                       <div className="h-4 bg-transparent rounded w-full"></div>
                       <div className="h-4 bg-muted-foreground/20 rounded w-full"></div>
                       <div className="h-4 bg-muted-foreground/20 rounded w-5/6"></div>
                       <div className="h-4 bg-muted-foreground/20 rounded w-4/6"></div>
                     </div>
                  ) : aiResult ? (
                    <div className="bg-background p-4 rounded-xl border shadow-sm text-sm leading-relaxed whitespace-pre-wrap text-foreground/90">
                      {aiResult}
                    </div>
                  ) : (
                    <div className="h-[200px] flex items-center justify-center text-muted-foreground text-sm flex-col bg-background rounded-xl border border-dashed">
                      Chapdagi tugmani bosib natijani oling.
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
                    <Label className="text-base font-semibold text-foreground leading-relaxed block mb-2">
                      “Nima uchun zo'r kurs yaratsangiz ham uni qanday sotish yoki targ'ib qilishni bilmaslik fojiaga olib keladi? AIDA formulasi sizga nimani o'rgatdi?”
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
