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
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism"
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

interface RightSidebarProps {
  profile: ProfileData
}

export default function ArticleViewer({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<ArticleData | null>(null)
  const [profile, setProfile] = useState<ProfileData>(testProfileData)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isUsingTestData, setIsUsingTestData] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/md/view/${params.id}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setArticle({
          id: data.id || params.id,
          title: data.title || "제목 없음",
          content: data.content || "",
          author: data.author || "익명",
          date: data.date || new Date().toISOString(),
          category: data.category || "미분류",
          likes: data.likes || 0,
          comments: data.comments || 0,
        })
        setError(null)
        setIsUsingTestData(false)
      } catch (error) {
        console.error("Error fetching article data:", error)
        setArticle(testArticleData)
        setIsUsingTestData(true)
        setError(`API를 사용할 수 없어 테스트 데이터를 표시합니다.`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async (newContent: string) => {
    try {
      if (isUsingTestData) {
        setArticle((prev) => (prev ? { ...prev, content: newContent } : null))
        setIsEditing(false)
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
          <hr className="my-4 border-gray-200" />
          {isEditing ? (
            <MarkdownEditor content={article.content} onSave={handleSave} />
          ) : (
            <div className="prose prose-lg max-w-none mt-4 notion-like">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "")
                    return !match ? (
                      <code {...props} className={className}>
                        {children}
                      </code>
                    ) : (
                      <SyntaxHighlighter style={tomorrow} language={match[1]} PreTag="div" className="rounded-md">
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    )
                  },
                  // Customize other elements for a Notion-like appearance
                  h1: ({ node, ...props }) => <h1 {...props} className="text-4xl font-bold mt-8 mb-4" />,
                  h2: ({ node, ...props }) => <h2 {...props} className="text-3xl font-semibold mt-6 mb-3" />,
                  h3: ({ node, ...props }) => <h3 {...props} className="text-2xl font-medium mt-4 mb-2" />,
                  p: ({ node, ...props }) => <p {...props} className="mb-4 leading-relaxed" />,
                  ul: ({ node, ...props }) => <ul {...props} className="list-disc list-inside mb-4" />,
                  ol: ({ node, ...props }) => <ol {...props} className="list-decimal list-inside mb-4" />,
                  li: ({ node, ...props }) => <li {...props} className="mb-1" />,
                  blockquote: ({ node, ...props }) => (
                    <blockquote {...props} className="border-l-4 border-gray-300 pl-4 italic my-4" />
                  ),
                }}
              >
                {article.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
        <div className="hidden lg:block lg:w-1/4 pl-8">
          <RightSidebar profile={profile} />
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

