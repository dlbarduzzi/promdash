import postgres from "postgres"

import { env } from "@/lib/server/env"
import { drizzle } from "drizzle-orm/postgres-js"

import * as alertSchema from "./schemas/alert"

const schema = { ...alertSchema }

const client = postgres(env.DATABASE_URL)
const connect = drizzle({ client, schema })

export const db = connect
export type DB = typeof db
