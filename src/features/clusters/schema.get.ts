import z from "zod"

const clusterSchema = z.object({
  id: z.string(),
  env: z.string(),
  url: z.string(),
  name: z.string(),
  type: z.string(),
})

const clustersResponseSchema = z.object({
  ok: z.boolean(),
  clusters: z.object({
    lab: z.array(clusterSchema.omit({ id: true })),
    prod: z.array(clusterSchema.omit({ id: true })),
  }),
})

type ClusterSchema = z.infer<typeof clusterSchema>

export {
  clusterSchema,
  type ClusterSchema,
  clustersResponseSchema,
}
