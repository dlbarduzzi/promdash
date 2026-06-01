import { env } from "@/lib/server/env"
import { newLogger } from "@/tools/logger"

const logger = newLogger("json", env.LOG_LEVEL)

export { logger }
