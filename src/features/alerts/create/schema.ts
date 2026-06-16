import z from "zod"

import { alert, SEVERITIES } from "@/db/schemas/alert"
import { createInsertSchema } from "drizzle-zod"

const NAME_MIN_CHARS = 6
const NAME_MAX_CHARS = 120
const EXPR_MIN_CHARS = 3

const createAlertSchema = createInsertSchema(alert, {
  name: z
    .string()
    .trim()
    .min(1, "Alert name is required.")
    .min(NAME_MIN_CHARS, `Alert name must be at least ${NAME_MIN_CHARS} characters long.`)
    .max(NAME_MAX_CHARS, `Alert name must be at most ${NAME_MAX_CHARS} characters long.`)
    .regex(
      /^\w+$/,
      "Alert name can only contain letters, numbers and underscores.",
    )
    .refine(name => !name.startsWith("_") && !name.endsWith("_"), {
      message: "Alert name cannot start or end with underscores.",
    }),
  expr: z
    .string()
    .trim()
    .min(1, "Query expression is required.")
    .min(EXPR_MIN_CHARS, `Query expression must be at least ${EXPR_MIN_CHARS} characters long.`),
  for: z.coerce
    .number()
    .min(0, "Minutes in pending state must be at minimum 0.")
    .max(1440, "Minutes in pending state must be at maximum 1440.")
    .transform(value => `${value}m`),
  severity: z.enum(SEVERITIES, "Not a valid severity value."),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

type CreateAlertSchema = z.infer<typeof createAlertSchema>

export {
  createAlertSchema,
  type CreateAlertSchema,
}
