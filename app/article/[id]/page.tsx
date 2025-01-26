"use client"

import LeftSidebar from "@/components/left-sidebar"
import RightSidebar from "@/components/right-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import { useEffect, useState } from "react"
import { testArticleData, testProfileData } from "../../utils/testData"

interface ArticleData {
  title: string
  content: string
  author: string
  date: string
  category: string
}

interface ProfileData {
  name: string
  bio: string
  avatar: string
}

export default function ArticleViewer({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<ArticleData>(testArticleData)
  const [profile, setProfile] = useState<ProfileData>(testProfileData)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/article/${params.id}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        if (data.error) {
          throw new Error(data.error)
        }
        setArticle(data.article)
        setProfile(data.profile)
        setError(null)
      } catch (error) {
        console.error("Error fetching article data:", error)
        setError(
          error instanceof Error ? error.message : "데이터를 불러오는 데 실패했습니다. 테스트 데이터를 표시합니다.",
        )
        // Keep the test data in case of error
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">오류 발생: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <LeftSidebar />
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <span>{article.author}</span>
            <span>{article.date}</span>
            <span>{article.category}</span>
          </div>
          <div className="prose max-w-none">
            {article.content.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div className="flex items-center space-x-4 mt-8">
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              좋아요
            </Button>
            <Button variant="outline" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              댓글
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              공유
            </Button>
          </div>
        </div>
        <RightSidebar profile={profile} />
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

