"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, LayoutDashboard, Library, MessageSquare, PieChart, Settings, Presentation, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Asosiy", href: "/dashboard", icon: LayoutDashboard },
  { name: "Mening Kurslarim", href: "/dashboard/courses", icon: BookOpen },
  { name: "Media Kutubxona", href: "/dashboard/media", icon: Library },
  { name: "Prezentatsiyalar", href: "/dashboard/presentations", icon: Presentation },
  { name: "Tahlil va Hisobotlar", href: "/dashboard/analytics", icon: PieChart },
  { name: "Muloqot", href: "/dashboard/messages", icon: MessageSquare },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card px-4 py-6 text-card-foreground">
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
          EF
        </div>
        <span className="text-xl font-heading font-bold tracking-tight">EduForge</span>
      </div>

      <nav className="flex-1 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto pt-4 space-y-1 border-t">
        <Link
          href="/dashboard/settings"
          className={cn(
            "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
            pathname === "/dashboard/settings" && "bg-muted text-foreground"
          )}
        >
          <Settings className="h-5 w-5" />
          Sozlamalar
        </Link>
        <Link
          href="/help"
          className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <HelpCircle className="h-5 w-5" />
          Yordam
        </Link>
      </div>
    </div>
  )
}
