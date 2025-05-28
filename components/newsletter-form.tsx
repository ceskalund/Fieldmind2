"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { storeNewsletterEmail } from "@/app/actions/email-actions"
import { isValidEmailFormat } from "@/utils/validation"
import { ArrowRight } from "lucide-react"
import { useAnalytics } from "@/hooks/use-analytics"

export function NewsletterForm() {
  const { trackEvent } = useAnalytics()

  const [email, setEmail] = useState("")
  const [honeypot, setHoneypot] = useState("") // Hidden field to catch bots
  const [emailError, setEmailError] = useState("")
  const [status, setStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({
    type: null,
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitCount, setSubmitCount] = useState(0)
  const [lastSubmitTime, setLastSubmitTime] = useState(0)

  // Reset error when email is changed
  useEffect(() => {
    setEmailError("")
  }, [email])

  const validateEmail = (): boolean => {
    if (!email.trim()) {
      setEmailError("Email is required")
      return false
    }

    if (!isValidEmailFormat(email)) {
      setEmailError("Please enter a valid email address")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Client-side validation
    if (!validateEmail()) {
      trackEvent({
        action: "newsletter_validation_error",
        category: "Newsletter",
        label: emailError,
      })
      return
    }

    // Simple client-side rate limiting
    const now = Date.now()
    if (submitCount >= 2 && now - lastSubmitTime < 5 * 60 * 1000) {
      setStatus({
        type: "error",
        message: "Too many subscription attempts. Please try again later.",
      })

      trackEvent({
        action: "newsletter_rate_limited",
        category: "Newsletter",
      })
      return
    }

    setIsSubmitting(true)
    setStatus({ type: null, message: "" })

    try {
      const result = await storeNewsletterEmail({ email, honeypot })

      if (result.success) {
        setStatus({
          type: "success",
          message: result.message || "Successfully subscribed to newsletter",
        })
        setEmail("")
        setHoneypot("")
        // Update submission tracking
        setSubmitCount((prev) => prev + 1)
        setLastSubmitTime(now)

        // Track successful subscription
        trackEvent({
          action: "newsletter_subscription_success",
          category: "Newsletter",
        })
      } else {
        setStatus({
          type: "error",
          message: result.message || "Failed to subscribe to newsletter",
        })

        // Track subscription error
        trackEvent({
          action: "newsletter_subscription_error",
          category: "Newsletter",
          label: result.message,
        })
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again later.",
      })

      // Track unexpected error
      trackEvent({
        action: "newsletter_subscription_exception",
        category: "Newsletter",
        label: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {status.type && (
        <div
          className={`mb-4 p-3 rounded-md text-sm ${
            status.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
          }`}
        >
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent ${
              emailError ? "border-red-500" : "border-gray-200"
            }`}
            required
            aria-invalid={!!emailError}
            aria-describedby={emailError ? "newsletter-email-error" : undefined}
          />
          {emailError && (
            <p id="newsletter-email-error" className="mt-1 text-sm text-red-600">
              {emailError}
            </p>
          )}
        </div>

        {/* Honeypot field - hidden from real users but bots will fill it */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="newsletter-honeypot">Leave this field empty</label>
          <input
            type="text"
            id="newsletter-honeypot"
            name="honeypot"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 bg-sage-green text-white px-6 py-3 rounded-md hover:bg-sage-green/90 transition-colors whitespace-nowrap disabled:opacity-70"
        >
          <span>{isSubmitting ? "Submitting..." : "Subscribe"}</span>
          {!isSubmitting && <ArrowRight className="h-4 w-4" />}
        </button>
      </form>
    </div>
  )
}
