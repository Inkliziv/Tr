"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, LayoutDashboard, Library, MessageSquare, PieChart, Settings, Presentation, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Mening progressim", href: "/dashboard", icon: PieChart },
  { name: "Portfolio", href: "/dashboard/portfolio", icon: Library },
]

const amaliyIshlar = [
  { name: "№4. Nazariy kontent", href: "/dashboard/amaliy-ish/4" },
  { name: "№5. Amaliy / Lab", href: "/dashboard/amaliy-ish/5" },
  { name: "№6. Nazorat qismi (Test)", href: "/dashboard/amaliy-ish/6" },
  { name: "№7. Multimedia", href: "/dashboard/amaliy-ish/7" },
  { name: "№8. OER va litsenziyalar", href: "/dashboard/amaliy-ish/8" },
  { name: "№9. Forum va muloqot", href: "/dashboard/amaliy-ish/9" },
  { name: "№10. Kurs interfeysi", href: "/dashboard/amaliy-ish/10" },
  { name: "№11. Inklyuzivlik", href: "/dashboard/amaliy-ish/11" },
  { name: "№12. Test sinovi", href: "/dashboard/amaliy-ish/12" },
  { name: "№13. Takomillashtirish", href: "/dashboard/amaliy-ish/13" },
  { name: "№14. Marketing strategy", href: "/dashboard/amaliy-ish/14" },
  { name: "№15. Yakuniy demo", href: "/dashboard/amaliy-ish/15" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card text-card-foreground">
      <div className="flex items-center gap-2 p-6 pb-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
          EF
        </div>
        <span className="text-xl font-heading font-bold tracking-tight">EduForge</span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {/* Main navigation */}
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-4 w-4", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Amaliy Ishlar List */}
        <div>
          <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Amaliy Ishlar (12 ta)
          </h3>
          <nav className="space-y-1">
            {amaliyIshlar.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-secondary text-secondary-foreground font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <BookOpen className={cn("h-4 w-4", isActive ? "text-secondary-foreground" : "text-muted-foreground/70")} />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      <div className="p-4 space-y-1 border-t bg-card">
        <Link
          href="/dashboard/settings"
          className={cn(
            "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
            pathname === "/dashboard/settings" && "bg-muted text-foreground"
          )}
        >
          <Settings className="h-4 w-4" />
          Sozlamalar
        </Link>
        <Link
          href="/help"
          className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <HelpCircle className="h-4 w-4" />
          Yordam
        </Link>
      </div>
    </div>
  )
}
