"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { initializeAnalytics, trackPageView } from "@/utils/analytics"

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Initialize analytics on first load
  useEffect(() => {
    initializeAnalytics()
  }, [])

  // Track page views when route changes
  useEffect(() => {
    if (pathname) {
      // Include search params if they exist
      const queryString = searchParams?.toString()
      const path = queryString ? `${pathname}?${queryString}` : pathname

      // Track the page view
      trackPageView(path)
    }
  }, [pathname, searchParams])

  return <>{children}</>
}
