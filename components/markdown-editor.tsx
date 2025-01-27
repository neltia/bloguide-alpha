"use client"

import { Button } from "@/components/ui/button"
import MDEditor from "@uiw/react-md-editor"
import { useState } from "react"

interface MarkdownEditorProps {
  content: string
  onSave: (content: string) => void
}

export default function MarkdownEditor({ content, onSave }: MarkdownEditorProps) {
  const [value, setValue] = useState(content)

  const handleSave = () => {
    onSave(value)
  }

  return (
    <div className="space-y-4">
      <MDEditor value={value} onChange={(val) => setValue(val || "")} preview="edit" />
      <div className="flex justify-end">
        <Button onClick={handleSave}>저장</Button>
      </div>
    </div>
  )
}

