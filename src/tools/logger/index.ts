import { createLogger, format, transports } from "winston"

export function newLogger(
  mode: "text" | "json",
  level: "silent" | "debug" | "info" | "warn" | "error",
) {
  const fmt = (() => {
    if (mode === "json") {
      return format.combine(
        format.errors({ stacks: true }),
        format.timestamp(),
        format.json(),
      )
    }
    return format.combine(
      format.errors({ stacks: true }),
      format.timestamp(),
    )
  })()
  return createLogger({
    level,
    format: fmt,
    silent: level === "silent",
    transports: [new transports.Console()],
  })
}
