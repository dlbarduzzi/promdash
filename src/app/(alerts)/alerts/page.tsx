import type { Metadata } from "next"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { Alerts } from "./_components/alerts"
import { AppSidebar } from "@/components/app-sidebar"

export const metadata: Metadata = {
  title: "Alerts",
}

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="px-4 h-16 flex items-center border-b border-b-neutral-200">
          Navigation
        </div>
        <Alerts />
      </SidebarInset>
    </SidebarProvider>
  )
}
