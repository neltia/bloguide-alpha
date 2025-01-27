"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import LeftSidebar from "./left-sidebar"

export function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden mr-2">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[80%] sm:w-[385px] p-0 overflow-y-auto custom-sheet-content">
        <SheetHeader className="p-6 text-left border-b sticky top-0 bg-background z-10">
          <div className="flex justify-between items-center">
            <SheetTitle className="text-lg font-semibold">메뉴</SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="!absolute right-4 top-4">
                <X className="h-8 w-8" />
                <span className="sr-only">Close menu</span>
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
        <div className="px-6 py-4">
          <LeftSidebar />
        </div>
      </SheetContent>
    </Sheet>
  )
}

