"use client"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { BarChart, ChevronLeft, ChevronRight, Settings, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: BarChart },
  { name: "User Management", href: "/admin/users", icon: Users },
  { name: "API Management", href: "/admin/api", icon: Settings },
]

interface AdminSidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function AdminSidebar({ open, setOpen }: AdminSidebarProps) {
  const pathname = usePathname()

  const toggleSidebar = () => {
    setOpen(!open)
  }

  if (!open) return null

  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r bg-gray-100/40 dark:bg-gray-800/40 dark:border-gray-800 transition-all duration-300",
        !open ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-[60px] items-center border-b px-6">
        <Link className="flex items-center gap-2 font-semibold" href="/admin/dashboard">
          <BarChart className="h-6 w-6" />
          {!open && <span>Admin Panel</span>}
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1 py-4">
          {sidebarItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn("w-full justify-start", !open ? "px-2" : "px-4")}
            >
              <Link href={item.href}>
                <item.icon className="h-4 w-4 mr-2" />
                {!open && item.name}
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
      <Button variant="ghost" className="m-2" onClick={toggleSidebar}>
        {!open ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
    </div>
  )
}

