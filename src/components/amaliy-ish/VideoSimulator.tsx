"use client"

import { useState } from "react"
import { Play, Pause, Plus, MonitorPlay, MousePointerClick, MessageSquareText } from "lucide-react"

type Annotation = {
  time: number
  text: string
  type: "quiz" | "note"
}

export function VideoSimulator({
  onAddAnnotation
}: {
  onAddAnnotation: (count: number) => void
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0) // 0 to 100
  const [annotations, setAnnotations] = useState<Annotation[]>([])
  
  // Fake video duration in seconds (e.g. 10 mins = 600s)
  const duration = 600 

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setProgress(percentage)
  }

  const addAnnotation = (type: "quiz" | "note") => {
    const newAnn: Annotation = {
      time: progress,
      type,
      text: type === "quiz" ? "Interaktiv test (Talaba javob bermaguncha video to'xtab turadi)" : "Qo'shimcha izoh yoki matn"
    }
    const updated = [...annotations, newAnn]
    setAnnotations(updated)
    onAddAnnotation(updated.length)
  }

  const formatTime = (percent: number) => {
    const rawSeconds = (percent / 100) * duration
    const m = Math.floor(rawSeconds / 60)
    const s = Math.floor(rawSeconds % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
      <div className="aspect-video bg-muted relative flex items-center justify-center border-b">
        {/* Fake Video Screen */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 flex flex-col items-center justify-center text-muted-foreground">
          <MonitorPlay className="w-16 h-16 mb-4 opacity-50" />
          <p className="font-semibold text-lg opacity-80">Video darslik</p>
          <p className="text-sm opacity-60">Vaqt: {formatTime(progress)} / {formatTime(100)}</p>
        </div>

        {/* Display Annotations that are close to current time */}
        {annotations.filter(a => Math.abs(a.time - progress) < 2).map((a, i) => (
          <div key={i} className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-8 z-10 animate-in fade-in">
            <div className={`p-6 rounded-xl border-2 shadow-xl max-w-sm w-full text-center ${a.type === 'quiz' ? 'border-primary bg-primary/10' : 'border-warning bg-warning/10'}`}>
              <div className="mx-auto w-12 h-12 bg-background rounded-full flex items-center justify-center mb-4 shadow-sm">
                {a.type === 'quiz' ? <MousePointerClick className="w-6 h-6 text-primary" /> : <MessageSquareText className="w-6 h-6 text-warning" />}
              </div>
              <h4 className="font-bold text-lg mb-2">{a.type === 'quiz' ? 'Interaktiv Test' : 'Muhim Izoh'}</h4>
              <p className="text-sm text-muted-foreground">{a.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 space-y-4">
        {/* Controls */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
          </button>
          
          <div 
            className="flex-1 h-3 bg-muted rounded-full relative cursor-pointer group"
            onClick={handleTimelineClick}
          >
            <div 
              className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
            {/* Timeline markers */}
            {annotations.map((a, i) => (
              <div 
                key={i} 
                className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-background shadow-sm transform -translate-x-1/2 ${a.type === 'quiz' ? 'bg-primary' : 'bg-warning'}`}
                style={{ left: `${a.time}%` }}
                title={a.type === 'quiz' ? 'Test' : 'Izoh'}
              />
            ))}
            
            <div 
              className="absolute top-1/2 -translate-y-1/2 -mt-0.5 w-4 h-4 bg-background border-2 border-primary rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none transform -translate-x-1/2"
              style={{ left: `${progress}%` }}
            />
          </div>
          
          <div className="text-xs font-medium text-muted-foreground font-mono w-12 text-center">
            {formatTime(progress)}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 pt-2 border-t">
          <button 
            onClick={() => addAnnotation('quiz')}
            className="px-3 py-1.5 rounded-md text-xs font-medium border border-primary text-primary hover:bg-primary/10 flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Shu daqiqada test qo'shish
          </button>
          <button 
            onClick={() => addAnnotation('note')}
            className="px-3 py-1.5 rounded-md text-xs font-medium border border-warning text-warning hover:bg-warning/10 flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Shu daqiqada izoh yozish
          </button>
        </div>
      </div>
    </div>
  )
}
