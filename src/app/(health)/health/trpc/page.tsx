import type { Metadata } from "next"

import { Suspense } from "react"

import { ErrorBoundary } from "react-error-boundary"

import { HydrateClient } from "@/trpc/server/base"
import { prefetch, trpc } from "@/trpc/server/query"

import { Health } from "./_components/health"

export const metadata: Metadata = {
  title: "TRPC Health Check",
}

export default function Page() {
  prefetch(trpc.health.get.queryOptions())
  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Something went wrong!</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <Health />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  )
}
