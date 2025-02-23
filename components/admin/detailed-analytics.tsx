"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const timeRanges = [
  { value: "7d", label: "최근 7일" },
  { value: "30d", label: "최근 30일" },
  { value: "90d", label: "최근 90일" },
]

const pageVisitsData = [
  { date: "2024-02-15", visits: 1200, uniqueVisitors: 800 },
  { date: "2024-02-16", visits: 1300, uniqueVisitors: 900 },
  { date: "2024-02-17", visits: 1100, uniqueVisitors: 750 },
  { date: "2024-02-18", visits: 1400, uniqueVisitors: 950 },
  { date: "2024-02-19", visits: 1600, uniqueVisitors: 1100 },
  { date: "2024-02-20", visits: 1500, uniqueVisitors: 1000 },
  { date: "2024-02-21", visits: 1700, uniqueVisitors: 1200 },
]

const toolUsageData = [
  { name: "URL 인코더", value: 400 },
  { name: "퍼센트 계산기", value: 300 },
  { name: "Base64", value: 200 },
  { name: "D-Day", value: 150 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const hourlyTrafficData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i.toString().padStart(2, "0")}:00`,
  traffic: Math.floor(Math.random() * 100) + 20,
}))

interface DashboardData {
  tools: {
    data: Array<{
      tool: string
      visits: number
      usageCount: number
      averageTime: number
    }>
    error: string | null
  }
  search: {
    data: Array<any>
    error: string | null
  }
  feedback: {
    data: Array<any>
    error: string | null
  }
}

export function DetailedAnalytics() {
  const [timeRange, setTimeRange] = useState("7d")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/analytics/dashboard?period=${timeRange}`)
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data")
        }
        const data = await response.json()
        setDashboardData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [timeRange])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-end">
          <Skeleton className="h-10 w-[180px]" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[300px] w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  // Show partial errors if some data is available but not all
  const showPartialErrors =
    dashboardData && (dashboardData.tools.error || dashboardData.search.error || dashboardData.feedback.error)

  return (
    <div className="space-y-6">
      {showPartialErrors && (
        <Alert variant="default">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>일부 데이터를 불러올 수 없습니다</AlertTitle>
          <AlertDescription>
            {dashboardData?.tools.error && <div>- 도구 사용 통계: {dashboardData.tools.error}</div>}
            {dashboardData?.search.error && <div>- 검색 통계: {dashboardData.search.error}</div>}
            {dashboardData?.feedback.error && <div>- 피드백 통계: {dashboardData.feedback.error}</div>}
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-end">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="기간 선택" />
          </SelectTrigger>
          <SelectContent>
            {timeRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>방문자 추이</CardTitle>
            <CardDescription>일별 총 방문자 및 순 방문자 수</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pageVisitsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => value.split("-").slice(1).join("/")}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="visits" name="총 방문수" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="uniqueVisitors" name="순 방문자" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>도구별 사용 비율</CardTitle>
            <CardDescription>전체 도구 사용량 중 각 도구의 사용 비율</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={toolUsageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {toolUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>시간대별 트래픽</CardTitle>
            <CardDescription>24시간 동안의 시간대별 방문자 수</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyTrafficData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="traffic" name="방문자 수" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>검색어 분석</CardTitle>
            <CardDescription>검색어 길이 및 유형 분석</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">검색어 길이 분포</h4>
                <div className="grid grid-cols-4 gap-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold">45%</div>
                    <div className="text-xs text-muted-foreground">1-2글자</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">35%</div>
                    <div className="text-xs text-muted-foreground">3-5글자</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">15%</div>
                    <div className="text-xs text-muted-foreground">6-10글자</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">5%</div>
                    <div className="text-xs text-muted-foreground">10글자+</div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">검색어 유형</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold">60%</div>
                    <div className="text-xs text-muted-foreground">도구 관련</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">30%</div>
                    <div className="text-xs text-muted-foreground">기술 용어</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">10%</div>
                    <div className="text-xs text-muted-foreground">기타</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>사용자 행동 패턴</CardTitle>
            <CardDescription>페이지별 평균 체류 시간</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">메인 페이지</span>
                  <span className="text-sm font-medium">2분 30초</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary rounded-full h-2" style={{ width: "50%" }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">URL 인코더</span>
                  <span className="text-sm font-medium">4분 15초</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary rounded-full h-2" style={{ width: "85%" }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">퍼센트 계산기</span>
                  <span className="text-sm font-medium">3분 45초</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary rounded-full h-2" style={{ width: "75%" }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Base64</span>
                  <span className="text-sm font-medium">2분 45초</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary rounded-full h-2" style={{ width: "55%" }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

