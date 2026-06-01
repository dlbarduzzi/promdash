import { createRouter } from "./base"
import { healthRouter } from "@/trpc/apis/health/routers"

const appRouter = createRouter({
  health: healthRouter,
})

export { appRouter }
