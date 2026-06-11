import * as React from "react"
import type { VariantProps } from "class-variance-authority"

import { cva } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  `group/button inline-flex shrink-0 items-center justify-center rounded-lg border
  border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all
  outline-none select-none focus-visible:ring-3 active:not-aria-[haspopup]:translate-y-px
  disabled:pointer-events-none disabled:opacity-50
  [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
  {
    variants: {
      variant: {
        default: `bg-neutral-900 text-white hover:bg-neutral-700
          focus-visible:border-neutral-100 focus-visible:ring-neutral-900`,
      },
      size: {
        default: "h-8 gap-1.5 px-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  size = "default",
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"
  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
