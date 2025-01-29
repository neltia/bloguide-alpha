import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import Image from "next/image"
import { useCallback } from "react"

interface ProfileData {
  name: string
  bio: string
  avatar: string
}

interface TocItem {
  id: string
  text: string
  level: number
}

interface RightSidebarProps {
  profile: ProfileData
  toc: TocItem[]
}

export default function RightSidebar({ profile, toc }: RightSidebarProps) {
  const handleTocClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }, [])
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>프로필</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Image
              src={profile.avatar || "/placeholder.svg"}
              alt={profile.name}
              width={64}
              height={64}
              className="rounded-full"
            />
            <div>
              <h3 className="font-semibold">{profile.name}</h3>
              <p className="text-sm text-gray-500">{profile.bio}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>목차</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {toc.map((item) => (
              <li key={item.id} className={`ml-${(item.level - 1) * 4}`}>
                <a
                  href={`#${item.id}`}
                  className="text-blue-500 hover:underline cursor-pointer"
                  onClick={(e) => handleTocClick(e, item.id)}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div className="flex justify-between items-center">
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              좋아요 0
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              댓글 0
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              공유
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

