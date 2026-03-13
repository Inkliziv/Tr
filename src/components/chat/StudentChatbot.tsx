"use client"

import { useState, useRef, useEffect } from "react"
import { MessageSquare, X, Send, Bot, User, Sparkles, Loader2, MinusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { currentUser, type ChatMsg } from "@/lib/mock-data"
import { getInitials } from "@/lib/utils"

export function StudentChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: "msg-1",
      role: "assistant",
      content: "Salom! Men ushbu kurs bo'yicha sun'iy intellekt yordamchisiman. Darslik, testlar yoki nazariy ma'lumotlar bo'yicha savollaringiz bormi?",
      createdAt: new Date().toISOString()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isOpen, isMinimized])

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMsg: ChatMsg = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: inputValue,
      createdAt: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMsg])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response via Claude API Mock
    setTimeout(() => {
      const aiResponse: ChatMsg = {
        id: `msg-ai-${Date.now()}`,
        role: "assistant",
        content: "Yaxshi savol. Python da `for` sikli ro'yxat yoki to'plam elementlarini ketma-ket aylanib chiqish uchun ishlatiladi. `while` sikli esa ma'lum bir shart bajarilguniga qadar davom etadi. Yana tushuntirishimni xohlaysizmi?",
        createdAt: new Date().toISOString()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!isOpen) {
    return (
      <Button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg p-0 bg-primary hover:bg-primary/90 z-50 animate-in zoom-in duration-300"
      >
        <MessageSquare className="h-6 w-6 text-primary-foreground" />
      </Button>
    )
  }

  return (
    <Card className={`fixed right-4 sm:right-6 bottom-4 sm:bottom-6 w-[350px] sm:w-[400px] shadow-xl z-50 flex flex-col transition-all duration-300 ${isMinimized ? 'h-[60px]' : 'h-[550px] max-h-[85vh]'}`}>
      <CardHeader className="p-3 border-b bg-primary flex flex-row items-center justify-between rounded-t-lg text-primary-foreground shrink-0 rounded-b-none">
        <div className="flex items-center gap-2">
          <div className="bg-primary-foreground/20 p-1.5 rounded-full">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <CardTitle className="text-sm font-semibold">AI O'qituvchi</CardTitle>
            {!isMinimized && <p className="text-[10px] text-primary-foreground/80 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-success mr-1"></span> Onlayn</p>}
          </div>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/20" onClick={() => setIsMinimized(!isMinimized)}>
            <MinusCircle className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/20" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      {!isMinimized && (
        <>
          <CardContent className="flex-1 p-0 overflow-hidden relative bg-muted/20">
            <ScrollArea className="h-full p-4" ref={scrollRef}>
              <div className="space-y-4 pb-4">
                <div className="text-center mb-4">
                  <Badge variant="outline" className="text-[10px] bg-background text-muted-foreground border-border font-medium">Bugun</Badge>
                </div>
                
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-3 w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'assistant' && (
                      <Avatar className="h-8 w-8 shrink-0 mt-1 border border-primary/20">
                        <AvatarFallback className="bg-primary/10 text-primary"><Bot className="h-4 w-4" /></AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className={`flex flex-col gap-1 max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`p-3 text-sm rounded-2xl ${
                        msg.role === 'user' 
                          ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                          : 'bg-card border shadow-sm rounded-tl-sm text-foreground'
                      }`}>
                        {msg.content}
                      </div>
                      <span className="text-[10px] text-muted-foreground px-1">
                        {new Date(msg.createdAt).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    {msg.role === 'user' && (
                      <Avatar className="h-8 w-8 shrink-0 mt-1">
                        <AvatarImage src={currentUser.avatar} />
                        <AvatarFallback className="bg-muted text-muted-foreground text-xs">{getInitials(currentUser.name)}</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 w-full justify-start">
                    <Avatar className="h-8 w-8 shrink-0 mt-1 border border-primary/20 border-border">
                      <AvatarFallback className="bg-primary/10 text-primary"><Bot className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                    <div className="p-4 rounded-2xl bg-card border shadow-sm rounded-tl-sm flex items-center gap-1.5 h-[42px]">
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"></span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-3 border-t bg-card h-[70px] shrink-0">
            <div className="flex w-full items-center gap-2">
               <Input 
                 placeholder="Savolingizni yozing..." 
                 className="flex-1 rounded-full bg-muted/50 border-transparent focus-visible:ring-primary/20 pl-4 h-10"
                 value={inputValue}
                 onChange={(e) => setInputValue(e.target.value)}
                 onKeyDown={handleKeyDown}
                 disabled={isLoading}
               />
               <Button 
                size="icon" 
                className="h-10 w-10 shrink-0 rounded-full transition-all"
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
               >
                 <Send className="h-4 w-4 -ml-0.5 mt-0.5" />
               </Button>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  )
}
