"use client"

import z from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { useId, useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { cn, delay } from "@/lib/utils"

const alertSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, "Name must be at least 5 characters long.")
    .max(32, "Name must be at most 32 characters long."),
})

type AlertSchema = z.infer<typeof alertSchema>

export function Alerts() {
  const [isDisabled, setIsDisabled] = useState(false)

  const form = useForm<AlertSchema>({
    resolver: zodResolver(alertSchema),
    defaultValues: {
      name: "",
    },
  })

  const formId = useId()
  const isSubmitting = form.formState.isSubmitting || isDisabled

  async function onSubmit(data: AlertSchema) {
    await delay(2000)
    // eslint-disable-next-line no-console
    console.log(data.name)
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <Button
          type="button"
          onClick={() => setIsDisabled(() => !isDisabled)}
        >
          Toggle Disable
        </Button>
      </div>
      <div className={cn(
        "relative overflow-hidden w-full max-w-xl z-10",
        "border border-neutral-200 rounded-xl bg-white py-4 px-5",
      )}
      >
        <div className={cn(
          "bg-neutral-50 inset-0 opacity-50 z-50",
          isSubmitting ? "absolute" : "hidden",
        )}
        />
        <div className="card-content">
          <form
            id={formId}
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-y-6"
          >
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`${formId}-name`}>
                      Alert Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id={`${formId}-name`}
                      disabled={isSubmitting}
                      aria-invalid={fieldState.invalid}
                      placeholder="service_high_error_rate"
                      autoComplete="off"
                      autoCapitalize="off"
                    />
                    {fieldState.invalid && !isSubmitting ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : null}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </div>
        <div className="mt-6">
          <Field>
            <Button
              type="submit"
              form={formId}
              className="max-w-fit"
            >
              Create Alert
            </Button>
          </Field>
        </div>
      </div>
    </div>
  )
}
