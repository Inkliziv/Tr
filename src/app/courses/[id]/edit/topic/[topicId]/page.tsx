"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, ExternalLink, Save, BookOpen, Clock, BarChart, History } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TheoryEditor } from "@/components/editor/TheoryEditor"
import { AIWritingPanel } from "@/components/editor/AIWritingPanel"

import { mockCourses, mockModules } from "@/lib/mock-data"
import { readingTime } from "@/lib/utils"

export default function TopicEditorPage() {
  const params = useParams()
  // Mock data retrieval
  const courseId = params.id as string
  const topicId = params.topicId as string
  
  const course = mockCourses.find(c => c.id === courseId) || mockCourses[0]
  
  // Find topic from mock data
  let currentTopic = null
  let currentModule = null
  
  for (const mod of mockModules) {
    const topic = mod.topics.find(t => t.id === topicId)
    if (topic) {
      currentTopic = topic
      currentModule = mod
      break
    }
  }

  // Fallback if not found
  if (!currentTopic) {
    currentTopic = {
      id: "new-topic",
      moduleId: "mod-1",
      title: "Yangi dars",
      type: "THEORY",
      content: { html: "<p>Dars matnini bu yerga yozing...</p>" },
      order: 1,
      bloomLevel: "UNDERSTAND"
    }
  }

  const [title, setTitle] = useState(currentTopic.title)
  const [content, setContent] = useState((currentTopic.content as any).html || "<p>Dars matnini bu yerga yozing...</p>")
  const [bloomLevel, setBloomLevel] = useState(currentTopic.bloomLevel || "UNDERSTAND")
  const [isSaving, setIsSaving] = useState(false)
  const [selectedText, setSelectedText] = useState("")

  // Handle text selection for AI panel
  const handleMouseUp = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().length > 10) {
      setSelectedText(selection.toString())
    } else {
      setSelectedText("")
    }
  }

  const handleApplyAI = (suggestion: string) => {
    // Basic implementation: append suggestion
    // In a real TipTap integration, we would replace the selected range
    setContent((prev: string) => prev + `\n<br><strong>AI Tavsiyasi:</strong> ${suggestion}`)
  }

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 800)
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-muted/10">
      {/* Editor Header */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 lg:px-6 bg-card sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="rounded-full shrink-0">
            <Link href={`/courses/${courseId}/edit`}>
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          
          <div className="hidden md:flex flex-col">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-0.5">
              <Link href={`/courses/${courseId}/edit`} className="hover:text-foreground transition-colors line-clamp-1 max-w-[150px]">{course.title}</Link>
              <span>/</span>
              <span className="line-clamp-1 max-w-[150px]">{currentModule?.title || "Modul"}</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-[10px] uppercase font-semibold h-5 bg-primary/5 text-primary border-primary/20">
                Nazariya
              </Badge>
              <h1 className="text-sm font-semibold line-clamp-1 w-[200px] lg:w-[300px]">{title}</h1>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-xl px-4 hidden sm:block">
          <Input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            className="h-9 bg-muted/50 border-border/50 text-sm font-medium transition-colors focus-visible:bg-background"
            placeholder="Dars nomini kiriting..."
          />
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden lg:flex items-center text-xs text-muted-foreground mr-2 font-medium">
            <Clock className="mr-1.5 h-3.5 w-3.5" />
            ~{readingTime(content)} daqiqa o'qish
          </div>
          
          <Button variant="outline" size="sm" className="hidden sm:flex" asChild>
            <Link href={`/learn/${courseId}/topic/${topicId}`} target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" /> Koorish
            </Link>
          </Button>
          
          <Button size="sm" onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
            {isSaving ? "Saqlanm..." : <><Save className="hidden sm:inline-block mr-2 h-4 w-4" /> Saqlash</>}
          </Button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Editor Area */}
        <main 
          className="flex-1 overflow-y-auto p-4 lg:p-8"
          onMouseUp={handleMouseUp}
          onKeyUp={handleMouseUp}
        >
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Topic Metadata settings */}
            <div className="bg-card w-full border rounded-lg p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8 shadow-sm">
              <div className="flex gap-4 w-full sm:w-auto">
                <div className="space-y-1.5 w-full sm:w-48">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Bloom darajasi</label>
                  <Select value={bloomLevel} onValueChange={setBloomLevel}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="REMEMBER"><span className="text-blue-500 font-medium mr-2">1.</span> Eslab qolish</SelectItem>
                      <SelectItem value="UNDERSTAND"><span className="text-green-500 font-medium mr-2">2.</span> Tushunish</SelectItem>
                      <SelectItem value="APPLY"><span className="text-yellow-500 font-medium mr-2">3.</span> Qo'llash</SelectItem>
                      <SelectItem value="ANALYZE"><span className="text-orange-500 font-medium mr-2">4.</span> Tahlil qilish</SelectItem>
                      <SelectItem value="EVALUATE"><span className="text-red-500 font-medium mr-2">5.</span> Baholash</SelectItem>
                      <SelectItem value="CREATE"><span className="text-purple-500 font-medium mr-2">6.</span> Yaratish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  <History className="mr-2 h-3.5 w-3.5" /> Versiyalar
                </Button>
                <Separator orientation="vertical" className="h-4" />
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  <BarChart className="mr-2 h-3.5 w-3.5" /> Generatsiya: Test
                </Button>
              </div>
            </div>

            {/* TipTap Editor */}
            <TheoryEditor 
              content={content} 
              onChange={setContent} 
            />
            
            <div className="h-32"></div> {/* Spacer for scrolling */}
          </div>
        </main>

        {/* AI Assistant Sidebar Panel */}
        <div className="hidden lg:block">
          <AIWritingPanel 
            selectedText={selectedText}
            onApply={handleApplyAI}
          />
        </div>
      </div>
    </div>
  )
}
