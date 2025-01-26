"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function TimeCalculator() {
  const [hours, setHours] = useState("")
  const [minutes, setMinutes] = useState("")
  const [seconds, setSeconds] = useState("")
  const [result, setResult] = useState<string | null>(null)

  const calculateTime = () => {
    const totalSeconds =
      Number.parseInt(hours || "0") * 3600 + Number.parseInt(minutes || "0") * 60 + Number.parseInt(seconds || "0")

    const resultHours = Math.floor(totalSeconds / 3600)
    const resultMinutes = Math.floor((totalSeconds % 3600) / 60)
    const resultSeconds = totalSeconds % 60

    setResult(`${resultHours}시간 ${resultMinutes}분 ${resultSeconds}초`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>시분초 계산기</CardTitle>
          <CardDescription>시간, 분, 초를 입력하여 총 시간을 계산합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="hours">시간</Label>
              <Input
                id="hours"
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="시간을 입력하세요"
              />
            </div>
            <div>
              <Label htmlFor="minutes">분</Label>
              <Input
                id="minutes"
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                placeholder="분을 입력하세요"
              />
            </div>
            <div>
              <Label htmlFor="seconds">초</Label>
              <Input
                id="seconds"
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
                placeholder="초를 입력하세요"
              />
            </div>
            <Button onClick={calculateTime}>계산</Button>
            {result && (
              <div className="mt-4">
                <Label>결과</Label>
                <p className="text-2xl font-bold">{result}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

