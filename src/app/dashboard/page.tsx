"use client"

import Link from "next/link"
import { Trophy, Flame, Star, Play, CheckCircle2, Lock, ArrowRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useProgress } from "@/hooks/useProgress"

export default function DashboardPage() {
  const { progress, isLoaded, getOverallStats } = useProgress()
  const stats = getOverallStats()

  // Make sure we have the works sorted by id
  const works = Object.values(progress).sort((a, b) => a.id - b.id)

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight text-foreground">
            Mening Progressim
          </h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            "Ta'limiy resurslarni ishlab chiqish" fani bo'yicha amaliy ishlar holati.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm border-border/50 bg-card/50 backdrop-blur-sm border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tugallangan</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.completedCount}<span className="text-lg text-muted-foreground font-normal">/12</span></div>
            <Progress value={stats.percentage} className="h-2 mt-3" />
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-border/50 bg-card/50 backdrop-blur-sm border-l-4 border-l-warning">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">To'plangan XP</CardTitle>
            <Star className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalScore}</div>
            <p className="text-xs text-muted-foreground mt-2">Umumiy ballar</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/50 bg-card/50 backdrop-blur-sm border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ketma-ketlik (Streak)</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1 <span className="text-lg font-normal text-muted-foreground">kun</span></div>
            <p className="text-xs text-muted-foreground mt-2">Hali davom etmoqda</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Amaliy Ishlar (12 ta)</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {works.map((work) => {
            const isStarted = work.steps_done.length > 0
            const isCompleted = work.completed
            const progressPercent = Math.round((work.steps_done.length / work.total_steps) * 100)
            
            return (
              <Card key={work.id} className={`overflow-hidden flex flex-col hover:shadow-md transition-all duration-300 border-border/60 ${isCompleted ? 'bg-success/5 border-success/20' : ''}`}>
                <CardHeader className="p-5 pb-3">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-lg">
                      {work.id}
                    </div>
                    {isCompleted ? (
                      <Badge className="bg-success text-white hover:bg-success/90">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Bajarildi
                      </Badge>
                    ) : isStarted ? (
                      <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                        <Play className="w-3 h-3 mr-1" /> Davom etmoqda
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground">
                        <Lock className="w-3 h-3 mr-1" /> Boshlanmagan
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    {work.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-5 pt-0 flex-1 flex flex-col justify-end">
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progress</span>
                      <span>{work.steps_done.length} / {work.total_steps} qadam</span>
                    </div>
                    <Progress value={progressPercent} className={`h-1.5 ${isCompleted ? '[&>div]:bg-success' : ''}`} />
                  </div>
                </CardContent>
                
                <CardFooter className="p-5 pt-0">
                  <Button 
                    variant={isCompleted ? "outline" : isStarted ? "default" : "secondary"} 
                    className="w-full" 
                    asChild
                  >
                    <Link href={`/dashboard/amaliy-ish/${work.id}`}>
                      {isCompleted ? "Qayta ko'rish" : isStarted ? "Davom etish" : "Boshlash"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
