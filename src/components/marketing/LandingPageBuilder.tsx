"use client"

import { useState } from "react"
import { Eye, Smartphone, MonitorPlay, Save, Plus, ArrowUp, ArrowDown, Trash2, HelpCircle, Palette } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function LandingPageBuilder() {
  const [deviceView, setDeviceView] = useState<"desktop" | "mobile">("desktop")

  const [sections, setSections] = useState([
    { id: 'hero', type: 'Hero', title: "Asosiy Ekran", visible: true },
    { id: 'about', type: 'About', title: "Kurs Haqida", visible: true },
    { id: 'curriculum', type: 'Curriculum', title: "Dastur (Curriculum)", visible: true },
    { id: 'instructor', type: 'Instructor', title: "O'qituvchi", visible: true },
    { id: 'pricing', type: 'Pricing', title: "Narxlar", visible: true },
    { id: 'faq', type: 'FAQ', title: "Ko'p So'raladigan Savollar", visible: false },
  ])

  const toggleSection = (id: string) => {
    setSections(sections.map(s => s.id === id ? { ...s, visible: !s.visible } : s))
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)] min-h-[600px]">
      
      {/* Settings Panel */}
      <div className="w-full lg:w-80 shrink-0 flex flex-col gap-4 border rounded-lg bg-card overflow-hidden h-full">
        <div className="p-4 border-b bg-muted/20 pb-3">
           <h3 className="font-semibold">Landing Page Sozlamalari</h3>
           <p className="text-xs text-muted-foreground mt-1">Sotuv sahifasini moslashtiring</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Tuzilma (Sections)</Label>
            </div>
            
            <div className="space-y-2">
              {sections.map((section, index) => (
                <div key={section.id} className="flex items-center justify-between border rounded-md p-2 bg-background">
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={section.visible} 
                      onCheckedChange={() => toggleSection(section.id)} 
                      id={`switch-${section.id}`} 
                    />
                    <Label htmlFor={`switch-${section.id}`} className="text-xs font-medium cursor-pointer">{section.title}</Label>
                  </div>
                  <div className="flex items-center opacity-50">
                    <Button variant="ghost" size="icon" className="h-6 w-6"><ArrowUp className="h-3 w-3" /></Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6"><ArrowDown className="h-3 w-3" /></Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full text-xs font-medium border-dashed">
              <Plus className="mr-2 h-3.5 w-3.5" /> Bo'lim qo'shish
            </Button>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <Label className="text-sm font-semibold flex items-center"><Palette className="mr-2 h-4 w-4" /> Asosiy Ranglar</Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[10px] uppercase text-muted-foreground">Asosiy</Label>
                <div className="flex items-center gap-2 border rounded-md p-1 h-9 bg-background">
                  <div className="h-6 w-6 rounded-sm bg-[#7C3AED]"></div>
                  <span className="text-xs font-mono text-muted-foreground">#7C3AED</span>
                </div>
              </div>
              <div className="space-y-1.5">
                 <Label className="text-[10px] uppercase text-muted-foreground">Tugmalar</Label>
                <div className="flex items-center gap-2 border rounded-md p-1 h-9 bg-background">
                  <div className="h-6 w-6 rounded-sm bg-[#3B82F6]"></div>
                  <span className="text-xs font-mono text-muted-foreground">#3B82F6</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <Label className="text-sm font-semibold text-alert flex items-center"><Badge variant="outline" className="text-[9px] mr-2 bg-primary/10 text-primary border-primary/20">SEO</Badge> Meta Ma'lumotlar</Label>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Sahifa sarlavhasi (Title)</Label>
                <Input defaultValue="Python Dasturlash Asoslari - EduForge" className="text-sm h-8" />
              </div>
              <div className="space-y-1.5">
                 <Label className="text-xs">Qisqa tavsif (Description)</Label>
                <Textarea defaultValue="Noldan boshlab professionalgacha Python dasturlash tilini amaliy loyihalar orqali o'rganing." className="text-sm min-h-[60px] resize-none" />
              </div>
            </div>
          </div>

        </div>
        
        <div className="p-4 border-t bg-muted/20 gap-2 flex">
          <Button variant="outline" className="w-full">Bekor qilish</Button>
          <Button className="w-full bg-primary"><Save className="mr-2 h-4 w-4" /> Saqlash</Button>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="flex-1 flex flex-col border rounded-lg bg-muted/30 overflow-hidden h-full">
        {/* Preview Toolbar */}
        <div className="h-14 border-b flex items-center justify-between px-4 bg-card shrink-0">
          <div className="flex items-center bg-muted/50 p-1 rounded-md">
            <Button 
              variant={deviceView === 'desktop' ? 'secondary' : 'ghost'} 
              size="sm" 
              className={`h-8 ${deviceView === 'desktop' ? 'shadow-sm' : ''}`}
              onClick={() => setDeviceView('desktop')}
            >
              <MonitorPlay className="h-4 w-4 mr-2" /> Kompyuter
            </Button>
            <Button 
              variant={deviceView === 'mobile' ? 'secondary' : 'ghost'} 
              size="sm" 
              className={`h-8 ${deviceView === 'mobile' ? 'shadow-sm' : ''}`}
              onClick={() => setDeviceView('mobile')}
            >
              <Smartphone className="h-4 w-4 mr-2" /> Mobil
            </Button>
          </div>
          <Button variant="outline" size="sm" className="bg-background text-primary hover:text-primary">
            <Eye className="mr-2 h-4 w-4" /> Jonli Ko'rish
          </Button>
        </div>

        {/* Live Preview Canvas */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center bg-[#F8FAFC] dark:bg-[#020817]">
          <div 
            className={`bg-background border rounded-lg shadow-xl overflow-hidden overflow-y-auto transition-all duration-300 ${
              deviceView === 'desktop' ? 'w-full max-w-4xl' : 'w-[375px]'
            }`}
          >
             {/* Dynamic Mock Landing Page Inside Builder */}
             
             {/* Navbar */}
             <div className="h-16 border-b flex items-center justify-between px-6 bg-white dark:bg-card">
               <div className="font-bold text-lg text-primary">Python Mastery</div>
               {deviceView === 'desktop' && (
                 <div className="flex items-center gap-6 text-sm font-medium">
                   <span className="text-muted-foreground">Kurs haqida</span>
                   <span className="text-muted-foreground">Dastur</span>
                   <span className="text-muted-foreground">Narxlar</span>
                   <Button size="sm">Sotib olish</Button>
                 </div>
               )}
             </div>

             {/* Hero Section */}
             {sections.find(s => s.id === 'hero')?.visible && (
               <div className="py-20 px-6 sm:px-12 flex flex-col items-center text-center border-b">
                 <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 text-sm py-1 px-3">Yangi Kurs</Badge>
                 <h1 className={`${deviceView === 'desktop' ? 'text-5xl' : 'text-3xl'} font-extrabold tracking-tight mb-6`}>
                   Python Dasturlashni <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#3B82F6]">Noldan O'rganing</span>
                 </h1>
                 <p className="text-lg text-muted-foreground max-w-2xl mb-10">
                   Amaliy loyihalar, interaktiv testlar va sun'iy intellekt yordamida zamonaviy kasb egasiga aylaning.
                 </p>
                 <div className="flex gap-4 w-full sm:w-auto">
                   <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base">Hozir Boshlash (499,000 so'm)</Button>
                 </div>
               </div>
             )}

             {/* Course Features */}
             {sections.find(s => s.id === 'about')?.visible && (
               <div className="py-16 px-6 sm:px-12 bg-muted/30 border-b">
                 <div className="text-center mb-12">
                   <h2 className="text-2xl sm:text-3xl font-bold">Nimalarni o'rganasiz?</h2>
                 </div>
                 <div className={`grid gap-6 ${deviceView === 'desktop' ? 'grid-cols-3' : 'grid-cols-1'}`}>
                   {[1, 2, 3].map(i => (
                     <Card key={i} className="bg-background border-none shadow-sm">
                       <CardHeader className="pb-2">
                         <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                           <Save className="h-5 w-5" />
                         </div>
                         <CardTitle className="text-base">Amaliy Loyihalar</CardTitle>
                       </CardHeader>
                       <CardContent>
                         <p className="text-sm text-muted-foreground">Nazariyani amaliyotda qo'llash orqali real muammolarga yechim topish komnikmalarini shakllantiring.</p>
                       </CardContent>
                     </Card>
                   ))}
                 </div>
               </div>
             )}
             
             {/* Curriculum preview placeholder */}
             {sections.find(s => s.id === 'curriculum')?.visible && (
               <div className="py-16 px-6 sm:px-12 border-b">
                 <div className="text-center mb-12">
                   <h2 className="text-2xl sm:text-3xl font-bold mb-4">Kurs Dasturi</h2>
                   <p className="text-muted-foreground">Jami 12 ta modul — 48 ta dars</p>
                 </div>
                 <div className="max-w-2xl mx-auto border rounded-xl overflow-hidden shadow-sm">
                   {[1, 2, 3].map(i => (
                     <div key={i} className="p-4 border-b last:border-0 bg-background flex items-center justify-between hover:bg-muted/30 cursor-pointer">
                       <div className="font-medium text-sm">Modul {i}: Asoslar va Sintaksis</div>
                       <ChevronDown className="h-4 w-4 text-muted-foreground opacity-50" />
                     </div>
                   ))}
                 </div>
               </div>
             )}

             {/* Footer space */}
             <div className="py-12 px-6 bg-[#0B0F19] text-white/60 text-center text-sm">
               EduForge © {new Date().getFullYear()} — Barcha huquqlar himoyalangan.
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Just importing icons locally to avoid passing as prop which breaks in component above
import { ChevronDown } from "lucide-react"
