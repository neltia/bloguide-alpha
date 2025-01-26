import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface LeftSidebarProps {
  isLoading?: boolean
}

export default function LeftSidebar({ isLoading = false }: LeftSidebarProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{isLoading ? <Skeleton className="h-6 w-24" /> : "카테고리"}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : (
            <ul className="space-y-2">
              <li>기술</li>
              <li>문화</li>
              <li>여행</li>
              <li>음식</li>
            </ul>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{isLoading ? <Skeleton className="h-6 w-16" /> : "태그"}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-200 px-2 py-1 rounded-full text-sm">#기술</span>
              <span className="bg-gray-200 px-2 py-1 rounded-full text-sm">#프로그래밍</span>
              <span className="bg-gray-200 px-2 py-1 rounded-full text-sm">#웹개발</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

