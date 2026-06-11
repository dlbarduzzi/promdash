import { fetchRequestHandler } from "@trpc/server/adapters/fetch"

import { appRouter } from "@/trpc/router"
import { createContext } from "@/trpc/base"

function handler(req: Request) {
  return fetchRequestHandler({
    req,
    router: appRouter,
    endpoint: "/api/trpc",
    createContext,
  })
}

export { handler as GET, handler as POST }
