import "server-only"

import type { TRPCQueryOptions } from "@trpc/tanstack-react-query"

import { cache } from "react"
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query"

import { appRouter } from "@/trpc/router"
import { createContext } from "@/trpc/base"
import { newQueryClient } from "@/trpc/client/query"

export const getQueryClient = cache(newQueryClient)

export const trpc = createTRPCOptionsProxy({
  ctx: createContext,
  router: appRouter,
  queryClient: getQueryClient,
})

// eslint-disable-next-line ts/no-explicit-any
export function prefetch<T extends ReturnType<TRPCQueryOptions<any>>>(
  queryOptions: T,
) {
  const queryClient = getQueryClient()
  if (queryOptions.queryKey[1]?.type === "infinite") {
    // eslint-disable-next-line ts/no-explicit-any
    void queryClient.prefetchInfiniteQuery(queryOptions as any)
  }
  else {
    void queryClient.prefetchQuery(queryOptions)
  }
}
