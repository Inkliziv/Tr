"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, CheckCircle2 } from "lucide-react"

export function TASLGenerator({ onGenerate }: { onGenerate: (count: number) => void }) {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [source, setSource] = useState("")
  const [license, setLicense] = useState("CC BY 4.0")
  
  const [generationsCount, setGenerationsCount] = useState(0)
  const [copiedText, setCopiedText] = useState("")

  const attributionHtml = `"${title}" by ${author} is licensed under <a href="${source}">${license}</a>.`
  const attributionPlainText = `"${title}" by ${author} is licensed under ${license}. Source: ${source}`

  const handleCopy = () => {
    if (!title || !author) {
      alert("Iltimos, Asar nomi va Muallifni kiritganingizga ishonch hosil qiling.")
      return
    }
    navigator.clipboard.writeText(attributionPlainText)
    setCopiedText(attributionPlainText)
    
    const newCount = generationsCount + 1
    setGenerationsCount(newCount)
    onGenerate(newCount)
  }

  return (
    <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
      <div className="p-6 grid sm:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Asar nomi (Title)</Label>
            <Input 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Masalan: 'Tabiat manzarasi'" 
            />
          </div>
          <div className="space-y-2">
            <Label>Muallif (Author)</Label>
            <Input 
              value={author} 
              onChange={(e) => setAuthor(e.target.value)} 
              placeholder="Masalan: 'John Doe'" 
            />
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Manba havola (Source URL)</Label>
            <Input 
              value={source} 
              onChange={(e) => setSource(e.target.value)} 
              placeholder="https://..." 
            />
          </div>
          <div className="space-y-2">
            <Label>Litsenziya (License)</Label>
            <select 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
            >
              <option value="CC BY 4.0">CC BY 4.0</option>
              <option value="CC BY-SA 4.0">CC BY-SA 4.0</option>
              <option value="CC BY-ND 4.0">CC BY-ND 4.0</option>
              <option value="CC BY-NC 4.0">CC BY-NC 4.0</option>
              <option value="CC BY-NC-SA 4.0">CC BY-NC-SA 4.0</option>
              <option value="CC BY-NC-ND 4.0">CC BY-NC-ND 4.0</option>
              <option value="CC0 1.0 (Public Domain)">CC0 1.0 (Public Domain)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-muted/30 p-6 border-t space-y-4">
        <Label className="text-muted-foreground font-semibold uppercase tracking-wider text-xs">Tayyor Attributsiya (Tasdiqnoma)</Label>
        
        <div className="bg-background border p-4 rounded-lg flex items-center justify-between gap-4">
          <div 
            className="text-sm font-medium" 
            dangerouslySetInnerHTML={{ __html: title && author ? attributionHtml : "<span class='text-muted-foreground'>Tepadan ma'lumotlarni to'ldiring...</span>" }} 
          />
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={handleCopy}
            className="shrink-0"
          >
            {copiedText === attributionPlainText && attributionPlainText !== "" ? (
              <><CheckCircle2 className="w-4 h-4 mr-2 text-success" /> Nusxalandi!</>
            ) : (
              <><Copy className="w-4 h-4 mr-2" /> Nusxalash</>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
