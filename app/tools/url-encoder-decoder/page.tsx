"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function UrlEncoderDecoder() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [mode, setMode] = useState("decode") // Set decode as default
  const [processLineByLine, setProcessLineByLine] = useState(false)

  const handleProcess = async () => {
    try {
      if (processLineByLine) {
        const lines = input.split("\n")
        const processedLines = lines.map((line) =>
          mode === "encode" ? encodeURIComponent(line) : decodeURIComponent(line),
        )
        setOutput(processedLines.join("\n"))
      } else {
        const result = mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input)
        setOutput(result)
      }
    } catch (error) {
      console.error("Error:", error)
      setOutput("처리 중 오류가 발생했습니다. 입력값을 확인해주세요.")
    }
  }

  const contentBlock = (
    <div className="space-y-6">
      <div className="flex items-center justify-end space-x-2 mb-4">
        <Label htmlFor="lineByLine" className="text-sm">
          각 행별로 개별 처리
        </Label>
        <Checkbox
          id="lineByLine"
          checked={processLineByLine}
          onCheckedChange={(checked) => setProcessLineByLine(checked as boolean)}
        />
      </div>

      <div className="space-y-4">
        <Label htmlFor="input">입력</Label>
        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="여기에 입력하세요. (또는 붙여넣으세요)"
          className="min-h-[200px] font-mono text-base placeholder:font-sans placeholder:text-sm" // Increased height and font size
        />
      </div>

      <Button onClick={handleProcess} className="w-full">
        {mode === "encode" ? "인코딩" : "디코딩"}
      </Button>

      <div className="space-y-4">
        <Label htmlFor="output">결과</Label>
        <Textarea
          id="output"
          value={output}
          readOnly
          placeholder="결과는 여기에 표시됩니다"
          className="min-h-[200px] font-mono text-base placeholder:font-sans placeholder:text-sm" // Increased height and font size
        />
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">URL 디코딩 및 인코딩</h1>
      <Card className="max-w-5xl mx-auto">
        <CardContent className="p-6">
          <Tabs defaultValue="decode" value={mode} onValueChange={setMode}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="decode">디코딩</TabsTrigger>
              <TabsTrigger value="encode">인코딩</TabsTrigger>
            </TabsList>
            <TabsContent value="decode">{contentBlock}</TabsContent>
            <TabsContent value="encode">{contentBlock}</TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

