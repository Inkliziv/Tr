"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { PlayCircle, CheckCircle2, ChevronDown, AlignLeft, BookOpen, MonitorPlay, ChevronLeft, ChevronRight, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { mockCourses, mockModules } from "@/lib/mock-data"

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  const params = useParams()
  const pathname = usePathname()
  const courseId = params.courseId as string
  const course = mockCourses.find(c => c.id === courseId) || mockCourses[0]

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // Calculate overall progress based on mock data
  const totalTopics = mockModules.reduce((acc, mod) => acc + mod.topics.length, 0)
  const completedTopics = Math.floor(totalTopics * 0.4) // Mock 40% completion
  const progressPercentage = Math.round((completedTopics / totalTopics) * 100) || 0

  const getIconForType = (type: string) => {
    switch (type) {
      case 'VIDEO': return <PlayCircle className="h-4 w-4" />
      case 'THEORY': return <AlignLeft className="h-4 w-4" />
      case 'QUIZ': return <CheckCircle2 className="h-4 w-4" />
      case 'PRESENTATION': return <MonitorPlay className="h-4 w-4" />
      default: return <BookOpen className="h-4 w-4" />
    }
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-card border-r">
      <div className="p-4 sm:p-6 border-b shrink-0 space-y-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="h-8 w-8 rounded-full -ml-2 text-muted-foreground hover:bg-muted">
            <Link href="/dashboard"><ChevronLeft className="h-5 w-5" /></Link>
          </Button>
          <h2 className="font-bold text-lg leading-tight line-clamp-2">{course.title}</h2>
        </div>
        
        <div className="space-y-1.5">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-muted-foreground">{progressPercentage}% yakunlandi</span>
            <span className="text-primary">{completedTopics}/{totalTopics}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {mockModules.map((module, mIndex) => {
            const isModuleCompleted = mIndex === 0 // Mock first module as completed
            
            return (
              <div key={module.id} className="space-y-2">
                <div className="flex items-center justify-between font-semibold text-sm px-2">
                  <span className="line-clamp-1 flex-1">Modul {module.order}: {module.title}</span>
                  <span className="text-xs text-muted-foreground shrink-0 ml-2">{module.topics.length} dars</span>
                </div>
                
                <div className="space-y-1 pl-2">
                  {module.topics.map((topic, tIndex) => {
                    // Just some mock logic to show active/completed states
                    const isActive = pathname.includes(`/topic/${topic.id}`)
                    // If no topic ID in URL, make first topic active
                    const isFirstTopic = !pathname.includes('/topic/') && mIndex === 0 && tIndex === 0
                    const isEffectivelyActive = isActive || isFirstTopic
                    
                    const isCompleted = isModuleCompleted || (mIndex === 1 && tIndex === 0)

                    return (
                      <Link 
                        key={topic.id} 
                        href={`/learn/${courseId}/topic/${topic.id}`}
                        className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
                          isEffectivelyActive 
                            ? 'bg-primary/10 text-primary font-medium' 
                            : 'hover:bg-muted font-medium text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <div className={`shrink-0 ${isCompleted ? 'text-success' : 'text-muted-foreground/50 group-hover:text-foreground/70'}`}>
                          {isCompleted ? <CheckCircle2 className="h-4 w-4 fill-success/20" /> : getIconForType(topic.type)}
                        </div>
                        <span className="line-clamp-2">{topic.order}. {topic.title}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      
      {/* Desktop Sidebar */}
      <div className={`hidden md:block transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-80' : 'w-0 overflow-hidden opacity-0'}`}>
        <SidebarContent />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Top Navigation Bar */}
        <header className="h-14 border-b bg-card flex items-center justify-between px-4 shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-2">
            
            {/* Mobile Sidebar Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden mr-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[300px]">
                <SidebarContent />
              </SheetContent>
            </Sheet>

            {/* Desktop Sidebar Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden md:flex text-muted-foreground hover:text-foreground"
            >
              <Menu className="h-5 w-5" />
            </Button>

            {!isSidebarOpen && (
              <span className="font-semibold text-sm ml-2 hidden lg:inline-block line-clamp-1">{course.title}</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:flex text-muted-foreground">
              Forum
            </Button>
            <Separator orientation="vertical" className="h-6 hidden sm:block mx-1" />
            <Button size="sm" variant="outline" className="text-xs">
              <span className="hidden sm:inline-block mr-1">Tugatilgan</span> <CheckCircle2 className="h-4 w-4 text-success sm:ml-1" />
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-xs px-3 sm:px-4">
              Kiyingisi <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </header>

        {/* Dynamic Topic Content */}
        <main className="flex-1 overflow-y-auto w-full relative">
          {children}
        </main>
      </div>
    </div>
  )
}
