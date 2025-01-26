import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface ProfileData {
  name: string
  bio: string
  avatar: string
}

interface RightSidebarProps {
  profile: ProfileData
}

export default function RightSidebar({ profile }: RightSidebarProps) {
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
            <li>
              <Link href="#section1" className="text-blue-500 hover:underline">
                App Router
              </Link>
            </li>
            <li>
              <Link href="#section2" className="text-blue-500 hover:underline">
                서버 컴포넌트
              </Link>
            </li>
            <li>
              <Link href="#section3" className="text-blue-500 hover:underline">
                스트리밍
              </Link>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

