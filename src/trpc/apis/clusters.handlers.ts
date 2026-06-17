import type { AppContext } from "@/trpc/types"
import type { ClusterSchema } from "@/features/clusters/schema.get"

import z from "zod"

import { env } from "@/lib/server/env"
import { result } from "@/tools/events/result"
import { strings } from "@/tools/strings/base"

import { clustersResponseSchema } from "@/features/clusters/schema.get"

const REQUEST_TIMEOUT_MS = 1000 * 20 // 20 seconds.

async function getClustersHandler(ctx: AppContext) {
  const url = `${env.PROSYNC_URL}/api/v1/clusters`
  const logger = ctx.logger

  let resp: Response
  try {
    resp = await fetch(url, {
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })
  }
  catch (error) {
    if (error instanceof DOMException && error.name === "TimeoutError") {
      logger.error("failed to get clusters: request timed out", {
        url,
        reason: "timeout",
        timeoutMs: REQUEST_TIMEOUT_MS,
        status: "GET_CLUSTERS_ERROR",
      })
      return result.err({ reason: "timeout" })
    }
    logger.error("failed to get clusters: network error", {
      url,
      reason: "network-error",
      error: error instanceof Error ? error.message : String(error),
      status: "GET_CLUSTERS_ERROR",
    })
    return result.err({ reason: "network-error" })
  }

  if (!resp.ok) {
    logger.error("failed to get clusters: upstream returned a non-ok response", {
      url,
      reason: "bad-response",
      httpStatus: `${resp.status} - ${resp.statusText}`,
      status: "GET_CLUSTERS_ERROR",
    })
    return result.err({ reason: "bad-response" })
  }

  let data: unknown
  try {
    data = await resp.json()
  }
  catch (error) {
    logger.error("failed to get clusters: could not parse response body", {
      url,
      reason: "invalid-response",
      error: error instanceof Error ? error.message : String(error),
      status: "GET_CLUSTERS_ERROR",
    })
    return result.err({ reason: "invalid-response" })
  }

  const parsed = clustersResponseSchema.safeParse(data)
  if (!parsed.success) {
    const errors = (() => {
      try {
        const err = z.treeifyError(parsed.error).properties
        return JSON.stringify(err)
      }
      catch {
        return String(parsed.error)
      }
    })()
    logger.error("failed to get clusters: invalid data schema", {
      url,
      reason: "invalid-schema",
      errors: strings(errors).truncate(512),
      status: "GET_CLUSTERS_ERROR",
    })
    return result.err({ reason: "invalid-schema" })
  }

  const clusters: Array<ClusterSchema> = []

  function pushClusters(data: Array<Omit<ClusterSchema, "id">>) {
    for (const cluster of data) {
      clusters.push({
        id: `${cluster.env}::${cluster.type}::${cluster.name}`,
        ...cluster,
      })
    }
  }
  pushClusters(parsed.data.clusters.lab)
  pushClusters(parsed.data.clusters.prod)

  return result.ok(clusters)
}

export { getClustersHandler }
