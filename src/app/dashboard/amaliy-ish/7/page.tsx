"use client"

import { useState } from "react"
import { useProgress } from "@/hooks/useProgress"
import { StepProgress } from "@/components/shared/StepProgress"
import { MayersPrinciples } from "@/components/amaliy-ish/MayersPrinciples"
import { VideoSimulator } from "@/components/amaliy-ish/VideoSimulator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowRight, CheckCircle2, PlaySquare, Bot, AlertTriangle, MonitorPlay } from "lucide-react"

export default function AmaliyIsh7Page() {
  const amaliyId = 7
  const { progress, isLoaded, completeStep, markCompleted } = useProgress()
  const [currentStep, setCurrentStep] = useState(0)
  
  // States
  const [checkedPrinciplesCount, setCheckedPrinciplesCount] = useState(0)
  const [annotationsCount, setAnnotationsCount] = useState(0)
  const [captionText, setCaptionText] = useState("")
  const [aiLoading, setAiLoading] = useState(false)
  const [aiFeedback, setAiFeedback] = useState("")
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
      alert("Tabriklaymiz! Siz Amaliy Ish №7 ni muvaffaqiyatli yakunladingiz.")
    }
  }

  const checkCaption = async () => {
    if (!captionText) return
    setAiLoading(true)
    setAiFeedback("")
    
    try {
      const res = await fetch("/api/ai/check-captions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: captionText })
      })
      if (!res.ok) throw new Error("API xatosi")
      
      const data = await res.json()
      setAiFeedback(data.result)
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
          Amaliy Ish №7: {workProgress.title}
        </h1>
        <p className="text-muted-foreground">
          Ushbu amaliy ishda siz o'quv videolarni yaratishda R.Mayerning multimedia tamoyillarini qo'llash, videolarni interaktivlashtirish hamda subtitrlar sifatini tekshirishni o'rganasiz.
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
            <h2 className="text-2xl font-bold">1-qadam: Mayerning 12 tamoyili</h2>
            <p className="text-muted-foreground">
              O'quv videolarni sifatli qilish uchun Richard Mayerning quyidagi 12 ta tamoyilini o'zlashtiring. 
              Har birini o'qib chiqing va "Tushundim" tugmasini bosing. Kamida 6 tasini o'zlashtiring.
            </p>
            
            <div className="bg-muted p-4 rounded-xl flex items-center justify-between">
              <span className="font-medium">O'zlashtirildi: {checkedPrinciplesCount} / 12</span>
              {checkedPrinciplesCount >= 6 ? (
                <Button onClick={handleNext} className="gap-2">Davom etish <ArrowRight className="w-4 h-4" /></Button>
              ) : (
                <Button disabled variant="outline">Yana {6 - checkedPrinciplesCount} ta tamoyil qoldi</Button>
              )}
            </div>

            <MayersPrinciples onChange={setCheckedPrinciplesCount} />
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-2">2-qadam: Videoni Interaktivlashtirish</h2>
              <p className="text-muted-foreground mb-6">
                Passiv videoni faol o'quv jarayoniga aylantirish uchun taym-laynga interaktiv savollar va izohlar qo'shing. O'qishni bo'lish ("Segmenting") tamoyilini qo'llang.
              </p>
              
              <VideoSimulator onAddAnnotation={setAnnotationsCount} />
              
              <div className="mt-8 flex items-center justify-between bg-card border p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${annotationsCount >= 2 ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'}`}>
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Vazifa:</h4>
                    <p className="text-sm text-muted-foreground">Kamida 2 ta interaktiv test/izoh qo'shing (Hozir: {annotationsCount} ta)</p>
                  </div>
                </div>
                <Button onClick={handleNext} disabled={annotationsCount < 2} className="gap-2">
                  Keyingi qadam <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold">3-qadam: Subtitrlarni tekshirish (Akkredidatsiya/Inklyuziya)</h2>
            <p className="text-muted-foreground">
              Video ostidagi subtitrlar maxsus talablarga javob berishi kerak (masalan, bitta kadrda 2 qatordan oshmasligi). AI yordamida namunaviy subtitringizni tekshiring.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <PlaySquare className="w-5 h-5 text-primary" />
                    Subtitr matnini kiriting
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea 
                    value={captionText}
                    onChange={(e) => setCaptionText(e.target.value)}
                    placeholder="Masalan: 'Ushbu darsda biz sun'iy intellektning ta'limdagi o'rni haqida batafsil to'xtalib o'tamiz. Ko'rib turganingizdek bu grafik...'"
                    className="min-h-[150px] resize-none"
                  />
                  <Button onClick={checkCaption} disabled={!captionText || aiLoading} className="w-full">
                    {aiLoading ? "Tekshirilmoqda..." : "AI orqali tekshirish"}
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-muted/30 border-dashed">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bot className="w-5 h-5 text-primary" />
                    AI Xulosasi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {aiFeedback ? (
                    <div className="bg-background p-4 rounded-xl border text-sm leading-relaxed whitespace-pre-wrap shadow-sm font-medium">
                      {aiFeedback}
                    </div>
                  ) : (
                    <div className="h-[150px] flex flex-col items-center justify-center text-muted-foreground">
                      <AlertTriangle className="w-8 h-8 opacity-20 mb-2" />
                      <p className="text-sm text-center">Natijani ko'rish uchun chap tomonga subtitrni kiriting va tekshiring.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end mt-8">
              <Button onClick={handleNext} disabled={!aiFeedback} className="gap-2">
                Davom etish <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="max-w-3xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <Card className="border-success/30">
              <CardHeader className="bg-success/5 border-b border-success/10 text-center py-8">
                <div className="mx-auto w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mb-4">
                  <MonitorPlay className="w-8 h-8 text-success" />
                </div>
                <CardTitle className="text-2xl">Yakuniy O'zini Tekshirish</CardTitle>
                <CardDescription className="text-base mt-2">
                  Amaliy ish davomida o'rganganlaringiz bo'yicha qisqacha xulosa yozing.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-semibold">Siz yaratmoqchi bo'lgan (yoki yaratgan) o'quv videongizda eng ko'p qaysi tamoyilni buzgan ekansiz? Nima uchun va endi uni qanday to'g'irlaysiz?</Label>
                    <Textarea 
                      value={reflection}
                      onChange={(e) => setReflection(e.target.value)}
                      placeholder="Xulosangizni bu yerga yozing..."
                      className="min-h-[120px] text-base resize-none mt-3"
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
