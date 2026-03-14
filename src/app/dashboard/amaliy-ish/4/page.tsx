"use client"

import { useState } from "react"
import { useProgress } from "@/hooks/useProgress"
import { StepProgress } from "@/components/shared/StepProgress"
import { BloomSelector, BloomLevel } from "@/components/amaliy-ish/BloomSelector"
import { RichTextEditor } from "@/components/amaliy-ish/RichTextEditor"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Wand2, LayoutTemplate, BookOpen, Lightbulb, FileText, ArrowRight, CheckCircle2, Copy } from "lucide-react"

export default function AmaliyIsh4Page() {
  const amaliyId = 4
  const { progress, isLoaded, completeStep, markCompleted } = useProgress()
  const [currentStep, setCurrentStep] = useState(0)
  
  // States
  const [bloomLevel, setBloomLevel] = useState<BloomLevel | null>(null)
  const [contentHtml, setContentHtml] = useState("")
  const [wordCount, setWordCount] = useState(0)
  
  // AI Tools state
  const [aiLoading, setAiLoading] = useState(false)
  const [aiResult, setAiResult] = useState("")
  const [aiMode, setAiMode] = useState<"improve" | "summary" | "examples" | "readability" | null>(null)
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
      alert("Tabriklaymiz! Siz Amaliy Ish №4 ni muvaffaqiyatli yakunladingiz.")
    }
  }

  const handleAiAction = async (action: "improve" | "summary" | "examples" | "readability") => {
    if (!contentHtml || wordCount < 5) {
      alert("AI ishlatish uchun avval kamida 5 ta so'zdan iborat matn yozing.")
      return
    }
    
    // Convert HTML to plain text roughly for AI if needed, but HTML is fine for Claude usually.
    // We'll pass HTML and ask Claude to return text.
    const plainText = document.createElement("div")
    plainText.innerHTML = contentHtml
    const textToProcess = plainText.innerText || plainText.textContent || ""

    setAiLoading(true)
    setAiMode(action)
    setAiResult("")
    
    try {
      const res = await fetch("/api/ai/improve-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, text: textToProcess })
      })
      if (!res.ok) throw new Error("Tarmoq xatosi")
      
      const data = await res.json()
      setAiResult(data.result)
    } catch (e) {
      alert("Xatolik yuz berdi. Qaytadan urinib ko'ring.")
    } finally {
      setAiLoading(false)
    }
  }

  const copyAiResult = () => {
    navigator.clipboard.writeText(aiResult)
    alert("Natija nusxalandi! Uni muharrirga joylashingiz mumkin.")
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
          Amaliy Ish №4: {workProgress.title}
        </h1>
        <p className="text-muted-foreground">
          Ushbu amaliy ishda siz o'quv kontentini Bloom taksonomiyasi asosida maqsadga muvofiq rejalashtirishni va AI yordamida sifatli nazariy matnlar yozishni o'rganasiz.
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
            <h2 className="text-2xl font-bold">1-qadam: Maqsadni aniqlash</h2>
            <p className="text-muted-foreground">
              Har qanday o'quv materiali yaratishdan oldin uning ta'limiy maqsadini belgilash kerak. 
              Siz yozmoqchi bo'lgan matn o'quvchida qanday ko'nikmani shakllantiradi? Bloom taksonomiyasining tegishli darajasini tanlang.
            </p>
            
            <Card className="border-primary/20 bg-muted/10">
              <CardContent className="pt-6">
                <BloomSelector selected={bloomLevel} onSelect={setBloomLevel} />
              </CardContent>
              <CardFooter className="flex justify-end pt-4 pb-6 px-6">
                <Button onClick={handleNext} disabled={!bloomLevel} className="gap-2">
                  Davom etish <ArrowRight className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">2-qadam: Kontent yaratish</h2>
                <p className="text-muted-foreground mt-1">
                  Tanlangan <b>"{bloomLevel}"</b> darajasi asosida qisqacha nazariy matn yozing. Matnni shakllantiring va boyiting.
                </p>
              </div>
              <Button onClick={handleNext} disabled={wordCount < 10} className="gap-2">
                Keyingi qadam <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {wordCount < 10 && (
              <div className="bg-warning/15 text-warning-foreground p-3 rounded-lg text-sm border border-warning/30 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 shrink-0" />
                Davom etish uchun matningiz kamida 10 ta so'zdan iborat bo'lishi kerak (Hozir: {wordCount} ta)
              </div>
            )}

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-card border rounded-xl shadow-sm p-4">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <LayoutTemplate className="w-4 h-4 text-primary" /> Maxsus muharrir
                  </h3>
                  <RichTextEditor 
                    content={contentHtml} 
                    onChange={(html, count) => {
                      setContentHtml(html)
                      setWordCount(count)
                    }} 
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Card className="border-primary/20 shadow-sm sticky top-32">
                  <CardHeader className="bg-primary/5 pb-4">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Wand2 className="w-4 h-4 text-primary" /> AI Yordamchisi
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-sm h-10" 
                      onClick={() => handleAiAction("improve")}
                      disabled={aiLoading}
                    >
                      <Wand2 className="w-4 h-4 mr-2 text-primary" /> Matnni tuzatish/yaxshilash
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-sm h-10" 
                      onClick={() => handleAiAction("summary")}
                      disabled={aiLoading}
                    >
                      <FileText className="w-4 h-4 mr-2 text-blue-500" /> Qisqacha xulosa yasash
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-sm h-10" 
                      onClick={() => handleAiAction("examples")}
                      disabled={aiLoading}
                    >
                      <Lightbulb className="w-4 h-4 mr-2 text-warning" /> 2 ta hayotiy misol so'rash
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-sm h-10" 
                      onClick={() => handleAiAction("readability")}
                      disabled={aiLoading}
                    >
                      <BookOpen className="w-4 h-4 mr-2 text-green-500" /> O'qilishi osonligini tekshirish
                    </Button>

                    {/* AI Result Area */}
                    {(aiLoading || aiResult) && (
                      <div className="mt-6 pt-4 border-t border-dashed">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            AI Natijasi
                          </span>
                          {aiResult && (
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyAiResult} title="Nusxalash">
                              <Copy className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                        {aiLoading ? (
                          <div className="bg-muted p-4 rounded-md animate-pulse space-y-2">
                            <div className="h-2 bg-muted-foreground/20 rounded w-full"></div>
                            <div className="h-2 bg-muted-foreground/20 rounded w-5/6"></div>
                            <div className="h-2 bg-muted-foreground/20 rounded w-4/6"></div>
                          </div>
                        ) : (
                          <div className="bg-primary/5 border border-primary/20 p-3 rounded-md text-sm whitespace-pre-wrap text-foreground/90 max-h-[250px] overflow-y-auto">
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
            <h2 className="text-2xl font-bold">3-qadam: Yuklab olish</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="bg-muted/30 border rounded-xl p-8 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Kontent tayyor!</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Siz yozgan {wordCount} ta so'zdan iborat matn Bloomning "{bloomLevel}" darajasiga moslashtirib tekshirildi.
                  </p>
                  <Button 
                    className="w-full sm:w-auto" 
                    onClick={() => {
                      const element = document.createElement("a")
                      const file = new Blob([
                         `<html><head><meta charset="utf-8"></head><body><h1>Nazariy matn: ${bloomLevel}</h1>${contentHtml}</body></html>`
                      ], {type: 'text/html'})
                      element.href = URL.createObjectURL(file)
                      element.download = "amaliy_4_kontent.html"
                      document.body.appendChild(element)
                      element.click()
                    }}
                  >
                    HTML formatida yuklab olish (Word da ochish mumkin)
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end pt-4 pb-6 px-6 bg-muted/10 border-t">
                <Button onClick={handleNext} className="gap-2">
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
                    <Label className="text-base font-semibold">Bloom taksonomiyasi sizga dars matnini yozishda qanday yordam berdi?</Label>
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
