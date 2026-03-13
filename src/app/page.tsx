import Link from "next/link"
import { ArrowRight, BookOpen, Brain, Sparkles, MonitorIcon, GraduationCap, LayoutIcon, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 font-heading font-bold text-2xl tracking-tighter text-primary">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Sparkles className="h-5 w-5" />
            </div>
            EduForge
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="#features" className="text-muted-foreground hover:text-primary transition-colors">Xususiyatlar</Link>
            <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">Platforma haqida</Link>
            <Link href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Narxlar</Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">Kirish</Link>
            </Button>
            <Button size="sm" asChild className="rounded-full px-6 shadow-lg shadow-primary/20">
              <Link href="/courses/new">Boshlash</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 lg:py-32">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(124,58,237,0.05)_0%,rgba(255,255,255,0)_100%)]" />
          <div className="absolute top-0 left-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-radial from-primary/5 to-transparent blur-3xl opacity-50" />
          
          <div className="container px-6 lg:px-8 max-w-7xl mx-auto text-center">
            <Badge variant="outline" className="mb-8 rounded-full border-primary/20 bg-primary/5 text-primary py-1.5 px-4 font-semibold text-xs tracking-wide uppercase animate-in fade-in slide-in-from-bottom-2 duration-700">
              <Sparkles className="mr-2 h-3.5 w-3.5" /> O'zbekistondagi ilk AI-integratsiyalashgan LMS
            </Badge>
            <h1 className="mx-auto max-w-4xl text-5xl font-heading font-extrabold tracking-tight sm:text-7xl leading-[1.1] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Keyingi Avlod <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#3B82F6]">Ta'limiy Resurslarini</span> Birga Yarating
            </h1>
            <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground mb-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
              Universitet o'qituvchilari va talabalari uchun mo'ljallangan, sun'iy intellekt yordamida kurslar, testlar va slaydlar yaratish platformasi.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              <Button size="lg" asChild className="h-14 px-10 rounded-full text-lg font-semibold shadow-xl shadow-primary/25">
                <Link href="/courses/new">
                  Kurs yaratishni boshlang <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-14 px-10 rounded-full text-lg border-primary/20 hover:bg-primary/5">
                <Link href="/dashboard">Demoni ko'rish</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 bg-muted/30">
          <div className="container px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl font-heading font-bold tracking-tight sm:text-4xl mb-4">Hammasi bir joyda</h2>
              <p className="text-muted-foreground text-lg">Platformamiz ta'lim sifatini oshirish uchun barcha asboblarni taqdim etadi.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group relative overflow-hidden rounded-2xl border bg-card p-8 transition-all hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
                <div className="mb-6 h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <LayoutIcon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Kurs Konstruktori</h3>
                <p className="text-muted-foreground">Oson va tushunarli interfeys orqali darslar, modullar va ierarxiyalarni boshqaring.</p>
              </div>
              
              <div className="group relative overflow-hidden rounded-2xl border bg-card p-8 transition-all hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
                <div className="mb-6 h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                  <Brain className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">AI Yordamchisi</h3>
                <p className="text-muted-foreground">Matnlarni yaxshilash, avtomatik testlar va slaydlar generatsiya qilish — barchasi bir tugmada.</p>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border bg-card p-8 transition-all hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
                <div className="mb-6 h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">LMS Integratsiyasi</h3>
                <p className="text-muted-foreground">Talabalar uchun qulay o'quv muhiti, progressni kuzatish va interaktiv darsliklar.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24">
          <div className="container px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="rounded-3xl bg-primary/5 border border-primary/10 p-12 lg:p-20 text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-64 w-64 bg-primary/10 rounded-full blur-3xl" />
               <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 h-64 w-64 bg-blue-500/10 rounded-full blur-3xl" />
               
               <h2 className="text-4xl font-heading font-extrabold mb-12">Raqamlarda EduForge</h2>
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 relative z-10">
                 <div>
                    <div className="text-5xl font-black text-primary mb-2">1,500+</div>
                    <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">Yaratilgan Kurslar</p>
                 </div>
                 <div>
                    <div className="text-5xl font-black text-primary mb-2">12k+</div>
                    <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">Talabalar soni</p>
                 </div>
                 <div>
                    <div className="text-5xl font-black text-primary mb-2">98%</div>
                    <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">Ijobiy Sharhlar</p>
                 </div>
               </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-card">
        <div className="container px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 font-heading font-bold text-xl tracking-tighter text-foreground grayscale">
            <div className="h-6 w-6 rounded bg-foreground flex items-center justify-center text-background">
              <Sparkles className="h-4 w-4" />
            </div>
            EduForge
          </div>
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} EduForge — Zamonaviy universitetlar uchun yechim.
          </div>
          <div className="flex gap-6">
            <Link href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Yordam</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Maxfiylik</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
