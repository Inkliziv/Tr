"use client"

import { useState, useEffect } from "react"
import { Check, X, Info } from "lucide-react"

type License = {
  id: string
  name: string
  description: string
  badgeUrl: string
  commercial: boolean
  derivatives: "yes" | "no" | "sharealike"
}

const licenses: License[] = [
  { id: "CC BY", name: "CC BY (Attribution)", description: "Boshqalar sizning ishingizdan nusxa olishi, tarqatishi, namoyish etishi, shuningdek, undan kelib chiqqan holda yangi asarlar yaratishi mumkin – hatto tijorat maqsadlarida ham. Faqatgina qoidaga binoan sizga muallif sifatida ishora qilishlari shart.", badgeUrl: "https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by.svg", commercial: true, derivatives: "yes" },
  { id: "CC BY-SA", name: "CC BY-SA (Attribution-ShareAlike)", description: "Boshqalar ishingiz foydalanishi va o'zgartirishi mumkin (tijorat uchun ham), lekin ular yaratilgan yangi asarni aynan shu litsenziya ostida tarqatishlari shart (Ochiq manba kabi).", badgeUrl: "https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-sa.svg", commercial: true, derivatives: "sharealike" },
  { id: "CC BY-ND", name: "CC BY-ND (Attribution-NoDerivs)", description: "Boshqalar asaringizni tijorat maqsadida bo'lsa ham tarqatishlari mumkin, lekin unga o'zgartirish kiritishlari taqiqlanadi (Asl holatda tarqatilishi kerak).", badgeUrl: "https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-nd.svg", commercial: true, derivatives: "no" },
  { id: "CC BY-NC", name: "CC BY-NC (Attribution-NonCommercial)", description: "Boshqalar ishingizdan foydalanishi va o'zgartirishi mumkin, faqatgina tijorat (pul ishlash) maqsadida emas.", badgeUrl: "https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-nc.svg", commercial: false, derivatives: "yes" },
  { id: "CC BY-NC-SA", name: "CC BY-NC-SA (Attribution-NonCommercial-ShareAlike)", description: "Boshqalar ishingizni tijorat maqsadisiz o'zgartirishi mumkin, lekin yangi asar aynan shu litsenziya ostida tarqatilishi shart.", badgeUrl: "https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-nc-sa.svg", commercial: false, derivatives: "sharealike" },
  { id: "CC BY-NC-ND", name: "CC BY-NC-ND (Attribution-NonCommercial-NoDerivs)", description: "Eng qat'iy litsenziya. Boshqalar ishingizni faqat yuklab olib, boshqalarga ulashishlari mumkin. Lekin o'zgartira olmaydi va undan pul ishlay olmaydi.", badgeUrl: "https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-nc-nd.svg", commercial: false, derivatives: "no" }
]

export function CCPicker({ onSelect }: { onSelect: (license: string) => void }) {
  const [commercial, setCommercial] = useState<boolean | null>(null)
  const [derivatives, setDerivatives] = useState<"yes" | "no" | "sharealike" | null>(null)

  const [result, setResult] = useState<License | null>(null)

  useEffect(() => {
    if (commercial !== null && derivatives !== null) {
      const match = licenses.find(l => l.commercial === commercial && l.derivatives === derivatives)
      if (match) {
        setResult(match)
        onSelect(match.id)
      }
    } else {
      setResult(null)
    }
  }, [commercial, derivatives, onSelect])

  return (
    <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
      <div className="p-6 space-y-8">
        <div className="space-y-4">
          <p className="font-semibold text-lg flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm">1</span>
            Boshqalar sizning ishingizdan pul ishlashiga (tijorat maqsadida) ruxsat berasizmi?
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setCommercial(true)}
              className={`flex-1 min-w-[150px] p-4 border rounded-xl flex items-center justify-center gap-2 font-medium transition-all ${commercial === true ? 'border-primary bg-primary/10 text-primary ring-2 ring-primary/20' : 'hover:bg-muted/50'}`}
            >
              <Check className="w-5 h-5 text-success" /> Ha, ruxsat beraman
            </button>
            <button 
              onClick={() => setCommercial(false)}
              className={`flex-1 min-w-[150px] p-4 border rounded-xl flex items-center justify-center gap-2 font-medium transition-all ${commercial === false ? 'border-primary bg-primary/10 text-primary ring-2 ring-primary/20' : 'hover:bg-muted/50'}`}
            >
              <X className="w-5 h-5 text-destructive" /> Yo'q, ruxsat yo'q
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <p className="font-semibold text-lg flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm">2</span>
            Boshqalar sizning ishingizni o'zgartirishiga (remiks qilish, tarjima qilish) ruxsat berasizmi?
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            <button 
              onClick={() => setDerivatives("yes")}
              className={`p-4 border rounded-xl flex flex-col items-center justify-center gap-2 text-center transition-all ${derivatives === "yes" ? 'border-primary bg-primary/10 text-primary ring-2 ring-primary/20' : 'hover:bg-muted/50'}`}
            >
              <span className="font-medium flex items-center gap-2"><Check className="w-4 h-4 text-success" /> Ha</span>
              <span className="text-xs text-muted-foreground">O'zgartirish va tarqatish erkin.</span>
            </button>
            <button 
              onClick={() => setDerivatives("no")}
              className={`p-4 border rounded-xl flex flex-col items-center justify-center gap-2 text-center transition-all ${derivatives === "no" ? 'border-primary bg-primary/10 text-primary ring-2 ring-primary/20' : 'hover:bg-muted/50'}`}
            >
              <span className="font-medium flex items-center gap-2"><X className="w-4 h-4 text-destructive" /> Yo'q</span>
              <span className="text-xs text-muted-foreground">Faqat asl nusxadagina tarqatilishi mumkin.</span>
            </button>
            <button 
              onClick={() => setDerivatives("sharealike")}
              className={`p-4 border rounded-xl flex flex-col items-center justify-center gap-2 text-center transition-all ${derivatives === "sharealike" ? 'border-primary bg-primary/10 text-primary ring-2 ring-primary/20' : 'hover:bg-muted/50'}`}
            >
              <span className="font-medium flex items-center gap-2"><Info className="w-4 h-4 text-warning" /> Ha, faqat...</span>
              <span className="text-xs text-muted-foreground">Yangi asar ham xuddi shu litsenziya bilan tarqatilishi shart.</span>
            </button>
          </div>
        </div>
      </div>

      {result && (
        <div className="bg-primary/5 border-t p-6 animate-in slide-in-from-bottom-4">
          <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Siz uchun tavsiya etilgan litsenziya:</h3>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={result.badgeUrl} alt={result.id} className="h-10 shrink-0" />
            <div>
              <h4 className="font-bold text-2xl mb-2">{result.name}</h4>
              <p className="text-foreground/80 leading-relaxed text-sm">{result.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
