"use client"

import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Bot, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

type Message = {
  role: "user" | "assistant"
  content: string
}

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Assalomu alaykum! Men sizning ta'limiy yordamchingizman. Sizga qanday yordam bera olaman?" }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const scrollRef = useRef<HTMLDivElement>(null)

  // Determine current context based on URL
  let contextName = "Umumiy tizim"
  const amaliyMatch = pathname.match(/\/amaliy-ish\/(\d+)/)
  if (amaliyMatch) {
    contextName = `Amaliy Ish №${amaliyMatch[1]}`
  }

  const suggestions = [
    "Bloom taksonomiyasi nima?",
    "Shu amaliy ish bo'yicha misol keltiring",
    "Mening xatolarimni toping"
  ]

  useEffect(() => {
    // Basic auto-scroll
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return

    const newMessages = [...messages, { role: "user" as const, content: text }]
    setMessages(newMessages)
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: newMessages,
          context: contextName
        }),
      })

      if (!res.ok) throw new Error("API error")
      const data = await res.json()
      
      setMessages([...newMessages, { role: "assistant", content: data.message }])
    } catch (e) {
      setMessages([...newMessages, { role: "assistant", content: "Kechirasiz, xatolik yuz berdi. Iltimos qaytadan urinib ko'ring." }])
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <Button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 rounded-full px-6 shadow-xl gap-2 z-50 text-base"
        size="lg"
      >
        <Bot className="w-6 h-6" />
        AI Yordam
      </Button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 w-[350px] shadow-2xl rounded-xl border bg-card flex flex-col z-50 overflow-hidden" style={{ height: '500px' }}>
      {/* Header */}
      <div className="bg-primary p-4 text-primary-foreground flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          <span className="font-semibold">AI Yordamchi</span>
        </div>
        <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/20 text-primary-foreground -mr-2" onClick={() => setIsOpen(false)}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Context Badge */}
      <div className="bg-muted px-4 py-2 border-b text-xs flex items-center justify-between text-muted-foreground">
        <span>Joriy mavzu:</span>
        <Badge variant="outline" className="bg-background">{contextName}</Badge>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4 pb-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap ${
                m.role === 'user' 
                  ? 'bg-primary text-primary-foreground rounded-br-sm' 
                  : 'bg-muted text-foreground rounded-bl-sm border'
              }`}>
                {m.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3 border flex gap-1">
                <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce delay-75"></div>
                <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce delay-150"></div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="p-3 bg-background border-t">
        <div className="flex gap-2 mb-3 overflow-x-auto pb-1 no-scrollbar">
          {suggestions.map((s, i) => (
            <button 
              key={i} 
              onClick={() => handleSend(s)}
              className="whitespace-nowrap rounded-full border bg-muted/50 hover:bg-muted px-3 py-1 text-[11px] text-muted-foreground transition-colors shrink-0"
            >
              {s}
            </button>
          ))}
        </div>
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          className="flex gap-2"
        >
          <Input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Savolingizni yozing..." 
            className="flex-1 rounded-full bg-muted/20"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" className="rounded-full shrink-0" disabled={isLoading || !input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
