import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-lg border border-neutral-300 bg-transparent px-3 py-1",
        "text-sm text-neutral-900 transition-none outline-none placeholder:text-neutral-400",
        "focus-visible:ring-3",
        "focus-visible:border-blue-400",
        "focus-visible:ring-blue-400/20",
        "disabled:bg-neutral-50",
        "disabled:text-neutral-400",
        "disabled:border-neutral-200",
        "disabled:cursor-not-allowed",
        "disabled:pointer-events-none",
        "aria-invalid:ring-3",
        "aria-invalid:border-red-500",
        "aria-invalid:ring-red-500/20",
        "disabled:aria-invalid:ring-0",
        "disabled:aria-invalid:border-neutral-200",
        className,
      )}
      {...props}
    />
  )
}

export { Input }
