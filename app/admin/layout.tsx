"use client"

import AdminSidebar from "@/components/admin/sidebar"
import { useState, type ReactNode } from "react"

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="container mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  )
}

