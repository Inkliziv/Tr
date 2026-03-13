"use client"

import { useState } from "react"
import { Sparkles, Languages, FileText, Check, X, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface AIWritingPanelProps {
  selectedText?: string;
  onApply: (text: string) => void;
}

export function AIWritingPanel({ selectedText = "", onApply }: AIWritingPanelProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [suggestion, setSuggestion] = useState<string | null>(null)
  const [actionType, setActionType] = useState<string>("")

  const handleAIAction = (action: string) => {
    setIsGenerating(true)
    setActionType(action)
    
    // Simulate AI API call
    setTimeout(() => {
      let result = ""
      if (action === "improve") {
        result = "Python dasturlash tili sun'iy intellekt, ma'lumotlar tahlili va web tizimlar yaratishda eng ko'p foydalaniladigan va o'rganish oson bo'lgan zamonaviy kodlash vositasidir."
      } else if (action === "Russian") {
        result = "Python — это современный инструмент кодирования, который наиболее часто используется в создании искусственного интеллекта, анализа данных и веб-систем, и легко осваивается."
      } else if (action === "summary") {
        result = "- Python mashhur va oson o'rganiladigan til.\n- Asosan AI va Web sohalarida qo'llaniladi.\n- Dunyo bo'ylab katta jamoaga ega."
      } else if (action === "examples") {
        result = "Misollar:\n1. Instagram backend dvigateli (Django)\n2. Spotify musiqiy tavsiya tizimlari (Machine Learning)\n3. NASA koinot tadqiqotlari hisob-kitoblari"
      }
      
      setSuggestion(result)
      setIsGenerating(false)
    }, 1500)
  }

  const handleApply = () => {
    if (suggestion) {
      onApply(suggestion)
      setSuggestion(null)
    }
  }

  const handleReject = () => {
    setSuggestion(null)
  }

  return (
    <div className="w-80 shrink-0 border-l bg-card flex flex-col h-full overflow-hidden shadow-[-4px_0_15px_-5px_rgba(0,0,0,0.05)]">
      <div className="p-4 border-b bg-primary/5 flex items-center justify-between">
        <h3 className="font-semibold text-primary flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          AI Yordamchisi
        </h3>
        <Badge variant="outline" className="text-[10px] uppercase font-bold text-primary border-primary/30">Claude 3.5</Badge>
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-6">
        {suggestion ? (
          <div className="space-y-4 animate-in slide-in-from-right-2 duration-300">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase text-muted-foreground tracking-wider">{actionType} Natijasi</span>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleAIAction(actionType)}>
                <RefreshCw className="h-3 w-3" />
              </Button>
            </div>
            
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-3 text-sm leading-relaxed whitespace-pre-line">
                {suggestion}
              </CardContent>
            </Card>

            <div className="flex gap-2 w-full">
              <Button onClick={handleReject} variant="outline" className="w-1/2 text-destructive hover:text-destructive hover:bg-destructive/10">
                <X className="mr-2 h-4 w-4" /> Rad etish
              </Button>
              <Button onClick={handleApply} className="w-1/2 bg-success hover:bg-success/90 text-success-foreground">
                <Check className="mr-2 h-4 w-4" /> Qo'llash
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Tanlangan matn ustida ishlash</h4>
              <p className="text-xs text-muted-foreground">Editor ichidan matnni belgilang va AI yordamida takomillashtiring.</p>
              
              <div className="pt-2 grid gap-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start font-normal hover:bg-primary/5 hover:text-primary transition-colors"
                  disabled={!selectedText || isGenerating}
                  onClick={() => handleAIAction("improve")}
                >
                  <Sparkles className="mr-2 h-4 w-4 text-primary" /> Matnni takomillashtirish
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start font-normal"
                  disabled={!selectedText || isGenerating}
                  onClick={() => handleAIAction("summary")}
                >
                  <FileText className="mr-2 h-4 w-4 text-blue-500" /> Qisqa xulosa yasash
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start font-normal"
                  disabled={!selectedText || isGenerating}
                  onClick={() => handleAIAction("examples")}
                >
                  <Sparkles className="mr-2 h-4 w-4 text-warning" /> Hayotiy misollar berish
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Tarjima qilish</h4>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Button 
                  variant="outline" 
                  className="w-full text-xs font-normal"
                  disabled={!selectedText || isGenerating}
                  onClick={() => handleAIAction("Russian")}
                >
                  <Languages className="mr-2 h-3 w-3" /> Rus tiliga
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full text-xs font-normal"
                  disabled={!selectedText || isGenerating}
                  onClick={() => handleAIAction("English")}
                >
                  <Languages className="mr-2 h-3 w-3" /> Ingliz tiliga
                </Button>
              </div>
            </div>

            <div className={`mt-8 p-4 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 transition-opacity ${selectedText ? 'opacity-0' : 'opacity-100'}`}>
              <p className="text-xs text-orange-800 dark:text-orange-300">
                👆 AI dan foydalanish uchun, avval chapdagi maydondan biror matnni belgilang.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
