"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

// Test data for recommended and popular articles
const testData = {
  recommended: [
    { id: 1, title: "추천 글 1: React 18의 새로운 기능" },
    { id: 2, title: "추천 글 2: Next.js로 성능 최적화하기" },
    { id: 3, title: "추천 글 3: TypeScript 팁과 트릭" },
  ],
  popular: [
    { id: 4, title: "인기 글 1: JavaScript ES6+ 완벽 가이드" },
    { id: 5, title: "인기 글 2: CSS Grid 레이아웃 마스터하기" },
    { id: 6, title: "인기 글 3: 웹 접근성의 중요성" },
  ],
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-center mb-8">블로그 검색을 더 쉽고 빠르게</h1>
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-6 w-6" />
            <Input
              type="search"
              placeholder="검색어를 입력해 주세요."
              className="pl-14 pr-4 py-6 text-xl w-full rounded-full shadow-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <div className="flex justify-center space-x-4 mt-4">
            <Button variant="outline" size="sm">
              #최근검색
            </Button>
            <Button variant="outline" size="sm">
              #자주찾는
            </Button>
            <Button variant="outline" size="sm">
              #인기있는
            </Button>
            <Button variant="outline" size="sm">
              #맞춤검색
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8 mt-12">
          <Card>
            <CardHeader>
              <CardTitle>공지사항</CardTitle>
            </CardHeader>
            <CardContent>
              <p>블로그 의의, 소개 등 네이버 블로그 대문</p>
              <p className="mt-2 text-sm text-muted-foreground">홍보가 필요한 내용, 그때그때 상황에 맞게</p>
            </CardContent>
          </Card>

          <Tabs defaultValue="recommended">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="recommended">추천 글</TabsTrigger>
              <TabsTrigger value="popular">인기 글</TabsTrigger>
            </TabsList>
            <TabsContent value="recommended">
              <Card>
                <CardContent className="p-4">
                  <ul className="space-y-2">
                    {testData.recommended.map((article) => (
                      <li key={article.id}>
                        <Link href={`/article/${article.id}`} className="text-blue-500 hover:underline">
                          {article.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="popular">
              <Card>
                <CardContent className="p-4">
                  <ul className="space-y-2">
                    {testData.popular.map((article) => (
                      <li key={article.id}>
                        <Link href={`/article/${article.id}`} className="text-blue-500 hover:underline">
                          {article.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

