"use client"

import { useState } from "react"
import { useProgress } from "@/hooks/useProgress"
import { StepProgress } from "@/components/shared/StepProgress"
import { QuestionBuilder, Question } from "@/components/amaliy-ish/QuestionBuilder"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Download, ArrowRight, CheckCircle2, FileJson, Info } from "lucide-react"

export default function AmaliyIsh6Page() {
  const amaliyId = 6
  const { progress, isLoaded, completeStep, markCompleted } = useProgress()
  const [currentStep, setCurrentStep] = useState(0)
  const [questions, setQuestions] = useState<Question[]>([])
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
      alert("Tabriklaymiz! Siz Amaliy Ish №6 ni muvaffaqiyatli yakunladingiz.")
    }
  }

  const exportZukkoo = () => {
    const zukkooFormat = questions.map(q => ({
      question: q.text,
      answers: q.options.map((opt, i) => ({
        text: opt,
        isCorrect: i === q.correctIndex
      })),
      explanation: q.explanation,
      difficulty: q.difficulty,
      bloomLevel: q.bloomLevel
    }))

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(zukkooFormat, null, 2))
    const downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute("href",     dataStr)
    downloadAnchorNode.setAttribute("download", "zukkoo_test_export.json")
    document.body.appendChild(downloadAnchorNode) // required for firefox
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
          Amaliy Ish №6: {workProgress.title}
        </h1>
        <p className="text-muted-foreground">
          Ushbu amaliy ishda siz sifatli test savollari tuzish, pedagogik talablarga (Bloom taksonomiyasi va qiyinlik darajasi) javob beradigan nazorat materiallari yaratish hamda ularni LMS tizimlariga mos formatda eksport qilishni o'rganasiz.
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
          <div className="max-w-3xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <Card className="border-primary/20">
              <CardHeader className="bg-primary/5 border-b border-primary/10">
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  Nima uchun biz test tuzamiz?
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Talabalarni baholash o'quv jarayonining eng muhim qismlaridan biridir. Yaxshi tuzilgan test faqatgina bilimlarni tekshirib qolmaydi, balki talabaning xatolaridan o'rganishiga ham yordam beradi.
                </p>
                <div className="bg-muted p-4 rounded-lg text-foreground text-sm border-l-4 border-primary">
                  <h4 className="font-semibold mb-2">Sifatli test namunasi:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Aniqlik - savol matni bir xil tushunilishi kerak</li>
                    <li>Chalg'ituvchi variantlar (Distraktorlar) - mantiqiy va ishonarli bo'lishi</li>
                    <li>Fidbek - nima uchun xato ekanligini tushuntirishi</li>
                  </ul>
                </div>
                <p>
                  Keyingi qadamda siz AI yordamida va o'z qo'lingiz bilan sifatli test savollari tuzishni boshlaysiz.
                </p>
              </CardContent>
              <CardFooter className="flex justify-end pt-2 pb-6 px-6">
                <Button onClick={handleNext} className="gap-2">
                  Tushundim, davom etish <ArrowRight className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">2-qadam: Savollar yaratish</h2>
                <p className="text-muted-foreground mt-1">AI yordamida yoki o'z qo'lingiz bilan kamida 3 ta savol tuzing.</p>
              </div>
              <Button onClick={handleNext} disabled={questions.length < 3} className="gap-2">
                Keyingi qadam <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            
            {questions.length < 3 && (
              <div className="bg-warning/15 text-warning-foreground p-3 rounded-lg text-sm border border-warning/30 flex items-center gap-2">
                <Info className="w-4 h-4 shrink-0" />
                Davom etish uchun jadvalga kamida 3 ta savol qo'shishingiz kerak (Hozir: {questions.length} ta)
              </div>
            )}

            <QuestionBuilder onQuestionsUpdate={setQuestions} />
          </div>
        )}

        {currentStep === 2 && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold">3-qadam: LMS uchun eksport</h2>
            <p className="text-muted-foreground">
              Yaratilgan savollarni Zukkoo.uz yoki boshqa LMS tizimlariga yuklash uchun standart JSON formatida eksport qiling.
            </p>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileJson className="w-5 h-5 text-primary" />
                  Zukkoo.uz formatida eksport
                </CardTitle>
                <CardDescription>
                  Yaratilgan {questions.length} ta savolni JSON fayl sifatida yuklab oling.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg overflow-x-auto text-xs font-mono mb-4 text-muted-foreground max-h-[200px]">
                  {JSON.stringify(questions.map(q => ({
                    question: q.text,
                    options: q.options,
                    correct: q.correctIndex
                  })).slice(0, 1), null, 2)}
                  {questions.length > 1 && "\n  // ... boshqa savollar"}
                </div>
                <Button onClick={exportZukkoo} className="w-full sm:w-auto" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  JSON formatida yuklab olish
                </Button>
              </CardContent>
              <CardFooter className="flex justify-end pt-4 pb-6 px-6 bg-muted/20 border-t mt-4">
                <Button onClick={handleNext} className="gap-2" disabled={questions.length === 0}>
                  Davom etish <ArrowRight className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {currentStep === 3 && (
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
                    <Label className="text-base font-semibold">Ushbu amaliy ishda o'rgangan eng muhim narsangiz nima bo'ldi?</Label>
                    <p className="text-sm text-muted-foreground mb-3 mt-1">Test savollari tuzishdagi eng muhim tamoyillarni qanday tushunganingizni yozing.</p>
                    <Textarea 
                      value={reflection}
                      onChange={(e) => setReflection(e.target.value)}
                      placeholder="Xulosangizni bu yerga yozing..."
                      className="min-h-[150px] text-base resize-none"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end pt-2 pb-6 px-6 bg-muted/10 border-t">
                <Button onClick={handleNext} className="gap-2" size="lg" disabled={reflection.length < 20}>
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
