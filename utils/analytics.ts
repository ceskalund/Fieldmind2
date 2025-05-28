// Types for analytics consent and events
export type ConsentStatus = "granted" | "denied" | "pending"

export type AnalyticsEvent = {
  action: string
  category?: string
  label?: string
  value?: number
  nonInteraction?: boolean
  [key: string]: any
}

// GA4 Measurement ID - replace with your actual GA4 ID
const GA_MEASUREMENT_ID = "G-0C759QL62N"

// Initialize analytics based on stored consent
export function initializeAnalytics(): void {
  const consentStatus = getAnalyticsConsent()

  if (consentStatus === "granted") {
    loadGoogleAnalytics()
  }
}

// Load the GA4 script
function loadGoogleAnalytics(): void {
  // Check if script is already loaded
  if (document.querySelector(`script[src*="${GA_MEASUREMENT_ID}"]`)) {
    return
  }

  // Create script elements for GA4
  const gtagScript = document.createElement("script")
  gtagScript.async = true
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`

  const dataLayerScript = document.createElement("script")
  dataLayerScript.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}', {
      page_path: window.location.pathname,
      cookie_flags: 'SameSite=None;Secure',
      anonymize_ip: true
    });
  `

  // Append scripts to document
  document.head.appendChild(gtagScript)
  document.head.appendChild(dataLayerScript)

  console.log("Google Analytics initialized")
}

// Remove GA scripts and cookies
export function unloadGoogleAnalytics(): void {
  // Remove scripts
  const scripts = document.querySelectorAll(`script[src*="googletagmanager.com"]`)
  scripts.forEach((script) => script.remove())

  // Remove inline scripts that might contain gtag
  const inlineScripts = document.querySelectorAll("script:not([src])")
  inlineScripts.forEach((script) => {
    if (script.innerHTML.includes("gtag") || script.innerHTML.includes("dataLayer")) {
      script.remove()
    }
  })

  // Remove GA cookies
  removeCookiesByPrefix("_ga")

  console.log("Google Analytics unloaded")
}

// Helper to remove cookies by prefix
function removeCookiesByPrefix(prefix: string): void {
  const cookies = document.cookie.split(";")

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim()
    if (cookie.indexOf(prefix) === 0) {
      const name = cookie.split("=")[0]
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}; SameSite=None; Secure`
    }
  }
}

// Get current analytics consent status from localStorage
export function getAnalyticsConsent(): ConsentStatus {
  try {
    const storedConsent = localStorage.getItem("fieldmind_cookie_consent")
    if (!storedConsent) return "pending"

    const consent = JSON.parse(storedConsent)
    return consent.analytics ? "granted" : "denied"
  } catch (error) {
    console.error("Error getting analytics consent:", error)
    return "pending"
  }
}

// Update analytics based on new consent status
export function updateAnalyticsConsent(status: ConsentStatus): void {
  if (status === "granted") {
    loadGoogleAnalytics()
  } else if (status === "denied") {
    unloadGoogleAnalytics()
  }
}

// Track a page view
export function trackPageView(path?: string): void {
  if (getAnalyticsConsent() !== "granted") return

  const pagePath = path || window.location.pathname

  if (typeof window.gtag !== "undefined") {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: pagePath,
    })
    console.log(`Page view tracked: ${pagePath}`)
  }
}

// Track a custom event
export function trackEvent(event: AnalyticsEvent): void {
  if (getAnalyticsConsent() !== "granted") return

  if (typeof window.gtag !== "undefined") {
    window.gtag("event", event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      non_interaction: event.nonInteraction,
      ...event,
    })
    console.log(`Event tracked: ${event.action}`)
  }
}

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void
    dataLayer: any[]
  }
}
