import { createAlertSchema } from "@/features/alerts/schema.create"
import { createAlertHandler } from "./alerts.handlers"
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
