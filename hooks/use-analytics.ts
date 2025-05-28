"use client"

import { trackEvent, trackPageView } from "@/utils/analytics"

export function useAnalytics() {
  return {
    trackEvent,
    trackPageView,
  }
}
