"use client"

import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "max-w-fit flex items-center gap-2 text-sm text-neutral-900 leading-none font-medium",
        "select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  )
}

export { Label }
