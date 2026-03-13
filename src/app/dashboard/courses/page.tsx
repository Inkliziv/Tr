import Link from "next/link"
import { Search, Plus, Filter, MoreHorizontal, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { mockCourses } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function CoursesPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Mening Kurslarim</h1>
          <p className="text-muted-foreground mt-1">Barcha yozilgan va yaratilgan kurslarni boshqarish.</p>
        </div>
        <Button asChild>
          <Link href="/courses/new">
            <Plus className="mr-2 h-4 w-4" />
            Yangi Kurs
          </Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center bg-card p-4 rounded-lg border shadow-sm">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Kurs nomi bo'yicha qidiruv" className="pl-9 bg-background" />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="rounded-md border bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[400px]">Kurs Nomi</TableHead>
              <TableHead>Holati</TableHead>
              <TableHead>Talabalar</TableHead>
              <TableHead>Oxirgi o'zgarish</TableHead>
              <TableHead className="text-right">Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCourses.map((course) => (
              <TableRow key={course.id} className="group transition-colors hover:bg-muted/50">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <Link href={`/courses/${course.id}/edit`} className="hover:text-primary hover:underline transition-colors block line-clamp-1">
                        {course.title}
                      </Link>
                      <span className="text-xs text-muted-foreground block line-clamp-1 mt-0.5">{course.category} • {course.moduleCount} ta modul</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={
                    course.status === 'PUBLISHED' ? 'default' : 
                    course.status === 'DRAFT' ? 'secondary' : 'outline'
                  } className={course.status === 'PUBLISHED' ? "bg-success" : ""}>
                    {course.status === 'PUBLISHED' ? 'Faol' : 
                     course.status === 'DRAFT' ? 'Qoralama' : 'Kutilmoqda'}
                  </Badge>
                </TableCell>
                <TableCell>{course.enrollmentCount || 0}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{formatDate(course.updatedAt)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100">
                        <span className="sr-only">Menyuni ochish</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild><Link href={`/courses/${course.id}/edit`}>Tahrirlash</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild><Link href={`/learn/${course.id}`}>Student sifatida ko'rish</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild><Link href={`/courses/${course.id}/analytics`}>Statistika</Link></DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive">O'chirish</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
