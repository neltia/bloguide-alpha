"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Calendar, Code, LinkIcon, Percent, Search, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const toolCategories = [
  {
    name: "계산기",
    tools: [
      {
        name: "퍼센트 계산기",
        description: "퍼센트 계산을 쉽게 할 수 있습니다.",
        href: "/tools/calc/percent",
        icon: Percent,
      },
      {
        name: "D-Day 계산기",
        description: "특정 날짜까지의 D-Day를 계산합니다.",
        href: "/tools/calc/d-day",
        icon: Calendar,
      },
    ],
  },
  {
    name: "디코딩/인코딩",
    tools: [
      {
        name: "URL 디코딩 및 인코딩",
        description: "URL을 디코딩하거나 인코딩합니다.",
        href: "/tools/crypto/url",
        icon: LinkIcon,
      },
      {
        name: "Base64 디코딩 및 인코딩",
        description: "Base64 형식의 텍스트를 디코딩하거나 인코딩합니다.",
        href: "/tools/crypto/base64",
        icon: Code,
      },
    ],
  },
  {
    name: "분석",
    tools: [
      {
        name: "트렌드 키워드 검색",
        description: "키워드의 시간대별 검색량을 분석합니다.",
        href: "/tools/analysis/trend",
        icon: TrendingUp,
      }
    ],
  },
]

export default function ToolsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCategories = toolCategories
    .map((category) => ({
      ...category,
      tools: category.tools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.tools.length > 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">도구 목록</h1>
      <div className="mb-6 relative">
        <Input
          type="text"
          placeholder="도구 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
      {filteredCategories.map((category) => (
        <div key={category.name} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{category.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.tools.map((tool) => (
              <Link href={tool.href} key={tool.name}>
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardHeader className="flex flex-row items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      {tool.icon && <tool.icon size={24} className="text-primary" />}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ))}
      {filteredCategories.length === 0 && <p className="text-center text-gray-500 mt-8">검색 결과가 없습니다.</p>}
    </div>
  )
}

