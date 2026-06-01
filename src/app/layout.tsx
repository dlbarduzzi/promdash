import type { ReactNode } from "react"
import type { Metadata, Viewport } from "next"

import { Geist, Geist_Mono } from "next/font/google"

import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/config"

import { ScreenSize } from "@/components/screen-size"
import { TRPCReactProvider } from "@/trpc/client/base"

import "@/styles/globals.css"

const fontGeistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const fontGeistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-16x16.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className="antialiased"
      suppressHydrationWarning
    >
      <head />
      <body
        className={cn(
          "font-sans text-base bg-white text-neutral-900",
          "selection:bg-yellow-200 selection:text-neutral-900",
          fontGeistSans.variable,
          fontGeistMono.variable,
        )}
      >
        <TRPCReactProvider>
          {children}
          <ScreenSize />
        </TRPCReactProvider>
      </body>
    </html>
  )
}
