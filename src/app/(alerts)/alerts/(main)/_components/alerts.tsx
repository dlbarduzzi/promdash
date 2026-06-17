"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Alerts() {
  return (
    <div className="p-4">
      <Button asChild>
        <Link href="/alerts/create">
          New Alert
        </Link>
      </Button>
    </div>
  )
}
