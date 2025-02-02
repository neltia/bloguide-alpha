"use client"

import { ErrorDisplay } from "@/components/error-display"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow, vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

interface Notice {
  id: number
  title: string
  content: string
  date: string
  author: string
  isImportant: boolean
}

export default function NoticePage() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch("/api/notice/list")
        if (!response.ok) {
          throw new Error("Failed to fetch notices")
        }
        const data: Notice[] = await response.json()
        setNotices(data)
      } catch (error) {
        console.error("Error fetching notices:", error)
        setError("공지사항을 불러오는 데 실패했습니다. 테스트 데이터를 표시합니다.")
        setNotices(sampleNotices)
      }
    }

    fetchNotices()
  }, [])

  const components = {
    h1: ({ node, ...props }: any) => (
      <h1
        {...props}
        className={`text-3xl font-bold mt-8 mb-4 scroll-margin-top-24 ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      />
    ),
    h2: ({ node, ...props }: any) => (
      <h2
        {...props}
        className={`text-2xl font-semibold mt-6 mb-3 scroll-margin-top-24 ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      />
    ),
    h3: ({ node, ...props }: any) => (
      <h3
        {...props}
        className={`text-xl font-medium mt-4 mb-2 scroll-margin-top-24 ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      />
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
        className={`list-disc list-inside mb-4 pl-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
      />
    ),
    ol: ({ node, ...props }: any) => (
      <ol
        {...props}
        className={`list-decimal list-inside mb-4 pl-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
      />
    ),
    li: ({ node, ...props }: any) => (
      <li {...props} className={`mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`} />
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
    table: ({ node, ...props }: any) => (
      <div className="overflow-x-auto my-4">
        <table
          {...props}
          className={`min-w-full divide-y ${theme === "dark" ? "divide-gray-700" : "divide-gray-200"}`}
        />
      </div>
    ),
    th: ({ node, ...props }: any) => (
      <th
        {...props}
        className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
          theme === "dark" ? "bg-gray-800 text-gray-400" : "bg-gray-50 text-gray-500"
        }`}
      />
    ),
    td: ({ node, ...props }: any) => (
      <td
        {...props}
        className={`px-6 py-4 whitespace-nowrap text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}
      />
    ),
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">공지사항</h1>
      {error && (
        <div className="mb-6">
          <ErrorDisplay message={error} />
        </div>
      )}
      {selectedNotice ? (
        <div>
          <div className="flex justify-end mb-4">
            <Button onClick={() => setSelectedNotice(null)}>목록으로 돌아가기</Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>{selectedNotice.title}</CardTitle>
              <div className="text-sm text-gray-500">
                {selectedNotice.author} | {selectedNotice.date}
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none mt-4 notion-like">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
                  components={components}
                >
                  {selectedNotice.content}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">날짜</TableHead>
                  <TableHead>제목</TableHead>
                  <TableHead className="w-[100px]">작성자</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notices.map((notice) => (
                  <TableRow
                    key={notice.id}
                    className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setSelectedNotice(notice)}
                  >
                    <TableCell className="whitespace-nowrap">{notice.date}</TableCell>
                    <TableCell>
                      {notice.isImportant && <span className="text-red-500 font-bold mr-2">[중요]</span>}
                      {notice.title}
                    </TableCell>
                    <TableCell>{notice.author}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Sample notices data
const sampleNotices: Notice[] = [
  {
    id: 1,
    title: "BloGuide 베타 서비스 오픈",
    date: "2023-06-20",
    author: "관리자",
    isImportant: true,
    content: `
# BloGuide 베타 서비스 오픈

안녕하세요, BloGuide 사용자 여러분!

저희는 BloGuide의 베타 서비스를 오픈하게 되어 매우 기쁩니다. 이번 베타 서비스는 여러분의 소중한 피드백을 바탕으로 더 나은 서비스를 만들어가기 위한 중요한 단계입니다.

## 주요 기능

1. **마크다운 에디터**: 직관적이고 강력한 마크다운 에디터를 제공합니다.
2. **SEO 최적화 도구**: 여러분의 블로그 글이 검색 엔진에서 더 잘 노출될 수 있도록 도와줍니다.
3. **분석 대시보드**: 블로그 트래픽과 독자 참여도를 실시간으로 모니터링할 수 있습니다.
4. **자동 백업**: 여러분의 소중한 콘텐츠를 안전하게 보관합니다.

## 베타 테스터 모집

현재 저희는 열정적인 베타 테스터분들을 모집하고 있습니다. 베타 테스터로 참여하시면 다음과 같은 혜택을 받으실 수 있습니다:

- BloGuide 프리미엄 기능 무료 이용
- 개발팀과의 직접적인 소통 기회
- 향후 출시될 기능에 대한 미리보기

베타 테스터로 참여를 원하시는 분들은 [베타 신청 페이지](https://bloguide.com/beta)를 방문해 주세요.

여러분의 참여와 피드백이 BloGuide를 더욱 발전시키는 원동력이 될 것입니다. 많은 관심과 참여 부탁드립니다.

감사합니다.

BloGuide 팀 드림
    `,
  },
  {
    id: 2,
    title: "6월 업데이트 안내",
    date: "2023-06-15",
    author: "개발팀",
    isImportant: false,
    content: `
# 6월 업데이트 안내

안녕하세요, BloGuide 사용자 여러분.

6월 중 예정된 업데이트 내용을 안내드립니다. 이번 업데이트에는 주요 기능 개선 및 버그 수정이 포함되어 있습니다.

## 주요 업데이트 내용

1. **마크다운 에디터 개선**
   - 실시간 미리보기 기능 추가
   - 단축키 지원 확대

2. **SEO 도구 강화**
   - 키워드 분석 기능 추가
   - 메타 태그 자동 생성 기능

3. **성능 최적화**
   - 페이지 로딩 속도 개선
   - 이미지 최적화 알고리즘 적용

4. **버그 수정**
   - 모바일에서 레이아웃 깨짐 현상 수정
   - 댓글 알림 오작동 문제 해결

자세한 내용은 업데이트 당일 공지사항을 통해 다시 안내드리겠습니다.

감사합니다.
    `,
  },
  {
    id: 3,
    title: "커뮤니티 가이드라인 개정",
    date: "2023-06-10",
    author: "운영팀",
    isImportant: true,
    content: `
# 커뮤니티 가이드라인 개정 안내

안녕하세요, BloGuide 커뮤니티 여러분.

더 나은 커뮤니티 환경을 만들기 위해 가이드라인을 개정하였습니다. 모든 사용자분들은 개정된 가이드라인을 숙지해주시기 바랍니다.

## 주요 변경 사항

1. **예의 지키기**
   - 타인을 존중하는 언어 사용 강조
   - 혐오 발언 및 차별적 내용 제재 강화

2. **저작권 존중**
   - 타인의 콘텐츠 무단 사용 금지
   - 출처 명시 의무화

3. **스팸 및 광고성 콘텐츠 규제**
   - 반복적인 홍보 글 작성 제한
   - 불법 상품 거래 글 즉시 삭제 및 계정 정지

4. **개인정보 보호**
   - 타인의 개인정보 공유 금지
   - 프라이버시 침해 콘텐츠 제재

자세한 가이드라인은 [커뮤니티 가이드라인
    `,
  },
]

