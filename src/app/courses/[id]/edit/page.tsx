"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Save, Plus, Settings, Eye, MoreVertical, GripVertical, FileText, LayoutTemplate, PenTool, LayoutDashboard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { QuizBuilder } from "@/components/assessment/QuizBuilder"
import { SlideEditor } from "@/components/presentation/SlideEditor"
import { LandingPageBuilder } from "@/components/marketing/LandingPageBuilder"

import { mockCourses, mockModules, type Module, type Topic } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils"

export default function CourseEditorPage() {
  const params = useParams()
  // In a real app we would fetch the correct course based on the ID, but for mock:
  const isNew = params.id === "course-new"
  const course = mockCourses.find(c => c.id === params.id) || mockCourses[0]
  
  const [modules, setModules] = useState<Module[]>(isNew ? [] : mockModules)
  const [activeTab, setActiveTab] = useState("curriculum")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 800)
  }

  const addModule = () => {
    const newModule: Module = {
      id: `mod-${Date.now()}`,
      courseId: course.id,
      title: "Yangi modul nomi",
      order: modules.length + 1,
      topics: []
    }
    setModules([...modules, newModule])
  }

  const addTopic = (moduleId: string, type: Topic['type']) => {
    const updatedModules = modules.map(mod => {
      if (mod.id === moduleId) {
        const newTopic: Topic = {
          id: `topic-${Date.now()}`,
          moduleId,
          title: `Yangi ${type.toLowerCase()} mavzusi`,
          type,
          content: {},
          order: mod.topics.length + 1
        }
        return { ...mod, topics: [...mod.topics, newTopic] }
      }
      return mod
    })
    setModules(updatedModules)
  }

  return (
    <div className="flex h-screen overflow-hidden flex-col bg-background">
      {/* Editor Header */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b px-6 bg-card">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="rounded-full">
            <Link href="/dashboard/courses">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold line-clamp-1">{isNew ? "Yangi kurs (qoralama)" : course.title}</h1>
              <Badge variant={course.status === 'PUBLISHED' ? 'default' : 'secondary'} className="text-[10px] sm:flex hidden h-5">
                {course.status === 'PUBLISHED' ? 'Faol' : 'Qoralama'}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground flex items-center">
              So'nggi saqlangan: {new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="hidden sm:flex" asChild>
            <Link href={`/learn/${course.id}`} target="_blank">
              <Eye className="mr-2 h-4 w-4" /> Ko'rish
            </Link>
          </Button>
          <Button size="sm" onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90">
            {isSaving ? "Saqlanmoqda..." : <><Save className="mr-2 h-4 w-4" /> Saqlash</>}
          </Button>
          <Button size="sm" variant="secondary" className="hidden sm:flex">
            Nashr Qilish
          </Button>
        </div>
      </header>

      {/* Editor Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Left Sidebar - Settings Tabs */}
        <div className="w-64 shrink-0 border-r bg-muted/20 flex flex-col hidden md:flex">
          <div className="p-4 border-b">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Kurs Boshqaruvi</h2>
          </div>
          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            <button 
              onClick={() => setActiveTab("curriculum")} 
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${activeTab === "curriculum" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}
            >
              <LayoutDashboard className="h-4 w-4" /> Tuzilma va Mundarija
            </button>
            <button 
              onClick={() => setActiveTab("settings")} 
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${activeTab === "settings" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}
            >
              <Settings className="h-4 w-4" /> Umumiy Sozlamalar
            </button>
            <button 
              onClick={() => setActiveTab("quiz")} 
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${activeTab === "quiz" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}
            >
              <FileText className="h-4 w-4" /> Test va Nazorat
            </button>
            <button 
              onClick={() => setActiveTab("slides")} 
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${activeTab === "slides" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}
            >
              <Eye className="h-4 w-4" /> Prezentatsiya
            </button>
            <button 
              onClick={() => setActiveTab("marketing")} 
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${activeTab === "marketing" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}
            >
              <LayoutTemplate className="h-4 w-4" /> Sotuv Sahifasi
            </button>
          </nav>
        </div>

        {/* Main Workspace */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-muted/10">
          
          {activeTab === "curriculum" && (
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Koorik Mundarijasi</h2>
                  <p className="text-sm text-muted-foreground">Modullar va darslarni strukturalang. Elementlarni sichqoncha bilan siljitib ketma-ketlikni o'zgartirishingiz mumkin.</p>
                </div>
                <Button onClick={addModule} className="rounded-full shadow-sm">
                  <Plus className="mr-2 h-4 w-4" /> Modul Qo'shish
                </Button>
              </div>

              {modules.length === 0 ? (
                <div className="text-center p-12 border-2 border-dashed rounded-lg bg-card text-muted-foreground">
                  Hali hech narsa qo'shilmagan. Yangi modul yaratish orqali darslarni boshlang.
                </div>
              ) : (
                <div className="space-y-4">
                  {modules.map((module, i) => (
                    <Card key={module.id} className="shadow-sm border-border/60 overflow-hidden">
                      {/* Module Header */}
                      <div className="flex items-center group bg-card border-b p-4 gap-3">
                        <GripVertical className="hidden sm:block h-5 w-5 text-muted-foreground/30 cursor-grab hover:text-foreground transition-colors" />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Modul {i + 1}</span>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="ghost" size="sm" className="h-8 text-xs font-medium" onClick={() => addTopic(module.id, 'THEORY')}>
                                <Plus className="mr-1 h-3 w-3" /> Nazariya
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 text-xs font-medium" onClick={() => addTopic(module.id, 'QUIZ')}>
                                <Plus className="mr-1 h-3 w-3" /> Test
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Tahrirlash</DropdownMenuItem>
                                  <DropdownMenuItem>Nusxalash</DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">O'chirish</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          <Input 
                            value={module.title}
                            onChange={() => {}} 
                            className="font-semibold text-lg border-transparent px-0 h-auto py-1 shadow-none focus-visible:ring-0 focus-visible:bg-muted/50 transition-colors w-full rounded-md -ml-1 pl-1"
                          />
                        </div>
                      </div>

                      {/* Topics List */}
                      <div className="bg-muted/30 p-2 sm:p-4 min-h[100px] flex flex-col gap-2">
                        {module.topics.length === 0 ? (
                          <div className="text-xs text-center p-4 text-muted-foreground italic border border-dashed border-border/50 rounded bg-background/50">
                            Ushbu modul bo'sh. Tepada tahrirlash qismidan darslarni qo'shing.
                          </div>
                        ) : (
                          module.topics.map((topic, j) => (
                            <div key={topic.id} className="flex items-center gap-3 p-3 bg-card rounded-md border shadow-sm group hover:border-primary/50 transition-colors">
                              <GripVertical className="h-4 w-4 text-muted-foreground/30 cursor-grab hover:text-foreground opacity-50 hover:opacity-100 transition-all hidden sm:block" />
                              <Badge variant="outline" className="w-[85px] justify-center text-[10px] uppercase font-semibold h-5 shrink-0 bg-background text-muted-foreground">
                                {topic.type === 'THEORY' ? 'Nazariya' : topic.type === 'QUIZ' ? 'Test' : topic.type === 'VIDEO' ? 'Video' : 'Prezentatsiya'}
                              </Badge>
                              <Link 
                                href={`/courses/${course.id}/edit/topic/${topic.id}`}
                                className="flex-1 text-sm font-medium hover:text-primary transition-colors line-clamp-1"
                              >
                                1.{j + 1}. {topic.title}
                              </Link>
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 text-muted-foreground shrink-0 transition-opacity">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem asChild><Link href={`/courses/${course.id}/edit/topic/${topic.id}`}><PenTool className="mr-2 h-4 w-4" /> Tahrirlash</Link></DropdownMenuItem>
                                  <DropdownMenuItem><FileText className="mr-2 h-4 w-4" /> O'zgartirish tarixi</DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">O'chirish</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          ))
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "settings" && (
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
              <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight">Umumiy Sozlamalar</h2>
                <p className="text-sm text-muted-foreground">Kursning asosiy tafsilotlarini yangilang.</p>
              </div>

              <Card>
                <CardContent className="space-y-6 pt-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Kurs Nomi</label>
                    <Input defaultValue={course.title} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Qisqacha Tavsif</label>
                    <Textarea defaultValue={course.description} className="min-h-[120px]" />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "quiz" && (
            <div className="w-full animate-in fade-in duration-300">
              <QuizBuilder quizId={course.id as string} />
            </div>
          )}

          {activeTab === "slides" && (
            <div className="w-full max-w-5xl mx-auto animate-in fade-in duration-300">
              <div className="mb-4">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">Prezentatsiya Muharriri</h2>
                <p className="text-muted-foreground text-sm">Interaktiv slaydlar yarating va o'quvchilarga taqdim eting.</p>
              </div>
              <SlideEditor />
            </div>
          )}

          {activeTab === "marketing" && (
            <div className="w-full animate-in fade-in duration-300 h-full">
               <div className="mb-4">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">Sotuv Sahifasi</h2>
                <p className="text-muted-foreground text-sm">Kursni sotish uchun maxsus Landing Page yarating.</p>
              </div>
              <LandingPageBuilder />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
