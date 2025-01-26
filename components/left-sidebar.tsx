import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LeftSidebar() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>카테고리</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>기술</li>
            <li>문화</li>
            <li>여행</li>
            <li>음식</li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>태그</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <span className="bg-gray-200 px-2 py-1 rounded-full text-sm">#기술</span>
            <span className="bg-gray-200 px-2 py-1 rounded-full text-sm">#프로그래밍</span>
            <span className="bg-gray-200 px-2 py-1 rounded-full text-sm">#웹개발</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

