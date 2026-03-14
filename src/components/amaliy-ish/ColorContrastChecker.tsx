"use client"

import { useState } from "react"
import { HexColorPicker } from "react-colorful"
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react"

// Calculate relative luminance.
function getLuminance(hex: string) {
  const rgb = hex.replace(/^#/, '').match(/.{2}/g)?.map(x => parseInt(x, 16) / 255) || [0, 0, 0]
  const [r, g, b] = rgb.map(c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

// Calculate contrast ratio.
function getContrastRatio(hex1: string, hex2: string) {
  const l1 = getLuminance(hex1)
  const l2 = getLuminance(hex2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

export function ColorContrastChecker({ onPass }: { onPass: (passed: boolean) => void }) {
  const [bg, setBg] = useState("#ffffff")
  const [fg, setFg] = useState("#00ddff")

  const contrast = getContrastRatio(fg, bg)
  const ratioStr = contrast.toFixed(2)

  // Web Content Accessibility Guidelines (WCAG)
  // AA Normal Text: 4.5:1
  // AA Large Text: 3.0:1
  const passesAANormal = contrast >= 4.5
  const passesAALarge = contrast >= 3.0

  return (
    <div className="grid md:grid-cols-2 gap-6 bg-card border rounded-xl shadow-sm p-6 overflow-hidden">
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold mb-2">Fon rangi (Background)</h4>
          <div className="flex items-center gap-4">
            <HexColorPicker color={bg} onChange={setBg} className="h-[120px]" />
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-full border shadow-inner" style={{ backgroundColor: bg }}></div>
              <p className="text-sm font-mono uppercase bg-muted px-2 py-1 rounded">{bg}</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <h4 className="font-semibold mb-2">Matn rangi (Foreground)</h4>
          <div className="flex items-center gap-4">
            <HexColorPicker color={fg} onChange={(color) => {
              setFg(color)
              const newContrast = getContrastRatio(color, bg)
              onPass(newContrast >= 4.5) // Trigger step completion when it passes normal text
            }} className="h-[120px]" />
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-full border shadow-inner" style={{ backgroundColor: fg }}></div>
              <p className="text-sm font-mono uppercase bg-muted px-2 py-1 rounded">{fg}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 flex flex-col items-center justify-center border-l pl-6 border-dashed">
        <div 
          className="w-full h-32 rounded-xl flex items-center justify-center p-4 text-center border shadow-inner transition-colors"
          style={{ backgroundColor: bg, color: fg }}
        >
          <div>
            <span className="text-2xl font-bold block mb-1">Katta Matn (Heading)</span>
            <span className="text-sm">Oddiy kichkina o'lchamdagi paragraf matni namunasi.</span>
          </div>
        </div>

        <div className="w-full space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-muted-foreground font-medium">Kontrast darajasi:</span>
            <span className="text-2xl font-bold font-mono">{ratioStr} : 1</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-md bg-muted/50 border">
              <span className="text-sm font-medium">Kichik matn (WCAG AA | 4.5:1)</span>
              {passesAANormal ? <CheckCircle2 className="w-5 h-5 text-success" /> : <XCircle className="w-5 h-5 text-destructive" />}
            </div>
            <div className="flex items-center justify-between p-2 rounded-md bg-muted/50 border">
              <span className="text-sm font-medium">Katta matn (WCAG AA | 3.0:1)</span>
              {passesAALarge ? <CheckCircle2 className="w-5 h-5 text-success" /> : <XCircle className="w-5 h-5 text-destructive" />}
            </div>
          </div>

          {!passesAANormal && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg flex items-start gap-2 border border-destructive/20 mt-4">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Nurlanish juda past. Iltimos, ranglar o'rtasida katta farq hosil qiling (yoki matnni qoraytiring, yoki fonni oqartiring).</span>
            </div>
          )}
          {passesAANormal && (
            <div className="bg-success/10 text-success text-sm p-3 rounded-lg flex items-start gap-2 border border-success/20 mt-4">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Ajoyib! Kontrast darajasi ko'zi ojiz yoki zaif insonlar muammosiz o'qishi uchun xavfsiz.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
