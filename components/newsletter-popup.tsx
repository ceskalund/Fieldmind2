"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, ArrowRight } from "lucide-react"
import { storeNewsletterEmail } from "@/app/actions/email-actions"
import { isValidEmailFormat } from "@/utils/validation"

export function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [honeypot, setHoneypot] = useState("") // Hidden field to catch bots
  const [emailError, setEmailError] = useState("")
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [hasClosedPopup, setHasClosedPopup] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [submitCount, setSubmitCount] = useState(0)
  const [lastSubmitTime, setLastSubmitTime] = useState(0)

  useEffect(() => {
    // Check if user has already closed the popup or submitted the form in this session
    const hasInteracted = sessionStorage.getItem("fieldmind_popup_interacted")
    if (hasInteracted) return

    // Set a timer to show the popup after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 5000)

    // Add scroll event listener to show popup on scroll
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
        window.removeEventListener("scroll", handleScroll)
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Cleanup
    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Reset error when email is changed
  useEffect(() => {
    setEmailError("")
    setErrorMessage("")
  }, [email])

  const handleClose = () => {
    setIsVisible(false)
    setHasClosedPopup(true)
    sessionStorage.setItem("fieldmind_popup_interacted", "true")
  }

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
      return
    }

    // Simple client-side rate limiting
    const now = Date.now()
    if (submitCount >= 2 && now - lastSubmitTime < 5 * 60 * 1000) {
      setErrorMessage("Too many subscription attempts. Please try again later.")
      return
    }

    setIsSubmitting(true)
    setErrorMessage("")

    try {
      const result = await storeNewsletterEmail({ email, honeypot })

      if (result.success) {
        setHasSubmitted(true)
        sessionStorage.setItem("fieldmind_popup_interacted", "true")
        // Update submission tracking
        setSubmitCount((prev) => prev + 1)
        setLastSubmitTime(now)
        // Keep the success message visible for 3 seconds before closing
        setTimeout(() => {
          setIsVisible(false)
        }, 3000)
      } else {
        setErrorMessage(result.message || "Failed to subscribe to newsletter")
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full relative overflow-hidden">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-2 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close popup"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-5 sm:p-8">
          {!hasSubmitted ? (
            <>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-charcoal">
                Get Early Access to FieldMind, Join Our Newsletter!
              </h2>
              <p className="text-gray-600 mb-4 sm:mb-6 text-base">
                Help us build AI advisory tools that actually work for real farms. Join advisors testing AI that
                understands each farm's unique conditions. We'll only email you with major updates and early access
                opportunities.
              </p>
              {errorMessage && <div className="mb-4 p-3 bg-red-50 text-red-800 rounded-md text-sm">{errorMessage}</div>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent ${
                      emailError ? "border-red-500" : "border-gray-200"
                    }`}
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? "popup-email-error" : undefined}
                  />
                  {emailError && (
                    <p id="popup-email-error" className="mt-1 text-sm text-red-600">
                      {emailError}
                    </p>
                  )}
                </div>

                {/* Honeypot field - hidden from real users but bots will fill it */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="popup-honeypot">Leave this field empty</label>
                  <input
                    type="text"
                    id="popup-honeypot"
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
                  className="w-full inline-flex items-center justify-center gap-2 bg-sage-green text-white px-4 py-3 rounded-md hover:bg-sage-green/90 transition-colors disabled:opacity-70"
                >
                  <span>{isSubmitting ? "Submitting..." : "Get Early Access"}</span>
                  {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-sage-green">Thank You!</h2>
              <p className="text-gray-600">
                We've received your email. We'll be in touch with updates and early access information.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
