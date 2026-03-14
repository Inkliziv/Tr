"use client"

import { useState } from "react"
import { useProgress } from "@/hooks/useProgress"
import { StepProgress } from "@/components/shared/StepProgress"
import { WireframeBuilder } from "@/components/amaliy-ish/WireframeBuilder"
import { ColorContrastChecker } from "@/components/amaliy-ish/ColorContrastChecker"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowRight, CheckCircle2, Palette, PenTool, Columns } from "lucide-react"

export default function AmaliyIsh10Page() {
  const amaliyId = 10
  const { progress, isLoaded, completeStep, markCompleted } = useProgress()
  const [currentStep, setCurrentStep] = useState(0)
  
  // States
  const [blocksCount, setBlocksCount] = useState(0)
  const [contrastPassed, setContrastPassed] = useState(true) // Start true if default colors pass
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
      alert("Tabriklaymiz! Siz Amaliy Ish №10 ni muvaffaqiyatli yakunladingiz.")
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
          Amaliy Ish №10: {workProgress.title}
        </h1>
        <p className="text-muted-foreground">
          Ushbu amaliy ishda siz ta'limiy platformani vizual loyihalash (UX/UI), wireframe usulida tuzilma yaratish va o'qiluvchanlik (WCAG) uchun ranglar kontrastini tekshirishni o'rganasiz.
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
                <h2 className="text-2xl font-bold mb-1">1-qadam: Tuzilma (Wireframing)</h2>
                <p className="text-muted-foreground">Yangi o'quv kursi sahifasining maketini tuzing. Chap paneldagi bloklarni qo'shib, o'quvchini mantiqiy tartibda tortadigan (UX) sahifa tayyorlang.</p>
              </div>
              <Button onClick={handleNext} disabled={blocksCount < 4} className="gap-2 shrink-0">
                Keyingi qadam <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            
            {blocksCount < 4 && (
              <div className="bg-warning/15 text-warning-foreground p-3 rounded-lg text-sm border border-warning/30 flex items-center gap-2">
                <Columns className="w-4 h-4 shrink-0" />
                Davom etish uchun kamida 4 xil komponentni (blokni) sahifaga joylashingiz so'raladi.
              </div>
            )}

            <WireframeBuilder onUpdateCount={setBlocksCount} />
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">2-qadam: Ranglar Kontrasti (Accessibility)</h2>
                <p className="text-muted-foreground mt-1">Siz tanlagan fon va matn rangi hamma uchun (ko'zi xiralashganlar uchun ham) aniq ko'rinishi shart (WCAG kridelari).</p>
              </div>
              <Button onClick={handleNext} disabled={!contrastPassed} className="gap-2 shrink-0">
                Keyingi qadam <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {!contrastPassed && (
              <div className="bg-destructive/15 text-destructive font-medium p-3 rounded-lg text-sm border border-destructive/30 flex items-center gap-2 mb-4">
                Davom etish uchun kontrast koeffitsiyentini kamida 4.5:1 (Oddiy Matn uchun AA darajasi) gacha ko'tarishingiz kerak.
              </div>
            )}

            <ColorContrastChecker onPass={setContrastPassed} />
          </div>
        )}

        {currentStep === 2 && (
          <div className="max-w-3xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <Card className="border-success/30">
              <CardHeader className="bg-success/5 border-b border-success/10 text-center py-8">
                <div className="mx-auto w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mb-4">
                  <Palette className="w-8 h-8 text-success" />
                </div>
                <CardTitle className="text-2xl">Yakuniy O'zini Tekshirish</CardTitle>
                <CardDescription className="text-base mt-2">
                  Amaliy ish davomida o'rganganlaringiz bo'yicha qisqacha xulosa yozing.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-semibold">Chiroyli dizayn bilan qulay dizayn (UX) o'rtasidagi asosiy farq nimada ekanligini his qildingiz?</Label>
                    <Textarea 
                      value={reflection}
                      onChange={(e) => setReflection(e.target.value)}
                      placeholder="Fikringizni shu yerda yozing..."
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
