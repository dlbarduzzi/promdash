import type { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col">
      <main className="flex-1 grid">{children}</main>
    </div>
  )
}
