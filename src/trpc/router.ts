import { createRouter } from "./base"

import { healthRouter } from "./apis/health/routers"
import { alertsRouter } from "./apis/alerts/routers"
import { clustersRouter } from "./apis/clusters/routers"

const appRouter = createRouter({
  health: healthRouter,
  alerts: alertsRouter,
  clusters: clustersRouter,
})

export { appRouter }
