"use client"

import type { VariantProps } from "class-variance-authority"

import { cva } from "class-variance-authority"
import { useMemo } from "react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn("group/field-group w-full", className)}
      {...props}
    />
  )
}

const fieldVariants = cva(
  "group/field flex w-full gap-2 data-[invalid=true]:text-red-500",
  {
    variants: {
      orientation: {
        vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
        horizontal: "flex-row items-center",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  },
)

function Field({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug",
        className,
      )}
      {...props}
    />
  )
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>
}) {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ]

    if (uniqueErrors?.length === 1) {
      return uniqueErrors[0]?.message
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map(
          (error, index) =>
            // eslint-disable-next-line react/no-array-index-key
            error?.message && <li key={index}>{error.message}</li>,
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("text-sm font-normal text-red-500", className)}
      {...props}
    >
      {content}
    </div>
  )
}

export {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
}
