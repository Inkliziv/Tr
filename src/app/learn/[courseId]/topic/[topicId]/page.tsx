"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Play } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { mockModules } from "@/lib/mock-data"
import { StudentChatbot } from "@/components/chat/StudentChatbot"

export default function TopicViewerPage() {
  const params = useParams()
  const topicId = params.topicId as string
  
  // Find topic
  let currentTopic = null
  let currentModule = null
  
  for (const mod of mockModules) {
    if (topicId) {
       const topic = mod.topics.find(t => t.id === topicId)
       if (topic) {
         currentTopic = topic
         currentModule = mod
         break
       }
    } else {
       // Default to very first topic if no ID provided in URL segment
       currentTopic = mod.topics[0]
       currentModule = mod
       break
    }
  }

  if (!currentTopic) {
    return <div className="p-8 text-center text-muted-foreground">Bunday dars topilmadi.</div>
  }

  return (
    <div className="max-w-4xl mx-auto pb-24">
      {/* Topic Header metadata */}
      <div className="px-6 py-8 sm:px-10 sm:py-12 border-b bg-card">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-xs uppercase font-semibold">
            Modul {currentModule?.order}: {currentModule?.title}
          </Badge>
          <Badge variant="secondary" className="text-xs uppercase bg-muted text-muted-foreground">
            {currentTopic.type === 'VIDEO' ? 'Video dars' : currentTopic.type === 'THEORY' ? 'Nazariy matn' : 'Test'}
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight mb-4">
          {currentTopic.title}
        </h1>
        {(currentTopic as any).description && (
          <p className="text-lg text-muted-foreground">
            {(currentTopic as any).description}
          </p>
        )}
      </div>

      {/* Main Content Renderer depending on type */}
      <div className="px-6 py-8 sm:px-10">
        
        {currentTopic.type === 'VIDEO' && (
          <div className="space-y-6">
            <div className="aspect-video bg-black rounded-lg sm:rounded-xl overflow-hidden relative shadow-lg flex items-center justify-center border">
               {/* Mock Video Player */}
               <div className="absolute inset-0 bg-secondary flex items-center justify-center group cursor-pointer">
                 <div className="h-16 w-16 bg-primary/90 text-white rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg">
                   <Play className="h-8 w-8 ml-1" />
                 </div>
                 <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded font-medium">
                   14:25
                 </div>
               </div>
            </div>
            
            <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
              <h3>Video haqida qisqacha</h3>
              <p>Ushbu videodarsda Python dasturlash tilining asosiy strukturasi va kerakli o'zgaruvchilar haqida batafsil ma'lumot beriladi.</p>
            </div>
          </div>
        )}

        {currentTopic.type === 'THEORY' && (
           <div 
             className="prose prose-sm sm:prose-base dark:prose-invert max-w-none prose-headings:text-primary prose-a:text-[#3B82F6]"
             dangerouslySetInnerHTML={{ __html: (currentTopic.content as any).html || "<p>Matn mazmuni yuklanmoqda...</p>" }}
           />
        )}

        {currentTopic.type === 'QUIZ' && (
          <div className="bg-card border rounded-xl p-8 text-center shadow-sm space-y-6 max-w-2xl mx-auto mt-6">
            <div className="h-20 w-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 15L11 17L15 13"/></svg>
            </div>
            <h2 className="text-2xl font-bold">Modul yuzasidan test</h2>
            <p className="text-muted-foreground">
              Ushbu test 10 ta savoldan iborat bo'lib, o'tilgan materiallarni qanchalik o'zlashtirganingizni tekshiradi.
              O'tish bali: 70%.
            </p>
            <div className="flex justify-center pt-4">
              <Button size="lg" className="w-full sm:w-auto px-12 text-lg h-14 bg-primary hover:bg-primary/90">Testni Boshlash</Button>
            </div>
          </div>
        )}
      </div>

      {/* Floating AI chatbot for student side */}
      <StudentChatbot />
    </div>
  )
}
