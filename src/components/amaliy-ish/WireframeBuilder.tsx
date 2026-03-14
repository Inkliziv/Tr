"use client"

import { useState } from "react"
import { Plus, Trash2, ArrowUp, ArrowDown, Layout, Image as ImageIcon, AlignLeft, Video, CheckSquare, MessageSquare } from "lucide-react"

type BlockType = "Header" | "Hero Image" | "Text Paragraph" | "Video Player" | "Quiz Section" | "Discussion Board" | "Footer"

type Block = {
  id: string
  type: BlockType
}

const AVAILABLE_BLOCKS: { type: BlockType, icon: any }[] = [
  { type: "Header", icon: Layout },
  { type: "Hero Image", icon: ImageIcon },
  { type: "Text Paragraph", icon: AlignLeft },
  { type: "Video Player", icon: Video },
  { type: "Quiz Section", icon: CheckSquare },
  { type: "Discussion Board", icon: MessageSquare },
  { type: "Footer", icon: Layout }
]

export function WireframeBuilder({ onUpdateCount }: { onUpdateCount: (count: number) => void }) {
  const [blocks, setBlocks] = useState<Block[]>([])

  const addBlock = (type: BlockType) => {
    const newBlocks = [...blocks, { id: Date.now().toString(), type }]
    setBlocks(newBlocks)
    onUpdateCount(newBlocks.length)
  }

  const removeBlock = (id: string) => {
    const newBlocks = blocks.filter(b => b.id !== id)
    setBlocks(newBlocks)
    onUpdateCount(newBlocks.length)
  }

  const moveBlock = (id: string, direction: "up" | "down") => {
    const index = blocks.findIndex(b => b.id === id)
    if (index === -1) return
    if (direction === "up" && index === 0) return
    if (direction === "down" && index === blocks.length - 1) return

    const newBlocks = [...blocks]
    const swapIndex = direction === "up" ? index - 1 : index + 1
    
    // Swap
    const temp = newBlocks[index]
    newBlocks[index] = newBlocks[swapIndex]
    newBlocks[swapIndex] = temp

    setBlocks(newBlocks)
  }

  return (
    <div className="grid lg:grid-cols-4 gap-6 bg-card border rounded-xl overflow-hidden shadow-sm p-4">
      {/* Blocks Palette */}
      <div className="lg:col-span-1 space-y-4">
        <h4 className="font-semibold text-sm border-b pb-2">Komponentlar (Bosib qo'shing)</h4>
        <div className="flex flex-col gap-2">
          {AVAILABLE_BLOCKS.map((b) => {
            const Icon = b.icon
            return (
              <button 
                key={b.type}
                onClick={() => addBlock(b.type)}
                className="flex items-center gap-3 p-3 bg-muted/50 hover:bg-muted border border-transparent hover:border-primary/20 rounded-lg text-sm transition-colors text-left"
              >
                <Icon className="w-4 h-4 text-primary" />
                <span className="font-medium">{b.type}</span>
                <Plus className="w-3 h-3 ml-auto text-muted-foreground" />
              </button>
            )
          })}
        </div>
      </div>

      {/* Canvas */}
      <div className="lg:col-span-3 bg-muted/20 border-2 border-dashed rounded-xl p-4 min-h-[500px] flex flex-col shadow-inner">
        <h4 className="font-semibold text-sm text-center text-muted-foreground mb-4">Mening Kursim Sahifasi (Wireframe)</h4>
        
        {blocks.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Chap tomondagi qismlardan tanlab o'qish sahifasi tuzilishini tayyorlang
          </div>
        ) : (
          <div className="space-y-2 max-w-lg mx-auto w-full">
            {blocks.map((block, i) => {
              const bDef = AVAILABLE_BLOCKS.find(ab => ab.type === block.type)
              const IconItem = bDef?.icon || Layout
              return (
                <div key={block.id} className="relative group/block bg-background border shadow-sm rounded-md p-4 flex items-center justify-between hover:border-primary transition-colors">
                  <div className="flex items-center gap-3">
                    <IconItem className="w-5 h-5 text-muted-foreground" />
                    <span className="font-semibold">{block.type}</span>
                  </div>
                  
                  <div className="flex items-center opacity-0 group-hover/block:opacity-100 transition-opacity gap-1">
                    <button onClick={() => moveBlock(block.id, "up")} disabled={i===0} className="p-1 hover:bg-muted rounded text-muted-foreground disabled:opacity-30">
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button onClick={() => moveBlock(block.id, "down")} disabled={i===blocks.length-1} className="p-1 hover:bg-muted rounded text-muted-foreground disabled:opacity-30">
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button onClick={() => removeBlock(block.id)} className="p-1 hover:bg-destructive/10 text-destructive rounded ml-2">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
