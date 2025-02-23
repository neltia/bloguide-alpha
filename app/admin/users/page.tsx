"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"
import { useState } from "react"

const userData = [
  {
    id: 1,
    username: "user1",
    lastVisit: "2024-02-22 15:30",
    visitCount: 125,
    toolsUsed: ["URL 인코더", "퍼센트 계산기"],
    status: "active",
  },
  {
    id: 2,
    username: "user2",
    lastVisit: "2024-02-21 12:15",
    visitCount: 87,
    toolsUsed: ["Base64", "D-Day 계산기"],
    status: "inactive",
  },
  // Add more sample data as needed
]

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">사용자 관리</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>사용자 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="사용자 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button>검색</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>사용자명</TableHead>
                <TableHead>최근 방문</TableHead>
                <TableHead>방문 횟수</TableHead>
                <TableHead>사용한 도구</TableHead>
                <TableHead>상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.lastVisit}</TableCell>
                  <TableCell>{user.visitCount}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.toolsUsed.map((tool) => (
                        <Badge key={tool} variant="outline">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "active" ? "default" : "secondary"}>
                      {user.status === "active" ? "활성" : "비활성"}
                    </Badge>
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

