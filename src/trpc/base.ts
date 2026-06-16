import z from "zod"
import superjson from "superjson"

import { initTRPC } from "@trpc/server"

import { db } from "@/db/connect"
import { logger } from "@/lib/logger"

async function createContext() {
  return { db, logger }
}

type Context = Awaited<ReturnType<typeof createContext>>

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter: ({ shape, error }) => ({
    ...shape,
    data: {
      ...shape.data,
      zodError:
        error.cause instanceof z.ZodError
          ? z.flattenError(error.cause as z.ZodError<Record<string, unknown>>)
          : null,
    },
  }),
})

const createRouter = t.router

const durationMiddleware = t.middleware(async ({ path, next }) => {
  const start = Date.now()

  if (t._config.isDev) {
    // Artificial delay in dev 100-500ms.
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
  type Context,
  createContext,
  createRouter,
  publicProcedure,
}
