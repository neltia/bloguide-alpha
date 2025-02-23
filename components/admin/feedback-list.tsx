"use client"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const feedbackData = [
  {
    id: 1,
    type: "기능 제안",
    title: "마크다운 에디터에 이미지 드래그 앤 드롭 기능 추가",
    date: "2024-02-22",
    status: "검토중",
  },
  {
    id: 2,
    type: "버그 리포트",
    title: "모바일에서 계산기 키패드가 올바르게 표시되지 않음",
    date: "2024-02-21",
    status: "확인됨",
  },
  {
    id: 3,
    type: "개선 제안",
    title: "다크 모드에서 가독성 개선 필요",
    date: "2024-02-20",
    status: "처리중",
  },
  {
    id: 4,
    type: "기타",
    title: "도구 사용 가이드 문서 필요",
    date: "2024-02-19",
    status: "완료",
  },
]

export function FeedbackList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>유형</TableHead>
          <TableHead>제목</TableHead>
          <TableHead>접수일</TableHead>
          <TableHead>상태</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {feedbackData.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <Badge variant="outline">{item.type}</Badge>
            </TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.date}</TableCell>
            <TableCell>
              <Badge
                variant={
                  item.status === "완료"
                    ? "default"
                    : item.status === "처리중"
                      ? "secondary"
                      : item.status === "확인됨"
                        ? "warning"
                        : "outline"
                }
              >
                {item.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

