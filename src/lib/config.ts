import { env } from "@/lib/client/env"

export const siteConfig = {
  url: env.NEXT_PUBLIC_APP_URL,
  name: "Promdash",
  // eslint-disable-next-line style/max-len
  description: "A centralized alert management platform that enables teams to efficiently manage Prometheus alerts across multiple clusters.",
}
