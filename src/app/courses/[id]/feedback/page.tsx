"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, MessageSquare, Star, ThumbsUp, ThumbsDown, AlertCircle, Sparkles, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { mockCourses, mockFeedback } from "@/lib/mock-data"
import { getInitials, formatDate } from "@/lib/utils"

export default function FeedbackPage() {
  const params = useParams()
  const courseId = params.id as string
  const course = mockCourses.find(c => c.id === courseId) || mockCourses[0]

  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const filteredFeedback = activeFilter 
    ? mockFeedback.filter(f => f.sentiment === activeFilter)
    : mockFeedback

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Button variant="ghost" size="icon" asChild className="h-6 w-6 rounded-full -ml-1 text-muted-foreground mr-1">
              <Link href="/dashboard/courses"><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
            <Badge variant="outline" className="text-[10px] uppercase">{course.category}</Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground line-clamp-1">{course.title} — Izohlar</h1>
          <p className="text-muted-foreground mt-0.5 text-sm">O'quvchilar fikri va AI tahlili.</p>
        </div>
      </div>

      {/* AI Summary Banner */}
      <Card className="border-[#7C3AED]/30 shadow-md bg-gradient-to-br from-[#7C3AED]/5 to-transparent relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Sparkles className="w-32 h-32 text-[#7C3AED]" />
        </div>
        <CardHeader className="pb-3 border-b border-[#7C3AED]/10 bg-white/50 backdrop-blur-sm z-10 relative flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-[#7C3AED] flex items-center text-lg">
              <Sparkles className="mr-2 h-5 w-5" />
              AI Fikr-mulohazalar Tahlili
            </CardTitle>
            <CardDescription className="text-foreground/70 font-medium">Oxirgi 30 kunlik ma'lumotlar asosida shakllantirilgan tizimli xulosa</CardDescription>
          </div>
          <Badge className="bg-[#7C3AED] text-white hidden md:flex">Claude Sonnet-3.5</Badge>
        </CardHeader>
        <CardContent className="pt-6 grid md:grid-cols-2 gap-8 z-10 relative">
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center text-success"><ThumbsUp className="h-4 w-4 mr-2" /> Asosiy Kuchli Tomonlar</h3>
            <ul className="space-y-2 text-sm leading-relaxed">
              <li className="flex items-start"><span className="text-success font-bold mr-2">•</span> 85% talabalar amaliy mashg'ulotlarni juda foydali deb baholagan.</li>
              <li className="flex items-start"><span className="text-success font-bold mr-2">•</span> "Tushuntirish usuli" va "aniqlik" so'zlari ijobiy izohlarda eng ko'p ishlatilgan.</li>
              <li className="flex items-start"><span className="text-success font-bold mr-2">•</span> 3-modul (Shart operatorlari) eng yuqori qoniqish ko'rsatkichiga ega.</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center text-warning"><AlertCircle className="h-4 w-4 mr-2" /> Yaxshilanishi kerak bo'lgan joylar</h3>
            <ul className="space-y-2 text-sm leading-relaxed">
              <li className="flex items-start"><span className="text-warning font-bold mr-2">•</span> 4-moduldagi (Sikllar) test savollari materialga mos kelmasligi haqida 5 ta shikoyat bor.</li>
              <li className="flex items-start"><span className="text-warning font-bold mr-2">•</span> Audio sifati 2-dars videosida pastligi aytib o'tilgan.</li>
            </ul>
            
            <div className="mt-4 p-3 bg-white/60 border border-warning/20 rounded-md">
              <p className="text-sm font-semibold flex items-center mb-1"><Sparkles className="h-3.5 w-3.5 text-warning mr-1.5" /> AI Tavsiyasi</p>
              <p className="text-xs text-muted-foreground">4-moduldagi test savollarini qayta ko'rib chiqing va "break" operatoriga oid savollarni osonlashtiring.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-8">
        <h2 className="text-xl font-semibold tracking-tight">Barcha izohlar ({mockFeedback.length})</h2>
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          <Button 
            variant={activeFilter === null ? "default" : "outline"} 
            size="sm" onClick={() => setActiveFilter(null)}
            className="rounded-full"
          >Barchasi</Button>
          <Button 
            variant={activeFilter === 'positive' ? "default" : "outline"} 
            size="sm" onClick={() => setActiveFilter('positive')}
            className={`rounded-full ${activeFilter === 'positive' ? 'bg-success hover:bg-success/90' : 'hover:text-success'}`}
          >Ijobiy</Button>
          <Button 
            variant={activeFilter === 'neutral' ? "default" : "outline"} 
            size="sm" onClick={() => setActiveFilter('neutral')}
            className={`rounded-full ${activeFilter === 'neutral' ? 'bg-slate-500 hover:bg-slate-600' : 'hover:text-slate-500'}`}
          >Neytral</Button>
          <Button 
            variant={activeFilter === 'negative' ? "default" : "outline"} 
            size="sm" onClick={() => setActiveFilter('negative')}
            className={`rounded-full ${activeFilter === 'negative' ? 'bg-destructive hover:bg-destructive/90' : 'hover:text-destructive'}`}
          >Salbiy</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pt-2">
        {filteredFeedback.map((feedback) => (
          <Card key={feedback.id} className={`shadow-sm border-border/50 relative overflow-hidden flex flex-col ${
            feedback.sentiment === 'positive' ? 'border-success/20' : 
            feedback.sentiment === 'negative' ? 'border-destructive/20' : ''
          }`}>
            <div className={`absolute top-0 right-0 w-12 h-12 -mr-6 -mt-6 rounded-full opacity-20 ${
              feedback.sentiment === 'positive' ? 'bg-success' : 
              feedback.sentiment === 'negative' ? 'bg-destructive' : 'bg-slate-500'
            }`}></div>
            <CardHeader className="pb-3 flex flex-row items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs bg-primary/10 text-primary">{getInitials(feedback.userName as string)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{feedback.userName}</p>
                  <p className="text-[10px] text-muted-foreground">{formatDate(feedback.createdAt)}</p>
                </div>
              </div>
              <div className="flex text-warning">
                {[1, 2, 3, 4, 5].map(star => (
                   <Star key={star} className={`h-3.5 w-3.5 ${star <= feedback.rating ? 'fill-current' : 'text-muted/30'}`} />
                ))}
              </div>
            </CardHeader>
            <CardContent className="pb-4 flex-1">
              <p className="text-sm leading-relaxed line-clamp-4">{feedback.comment}</p>
            </CardContent>
            <div className="bg-muted/20 px-4 py-2 text-xs flex justify-between items-center border-t">
              <span className={`font-semibold capitalize ${
                feedback.sentiment === 'positive' ? 'text-success' : 
                feedback.sentiment === 'negative' ? 'text-destructive' : 'text-slate-500'
              }`}>
                {feedback.sentiment === 'positive' ? 'Ijobiy' : 
                 feedback.sentiment === 'negative' ? 'Salbiy' : 'Neytral'}
              </span>
              <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px]">
                Javob qaytarish
              </Button>
            </div>
          </Card>
        ))}
        {filteredFeedback.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground">
             Ushbu bo'limda hozircha fikrlar yo'q
          </div>
        )}
      </div>
    </div>
  )
}
