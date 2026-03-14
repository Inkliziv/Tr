"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX, AlertTriangle, Info } from "lucide-react"

export function ScreenReaderSimulator({ onSimulate }: { onSimulate: () => void }) {
  const [altText, setAltText] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  
  // Real synthesized voice using browser API
  const speakText = () => {
    if (!window.speechSynthesis) {
      alert("Kechirasiz, sizning brauzeringiz ovoz sintezini (Screen Reader) qo'llab quvvatlamaydi.")
      return
    }

    window.speechSynthesis.cancel() // Stop any current speech
    
    // Simulate exactly what a screen reader says when it encounters an image
    let textToSpeak = "Rasm: "
    if (!altText.trim()) {
      textToSpeak += "Muqobil matn kiritilmagan. image_4021.jpg"
    } else {
      textToSpeak += altText
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak)
    utterance.lang = "uz-UZ" // Try Uzbek first
    
    // Fallbacks if Uzbek voice isn't present, try a generic or English voice but read the text anyway.
    utterance.rate = 0.9 // slightly slower, like typical narration
    
    utterance.onstart = () => setIsPlaying(true)
    utterance.onend = () => {
      setIsPlaying(false)
      if (altText.trim().length > 5) {
        onSimulate() // trigger success if good alt text was provided
      }
    }
    
    window.speechSynthesis.speak(utterance)
  }

  const stopSpeaking = () => {
    window.speechSynthesis.cancel()
    setIsPlaying(false)
  }

  return (
    <div className="bg-card border rounded-xl overflow-hidden shadow-sm grid md:grid-cols-2">
      <div className="bg-muted p-6 flex flex-col items-center justify-center border-r relative min-h-[300px]">
        {/* Placeholder image that the user is trying to add alt text to */}
        <div className="w-full max-w-[280px] aspect-video bg-indigo-100 rounded-lg shadow border-2 border-indigo-200 flex flex-col items-center justify-center overflow-hidden relative">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-blue-300"></div>
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-green-400"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-yellow-400 border-4 border-orange-300"></div>
        </div>
        
        <p className="mt-4 text-xs font-mono text-muted-foreground bg-background px-3 py-1 rounded-full border shadow-sm">
          Fayl nomi: manzarali_rasm_final_v2.jpg
        </p>

        {!altText && (
          <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground p-2 rounded-full shadow-lg animate-pulse">
            <AlertTriangle className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="p-6 space-y-6 flex flex-col justify-between bg-primary/5">
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-lg mb-1">Ko'zi ojiz o'quvchi bu rasmni qanday "ko'radi"?</h3>
            <p className="text-sm text-muted-foreground">
              Tasavvur qiling, talabaning ko'zi ojiz. U sizning darsingizni <strong className="text-primary">Screen Reader (ekran o'quvchi)</strong> dasturi orqali eshitib o'qiyapti. Rasmga kelganda dastur nima deb o'qiydi?
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center justify-between">
              Muqobil matn (alt atributi)
              <span title="Rasm yuklanmaganda yoki ko'zi ojizlar uchun o'qiladigan matn"><Info className="w-4 h-4 text-muted-foreground" /></span>
            </label>
            <Input 
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Masalan: 'Ko'k osmon va yashil qir tepasidagi sariq quyosh tasviri'"
              className="bg-background border-primary/20 focus-visible:ring-primary"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-primary/10">
          <Button 
            onClick={isPlaying ? stopSpeaking : speakText} 
            className="w-full gap-2 h-12 text-base font-semibold transition-all"
            variant={isPlaying ? "destructive" : "default"}
          >
            {isPlaying ? (
              <><VolumeX className="w-5 h-5" /> O'qishni to'xtatish</>
            ) : (
              <><Volume2 className="w-5 h-5" /> Tinglab ko'rish (Simulyatsiya)</>
            )}
          </Button>

          {!altText.trim() && (
            <p className="text-xs text-center text-muted-foreground mt-3 bg-muted/50 p-2 rounded border">
              Hozir tinglasangiz, dastur faqat tushunarsiz fayl nomini o'qiydi. Rindami bera olasizmi?
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
