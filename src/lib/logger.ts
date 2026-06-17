import { env } from "@/lib/server/env"
import { newLogger } from "@/tools/logger/base"

const logger = newLogger("json", env.LOG_LEVEL)

export { logger }
