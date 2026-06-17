import type { Metadata } from "next"

import { Suspense } from "react"
import { HydrateClient } from "@/trpc/server/base"
import { ErrorBoundary } from "react-error-boundary"

import { Alerts } from "./_components/alerts"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { prefetch, trpc } from "@/trpc/server/query"

export const metadata: Metadata = {
  title: "New Alert",
}

export default function Page() {
  prefetch(trpc.clusters.get.queryOptions())
  return (
    <SidebarProvider>
      <AppSidebar />
      <HydrateClient>
        <SidebarInset>
          <div className="px-4 h-16 flex items-center border-b border-b-neutral-200">
            Navigation
          </div>
          <ErrorBoundary fallback={<div className="p-4">Something went wrong!</div>}>
            <Suspense fallback={<div className="p-4">Loading...</div>}>
              <Alerts />
            </Suspense>
          </ErrorBoundary>
        </SidebarInset>
      </HydrateClient>
    </SidebarProvider>
  )
}
