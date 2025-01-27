import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const tools = [
  { name: "URL 디코딩 및 인코딩", description: "URL을 디코딩하거나 인코딩합니다.", href: "/tools/url-encoder-decoder" },
  { name: "퍼센트 계산기", description: "퍼센트 계산을 쉽게 할 수 있습니다.", href: "/tools/calc/percent" },
  { name: "D-Day 계산기", description: "특정 날짜까지의 D-Day를 계산합니다.", href: "/tools/calc/d-day" },
]

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">도구 목록</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link href={tool.href} key={tool.name}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{tool.name}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

