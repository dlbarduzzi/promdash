import type { AppContext } from "@/trpc/types"
import type { CreateAlertSchema } from "@/features/alerts/create/schema"

import postgres from "postgres"
import { TRPCError } from "@trpc/server"

import { alert } from "@/db/schemas/alert"
import { createAlertSchema } from "@/features/alerts/create/schema"

// const newAlert: CreateAlertSchema = {
//   name: "hello_world",
//   expr: "up_targets{job=\"prometheus\"} > 2000000",
//   severity: "warning",
//   for: "5",
//   action: "Test alert action.",
//   autoPage: false,
//   business: "Business",
//   clusters: "lab_in-cluster_dev-int,prod_in-cluster_prod-west-1",
//   component: "Component",
//   createdBy: "dylan.barduzzi@directv.com",
//   customerImpact: false,
//   dashboard: "https://grafana.com",
//   disableMoogsoft: false,
//   microservice: "prosync",
//   namespace: "mnc-ops",
//   notificationGroupsLab: "dylan-slack",
//   notificationGroupsProd: "dylan-slack",
//   owner: "QuestLove <questlove@directv.com>",
//   platform: "Platform",
//   product: "Product",
//   summary: "Test alert summary",
//   updatedBy: "dylan.barduzzi@directv.com",
//   user: "ddb671x:DYLAN BARDUZZI:dylan.barduzzi@directv.com",
//   customFields: {
//     field_a: "value_a",
//     field_b: "value_b",
//   },
// }

// PostgreSQL error codes we care about when persisting an alert.
// See https://www.postgresql.org/docs/current/errcodes-appendix.html
const PG_ERROR_CODE = {
  UNIQUE_VIOLATION: "23505",
  NOT_NULL_VIOLATION: "23502",
  FOREIGN_KEY_VIOLATION: "23503",
  CHECK_VIOLATION: "23514",
} as const

async function createAlertHandler(ctx: AppContext, input: CreateAlertSchema) {
  const parsed = createAlertSchema.safeParse(input)
  if (!parsed.success) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      cause: parsed.error,
      message: "Alert validation failed.",
    })
  }

  const values = parsed.data
  const { db, logger } = ctx

  try {
    // A single insert is already atomic, but we wrap it in a transaction so
    // any future multi-statement work rolls back together. Drizzle rolls the
    // transaction back automatically when the callback throws.
    const [newAlert] = await db.transaction(async (tx) => {
      return tx.insert(alert).values(values).returning()
    })

    if (newAlert == null) {
      // Should never happen: a successful insert always returns the row.
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Alert was not persisted.",
      })
    }

    logger.info("alert created", {
      alert: {
        id: newAlert.id,
        name: newAlert.name,
      },
      status: "CREATE_ALERT_SUCCESS",
    })

    return {
      status: 201,
      message: "Alert created.",
      data: newAlert,
    }
  }
  catch (error) {
    console.error("----- ERROR -----")
    console.error(error)
    console.error("----- ERROR -----")

    // Errors we raised ourselves are already well-formed, rethrow as-is.
    if (error instanceof TRPCError) {
      throw error
    }

    if (error instanceof postgres.PostgresError) {
      logger.error("failed to create alert: database error", {
        code: error.code,
        detail: error.detail,
        constraint: error.constraint_name,
        table: error.table_name,
        column: error.column_name,
        status: "CREATE_ALERT_FAILED",
      })

      switch (error.code) {
        case PG_ERROR_CODE.UNIQUE_VIOLATION:
          throw new TRPCError({
            code: "CONFLICT",
            message: "An alert with these values already exists.",
            cause: error,
          })
        case PG_ERROR_CODE.NOT_NULL_VIOLATION:
        case PG_ERROR_CODE.FOREIGN_KEY_VIOLATION:
        case PG_ERROR_CODE.CHECK_VIOLATION:
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "The alert payload is invalid.",
            cause: error,
          })
        default:
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create alert.",
            cause: error,
          })
      }
    }

    logger.error("failed to create alert: unexpected error", {
      error: error instanceof Error ? error.message : String(error),
    })

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create alert.",
      cause: error,
    })
  }
}

export { createAlertHandler }
