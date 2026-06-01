import { getHealthHandler } from "./handlers"
import { createRouter, publicProcedure } from "@/trpc/base"

const healthRouter = createRouter({
  get: publicProcedure
    .query(() => {
      return getHealthHandler()
    }),
})

export { healthRouter }
