"use client"

import { formatDate } from "@/app/utils/dateFormat"
import { ErrorDisplay } from "@/components/error-display"
import { LoadingTable } from "@/components/loading-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow, vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

interface ReleaseNote {
  id: number
  date: string
  version: string
  title: string
  content: string
  author: string
}

export default function ReleasePage() {
  const [releaseNotes, setReleaseNotes] = useState<ReleaseNote[]>([])
  const [selectedNote, setSelectedNote] = useState<ReleaseNote | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { theme } = useTheme()

  useEffect(() => {
    const fetchReleaseNotes = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/release/list")
        if (!response.ok) {
          throw new Error("Failed to fetch release notes")
        }
        const data: ReleaseNote[] = await response.json()
        setReleaseNotes(data)
      } catch (error) {
        console.error("Error fetching release notes:", error)
        setError("릴리즈 노트를 불러오는 데 실패했습니다. 테스트 데이터를 표시합니다.")
        setReleaseNotes(sampleReleaseNotes)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReleaseNotes()
  }, [])

  const components = {
    h1: ({ node, ...props }: any) => (
      <h1 {...props} className={`text-2xl font-bold mt-8 mb-6 ${theme === "dark" ? "text-white" : "text-black"}`} />
    ),
    h2: ({ node, ...props }: any) => (
      <h2 {...props} className={`text-xl font-semibold mt-6 mb-4 ${theme === "dark" ? "text-white" : "text-black"}`} />
    ),
    h3: ({ node, ...props }: any) => (
      <h3 {...props} className={`text-lg font-medium mt-4 mb-3 ${theme === "dark" ? "text-white" : "text-black"}`} />
    ),
    p: ({ node, ...props }: any) => (
      <p
        {...props}
        className={`text-base mb-4 leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
      />
    ),
    ul: ({ node, ...props }: any) => (
      <ul
        {...props}
        className={`list-disc list-inside mb-4 pl-4 space-y-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
      />
    ),
    ol: ({ node, ...props }: any) => (
      <ol
        {...props}
        className={`list-decimal list-inside mb-4 pl-4 space-y-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
      />
    ),
    li: ({ node, ...props }: any) => (
      <li {...props} className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`} />
    ),
    blockquote: ({ node, ...props }: any) => (
      <blockquote
        {...props}
        className={`border-l-4 border-gray-300 pl-4 italic my-4 ${
          theme === "dark" ? "text-gray-400" : "text-gray-600"
        }`}
      />
    ),
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || "")
      return !inline && match ? (
        <SyntaxHighlighter
          style={theme === "dark" ? vscDarkPlus : tomorrow}
          language={match[1]}
          PreTag="div"
          {...props}
          className="rounded-md my-4"
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code {...props} className={className}>
          {children}
        </code>
      )
    },
    pre: ({ node, ...props }: any) => (
      <pre
        {...props}
        className={`rounded-md p-4 overflow-x-auto my-4 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}
      />
    ),
    a: ({ node, ...props }: any) => (
      <a {...props} className={`hover:underline ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`} />
    ),
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">릴리즈 노트</h1>
        {selectedNote && (
          <Button variant="outline" onClick={() => setSelectedNote(null)}>
            목록으로 돌아가기
          </Button>
        )}
      </div>

      {error && (
        <div className="mb-6">
          <ErrorDisplay message={error} />
        </div>
      )}

      {selectedNote ? (
        <Card className="overflow-hidden">
          {isLoading ? (
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-6 w-2/3" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </CardContent>
          ) : (
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="text-xs font-mono">
                  {selectedNote.version}
                </Badge>
                <span className="text-sm text-muted-foreground">{formatDate(selectedNote.date)}</span>
              </div>

              <h2 className="text-2xl font-bold mb-8">{selectedNote.title}</h2>

              <div className="prose prose-lg max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
                  components={components}
                >
                  {selectedNote.content}
                </ReactMarkdown>
              </div>
            </CardContent>
          )}
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6">
            {isLoading ? (
              <LoadingTable columns={4} rows={5} />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">날짜</TableHead>
                    <TableHead className="w-[100px]">버전</TableHead>
                    <TableHead>제목</TableHead>
                    <TableHead className="w-[100px]">작성자</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {releaseNotes.map((note) => (
                    <TableRow
                      key={note.id}
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => setSelectedNote(note)}
                    >
                      <TableCell className="whitespace-nowrap">{formatDate(note.date)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                          {note.version}
                        </Badge>
                      </TableCell>
                      <TableCell>{note.title}</TableCell>
                      <TableCell>{note.author}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Sample release notes data
const sampleReleaseNotes: ReleaseNote[] = [
  {
    id: 1,
    version: "0.0.1",
    date: "2025-02-02T18:20:57",
    title: "개발 진행중",
    content: `
# 릴리즈 노트 - Alpha 버전

## 개요

본 버전은 "Blog Guide" 프로젝트의 초기 알파 버전으로, 현재 개발 진행 중인 상태입니다. 주요 기능이 추가되었으며, 향후 개선 및 확장이 예정되어 있습니다.

## 신규 기능

### Tools 추가

- 기본 도구(Base64와 URL 암복호화, 퍼센트 계산기, D-Day 계산기)들이 추가되었습니다.
- 각 도구별 사용자 인터페이스가 구현되었습니다.
- 실시간 계산 및 변환 기능이 구현되었습니다.

### Footer 작성

- 웹 애플리케이션 하단에 푸터를 추가하여 기본적인 정보를 제공하도록 구성하였습니다.
- 저작권 정보 및 기타 필요한 링크들이 포함되었습니다.

### 마크다운 뷰어 작성

- 마크다운 형식의 텍스트를 HTML로 변환하여 표시하는 기능이 구현되었습니다.
- 코드 하이라이팅 기능이 추가되었습니다.
    `,
    author: "개발팀",
  },
  {
    id: 2,
    version: "0.0.2",
    date: "2025-02-02T18:20:57",
    title: "UI/UX 개선",
    content: `
# UI/UX 개선 업데이트

## 개요

사용자 경험을 개선하기 위한 다양한 UI/UX 업데이트가 진행되었습니다.

## 변경 사항

### 디자인 시스템 적용

- shadcn/ui 컴포넌트 라이브러리 적용
- 다크 모드 지원 추가
- 반응형 디자인 개선

### 성능 최적화

- 이미지 최적화
- 코드 스플리팅 적용
- 페이지 로딩 속도 개선
    `,
    author: "개발팀",
  },
]

