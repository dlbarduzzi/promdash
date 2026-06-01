"use client"

import { useTRPC } from "@/trpc/client/base"
import { useSuspenseQuery } from "@tanstack/react-query"

export function Health() {
  const trpc = useTRPC()
  const resp = useSuspenseQuery(trpc.health.get.queryOptions())
  return (
    <div className="p-4">
      <div className="bg-neutral-100 border border-neutral-200 max-w-fit p-4 rounded-md">
        <pre className="font-mono text-sm text-neutral-900">
          {JSON.stringify(resp.data, null, 2)}
        </pre>
      </div>
    </div>
  )
}
