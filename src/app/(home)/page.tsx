import Link from "next/link"

export default function Page() {
  return (
    <div className="p-4">
      <div>Welcome to Promdash!</div>
      <div>
        <Link
          href="/alerts"
          className="text-sm text-neutral-900 font-semibold"
        >
          View Alerts
        </Link>
      </div>
    </div>
  )
}
