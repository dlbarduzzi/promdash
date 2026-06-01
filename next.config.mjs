import { createJiti } from "jiti"
import { fileURLToPath } from "node:url"

const jiti = createJiti(fileURLToPath(import.meta.url))

await jiti.import("./src/lib/client/env.ts")
await jiti.import("./src/lib/server/env.ts")

/** @type {import("next").NextConfig} */
const nextConfig = {
  devIndicators: false,
}

export default nextConfig
