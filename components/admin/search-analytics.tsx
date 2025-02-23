"use client"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const searchData = [
  { keyword: "마크다운 변환", count: 245, trend: "up" },
  { keyword: "URL 디코딩", count: 189, trend: "up" },
  { keyword: "퍼센트 계산", count: 156, trend: "down" },
  { keyword: "디데이", count: 123, trend: "up" },
  { keyword: "base64 변환", count: 97, trend: "same" },
]

export function SearchAnalytics() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>검색어</TableHead>
          <TableHead className="text-right">검색 횟수</TableHead>
          <TableHead className="text-right">추이</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {searchData.map((item) => (
          <TableRow key={item.keyword}>
            <TableCell>{item.keyword}</TableCell>
            <TableCell className="text-right">{item.count}</TableCell>
            <TableCell className="text-right">
              <Badge variant={item.trend === "up" ? "default" : item.trend === "down" ? "destructive" : "secondary"}>
                {item.trend === "up" ? "↑" : item.trend === "down" ? "↓" : "−"}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

