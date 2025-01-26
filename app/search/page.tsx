"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

interface SearchResult {
  id: string
  title: string
  excerpt: string
  author: string
  date: string
}

const testSearchResults: SearchResult[] = [
  {
    id: "1",
    title: "Next.js 13의 새로운 기능 살펴보기",
    excerpt: "Next.js 13에서 추가된 App Router, 서버 컴포넌트, 스트리밍 등의 새로운 기능들을 자세히 알아봅니다.",
    author: "김개발",
    date: "2023-06-15",
  },
  {
    id: "2",
    title: "React 상태 관리의 미래: Recoil vs Jotai",
    excerpt: "React 생태계의 새로운 상태 관리 라이브러리인 Recoil과 Jotai를 비교 분석합니다.",
    author: "이리액트",
    date: "2023-06-10",
  },
  {
    id: "3",
    title: "TypeScript 4.5 업데이트 내용 정리",
    excerpt: "TypeScript 4.5 버전에서 추가된 새로운 기능들과 개선사항들을 상세히 설명합니다.",
    author: "박타입",
    date: "2023-06-05",
  },
]

function SearchResultSkeleton() {
  return (
    <Card className="mb-4">
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex justify-between mt-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
    </Card>
  )
}

export default function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true)
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setResults(testSearchResults)
      setIsLoading(false)
    }

    fetchResults()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">검색 결과: {query}</h1>
      {isLoading ? (
        <>
          <SearchResultSkeleton />
          <SearchResultSkeleton />
          <SearchResultSkeleton />
        </>
      ) : (
        results.map((result) => (
          <Card key={result.id} className="mb-4">
            <CardHeader>
              <CardTitle>
                <Link href={`/article/${result.id}`} className="text-blue-600 hover:underline">
                  {result.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">{result.excerpt}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{result.author}</span>
                <span>{result.date}</span>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}

