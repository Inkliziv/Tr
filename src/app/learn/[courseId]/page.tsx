"use client"

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function LearnIndexPage() {
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/courses/${params.courseId}`)
      if (!res.ok) return
      const data = await res.json()
      const firstModule = (data.modules || [])[0]
      const firstTopic = firstModule && (firstModule.topics || [])[0]
      if (firstTopic) {
        router.replace(`/learn/${params.courseId}/topic/${firstTopic.id}`)
      }
    }
    load()
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

