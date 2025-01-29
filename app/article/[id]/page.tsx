"use client"

import { ErrorDisplay } from "@/components/error-display"
import LeftSidebar from "@/components/left-sidebar"
import MarkdownEditor from "@/components/markdown-editor"
import RightSidebar from "@/components/right-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { MoreVertical } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { testArticleData, testProfileData } from "../../utils/testData"

interface ArticleData {
  id: string
  title: string
  content: string
  author: string
  date: string
  category: string
  likes: number
  comments: number
}

interface ProfileData {
  name: string
  bio: string
  avatar: string
}

interface TocItem {
  id: string
  text: string
  level: number
}

const components = {
  h1: ({ node, ...props }: any) => <h1 {...props} className="text-3xl font-bold mt-8 mb-4 scroll-margin-top-24" />,
  h2: ({ node, ...props }: any) => <h2 {...props} className="text-2xl font-semibold mt-6 mb-3 scroll-margin-top-24" />,
  h3: ({ node, ...props }: any) => <h3 {...props} className="text-xl font-medium mt-4 mb-2 scroll-margin-top-24" />,
  p: ({ node, ...props }: any) => <p {...props} className="text-base mb-4 leading-relaxed" />,
  ul: ({ node, ...props }: any) => <ul {...props} className="list-disc list-inside mb-4 pl-4" />,
  ol: ({ node, ...props }: any) => <ol {...props} className="list-decimal list-inside mb-4 pl-4" />,
  li: ({ node, ...props }: any) => <li {...props} className="mb-1" />,
  blockquote: ({ node, ...props }: any) => (
    <blockquote {...props} className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-600" />
  ),
  code: ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || "")
    return !inline && match ? (
      <SyntaxHighlighter style={tomorrow} language={match[1]} PreTag="div" {...props} className="rounded-md my-4">
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code {...props} className={className}>
        {children}
      </code>
    )
  },
  pre: ({ node, ...props }: any) => <pre {...props} className="bg-gray-100 rounded-md p-4 overflow-x-auto my-4" />,
  img: ({ node, ...props }: any) => (
    <div className="my-4">
      <Image
        {...props}
        layout="responsive"
        width={700}
        height={475}
        className="rounded-lg"
        alt={props.alt || "Article image"}
      />
    </div>
  ),
  a: ({ node, ...props }: any) => <a {...props} className="text-blue-600 hover:underline" />,
  table: ({ node, ...props }: any) => (
    <div className="overflow-x-auto my-4">
      <table {...props} className="min-w-full divide-y divide-gray-200" />
    </div>
  ),
  th: ({ node, ...props }: any) => (
    <th
      {...props}
      className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    />
  ),
  td: ({ node, ...props }: any) => <td {...props} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" />,
}

export default function ArticleViewer({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<ArticleData | null>(null)
  const [profile, setProfile] = useState<ProfileData>(testProfileData)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isUsingTestData, setIsUsingTestData] = useState(false)
  const [toc, setToc] = useState<TocItem[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/md/view/${params.id}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()

        if (!data || Object.keys(data).length === 0) {
          throw new Error("No data received from API")
        }

        const article: ArticleData = {
          id: data.id || params.id,
          title: data.title || "제목 없음",
          content: data.content || "",
          author: data.author || "익명",
          date: data.date || new Date().toISOString(),
          category: data.category || "미분류",
          likes: data.likes || 0,
          comments: data.comments || 0,
        }
        setArticle(article)
        setError(null)
        setIsUsingTestData(false)
        generateToc(article.content)
      } catch (error) {
        console.error("Error fetching article data:", error)
        setArticle(testArticleData)
        setIsUsingTestData(true)
        generateToc(testArticleData.content)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  const generateToc = (content: string) => {
    const headings = content.match(/^#{1,3} .+$/gm) || []
    const tocItems: TocItem[] = headings.map((heading) => {
      const level = heading.match(/^#+/)?.[0].length || 0
      const text = heading.replace(/^#+\s/, "")
      const id = text.toLowerCase().replace(/[^\w]+/g, "-")
      return { id, text, level }
    })
    setToc(tocItems)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async (newContent: string) => {
    try {
      if (isUsingTestData) {
        setArticle((prev) => (prev ? { ...prev, content: newContent } : null))
        setIsEditing(false)
        generateToc(newContent)
        return
      }

      const response = await fetch(`/api/md/edit/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newContent }),
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      setArticle((prev) => (prev ? { ...prev, content: newContent } : null))
      setIsEditing(false)
      generateToc(newContent)
    } catch (error) {
      console.error("Error saving article:", error)
      setError(error instanceof Error ? error.message : "글을 저장하는 데 실패했습니다.")
    }
  }

  const handleCopyUrl = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => alert("URL이 클립보드에 복사되었습니다."))
      .catch((err) => console.error("URL 복사 실패:", err))
  }

  if (isLoading) return <div className="text-center py-8">로딩 중...</div>
  if (!article) return <div className="text-center py-8">글을 찾을 수 없습니다.</div>

  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <div className="mb-8">
          <ErrorDisplay message={error} />
        </div>
      )}
      {isUsingTestData && (
        <div className="mb-8 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
          <p className="font-bold">주의</p>
          <p>현재 테스트 데이터를 표시하고 있습니다. API 연결에 문제가 있을 수 있습니다.</p>
        </div>
      )}
      <div className="flex flex-col lg:flex-row">
        <div className="hidden lg:block lg:w-1/4 pr-8">
          <LeftSidebar />
        </div>
        <div className="w-full lg:w-1/2">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div>
              <span>{article.author}</span>
              <span className="mx-2">•</span>
              <span>{article.date}</span>
              <span className="mx-2">•</span>
              <span>{article.category}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-500 hover:text-gray-700" onClick={handleCopyUrl}>
                URL 복사
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleEdit}>수정하기</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Separator className="my-4" />
          {isEditing ? (
            <MarkdownEditor content={article.content} onSave={handleSave} />
          ) : (
            <div className="prose prose-lg max-w-none mt-4 notion-like">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
                components={components}
              >
                {article.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
        <div className="hidden lg:block lg:w-1/4 pl-8">
          <RightSidebar profile={profile} toc={toc} />
        </div>
      </div>
      <Separator className="my-8" />
      <div>
        <h2 className="text-2xl font-bold mb-4">관련 글</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle>관련 글 {i}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>이것은 관련 글 {i}의 요약입니다.</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

