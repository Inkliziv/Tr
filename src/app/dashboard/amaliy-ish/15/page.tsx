"use client"

import { useState } from "react"
import { useProgress } from "@/hooks/useProgress"
import { StepProgress } from "@/components/shared/StepProgress"
import { CapstoneChecklist } from "@/components/amaliy-ish/CapstoneChecklist"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowRight, CheckCircle2, GraduationCap, Trophy } from "lucide-react"

export default function AmaliyIsh15Page() {
  const amaliyId = 15
  const { progress, isLoaded, completeStep, markCompleted } = useProgress()
  const [currentStep, setCurrentStep] = useState(0)
  
  // States
  const [isExported, setIsExported] = useState(false)
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
      alert("Tabriklaymiz! Siz TATU 'Ta'limiy resurslarni ishlab chiqish' kursining barcha amaliy ishlarini (Capstone) a'lo darajada yakunladingiz!")
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2 flex items-center gap-3">
          Amaliy Ish №15 (Capstone): {workProgress.title} <Trophy className="w-8 h-8 text-yellow-500" />
        </h1>
        <p className="text-muted-foreground">
          Ushbu yakuniy amaliy ishda siz barcha oldingi ishlarni sarhisob qilasiz, tekshiruvdan o'tkazasiz va yakuniy LMS yoki SCORM formati sifatida eksport qilasiz.
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
                <h2 className="text-2xl font-bold mb-1">1-qadam: Yakuniy Audit va Eksport</h2>
                <p className="text-muted-foreground">Tajribali ped-dizaynerlar hech qachon kursni tekshirmasdan chiqarmaydi. Ro'yxatni tekshiring va Portfelni yuklab oling.</p>
              </div>
              <Button onClick={handleNext} disabled={!isExported} className="gap-2 shrink-0">
                Keyingi qadam <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            
            <CapstoneChecklist onComplete={() => setIsExported(true)} />
          </div>
        )}

        {currentStep === 1 && (
          <div className="max-w-3xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500 mt-12">
            <Card className="border-primary/30 shadow-lg shadow-primary/5">
              <CardHeader className="bg-gradient-to-b from-primary/10 to-transparent border-b text-center py-10">
                <div className="mx-auto w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 shadow-inner ring-4 ring-primary/10">
                  <GraduationCap className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-3xl">Kursni Yakunlash</CardTitle>
                <CardDescription className="text-lg mt-3 text-foreground/80">
                  Siz "Ta'limiy resurslarni ishlab chiqish" kursi bo'yicha barcha metodik bosqichlardan o'tdingiz. Asosiy maqsadimiz sizni shunchaki ma'lumot beruvchi emas, balki Haqiqiy Ta'lim Arxitektori (Learning Experience Designer) qilib tayyorlash edi.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8 space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-semibold text-foreground leading-relaxed block mb-2">
                      “Loyiha boshidan to hozirgi kungacha nimalar o'rgandingiz? Universitetdagi boshqa fanlardan farqli o'laroq, bu yerdagi qadam-baqadam yondashuv (AI yordami bilan) sizga qanday foyda berdi?”
                    </Label>
                    <Textarea 
                      value={reflection}
                      onChange={(e) => setReflection(e.target.value)}
                      placeholder="Samimiy fikrlaringiz va o'rganganlaringizni shu yerga yozing..."
                      className="min-h-[150px] text-base resize-none mt-2 bg-muted/20 focus:bg-background"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end pt-4 pb-8 px-8 bg-muted/5 border-t">
                <Button onClick={handleNext} className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md" size="lg" disabled={reflection.length < 30}>
                  KURSni to'liq tamomlash <CheckCircle2 className="w-6 h-6 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
