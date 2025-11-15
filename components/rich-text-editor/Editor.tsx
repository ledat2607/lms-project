'use client'

import { useEffect, useState } from 'react'
import { useEditor, EditorContent, JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { MenuBar } from './MenuBar'
import { TextAlign } from '@tiptap/extension-text-align'

interface RichTextEditorProps {
  field: {
    value: string | null
    onChange: (value: string) => void
  }
}

const RichTextEditor = ({ field }: RichTextEditorProps) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],

    editorProps: {
      attributes: {
        class:
          'p-4 rounded min-h-[300px] focus:outline-none prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert min-w-full',
      },
    },

    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()))
    },

    content: field.value
      ? (JSON.parse(field.value) as JSONContent)
      : '<p>Description here....</p>',

    // đúng type luôn, không cần ts-ignore
    immediatelyRender: false,
  })

  if (!isClient || !editor) return null

  return (
    <div className="w-full border border-input rounded-lg overflow-hidden dark:bg-input/30">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default RichTextEditor
