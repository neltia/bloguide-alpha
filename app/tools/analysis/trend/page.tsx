"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Loader2 } from "lucide-react"
import { useState } from "react"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface TrendData {
  date: string
  value: number
}

interface TrendResponse {
  keyword: string
  timeframe: string
  data: TrendData[]
  error?: string
}

const timeframeOptions = [
  { value: "now 7-d", label: "최근 7일" },
  { value: "now 30-d", label: "최근 30일" },
  { value: "now 90-d", label: "최근 90일" },
]

export default function TrendSearch() {
  const [keyword, setKeyword] = useState("")
  const [timeframe, setTimeframe] = useState("now 7-d")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<TrendData[]>([])

  const handleSearch = async () => {
    if (!keyword.trim()) {
      setError("키워드를 입력해주세요.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/trends?keyword=${encodeURIComponent(keyword)}&timeframe=${timeframe}`)
      const result: TrendResponse = await response.json()

      if (result.error) {
        setError(result.error)
        setData([])
      } else {
        setData(result.data)
      }
    } catch (err) {
      setError("데이터를 불러오는 중 오류가 발생했습니다.")
      setData([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">트렌드 키워드 검색</h1>
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="검색할 키워드를 입력하세요"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="기간 선택" />
              </SelectTrigger>
              <SelectContent>
                {timeframeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleSearch} disabled={loading} className="w-full md:w-auto">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  검색 중...
                </>
              ) : (
                "검색"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {data.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>&ldquo;{keyword}&rdquo; 키워드 검색량</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => {
                      const date = new Date(value)
                      return `${date.getMonth() + 1}/${date.getDate()}`
                    }}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    labelFormatter={(value) => {
                      const date = new Date(value)
                      return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
                    }}
                    formatter={(value: number) => [`검색량: ${value}`, ""]}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

