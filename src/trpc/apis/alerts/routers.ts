import { createAlertSchema } from "@/features/alerts/create/schema"
import { createAlertHandler } from "./handlers"
import { createRouter, publicProcedure } from "@/trpc/base"

const alertsRouter = createRouter({
  create: publicProcedure
    .input(createAlertSchema)
    .mutation(async ({ ctx, input }) => {
      const result = await createAlertHandler(ctx, input)
      return result
    }),
})

export { alertsRouter }
