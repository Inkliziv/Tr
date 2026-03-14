"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import CharacterCount from "@tiptap/extension-character-count"
import Placeholder from "@tiptap/extension-placeholder"
import Heading from "@tiptap/extension-heading"
import { Bold, Italic, List, ListOrdered, Heading2, Quote, Undo, Redo } from "lucide-react"
import { Button } from "@/components/ui/button"

export function RichTextEditor({
  content,
  onChange
}: {
  content: string
  onChange: (html: string, wordCount: number) => void
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Heading.configure({ levels: [2, 3] }),
      Placeholder.configure({
        placeholder: "Matnni bu yerga yozing...",
        emptyEditorClass: "is-editor-empty",
      }),
      CharacterCount
    ],
    content: content,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base focus:outline-none min-h-[200px] max-w-none px-4 py-3",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML(), editor.storage.characterCount.words())
    },
  })

  if (!editor) {
    return null
  }

  const words = editor.storage.characterCount.words()
  const readingTime = Math.ceil(words / 200) || 1

  return (
    <div className="border rounded-xl overflow-hidden bg-card flex flex-col">
      <div className="bg-muted/50 border-b p-2 flex flex-wrap gap-1 items-center sticky top-0 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          data-active={editor.isActive("bold") ? "true" : "false"}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          data-active={editor.isActive("italic") ? "true" : "false"}
        >
          <Italic className="h-4 w-4" />
        </Button>
        
        <div className="w-px h-6 bg-border mx-1"></div>
        
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          data-active={editor.isActive("heading", { level: 2 }) ? "true" : "false"}
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          data-active={editor.isActive("bulletList") ? "true" : "false"}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          data-active={editor.isActive("orderedList") ? "true" : "false"}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          data-active={editor.isActive("blockquote") ? "true" : "false"}
        >
          <Quote className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1"></div>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 bg-background cursor-text" onClick={() => editor.commands.focus()}>
        <EditorContent editor={editor} />
      </div>
      
      <div className="bg-muted/30 border-t px-4 py-2 flex justify-between items-center text-xs text-muted-foreground select-none">
        <div>
          <span>{words} ta so'z</span>
          <span className="mx-2">•</span>
          <span>Tahminiy o'qish vaqti: {readingTime} daqiqa</span>
        </div>
        <div>
          {/* Simulated plagiarism indicator based on word count */}
          <span className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${words > 50 ? 'bg-success' : 'bg-warning'}`}></span>
            {words > 50 ? 'Original (98%)' : 'Kam ma\'lumot'}
          </span>
        </div>
      </div>
    </div>
  )
}
