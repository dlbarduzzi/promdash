import superjson from "superjson"

import { logger } from "@/lib/logger"
import { initTRPC } from "@trpc/server"

async function createContext() {
  return { logger }
}

type Context = Awaited<ReturnType<typeof createContext>>

const t = initTRPC.context<Context>().create({
  transformer: superjson,
})

const createRouter = t.router

const durationMiddleware = t.middleware(async ({ path, next }) => {
  const start = Date.now()

  if (t._config.isDev) {
    // artificial delay in dev 100-500ms
    const delay = Math.floor(Math.random() * 400) + 100
    await new Promise((resolve) => setTimeout(resolve, delay))
  }

  const res = await next()
  const end = Date.now()

  const date = new Date().toISOString()

  // eslint-disable-next-line no-console
  console.log(`${date} [INFO] trpc call ${path} took ${end - start}ms to execute`)

  return res
})

const publicProcedure = t.procedure.use(durationMiddleware)

export {
  createRouter,
  createContext,
  publicProcedure,
  type Context,
}
