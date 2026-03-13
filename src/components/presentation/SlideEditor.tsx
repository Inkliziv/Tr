"use client"

import { useState, useRef, useEffect } from "react"
import { Stage, Layer, Rect, Text as KonvaText, Image as KonvaImage, Transformer } from "react-konva"
import useImage from 'use-image'
import { 
  Type, Image as ImageIcon, LayoutTemplate, Palette, 
  Play, Download, Square, Circle, Save, MousePointer2, Plus
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

// Simple mock components for UI
interface SlideElement {
  id: string
  type: 'text' | 'image' | 'rect' | 'circle'
  x: number
  y: number
  width?: number
  height?: number
  text?: string
  fill?: string
  fontSize?: number
  fontFamily?: string
  src?: string
}

interface Slide {
  id: string
  elements: SlideElement[]
  background: string
}

export function SlideEditor() {
  const [slides, setSlides] = useState<Slide[]>([
    {
      id: "slide-1",
      background: "#ffffff",
      elements: [
        { id: "el-1", type: "text", x: 100, y: 100, text: "Yangi Prezentatsiya", fontSize: 48, fontFamily: "Inter", fill: "#1E40AF" },
        { id: "el-2", type: "text", x: 100, y: 180, text: "Prezentatsiya yaratish uchun pastdagi vositalardan foydalaning.", fontSize: 24, fill: "#64748b" }
      ]
    }
  ])
  
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  
  const activeSlide = slides[activeSlideIndex]

  // This is a simplified Konva implementation to avoid deep complexity
  // In a real application, we would separate each shape into its own component with Transformer support

  const addText = () => {
    const newEl: SlideElement = {
      id: `text-${Date.now()}`,
      type: "text",
      x: 150,
      y: 150,
      text: "Matnni tahrirlash",
      fontSize: 28,
      fill: "#000000"
    }
    const newSlides = [...slides]
    newSlides[activeSlideIndex].elements.push(newEl)
    setSlides(newSlides)
    setSelectedId(newEl.id)
  }

  const addRect = () => {
    const newEl: SlideElement = {
      id: `rect-${Date.now()}`,
      type: "rect",
      x: 200,
      y: 200,
      width: 150,
      height: 100,
      fill: "#3b82f6"
    }
    const newSlides = [...slides]
    newSlides[activeSlideIndex].elements.push(newEl)
    setSlides(newSlides)
    setSelectedId(newEl.id)
  }

  const addNewSlide = () => {
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      background: "#ffffff",
      elements: []
    }
    setSlides([...slides, newSlide])
    setActiveSlideIndex(slides.length)
    setSelectedId(null)
  }

  return (
    <div className="flex flex-col h-[700px] border rounded-lg overflow-hidden bg-background">
      {/* Editor Toolbar */}
      <div className="h-14 border-b flex items-center justify-between px-4 bg-card shrink-0">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => setSelectedId(null)} className={!selectedId ? "bg-muted" : ""}>
            <MousePointer2 className="h-4 w-4 mr-1.5" /> Tanlash
          </Button>
          <Separator orientation="vertical" className="h-6 mx-1" />
          <Button variant="ghost" size="sm" onClick={addText}>
            <Type className="h-4 w-4 mr-1.5" /> Matn
          </Button>
          <Button variant="ghost" size="sm" onClick={addRect}>
            <Square className="h-4 w-4 mr-1.5" /> Shakl
          </Button>
          <Button variant="ghost" size="sm">
            <ImageIcon className="h-4 w-4 mr-1.5" /> Rasm
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <LayoutTemplate className="h-4 w-4 mr-2" /> Shablon
          </Button>
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Palette className="h-4 w-4 mr-2" /> Mavzu
          </Button>
          <Separator orientation="vertical" className="h-6 mx-1 hidden sm:block" />
          <Button size="sm" className="bg-success hover:bg-success/90 text-white">
            <Play className="h-4 w-4 mr-1.5" /> Namoyish
          </Button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Thumbnails Sidebar */}
        <div className="w-48 border-r bg-muted/20 overflow-y-auto p-3 flex flex-col gap-3 shrink-0 hidden sm:flex">
          {slides.map((slide, idx) => (
            <div 
              key={slide.id} 
              className={`relative aspect-video rounded-md border-2 overflow-hidden cursor-pointer transition-colors ${activeSlideIndex === idx ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-muted-foreground/50'}`}
              onClick={() => { setActiveSlideIndex(idx); setSelectedId(null) }}
            >
              <div className="absolute top-1 left-1 bg-background/80 text-[10px] font-bold px-1.5 rounded text-muted-foreground z-10">{idx + 1}</div>
              {/* Mini preview logic goes here - usually a downscaled stage export */}
              <div className="w-full h-full bg-white flex items-center justify-center text-xs text-muted-foreground/30">
                Slayd {idx + 1}
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full aspect-video border-dashed flex flex-col gap-2" onClick={addNewSlide}>
            <Plus className="h-5 w-5" /> Yangi
          </Button>
        </div>

        {/* Canvas Area container */}
        <div className="flex-1 bg-muted/30 overflow-auto flex items-center justify-center p-4 relative" 
             onClick={(e) => {
               if (e.target === e.currentTarget) setSelectedId(null)
             }}>
          
          <div className="absolute top-4 right-4 z-10">
            <Badge variant="outline" className="bg-background shadow-sm">1280 x 720</Badge>
          </div>

          {/* Konva Stage Wrapper - maintaining 16:9 ratio */}
          <div 
            className="bg-white shadow-lg overflow-hidden border mx-auto transition-transform" 
            style={{ 
              width: '100%', 
              maxWidth: '800px', 
              aspectRatio: '16/9' 
            }}
          >
            {/* The Konva Stage */}
              <Stage 
              width={800} // Logical width, scales visually via CSS aspect-ratio
              height={450} 
              scaleX={typeof window !== 'undefined' && window.innerWidth < 800 ? window.innerWidth / 800 : 1}
              scaleY={typeof window !== 'undefined' && window.innerWidth < 800 ? window.innerWidth / 800 : 1}
              onMouseDown={(e: any) => {
                const clickedOnEmpty = e.target === e.target.getStage();
                if (clickedOnEmpty) setSelectedId(null);
              }}
            >
              <Layer>
                {/* Background Rect */}
                <Rect x={0} y={0} width={800} height={450} fill={activeSlide.background} />
                
                {/* Dynamic Elements */}
                {activeSlide.elements.map((el) => {
                  if (el.type === 'text') {
                    return (
                      <KonvaText 
                        key={el.id} 
                        x={el.x} 
                        y={el.y} 
                        text={el.text} 
                        fontSize={el.fontSize || 24} 
                        fontFamily={el.fontFamily || 'sans-serif'}
                        fill={el.fill || '#000'}
                        width={el.width}
                        draggable
                        onClick={() => setSelectedId(el.id)}
                        onDragEnd={(e) => {
                          const newSlides = [...slides]
                          const targetEl = newSlides[activeSlideIndex].elements.find(e => e.id === el.id)
                          if (targetEl) {
                            targetEl.x = e.target.x()
                            targetEl.y = e.target.y()
                          }
                          setSlides(newSlides)
                        }}
                      />
                    )
                  }
                  if (el.type === 'rect') {
                    return (
                      <Rect 
                        key={el.id} 
                        x={el.x} 
                        y={el.y} 
                        width={el.width || 100} 
                        height={el.height || 100} 
                        fill={el.fill || '#3b82f6'}
                        draggable
                        onClick={() => setSelectedId(el.id)}
                        onDragEnd={(e) => {
                          const newSlides = [...slides]
                          const targetEl = newSlides[activeSlideIndex].elements.find(e => e.id === el.id)
                          if (targetEl) {
                            targetEl.x = e.target.x()
                            targetEl.y = e.target.y()
                          }
                          setSlides(newSlides)
                        }}
                      />
                    )
                  }
                  return null
                })}
              </Layer>
            </Stage>
          </div>
        </div>
      </div>
    </div>
  )
}
