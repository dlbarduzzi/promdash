"use client"

import type { CreateAlertSchema } from "@/features/alerts/create/schema"

import { zodResolver } from "@hookform/resolvers/zod"
import { useId, useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { strings } from "@/tools/strings"
import { cn, delay } from "@/lib/utils"
import { SEVERITIES } from "@/db/schemas/alert"
import { createAlertSchema } from "@/features/alerts/create/schema"

const severities = SEVERITIES.map(item => ({
  label: strings(item).capitalize(),
  value: item,
}))

export function Alerts() {
  const [isDisabled, setIsDisabled] = useState(false)

  const form = useForm<CreateAlertSchema>({
    resolver: zodResolver(createAlertSchema),
    defaultValues: {
      name: "",
      expr: "",
      for: "5",
      severity: "warning",
    },
  })

  const formId = useId()
  const isSubmitting = form.formState.isSubmitting || isDisabled

  async function onSubmit(data: CreateAlertSchema) {
    // TODO: Validate query-expression with go-prometheus.
    await delay(2000)
    // eslint-disable-next-line no-console
    console.log(data)
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <Select>
          <SelectTrigger className="w-full max-w-48">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4 text-right">
        <Button
          type="button"
          onClick={() => setIsDisabled(() => !isDisabled)}
          className="bg-neutral-200 text-neutral-900 hover:bg-neutral-300"
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
            className="grid gap-y-7"
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
            <FieldGroup>
              <Controller
                name="expr"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`${formId}-expr`}>
                      Query Expression
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id={`${formId}-expr`}
                      disabled={isSubmitting}
                      aria-invalid={fieldState.invalid}
                      placeholder='app_request_latency_count{status_code="500"} > 10'
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
            <FieldGroup>
              <Controller
                name="for"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`${formId}-for`}>
                      Minutes in Pending State
                    </FieldLabel>
                    <Input
                      {...field}
                      type="number"
                      id={`${formId}-for`}
                      disabled={isSubmitting}
                      aria-invalid={fieldState.invalid}
                      min={0}
                      max={1440}
                      required
                      placeholder="5"
                      autoComplete="off"
                      formNoValidate={false}
                    />
                    {fieldState.invalid && !isSubmitting ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : null}
                    <FieldDescription>
                      This field defines how long an alert condition must remain true before
                      {" "}
                      the alert transitions from a pending state to a firing state. This helps
                      {" "}
                      prevent false positives caused by brief spikes, transient failures, or
                      {" "}
                      temporary metric fluctuations.
                    </FieldDescription>
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Controller
                name="severity"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`${formId}-severity`}>
                      Severity
                    </FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger
                        id={`${formId}-severity`}
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Select severity..." />
                      </SelectTrigger>
                      <SelectContent position="popper" className="py-1">
                        {severities.map(severity => (
                          <span key={severity.value}>
                            <SelectItem value={severity.value}>
                              {severity.label}
                            </SelectItem>
                          </span>
                        ))}
                      </SelectContent>
                    </Select>
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
