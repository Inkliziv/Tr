import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { AIChat } from "@/components/shared/AIChat"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full overflow-hidden relative">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-muted/10 relative">
          {children}
        </main>
      </div>
      <AIChat />
    </div>
  )
}

