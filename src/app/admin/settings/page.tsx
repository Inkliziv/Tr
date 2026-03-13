"use client"

import { useState } from "react"
import { Save, Server, Shield, Globe, Bell, Mail, Key } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminSettingsPage() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 800)
  }

  return (
    <div className="flex-1 overflow-y-auto w-full">
      <div className="h-16 flex items-center justify-between px-6 border-b bg-card sticky top-0 z-10 w-full">
        <div>
          <h1 className="text-xl font-semibold">Tizim Sozlamalari</h1>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90">
          {isSaving ? "Saqlanmoqda..." : <><Save className="mr-2 h-4 w-4" /> Barchasini Saqlash</>}
        </Button>
      </div>

      <div className="p-6 md:p-8 w-full max-w-5xl mx-auto">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-6 w-full sm:w-auto h-auto p-1 bg-muted/50 border overflow-x-auto justify-start flex-nowrap">
            <TabsTrigger value="general" className="gap-2 px-4 py-2"><Server className="h-4 w-4" /> Umumiy</TabsTrigger>
            <TabsTrigger value="security" className="gap-2 px-4 py-2"><Shield className="h-4 w-4" /> Xavfsizlik</TabsTrigger>
            <TabsTrigger value="emails" className="gap-2 px-4 py-2"><Mail className="h-4 w-4" /> Xabarlar stansiyasi</TabsTrigger>
            <TabsTrigger value="integrations" className="gap-2 px-4 py-2"><Globe className="h-4 w-4" /> Integratsiyalar</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card className="shadow-sm border-border/50">
              <CardHeader>
                <CardTitle>Platforma Ma'lumotlari</CardTitle>
                <CardDescription>Asosiy platforma sozlamalari va SEO ma'lumotlari</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Platforma nomi</Label>
                    <Input defaultValue="EduForge" />
                  </div>
                  <div className="space-y-2">
                    <Label>Asosiy til</Label>
                    <Select defaultValue="uz">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uz">O'zbek tili (Lotin)</SelectItem>
                        <SelectItem value="ru">Rus tili</SelectItem>
                        <SelectItem value="en">Ingliz tili</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Asosiy SEO Tavsifi (Description)</Label>
                  <Textarea 
                    defaultValue="O'zbekistonning eng ilg'or masofaviy ta'lim platformasi. Zamonaviy kasblarni biz bilan o'rganing." 
                    className="min-h-[100px]" 
                  />
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Ro'yxatdan o'tish yopiq</Label>
                      <p className="text-sm text-muted-foreground">Yangi foydalanuvchilar o'z-o'zidan ro'yxatdan o'ta olmaydi. Faqat admin qo'shadi.</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base text-destructive">Platformani o'chirish (Texnik ishlar)</Label>
                      <p className="text-sm text-muted-foreground">Barcha foydalanuvchilar uchun tizim "Tez orada" sahifasini ko'rsatadi</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <Card className="shadow-sm border-border/50">
              <CardHeader>
                <CardTitle>Tashqi xizmatlar va API</CardTitle>
                <CardDescription>Sun'iy intellekt va boshqa tizimlar integratsiyasi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* AI Config */}
                <div className="space-y-4 border rounded-lg p-4 bg-muted/10">
                  <div className="flex items-center gap-2 mb-2 justify-between">
                    <div className="flex items-center font-semibold text-primary">
                      <Key className="mr-2 h-5 w-5" /> Anthropic Claude API (AI Core)
                    </div>
                    <Badge className="bg-success text-white">Faol</Badge>
                  </div>
                  <div className="space-y-2">
                    <Label>API Kalit (API Key)</Label>
                    <Input type="password" defaultValue="sk-ant-api03-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" />
                    <p className="text-xs text-muted-foreground">Feedback analitikasi, savollar generatsiyasi va AI o'qituvchi uchun ishlatiladi.</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Asosiy Model</Label>
                    <Select defaultValue="sonnet">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="opus">Claude 3.5 Opus (Qimmatli, aniq)</SelectItem>
                        <SelectItem value="sonnet">Claude 3.5 Sonnet (Tavsiya etiladi)</SelectItem>
                        <SelectItem value="haiku">Claude 3.5 Haiku (Tezkor)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Zukkoo Config */}
                <div className="space-y-4 border rounded-lg p-4 bg-muted/10">
                  <div className="flex items-center gap-2 mb-2 justify-between">
                    <div className="flex items-center font-semibold text-[#7C3AED]">
                      <Globe className="mr-2 h-5 w-5" /> Zukkoo.uz Integratsiyasi
                    </div>
                    <Badge variant="outline" className="border-muted text-muted-foreground bg-background">O'chirilgan</Badge>
                  </div>
                  <div className="space-y-2">
                    <Label>Zukkoo Client ID</Label>
                    <Input placeholder="Client ID kiriting" />
                  </div>
                  <div className="space-y-2">
                    <Label>Zukkoo Secret Key</Label>
                    <Input type="password" placeholder="Secret Key kiriting" />
                    <p className="text-xs text-muted-foreground">Gamifikatsiyalashgan testlarni Zukkoo platformasidan tortib olish uchun.</p>
                  </div>
                  <Button variant="outline" className="w-full mt-2" size="sm">Bog'lanishni tekshirish</Button>
                </div>

              </CardContent>
            </Card>
          </TabsContent>

          {/* Other tabs are placeholders for completeness */}
          <TabsContent value="security">
             <Card className="shadow-sm border-border/50">
               <CardContent className="p-12 text-center text-muted-foreground">
                 Xavfsizlik sozlamalari (2FA, sessiyalarni boshqarish)
               </CardContent>
             </Card>
          </TabsContent>
          <TabsContent value="emails">
             <Card className="shadow-sm border-border/50">
               <CardContent className="p-12 text-center text-muted-foreground">
                 SMTP va xabarnoma shablonlari sozlamalari
               </CardContent>
             </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  )
}
