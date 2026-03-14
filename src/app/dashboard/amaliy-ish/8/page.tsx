"use client"

import { useState } from "react"
import { useProgress } from "@/hooks/useProgress"
import { StepProgress } from "@/components/shared/StepProgress"
import { CCPicker } from "@/components/amaliy-ish/CCPicker"
import { TASLGenerator } from "@/components/amaliy-ish/TASLGenerator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowRight, CheckCircle2, Globe, ShieldCheck } from "lucide-react"

export default function AmaliyIsh8Page() {
  const amaliyId = 8
  const { progress, isLoaded, completeStep, markCompleted } = useProgress()
  const [currentStep, setCurrentStep] = useState(0)
  
  // States
  const [selectedLicense, setSelectedLicense] = useState<string | null>(null)
  const [taslGenerations, setTaslGenerations] = useState(0)
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
      alert("Tabriklaymiz! Siz Amaliy Ish №8 ni muvaffaqiyatli yakunladingiz.")
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
          Amaliy Ish №8: {workProgress.title}
        </h1>
        <p className="text-muted-foreground">
          Ushbu amaliy ishda siz Ochiq Ta'lim Resurslari (OER) va Creative Commons litsenziyalari bilan ishlashni, hamda TASL standarti asosida mualliflik huquqlariga to'g'ri ishora qilishni o'rganasiz.
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
                <h2 className="text-2xl font-bold">1-qadam: Litsenziya tanlash (CC Picker)</h2>
                <p className="text-muted-foreground mt-1">Tasavvur qiling, siz yangi elektron darslik yaratdingiz. Uni internetga joylashda qaysi litsenziyadan foydalangan bo'lardingiz?</p>
              </div>
              <Button onClick={handleNext} disabled={!selectedLicense} className="gap-2 shrink-0">
                Keyingi qadam <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            
            {!selectedLicense && (
              <div className="bg-warning/15 text-warning-foreground p-3 rounded-lg text-sm border border-warning/30 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                Davom etish uchun savollarga javob berib, o'zingizga mos litsenziyani toping.
              </div>
            )}

            <CCPicker onSelect={setSelectedLicense} />
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">2-qadam: TASL bo'yicha Attributsiya yozish</h2>
                <p className="text-muted-foreground mt-1">Boshqalarning rasm yoki matnidan foydalanganda ularga qoidaga muvofiq ishora (sitata) qilish kerak. Bunga TASL ustuni deyiladi.</p>
              </div>
              <Button onClick={handleNext} disabled={taslGenerations === 0} className="gap-2 shrink-0">
                Keyingi qadam <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="md:col-span-1 space-y-4">
                <Card className="bg-primary/5 border-primary/20 shadow-sm">
                  <CardContent className="pt-6 space-y-4">
                    <h3 className="font-bold text-lg border-b border-primary/10 pb-2">TASL qoidasi:</h3>
                    <ul className="space-y-3 text-sm">
                      <li><span className="font-bold text-primary">T (Title)</span> - Asar nomi aniq yozilishi kerak</li>
                      <li><span className="font-bold text-primary">A (Author)</span> - Muallif ismi kim?</li>
                      <li><span className="font-bold text-primary">S (Source)</span> - Qayerdan olindi? (Havola)</li>
                      <li><span className="font-bold text-primary">L (License)</span> - Qanday CC litsenziyasi ostida eslon qilingan?</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-3">
                {taslGenerations === 0 && (
                  <div className="bg-warning/15 text-warning-foreground p-3 rounded-lg text-sm border border-warning/30 flex items-center gap-2 mb-4">
                    To'liq ma'lumotlarni kiriting va "Nusxalash" tugmasini bosib bitta attributsiya yarating.
                  </div>
                )}
                <TASLGenerator onGenerate={setTaslGenerations} />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="max-w-3xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <Card className="border-success/30">
              <CardHeader className="bg-success/5 border-b border-success/10 text-center py-8">
                <div className="mx-auto w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mb-4">
                  <Globe className="w-8 h-8 text-success" />
                </div>
                <CardTitle className="text-2xl">Yakuniy O'zini Tekshirish</CardTitle>
                <CardDescription className="text-base mt-2">
                  Amaliy ish davomida o'rganganlaringiz bo'yicha qisqacha xulosa yozing.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-semibold">Nima uchun o'qituvchilar internetdagi har qanday rasmni darslikka shunchaki qo'yib yuborishi noto'g'ri? OER ning afzalligi nima?</Label>
                    <Textarea 
                      value={reflection}
                      onChange={(e) => setReflection(e.target.value)}
                      placeholder="Xulosangizni bu yerga yozing (kamida 15 ta harf)..."
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
