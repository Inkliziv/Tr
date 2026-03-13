import Link from "next/link"
import { Plus, Users, BookOpen, Clock, Activity, ArrowRight, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatDate } from "@/lib/utils"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

async function getCourses() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/courses`, {
    cache: "no-store",
  })
  if (!res.ok) return []
  return res.json()
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions as any)
  const courses: any[] = await getCourses()
  const publishedCourses = courses.filter(c => c.status === "PUBLISHED")
  const totalStudents = 0

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight text-foreground">
            Xush kelibsiz, {session?.user?.name?.split(" ")[0] ?? "foydalanuvchi"}!
          </h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">Sizning o'qituvchi panelida bugungi holat.</p>
        </div>
        <Button size="lg" className="rounded-full shadow-sm" asChild>
          <Link href="/courses/new">
            <Plus className="mr-2 h-5 w-5" />
            Yangi Kurs Yaratish
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Jami Talabalar</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}+</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <span className="text-success font-medium flex items-center mr-1">
                <ArrowRight className="h-3 w-3 -rotate-45" /> 12%
              </span>
              oldingi oyga nisbatan
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Faol Kurslar</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedCourses.length}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              {courses.length - publishedCourses.length} ta drafkurs
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">O'rtacha Baho</CardTitle>
            <Activity className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              24 ta yangi baho
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">O'quv Soatlari</CardTitle>
            <Clock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,240 h</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              Umumiy ko'rilgan vaqt
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">So'nggi Kurslar</h2>
          <Button variant="ghost" className="text-sm" asChild>
            <Link href="/dashboard/courses">Barchasini ko'rish</Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 3).map((course) => (
            <Card key={course.id} className="overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-300 border-border/60">
              <div className="aspect-video w-full bg-muted relative group">
                {course.thumbnail ? (
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 text-primary">
                    <BookOpen className="h-10 w-10 mb-2 opacity-50" />
                    <span className="text-sm font-medium opacity-70">Rasm yuklanmagan</span>
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <Badge
                    variant={
                      course.status === "PUBLISHED"
                        ? "default"
                        : course.status === "DRAFT"
                        ? "secondary"
                        : "outline"
                    }
                    className={course.status === "PUBLISHED" ? "bg-success hover:bg-success/90" : ""}
                  >
                    {course.status === "PUBLISHED"
                      ? "Faol"
                      : course.status === "DRAFT"
                      ? "Qoralama"
                      : "Kutilmoqda"}
                  </Badge>
                </div>
              </div>
              <CardHeader className="p-5 pb-0 flex-1">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <Badge variant="outline" className="text-[10px] mb-2 font-medium uppercase tracking-wider">
                      Kurs
                    </Badge>
                    <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">
                      <Link href={`/courses/${course.id}/edit`}>{course.title}</Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-2 mt-1.5 text-xs leading-relaxed">
                      {course.description}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="-mr-2 h-8 w-8 text-muted-foreground hover:text-foreground">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Menyu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild><Link href={`/courses/${course.id}/edit`}>Tahrirlash</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild><Link href={`/learn/${course.id}`}>Ko'rish</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild><Link href={`/courses/${course.id}/analytics`}>Statistika</Link></DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardFooter className="p-5 pt-4 border-t text-xs text-muted-foreground flex justify-between items-center mt-4">
                <div className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  <span>— talaba</span>
                </div>
                <div className="flex items-center gap-1">
                  Muddati: <span className="font-medium text-foreground">{formatDate(course.updatedAt)}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
