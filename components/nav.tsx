import { MobileSidebar } from "@/components/mobile-sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { PenToolIcon } from "lucide-react"
import Link from "next/link"

export function Nav() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <MobileSidebar />
          <Link href="/" className="text-2xl font-bold flex items-center ml-2 md:ml-0">
            BloGuide
            <Badge variant="secondary" className="ml-2 text-xs">
              alpha
            </Badge>
          </Link>
        </div>
        <nav className="flex items-center space-x-4">
          <Link
            href="/tools"
            className="p-2 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            aria-label="Tools"
          >
            <PenToolIcon className="h-5 w-5 md:mr-2" />
            <span className="hidden md:inline">Tools</span>
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}

