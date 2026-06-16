import * as React from "react"

import { cn } from "@/lib/utils"

// "h-10 w-full min-w-0",
// "focus-visible:ring-3",
// "focus-visible:border-blue-400",
// "focus-visible:ring-blue-400/20",
// "disabled:bg-neutral-50",
// "disabled:text-neutral-400",
// "disabled:border-neutral-200",
// "disabled:cursor-not-allowed",
// "disabled:pointer-events-none",
// "aria-invalid:ring-3",
// "aria-invalid:border-red-500",
// "aria-invalid:ring-red-500/20",
// "disabled:aria-invalid:ring-0",
// "disabled:aria-invalid:border-neutral-200",

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-24 w-full",
        "rounded-lg border border-neutral-300 bg-transparent px-3 py-2",
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

export { Textarea }
