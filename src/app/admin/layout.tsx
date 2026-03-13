import { Shield, Users, Settings, BarChart, BookOpen, AlertCircle, LayoutDashboard } from "lucide-react"
import Link from "next/link"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <aside className="w-64 border-r bg-card flex flex-col hidden md:flex shrink-0">
        <div className="h-16 flex items-center px-6 border-b shrink-0 flex items-center gap-2">
           <div className="bg-destructive/10 p-1.5 rounded-md">
             <Shield className="h-5 w-5 text-destructive" />
           </div>
           <span className="font-bold text-lg tracking-tight">AdminPortal</span>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md bg-destructive/10 text-destructive">
            <LayoutDashboard className="h-4 w-4" /> Boshqaruv Paneli
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <Users className="h-4 w-4" /> Foydalanuvchilar
          </Link>
          <Link href="/admin/courses" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <BookOpen className="h-4 w-4" /> Kurslar
          </Link>
          <Link href="/admin/reports" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <AlertCircle className="h-4 w-4" /> Shikoyatlar (<span className="text-warning">3</span>)
          </Link>
          <Link href="/admin/analytics" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <BarChart className="h-4 w-4" /> Umumiy Analitika
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <Settings className="h-4 w-4" /> Tizim Sozlamalari
          </Link>
        </nav>
        <div className="p-4 border-t text-xs text-muted-foreground text-center">
          EduForge v1.0 • Admin
        </div>
      </aside>
      <main className="flex-1 overflow-hidden flex flex-col relative w-full">
        {children}
      </main>
    </div>
  )
}
