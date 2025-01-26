"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function UrlEncoderDecoder() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [isEncoding, setIsEncoding] = useState(true)

  const handleEncodeDecode = async () => {
    try {
      const response = await fetch("/api/url-encoder-decoder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input, action: isEncoding ? "encode" : "decode" }),
      })
      const data = await response.json()
      setOutput(data.result)
    } catch (error) {
      console.error("Error:", error)
      setOutput("An error occurred. Please try again.")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>URL 인코딩/디코딩</CardTitle>
          <CardDescription>URL을 인코딩하거나 디코딩합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="input">입력</Label>
              <Input
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isEncoding ? "인코딩할 URL 입력" : "디코딩할 URL 입력"}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => setIsEncoding(true)} variant={isEncoding ? "default" : "outline"}>
                인코딩
              </Button>
              <Button onClick={() => setIsEncoding(false)} variant={!isEncoding ? "default" : "outline"}>
                디코딩
              </Button>
            </div>
            <Button onClick={handleEncodeDecode}>{isEncoding ? "인코딩" : "디코딩"}</Button>
            <div>
              <Label htmlFor="output">결과</Label>
              <Input id="output" value={output} readOnly />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

