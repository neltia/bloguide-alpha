import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PenToolIcon as Tool } from "lucide-react"
import Link from "next/link"

export function Nav() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold flex items-center">
          BloGuide
          <Badge variant="secondary" className="ml-2 text-xs">
            alpha
          </Badge>
        </Link>
        <nav className="flex items-center space-x-2">
          <Link href="/tools" className="p-2 flex items-center justify-center">
            <Tool className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Tools</span>
          </Link>
          <ThemeToggle />
          <Button variant="ghost">설정</Button>
          <Button>로그인</Button>
        </nav>
      </div>
    </header>
  )
}

