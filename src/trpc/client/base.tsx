"use client"

import type { ReactNode } from "react"
import type { AppRouter } from "@/trpc/types"
import type { QueryClient } from "@tanstack/react-query"

import superjson from "superjson"

import { useState } from "react"
import { createTRPCContext } from "@trpc/tanstack-react-query"
import { QueryClientProvider } from "@tanstack/react-query"
import { createTRPCClient, httpBatchLink } from "@trpc/client"

import { env } from "@/lib/client/env"
import { newQueryClient } from "./query"

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>()

let browserQueryClient: QueryClient

function getQueryClient() {
  if (typeof window === "undefined") {
    return newQueryClient()
  }
  if (!browserQueryClient) {
    browserQueryClient = newQueryClient()
  }
  return browserQueryClient
}

function getUrl() {
  const base = (() => {
    if (typeof window !== "undefined") return ""
    return env.NEXT_PUBLIC_APP_URL
  })()
  return `${base}/api/trpc`
}

export function TRPCReactProvider(props: Readonly<{ children: ReactNode }>) {
  const queryClient = getQueryClient()

  const [trpcClient] = useState(() => {
    return createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: getUrl(),
          transformer: superjson,
        }),
      ],
    })
  })

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {props.children}
      </TRPCProvider>
    </QueryClientProvider>
  )
}
