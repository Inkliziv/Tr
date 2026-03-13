"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewCoursePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    level: "beginner",
    language: "uz"
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNext = () => setStep(2)
  const handleBack = () => setStep(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        // TODO: toast error
        setIsSubmitting(false)
        return
      }

      const course = await res.json()
      router.push(`/courses/${course.id}/edit`)
    } catch {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl mb-8">
        <Button variant="ghost" asChild className="-ml-4 mb-4 text-muted-foreground hover:text-foreground">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Orqaga qaytish
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-heading font-bold tracking-tight">Yangi kurs yaratish</h1>
            <p className="text-muted-foreground mt-1 text-sm">Talabalar uchun yangi ta'lim sayohatini boshlang.</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl relative">
        <div className="absolute top-4 left-0 w-full flex justify-between px-8 z-0">
          <div className="h-0.5 w-full bg-border absolute top-1/2 left-0 -translate-y-1/2 z-0">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-in-out" 
              style={{ width: step === 1 ? '50%' : '100%' }}
            />
          </div>
        </div>
        
        <div className="flex justify-between w-full relative z-10 mb-8 max-w-[200px] mx-auto">
          <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 1 ? 'bg-primary text-primary-foreground outline outline-4 outline-primary/20' : 'bg-muted text-muted-foreground border-2 border-border'}`}>
            1
          </div>
          <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors delay-150 ${step >= 2 ? 'bg-primary text-primary-foreground outline outline-4 outline-primary/20' : 'bg-muted text-muted-foreground border-2 border-border bg-background'}`}>
            2
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <Card className="shadow-lg border-border/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CardHeader>
                <CardTitle>Asosiy ma'lumotlar</CardTitle>
                <CardDescription>
                  Kurs nomini va nima haqidaligini qisqacha yozib chiqing.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base font-semibold">Kurs Nomi <span className="text-destructive">*</span></Label>
                  <Input 
                    id="title" 
                    name="title"
                    placeholder="Masalan: Mukammal Python Dasturlash" 
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="h-12 text-lg"
                    autoFocus
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-base font-semibold">Qisqacha Tavsif <span className="text-destructive">*</span></Label>
                  <Textarea 
                    id="description" 
                    name="description"
                    placeholder="Bu kurs kimlar uchun va nimalar o'rgatiladi?" 
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="min-h-[120px] resize-y"
                  />
                  <p className="text-xs text-muted-foreground text-right">0/300</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end pt-6 border-t bg-muted/20">
                <Button 
                  type="button" 
                  size="lg" 
                  onClick={handleNext} 
                  disabled={!formData.title || !formData.description}
                  className="rounded-full px-8"
                >
                  Keyingi qadam
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 2 && (
            <Card className="shadow-lg border-border/50 animate-in fade-in slide-in-from-left-4 duration-500">
              <CardHeader>
                <CardTitle>Kategoriya va Sozlamalar</CardTitle>
                <CardDescription>
                  Kursning yo'nalishi va tilini tanlang.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="category">Kategoriya</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(val) => handleSelectChange('category', val)}
                    >
                      <SelectTrigger id="category" className="h-11">
                        <SelectValue placeholder="Tanlang..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="programming">Dasturlash</SelectItem>
                        <SelectItem value="design">Dizayn</SelectItem>
                        <SelectItem value="business">Biznes va IT</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="data">Ma'lumotlar Bazasi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="level">Qiyinchilik darajasi</Label>
                    <Select 
                      value={formData.level} 
                      onValueChange={(val) => handleSelectChange('level', val)}
                    >
                      <SelectTrigger id="level" className="h-11">
                        <SelectValue placeholder="Tanlang..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Boshlang'ich (Beginner)</SelectItem>
                        <SelectItem value="intermediate">O'rta (Intermediate)</SelectItem>
                        <SelectItem value="advanced">Ilg'or (Advanced)</SelectItem>
                        <SelectItem value="all">Barcha uchun</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3 sm:col-span-2">
                    <Label htmlFor="language">Kurs tili</Label>
                    <Select 
                      value={formData.language} 
                      onValueChange={(val) => handleSelectChange('language', val)}
                    >
                      <SelectTrigger id="language" className="h-11">
                        <SelectValue placeholder="Tanlang..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uz">O'zbek tili (Uzbek)</SelectItem>
                        <SelectItem value="ru">Rus tili (Russian)</SelectItem>
                        <SelectItem value="en">Ingliz tili (English)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-6">
                  <h4 className="flex items-center text-sm font-semibold text-primary mb-1">
                    <Sparkles className="h-4 w-4 mr-2" />
                    AI Yordamchisi (Tez kunda)
                  </h4>
                  <p className="text-xs text-muted-foreground">Kurs yaratilgandan so'ng, AI yordamida interaktiv testlar, savollar va slaydlar generatsiya qilishingiz mumkin bo'ladi.</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-6 border-t bg-muted/20">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleBack}
                  className="rounded-full"
                >
                  Orqaga
                </Button>
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting || !formData.category}
                  className="rounded-full px-8 bg-success hover:bg-success/90 text-success-foreground"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Yaratilmoqda...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Kursni Yaratish
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          )}
        </form>
      </div>
    </div>
  )
}
