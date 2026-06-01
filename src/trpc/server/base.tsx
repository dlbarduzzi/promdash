import "server-only"

import { getQueryClient } from "./query"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

export function HydrateClient(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient()
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  )
}
