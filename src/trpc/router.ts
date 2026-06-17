import { createRouter } from "./base"

import { healthRouter } from "./apis/health.router"
import { alertsRouter } from "./apis/alerts.router"
import { clustersRouter } from "./apis/clusters.router"

const appRouter = createRouter({
  health: healthRouter,
  alerts: alertsRouter,
  clusters: clustersRouter,
})

export { appRouter }
