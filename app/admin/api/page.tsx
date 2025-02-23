"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const apiUsageData = [
  { time: "00:00", calls: 120 },
  { time: "04:00", calls: 80 },
  { time: "08:00", calls: 250 },
  { time: "12:00", calls: 480 },
  { time: "16:00", calls: 380 },
  { time: "20:00", calls: 290 },
]

const endpointData = [
  {
    id: 1,
    endpoint: "/api/url-encoder",
    status: "정상",
    latency: "45ms",
    calls: 1234,
    errors: 2,
  },
  {
    id: 2,
    endpoint: "/api/percent-calc",
    status: "정상",
    latency: "32ms",
    calls: 890,
    errors: 0,
  },
  {
    id: 3,
    endpoint: "/api/base64",
    status: "주의",
    latency: "120ms",
    calls: 567,
    errors: 15,
  },
]

export default function ApiManagement() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">API 관리</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>총 API 호출</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,691</div>
            <p className="text-xs text-muted-foreground">최근 24시간</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>평균 응답 시간</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65ms</div>
            <p className="text-xs text-muted-foreground">최근 24시간</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>오류율</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.63%</div>
            <p className="text-xs text-muted-foreground">최근 24시간</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API 호출 추이</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={apiUsageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="calls" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>엔드포인트 상태</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>엔드포인트</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>응답시간</TableHead>
                <TableHead>호출 수</TableHead>
                <TableHead>오류 수</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {endpointData.map((endpoint) => (
                <TableRow key={endpoint.id}>
                  <TableCell className="font-mono">{endpoint.endpoint}</TableCell>
                  <TableCell>
                    <Badge variant={endpoint.status === "정상" ? "default" : "warning"}>{endpoint.status}</Badge>
                  </TableCell>
                  <TableCell>{endpoint.latency}</TableCell>
                  <TableCell>{endpoint.calls}</TableCell>
                  <TableCell>
                    <Badge variant={endpoint.errors > 0 ? "destructive" : "outline"}>{endpoint.errors}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

