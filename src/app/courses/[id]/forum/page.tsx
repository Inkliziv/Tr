"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { 
  ArrowLeft, Search, Plus, MessageSquare, ThumbsUp, 
  MessageCircle, Clock, CheckCircle2, MoreVertical, Hash 
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { mockCourses, mockForumPosts } from "@/lib/mock-data"
import { getInitials, formatDate, truncate } from "@/lib/utils"

export default function ForumPage() {
  const params = useParams()
  const courseId = params.id as string
  const course = mockCourses.find(c => c.id === courseId) || mockCourses[0]

  const [activeTab, setActiveTab] = useState("all")
  
  const getTagColor = (tag: string) => {
    switch(tag) {
      case 'QUESTION': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'DISCUSSION': return 'bg-purple-500/10 text-purple-500 border-purple-500/20'
      case 'ANNOUNCEMENT': return 'bg-orange-500/10 text-orange-500 border-orange-500/20'
      case 'RESOURCE': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
      default: return 'bg-muted text-muted-foreground border-border'
    }
  }

  const getTagLabel = (tag: string) => {
    switch(tag) {
      case 'QUESTION': return 'Savol'
      case 'DISCUSSION': return 'Muhokama'
      case 'ANNOUNCEMENT': return "E'lon"
      case 'RESOURCE': return 'Manba'
      default: return tag
    }
  }

  const filteredPosts = activeTab === "all" 
    ? mockForumPosts 
    : mockForumPosts.filter(p => p.tag === activeTab.toUpperCase())

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Button variant="ghost" size="icon" asChild className="h-6 w-6 rounded-full -ml-1 text-muted-foreground mr-1">
              <Link href={`/courses/${courseId}/edit`}><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
            <Badge variant="outline" className="text-[10px] uppercase bg-primary/5 text-primary">Forum</Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground line-clamp-1">{course.title}</h1>
        </div>
        <Button className="shrink-0 rounded-full bg-primary/10 text-primary hover:bg-primary/20">
          <Plus className="mr-2 h-4 w-4" /> Yangi Mavzu
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center bg-card p-2 sm:p-4 rounded-lg border shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Mavzu izlash..." className="pl-9 bg-background h-10" />
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto overflow-x-auto hide-scrollbar">
          <TabsList className="h-10">
            <TabsTrigger value="all" className="px-4">Barcha</TabsTrigger>
            <TabsTrigger value="question" className="px-4">Savollar</TabsTrigger>
            <TabsTrigger value="discussion" className="px-4">Muhokamalar</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="shadow-sm border-border/60 hover:border-primary/30 transition-colors group">
            <div className="flex flex-col sm:flex-row sm:items-center">
              
              {/* Left Stats Section - visible only on sm+ */}
              <div className="hidden sm:flex flex-col items-center justify-center p-6 border-r bg-muted/20 w-32 shrink-0 gap-4">
                 <div className="flex flex-col items-center gap-1 text-muted-foreground">
                   <span className="text-sm font-semibold">{post.upvotes}</span>
                   <span className="text-[10px] uppercase font-medium tracking-wider">Ovoz</span>
                 </div>
                 <div className={`flex flex-col items-center gap-1 ${post.replyCount > 0 ? 'text-primary' : 'text-muted-foreground'}`}>
                   <span className="text-sm font-semibold">{post.replyCount}</span>
                   <span className="text-[10px] uppercase font-medium tracking-wider">Javob</span>
                 </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-4 sm:p-6 pr-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 block max-w-full">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge variant="outline" className={`text-[10px] uppercase font-semibold h-5 ${getTagColor(post.tag)}`}>
                        {getTagLabel(post.tag)}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Clock className="mr-1 h-3 w-3" /> {formatDate(post.createdAt)}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors cursor-pointer">
                      {post.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                      {post.content}
                    </p>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground opacity-50 group-hover:opacity-100 shrink-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Pin qilish</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">O'chirish</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex items-center justify-between mt-4 md:mt-6">
                  {/* Author */}
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={post.userAvatar} />
                      <AvatarFallback className="text-[10px] bg-primary/10 text-primary">{getInitials(post.userName)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">{post.userName}</span>
                    <span className="text-[10px] bg-success/10 text-success px-1.5 py-0.5 rounded ml-1 font-semibold">
                      {post.userId.includes('teacher') ? "O'qituvchi" : ""}
                    </span>
                  </div>
                  
                  {/* Mobile Stats */}
                  <div className="flex sm:hidden items-center gap-3 text-xs text-muted-foreground font-medium">
                    <span className="flex items-center gap-1"><ThumbsUp className="h-3.5 w-3.5" /> {post.upvotes}</span>
                    <span className="flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5" /> {post.replyCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {filteredPosts.length === 0 && (
          <div className="text-center py-16 border rounded-lg bg-card/50 text-muted-foreground">
            <MessageSquare className="mx-auto h-12 w-12 opacity-20 mb-4" />
            <p className="text-lg font-medium text-foreground">Xabarlar topilmadi</p>
            <p className="text-sm mt-1">Ushbu bo'limda hozircha muhokamalar yo'q.</p>
          </div>
        )}
      </div>
    </div>
  )
}
