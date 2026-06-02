"use client"

import Link from "next/link"

import { Sidebar } from "@/components/ui/sidebar"
import { AppLogo } from "@/components/app-logo"

import { cn } from "@/lib/utils"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <div className={cn(
        "px-4 h-16 flex items-center border-b border-b-neutral-200",
        "group-data-[collapsible=icon]:px-2",
        "group-data-[collapsible=icon]:justify-center",
      )}
      >
        <Link
          href="/"
          className={cn(
            "outline-none focus-visible:ring-2",
            "focus-visible:ring-neutral-900 focus-visible:ring-offset-4",
            "group-data-[collapsible=icon]:rounded-full",
            "group-data-[collapsible=icon]:focus-visible:ring-offset-2",
          )}
        >
          <AppLogo variant="full" className="group-data-[collapsible=icon]:hidden" />
          <AppLogo variant="icon" className="not-group-data-[collapsible=icon]:hidden" />
        </Link>
      </div>
    </Sidebar>
  )
}
