import { getClustersHandler } from "./handlers"
import { createRouter, publicProcedure } from "@/trpc/base"

const clustersRouter = createRouter({
  get: publicProcedure
    .query(async ({ ctx }) => {
      return await getClustersHandler(ctx)
    }),
})

export { clustersRouter }
