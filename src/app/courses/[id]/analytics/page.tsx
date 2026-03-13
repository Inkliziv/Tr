"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { 
  ArrowLeft, Download, Users, Clock, Activity, Target, 
  TrendingUp, TrendingDown, HelpCircle, FileText 
} from "lucide-react"
import { 
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, 
  Line, LineChart, Pie, PieChart, ResponsiveContainer, 
  Tooltip, XAxis, YAxis 
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

import { mockCourses, mockAnalytics } from "@/lib/mock-data"

export default function AnalyticsDashboardPage() {
  const params = useParams()
  const courseId = params.id as string
  const course = mockCourses.find(c => c.id === courseId) || mockCourses[0]

  const [timeRange, setTimeRange] = useState("all")

  // Colors for charts
  const COLORS = ['#7C3AED', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
  const PIE_COLORS = { positive: '#10B981', neutral: '#64748B', negative: '#Ef4444' }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Button variant="ghost" size="icon" asChild className="h-6 w-6 rounded-full -ml-1 text-muted-foreground mr-1">
              <Link href="/dashboard/courses"><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
            <Badge variant="outline" className="text-[10px] uppercase">{course.category}</Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground line-clamp-1">{course.title} — Analitika</h1>
          <p className="text-muted-foreground mt-0.5 text-sm">Talabalar faolligi, test natijalari va kurs samaradorligi tahlili.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Vaqt oralig'i" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Oxirgi 7 kun</SelectItem>
              <SelectItem value="30days">Oxirgi 30 kun</SelectItem>
              <SelectItem value="thisYear">Shu yil</SelectItem>
              <SelectItem value="all">Barcha vaqt</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" title="CSV formatida yuklab olish">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Jami Talabalar</p>
              <div className="p-2 rounded-full bg-primary/10 text-primary"><Users className="h-4 w-4" /></div>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-bold tracking-tight">{course.enrollmentCount}</h2>
              <span className="text-xs font-medium text-success flex items-center"><TrendingUp className="mr-0.5 h-3 w-3" /> +14%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Tugatish Darajasi</p>
              <div className="p-2 rounded-full bg-success/10 text-success"><Target className="h-4 w-4" /></div>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-bold tracking-tight">68%</h2>
              <span className="text-xs font-medium text-muted-foreground">Barcha modullar boyicha</span>
            </div>
            <Progress value={68} className="h-1.5 mt-3 bg-muted" />
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Testlar O'rtachasi</p>
              <div className="p-2 rounded-full bg-warning/10 text-warning"><Activity className="h-4 w-4" /></div>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-bold tracking-tight">82.5</h2>
              <span className="text-xs font-medium text-destructive flex items-center"><TrendingDown className="mr-0.5 h-3 w-3" /> -2%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">O'rtacha Vaqt</p>
              <div className="p-2 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6]"><Clock className="h-4 w-4" /></div>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-bold tracking-tight">4.5h</h2>
              <span className="text-xs font-medium text-muted-foreground">O'quvchi boshiga</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 w-full sm:w-auto overflow-x-auto justify-start border border-border/50">
          <TabsTrigger value="overview" className="rounded-sm">Umumiy ko'rinish</TabsTrigger>
          <TabsTrigger value="modules" className="rounded-sm">Modullar samaradorligi</TabsTrigger>
          <TabsTrigger value="students" className="rounded-sm">Talabalar xatti-harakati</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 animate-in fade-in duration-500">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            {/* Enrollment Chart */}
            <Card className="lg:col-span-4 shadow-sm border-border/60">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Tahrirlanishlar (Enrollment) dinamikasi</CardTitle>
                <CardDescription>Oyma-oy kursga yozilgan o'quvchilar soni</CardDescription>
              </CardHeader>
              <CardContent className="pl-0 pb-2">
                <div className="h-[300px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockAnalytics.enrollments} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} dx={-10} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "8px", border: "1px solid hsl(var(--border))", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                        itemStyle={{ color: "hsl(var(--foreground))" }}
                      />
                      <Area type="monotone" dataKey="count" name="O'quvchilar" stroke="#7C3AED" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* General Sentiment / Feedback Summary */}
            <Card className="lg:col-span-3 shadow-sm border-border/60">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-base font-semibold">Fikr-mulohazalar (Sentiment)</CardTitle>
                  <CardDescription>AI tahlil qilgan o'quvchi izohlari tasnifi</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="hidden sm:flex text-xs h-8" asChild>
                  <Link href={`/courses/${courseId}/feedback`}>To'liq AI tahlil</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-[220px] w-full -mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Ijobiy', value: mockAnalytics.sentimentData.positive, fill: PIE_COLORS.positive },
                          { name: 'Neytral', value: mockAnalytics.sentimentData.neutral, fill: PIE_COLORS.neutral },
                          { name: 'Salbiy', value: mockAnalytics.sentimentData.negative, fill: PIE_COLORS.negative },
                        ]}
                        cx="50%" cy="50%" innerRadius={65} outerRadius={90} paddingAngle={4} dataKey="value"
                      >
                        {[
                          { name: 'Ijobiy', value: mockAnalytics.sentimentData.positive, fill: PIE_COLORS.positive },
                          { name: 'Neytral', value: mockAnalytics.sentimentData.neutral, fill: PIE_COLORS.neutral },
                          { name: 'Salbiy', value: mockAnalytics.sentimentData.negative, fill: PIE_COLORS.negative },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "8px", border: "1px solid hsl(var(--border))" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none pb-4 pt-16">
                    <span className="text-3xl font-bold">{mockAnalytics.sentimentData.positive}%</span>
                    <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">Ijobiy</span>
                  </div>
                </div>
                
                <div className="flex justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-success"></div>
                    <span className="font-medium">{mockAnalytics.sentimentData.positive}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-500"></div>
                    <span className="font-medium">{mockAnalytics.sentimentData.neutral}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive"></div>
                    <span className="font-medium">{mockAnalytics.sentimentData.negative}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="modules" className="space-y-6 animate-in fade-in duration-500">
          <Card className="shadow-sm border-border/60">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Modullar bo'yicha tugatish darajasi</CardTitle>
              <CardDescription>Qaysi joyda o'quvchilar kursni ko'proq tark etyapti?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockAnalytics.completionRates} margin={{ top: 20, right: 30, left: -20, bottom: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="module" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} angle={-45} textAnchor="end" dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                    <Tooltip 
                      cursor={{ fill: 'hsl(var(--muted)/0.5)' }}
                      contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "8px", border: "1px solid hsl(var(--border))" }}
                    />
                    <Bar dataKey="rate" name="Tugatish %" fill="#3B82F6" radius={[4, 4, 0, 0]}>
                      {mockAnalytics.completionRates.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
