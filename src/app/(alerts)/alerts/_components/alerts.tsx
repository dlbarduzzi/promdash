"use client"

import { Button } from "@/components/ui/button"

export function Alerts() {
  function createAlert() {
    // eslint-disable-next-line no-console
    console.log("Creating alert...")
  }
  return (
    <div className="p-4">
      <div>
        <Button
          type="button"
          onClick={createAlert}
          className="h-10 px-3"
        >
          Create Alert
        </Button>
      </div>
    </div>
  )
}
