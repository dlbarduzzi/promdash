import superjson from "superjson"

import { cache } from "react"

import { logger } from "@/lib/logger"
import { initTRPC } from "@trpc/server"

const createContext = cache(async () => {
  return { logger }
})

type Context = Awaited<ReturnType<typeof createContext>>

const t = initTRPC.context<Context>().create({
  transformer: superjson,
})

const createRouter = t.router
const publicProcedure = t.procedure

export {
  createRouter,
  createContext,
  publicProcedure,
  type Context,
}
