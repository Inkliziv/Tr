"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import {
  Bold, Italic, Strikethrough, Code, Heading1, Heading2, Heading3,
  Quote, List, ListOrdered, Undo, Redo, Image as ImageIcon, Link as LinkIcon, Highlighter
} from "lucide-react"

import { Toggle } from "@/components/ui/toggle"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TheoryEditorProps {
  content: string
  onChange: (content: string) => void
}

export function TheoryEditor({ content, onChange }: TheoryEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // We configure it separately
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Highlight,
      Placeholder.configure({
        placeholder: 'Yozishni yoki \'/\' bosishdan boshlang...',
      }),
      CharacterCount,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base dark:prose-invert focus:outline-none max-w-none min-h-[500px] p-8',
      },
    },
  })

  if (!editor) {
    return null
  }

  const MenuBar = () => {
    return (
      <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-card sticky top-0 z-10 shadow-sm">
        <TooltipProvider delayDuration={300}>
          <div className="flex gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle 
                  size="sm" pressed={editor.isActive('bold')} 
                  onPressedChange={() => editor.chain().focus().toggleBold().run()}
                >
                  <Bold className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Qalin (Ctrl+B)</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle 
                  size="sm" pressed={editor.isActive('italic')} 
                  onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                >
                  <Italic className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Kursiv (Ctrl+I)</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle 
                  size="sm" pressed={editor.isActive('strike')} 
                  onPressedChange={() => editor.chain().focus().toggleStrike().run()}
                >
                  <Strikethrough className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>O'chirilgan</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle 
                  size="sm" pressed={editor.isActive('highlight')} 
                  onPressedChange={() => editor.chain().focus().toggleHighlight().run()}
                >
                  <Highlighter className="h-4 w-4 text-warning" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Belgilash</TooltipContent>
            </Tooltip>
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <div className="flex gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle 
                  size="sm" pressed={editor.isActive('heading', { level: 1 })} 
                  onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                >
                  <Heading1 className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Sarlavha 1</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle 
                  size="sm" pressed={editor.isActive('heading', { level: 2 })} 
                  onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                  <Heading2 className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Sarlavha 2</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle 
                  size="sm" pressed={editor.isActive('heading', { level: 3 })} 
                  onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                >
                  <Heading3 className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Sarlavha 3</TooltipContent>
            </Tooltip>
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <div className="flex gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle 
                  size="sm" pressed={editor.isActive('bulletList')} 
                  onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                >
                  <List className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Nuqtali ro'yxat</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle 
                  size="sm" pressed={editor.isActive('orderedList')} 
                  onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                >
                  <ListOrdered className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Raqamli ro'yxat</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle 
                  size="sm" pressed={editor.isActive('blockquote')} 
                  onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
                >
                  <Quote className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Iqtibos</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle 
                  size="sm" pressed={editor.isActive('codeBlock')} 
                  onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
                >
                  <Code className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Kod bloki</TooltipContent>
            </Tooltip>
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <div className="flex gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" size="sm" 
                  onClick={() => {
                    const url = window.prompt('URL kiriting')
                    if (url) editor.chain().focus().setLink({ href: url }).run()
                  }}
                  className={editor.isActive('link') ? 'bg-muted' : ''}
                >
                  <LinkIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Havola qo'shish</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" size="sm" 
                  onClick={() => {
                    const url = window.prompt('Rasm URL kiriting')
                    if (url) editor.chain().focus().setImage({ src: url }).run()
                  }}
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Rasm qo'shish</TooltipContent>
            </Tooltip>
          </div>
          
          <div className="ml-auto flex gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" size="sm" 
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={!editor.can().undo()}
                >
                  <Undo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Bekor qilish (Ctrl+Z)</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" size="sm" 
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={!editor.can().redo()}
                >
                  <Redo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Qaytarish (Ctrl+Y)</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
    )
  }

  return (
    <div className="border border-border/60 rounded-lg overflow-hidden bg-background flex flex-col shadow-sm">
      <MenuBar />
      <div className="flex-1 overflow-y-auto bg-card relative min-h-[500px]">
        <EditorContent editor={editor} className="h-full" />
      </div>
      <div className="bg-muted/30 px-4 py-2 text-xs text-muted-foreground flex justify-between border-t border-border/40">
        <div>
          {editor.storage.characterCount.words()} ta so'z
        </div>
        <div className="flex items-center">
          <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-success mr-2"></div> Saqlangan</span>
        </div>
      </div>
    </div>
  )
}
