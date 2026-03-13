"use client"

import { Activity, Users, BookOpen, GraduationCap, ArrowUpRight, ShieldCheck, Search, Filter, MoreHorizontal } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AdminDashboardPage() {
  const users = [
    { id: "u1", name: "Aziza Karimova", email: "aziza@inbox.uz", role: "STUDENT", status: "ACTIVE", joined: "2024-03-01" },
    { id: "u2", name: "Botir Qodirov", email: "botir.tech@gmail.com", role: "TEACHER", status: "ACTIVE", joined: "2024-02-15" },
    { id: "u3", name: "Dilshod Aliyev", email: "d.aliyev99@mail.ru", role: "STUDENT", status: "SUSPENDED", joined: "2024-01-20" },
    { id: "u4", name: "Ziyoda Rustamova", email: "ziyoda.r@eduforge.uz", role: "ADMIN", status: "ACTIVE", joined: "2023-11-10" },
    { id: "u5", name: "Sardor Ibragimov", email: "sardor_dev@yahoo.com", role: "TEACHER", status: "PENDING", joined: "2024-03-05" },
  ]

  return (
    <div className="flex-1 overflow-y-auto w-full">
      <div className="h-16 flex items-center justify-between px-6 border-b bg-card sticky top-0 z-10 w-full">
        <h1 className="text-xl font-semibold">Tizim Boshqaruvi</h1>
        <div className="flex items-center gap-3">
          <Badge className="bg-destructive hover:bg-destructive shadow-sm">Super Admin</Badge>
          <Avatar className="h-8 w-8 hover:ring-2 hover:ring-muted transition-all cursor-pointer">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-8 w-full max-w-7xl mx-auto">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full">
          <Card className="shadow-sm border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-muted-foreground">Jami Foydalanuvchilar</p>
                <div className="p-2 rounded-full bg-blue-500/10 text-blue-500"><Users className="h-4 w-4" /></div>
              </div>
              <div className="flex items-baseline gap-2">
                <h2 className="text-3xl font-bold tracking-tight">12,450</h2>
                <span className="text-xs font-medium text-success flex items-center"><ArrowUpRight className="mr-0.5 h-3 w-3" /> +12%</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-muted-foreground">Faol O'qituvchilar</p>
                <div className="p-2 rounded-full bg-purple-500/10 text-purple-500"><GraduationCap className="h-4 w-4" /></div>
              </div>
              <div className="flex items-baseline gap-2">
                <h2 className="text-3xl font-bold tracking-tight">342</h2>
                <span className="text-xs font-medium text-success flex items-center"><ArrowUpRight className="mr-0.5 h-3 w-3" /> +5%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-muted-foreground">Ommaviy Kurslar</p>
                <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-500"><BookOpen className="h-4 w-4" /></div>
              </div>
              <div className="flex items-baseline gap-2">
                <h2 className="text-3xl font-bold tracking-tight">856</h2>
                <span className="text-xs font-medium text-success flex items-center"><ArrowUpRight className="mr-0.5 h-3 w-3" /> +24%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-muted-foreground">Tizim Holati</p>
                <div className="p-2 rounded-full bg-success/10 text-success"><Activity className="h-4 w-4" /></div>
              </div>
              <div className="flex items-baseline gap-2 pt-1 h-[40px] items-center">
                <div className="flex items-center text-success font-semibold gap-2">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
                  </div>
                  Barcha Tizimlar Barqaror
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm border-border/60 overflow-hidden w-full">
          <CardHeader className="bg-muted/20 border-b flex flex-col sm:flex-row sm:items-center justify-between pb-4 gap-4">
            <div>
              <CardTitle>Foydalanuvchilarni Boshqarish</CardTitle>
              <CardDescription>Oxirgi qo'shilgan va o'zgarishlar bo'lgan akkauntlar ro'yxati</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Qidirish..." className="w-[200px] sm:w-[250px] pl-9 h-9" />
              </div>
              <Button variant="outline" size="icon" className="h-9 w-9"><Filter className="h-4 w-4" /></Button>
            </div>
          </CardHeader>
          <div className="overflow-x-auto w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Foydalanuvchi</TableHead>
                  <TableHead>Pochta</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Holati</TableHead>
                  <TableHead className="text-right">Amallar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-xl font-normal text-primary">{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {user.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] uppercase font-bold
                         ${user.role === 'ADMIN' ? 'bg-destructive/10 text-destructive border-destructive/20' : 
                           user.role === 'TEACHER' ? 'bg-purple-500/10 text-purple-600 border-purple-500/20' : 
                           'bg-blue-500/10 text-blue-600 border-blue-500/20'}`}
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-[10px] uppercase font-bold text-white
                        ${user.status === 'ACTIVE' ? 'bg-success hover:bg-success/80' : 
                          user.status === 'SUSPENDED' ? 'bg-destructive hover:bg-destructive/80' : 
                          'bg-warning hover:bg-warning/80'}`}
                      >
                        {user.status === 'ACTIVE' ? 'Faol' : user.status === 'SUSPENDED' ? "Bloklangan" : "Kutilmoqda"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Menyu Ochiq</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Harakatlar</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Profilni Ko'rish</DropdownMenuItem>
                          <DropdownMenuItem>Rolni O'zgartirish</DropdownMenuItem>
                          {user.status === 'ACTIVE' ? (
                            <DropdownMenuItem className="text-warning">Vaqtinchalik Bloklash</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-success">Faollashtirish</DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">O'chirish</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  )
}
