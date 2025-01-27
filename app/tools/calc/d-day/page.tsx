"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"

export default function DDayCalculator() {
  const [date, setDate] = useState("")
  const [result, setResult] = useState<string | null>(null)
  const [useCalendar, setUseCalendar] = useState(false)
  const [manualDate, setManualDate] = useState({ year: "", month: "", day: "" })
  const [today, setToday] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setToday(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const calculateDDay = () => {
    let inputDate: Date
    if (!useCalendar) {
      inputDate = new Date(
        Number.parseInt(manualDate.year),
        Number.parseInt(manualDate.month) - 1,
        Number.parseInt(manualDate.day),
      )
    } else {
      inputDate = new Date(date)
    }

    if (isNaN(inputDate.getTime())) {
      setResult("올바른 날짜를 입력해주세요.")
      return
    }

    const timeDiff = inputDate.getTime() - today.getTime()
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))

    const monthDiff = (inputDate.getFullYear() - today.getFullYear()) * 12 + (inputDate.getMonth() - today.getMonth())

    let resultText = ""
    if (dayDiff === 0) {
      resultText = "오늘입니다!"
    } else if (dayDiff > 0) {
      resultText = `D-${dayDiff} (${monthDiff}개월 후)`
    } else {
      resultText = `D+${Math.abs(dayDiff)} (${Math.abs(monthDiff)}개월 전)`
    }

    setResult(resultText)
  }

  const handleManualDateChange = (field: "year" | "month" | "day", value: string) => {
    setManualDate((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">D-Day 계산기</h1>
      <Card className="max-w-4xl mx-auto">
        <CardContent className="space-y-6 pt-6">
          <div>
            <Label className="text-lg font-semibold mb-2 block">연월일을 입력해 디데이 계산하기</Label>
            <div className="flex items-center space-x-2 mb-4">
              <Checkbox
                id="useCalendar"
                checked={useCalendar}
                onCheckedChange={(checked) => setUseCalendar(checked as boolean)}
              />
              <Label htmlFor="useCalendar">달력으로 날짜 선택하기</Label>
            </div>
            {!useCalendar ? (
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-4">
                <div className="flex space-x-4 flex-grow">
                  <Input
                    type="number"
                    placeholder="년도"
                    value={manualDate.year}
                    onChange={(e) => handleManualDateChange("year", e.target.value)}
                    className="flex-grow"
                  />
                  <Input
                    type="number"
                    placeholder="월"
                    value={manualDate.month}
                    onChange={(e) => handleManualDateChange("month", e.target.value)}
                    className="flex-grow"
                  />
                  <Input
                    type="number"
                    placeholder="일"
                    value={manualDate.day}
                    onChange={(e) => handleManualDateChange("day", e.target.value)}
                    className="flex-grow"
                  />
                </div>
                <Button onClick={calculateDDay} className="w-24 whitespace-nowrap">
                  계산
                </Button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-4">
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="flex-grow" />
                <Button onClick={calculateDDay} className="w-24 whitespace-nowrap">
                  계산
                </Button>
              </div>
            )}
            {result && <p className="text-lg font-semibold mt-4">결과: {result}</p>}
          </div>
          <div className="text-sm text-gray-500">
            <p>디데이는 오늘 기준으로 계산됩니다.</p>
            <p>개월 수 계산도 할 수 있습니다.</p>
            <p>
              오늘은 {today.getFullYear()}년 {today.getMonth() + 1}월 {today.getDate()}일(
              {["일", "월", "화", "수", "목", "금", "토"][today.getDay()]})입니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

