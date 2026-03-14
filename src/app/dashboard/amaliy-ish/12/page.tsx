"use client"

import { useState } from "react"
import { useProgress } from "@/hooks/useProgress"
import { StepProgress } from "@/components/shared/StepProgress"
import { UsabilityTaskBuilder } from "@/components/amaliy-ish/UsabilityTaskBuilder"
import { KirkpatrickEvaluator } from "@/components/amaliy-ish/KirkpatrickEvaluator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowRight, CheckCircle2, ClipboardCheck, BarChart4, Target } from "lucide-react"

export default function AmaliyIsh12Page() {
  const amaliyId = 12
  const { progress, isLoaded, completeStep, markCompleted } = useProgress()
  const [currentStep, setCurrentStep] = useState(0)
  
  // States
  const [tasksCount, setTasksCount] = useState(1)
  const [kirkpatrickPassed, setKirkpatrickPassed] = useState(false)
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
      alert("Tabriklaymiz! Siz Amaliy Ish №12 ni muvaffaqiyatli yakunladingiz.")
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
          Amaliy Ish №12: {workProgress.title}
        </h1>
        <p className="text-muted-foreground">
          Ushbu amaliy ishda siz LMS platformasini test qilishni va Kirkpatrick modeli yordamida kurs muvaffaqiyatini baholashni o'rganasiz.
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
                <h2 className="text-2xl font-bold mb-1">1-qadam: Usability Testing (Qulaylikni sinash)</h2>
                <p className="text-muted-foreground">Dasturni sinab ko'rish uchun foydalanuvchilar qanday vazifalarni (ssenariy) bajarishi kerakligini yozing.</p>
              </div>
              <Button onClick={handleNext} disabled={tasksCount < 3} className="gap-2 shrink-0">
                Keyingi qadam <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            
            {tasksCount < 3 && (
              <div className="bg-warning/15 text-warning-foreground p-3 rounded-lg text-sm border border-warning/30 flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4 shrink-0" />
                Davom etish uchun kamida 3 ta aniq vazifa va muvaffaqiyat mezonini kiritishingiz shart.
              </div>
            )}

            <UsabilityTaskBuilder onChangeCount={setTasksCount} />
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">2-qadam: Kirkpatrick Modeli orqali baholash</h2>
                <p className="text-muted-foreground mt-1">Dars o'tib bo'lingandan so'ng, qaysi darajada qanday natija kutayapsiz?</p>
              </div>
              <Button onClick={handleNext} disabled={!kirkpatrickPassed} className="gap-2 shrink-0">
                Keyingi qadam <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {!kirkpatrickPassed && (
              <div className="bg-warning/15 text-warning-foreground font-medium p-3 rounded-lg text-sm border border-warning/30 flex items-center gap-2 mb-4">
                <BarChart4 className="w-4 h-4 shrink-0" />
                Davom etish uchun barcha 4 daraja ta'rifini to'ldiring.
              </div>
            )}

            <KirkpatrickEvaluator onComplete={setKirkpatrickPassed} />
          </div>
        )}

        {currentStep === 2 && (
          <div className="max-w-3xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <Card className="border-success/30">
              <CardHeader className="bg-success/5 border-b border-success/10 text-center py-8">
                <div className="mx-auto w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mb-4">
                  <Target className="w-8 h-8 text-success" />
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
                      “Ko'p o'qituvchilar faqat 1-darajali (Reaksiya, yoqdi/yoqmadi) baholashda to'xtashadi. Nima uchun 4-daraja (Natija/Tijorat foydasi) gacha borish kurs xaridorlari/buyurtmachilarini ko'ndirishda muhim?”
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
