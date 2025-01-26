"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { useState } from "react"

interface ImageResult {
  id: string
  url: string
  title: string
}

export default function ImageSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<ImageResult[]>([])
  const [activeTab, setActiveTab] = useState("idol")

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/image-search?q=${encodeURIComponent(searchQuery)}&category=${activeTab}`)
      const data = await response.json()
      setSearchResults(data)
    } catch (error) {
      console.error("Error searching images:", error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>이미지 검색</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Input
              type="search"
              placeholder="검색어를 입력하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button onClick={handleSearch}>검색</Button>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="idol">아이돌</TabsTrigger>
          <TabsTrigger value="game">게임</TabsTrigger>
          <TabsTrigger value="dev">개발</TabsTrigger>
        </TabsList>
        <TabsContent value="idol">
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {searchResults.map((image) => (
                  <div key={image.id} className="relative aspect-square">
                    <Image
                      src={image.url || "/placeholder.svg"}
                      alt={image.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="game">
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {searchResults.map((image) => (
                  <div key={image.id} className="relative aspect-square">
                    <Image
                      src={image.url || "/placeholder.svg"}
                      alt={image.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="dev">
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {searchResults.map((image) => (
                  <div key={image.id} className="relative aspect-square">
                    <Image
                      src={image.url || "/placeholder.svg"}
                      alt={image.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

