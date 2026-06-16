import { createRouter } from "./base"

import { alertsRouter } from "./apis/alerts/routers"
import { healthRouter } from "./apis/health/routers"

const appRouter = createRouter({
  health: healthRouter,
  alerts: alertsRouter,
})

export { appRouter }
