import type { ComponentProps } from "react"

import Image from "next/image"

import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/config"

export function AppLogo({
  variant = "full",
  className,
}: ComponentProps<"div"> & { variant?: "icon" | "name" | "full" }) {
  if (variant === "icon") {
    return (
      <div className={cn("size-8", className)}>
        <AppLogoIcon />
      </div>
    )
  }

  if (variant === "name") {
    return (
      <div className={cn("w-31 h-auto", className)}>
        <AppLogoName />
      </div>
    )
  }

  return (
    <div className={cn("w-42 h-auto", className)}>
      <AppLogoFull />
    </div>
  )
}

function AppLogoFull() {
  return (
    <Image
      src="/images/logo-full-dark.png"
      alt={siteConfig.name}
      width={500}
      height={500}
      loading="eager"
    />
  )
}

function AppLogoIcon() {
  return (
    <Image
      src="/images/logo-icon-dark.png"
      alt={siteConfig.name}
      width={500}
      height={500}
      loading="eager"
    />
  )
}

function AppLogoName() {
  return (
    <Image
      src="/images/logo-name-dark.png"
      alt={siteConfig.name}
      width={500}
      height={500}
      loading="eager"
    />
  )
}
