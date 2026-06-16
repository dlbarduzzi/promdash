import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="p-4">
      <div>Welcome to Promdash!</div>
      <div className="mt-2">
        <Button asChild>
          <Link href="/alerts">
            View Alerts
          </Link>
        </Button>
      </div>
    </div>
  )
}
