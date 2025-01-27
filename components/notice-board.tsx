"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"

interface Notice {
  id: number
  title: string
  date: string
  author: string
  content: string
  isImportant: boolean
}

export function NoticeBoard({ notices }: { notices: Notice[] }) {
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null)

  return (
    <Card className="w-full">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">날짜</TableHead>
              <TableHead className="w-[60%]">제목</TableHead>
              <TableHead className="w-[120px]">작성자</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notices.map((notice) => (
              <TableRow key={notice.id}>
                <TableCell>{notice.date}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="link"
                        className="p-0 h-auto font-normal"
                        onClick={() => setSelectedNotice(notice)}
                      >
                        {notice.title}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>{selectedNotice?.title}</DialogTitle>
                        <DialogDescription>
                          작성일: {selectedNotice?.date} | 작성자: {selectedNotice?.author}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-4">{selectedNotice?.content}</div>
                    </DialogContent>
                  </Dialog>
                  {notice.isImportant && (
                    <Badge variant="destructive" className="ml-2">
                      중요
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{notice.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

