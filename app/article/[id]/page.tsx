"use client"

import LeftSidebar from "@/components/left-sidebar"
import RightSidebar from "@/components/right-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { testArticleData, testProfileData } from "@/utils/testData"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import { useEffect, useState } from "react"

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

function ArticleSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-3/4" />
      <div className="flex space-x-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="flex space-x-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  )
}

export default function ArticleViewer({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<ArticleData | null>(null)
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/article/${params.id}`)
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Article not found")
          }
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
        setError(error instanceof Error ? error.message : "An unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p className="text-red-500">{error}</p>
        {error === "Article not found" ? (
          <p>Sorry, the requested article could not be found.</p>
        ) : (
          <p>An error occurred while fetching the article. Please try again later.</p>
        )}
      </div>
    )
  }

  // Use actual data or fall back to test data if not available
  const displayArticle = article || testArticleData
  const displayProfile = profile || testProfileData

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <LeftSidebar isLoading={isLoading} />
        <div className="md:col-span-2">
          {isLoading ? (
            <ArticleSkeleton />
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-4">{displayArticle.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                <span>{displayArticle.author}</span>
                <span>{displayArticle.date}</span>
                <span>{displayArticle.category}</span>
              </div>
              <div className="prose max-w-none">
                {displayArticle.content.split("\n\n").map((paragraph, index) => (
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
            </>
          )}
        </div>
        <RightSidebar profile={displayProfile} isLoading={isLoading} />
      </div>
      <Separator className="my-8" />
      <div>
        <h2 className="text-2xl font-bold mb-4">관련 글</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle>{isLoading ? <Skeleton className="h-6 w-3/4" /> : `관련 글 ${i}`}</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? <Skeleton className="h-4 w-full" /> : <p>이것은 관련 글 {i}의 요약입니다.</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
