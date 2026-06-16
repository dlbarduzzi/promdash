import { index, pgEnum, pgTable } from "drizzle-orm/pg-core"

export const SEVERITIES = [
  "disabled",
  "info",
  "minor",
  "warning",
  "major",
  "critical",
] as const

export const severitiesEnum = pgEnum("severities", SEVERITIES)

export const alert = pgTable("alert", t => ({
  id: t.uuid("id").notNull().primaryKey().defaultRandom(),
  name: t.text("name").notNull(),
  expr: t.text("expr").notNull(),
  for: t.text("for").notNull(),
  severity: severitiesEnum().notNull(),
  action: t.text("action").notNull(),
  autoPage: t.boolean("auto_page").default(false),
  clusters: t.text("clusters").notNull(),
  component: t.text("component").notNull(),
  customerImpact: t.boolean("customer_impacting").default(false),
  disableMoogsoft: t.boolean("disable_moogsoft").default(false),
  microservice: t.text("microservice").notNull(),
  namespace: t.text("namespace").notNull(),
  notificationGroupsLab: t.text("notification_groups_lab").notNull(),
  notificationGroupsProd: t.text("notification_groups_prod").notNull(),
  summary: t.text("summary").notNull(),
  owner: t.text("owner").notNull(),
  user: t.text("user").notNull(),
  dashboard: t.text("dashboard").notNull(),
  business: t.text("business").notNull(),
  product: t.text("product").notNull(),
  platform: t.text("platform").notNull(),
  createdBy: t.text("created_by").notNull(),
  updatedBy: t.text("updated_by").notNull(),
  customFields: t.jsonb("custom_fields")
    .$type<Record<string, string>>()
    .notNull()
    .default({}),
  createdAt: t.timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: t.timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
}), table => [
  index("alert_namespace_microservice_unique_idx").on(
    table.namespace,
    table.microservice,
  ),
])
