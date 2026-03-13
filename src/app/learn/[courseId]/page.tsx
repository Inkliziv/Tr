"use client"

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { mockModules } from "@/lib/mock-data"
import { Loader2 } from "lucide-react"

export default function LearnIndexPage() {
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    // Redirect to the first topic of the first module
    if (mockModules.length > 0 && mockModules[0].topics.length > 0) {
      router.replace(`/learn/${params.courseId}/topic/${mockModules[0].topics[0].id}`)
    }
  }, [router, params.courseId])

  return (
    <div className="flex h-full w-full items-center justify-center p-8 text-center bg-muted/10">
      <div className="space-y-4">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
        <p className="text-muted-foreground text-sm font-medium">Darslik yuklanmoqda...</p>
      </div>
    </div>
  )
}
