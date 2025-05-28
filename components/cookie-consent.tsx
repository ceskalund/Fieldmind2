"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { updateAnalyticsConsent } from "@/utils/analytics"

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)

  const [consent, setConsent] = useState({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    preferences: false,
  })

  useEffect(() => {
    // Check if user has already provided consent
    const storedConsent = localStorage.getItem("fieldmind_cookie_consent")

    if (!storedConsent) {
      // If no consent is stored, show the banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)

      return () => clearTimeout(timer)
    }

    // If consent exists, parse it
    try {
      const parsedConsent = JSON.parse(storedConsent)
      setConsent(parsedConsent)
    } catch (error) {
      console.error("Error parsing stored consent:", error)
      setIsVisible(true)
    }
  }, [])

  const handleAcceptAll = () => {
    const fullConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    }

    setConsent(fullConsent)
    localStorage.setItem("fieldmind_cookie_consent", JSON.stringify(fullConsent))
    setIsVisible(false)

    // Update analytics consent
    updateAnalyticsConsent("granted")
  }

  const handleSavePreferences = () => {
    localStorage.setItem("fieldmind_cookie_consent", JSON.stringify(consent))
    setIsVisible(false)
    setShowPreferences(false)

    // Update analytics consent based on user choice
    updateAnalyticsConsent(consent.analytics ? "granted" : "denied")
  }

  const handleToggleConsent = (type: keyof typeof consent) => {
    if (type === "necessary") return // Cannot toggle necessary cookies

    setConsent((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {!showPreferences ? (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-2">We Value Your Privacy</h3>
              <p className="text-gray-600 text-sm md:text-base">
                We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our
                traffic. By clicking "Accept All", you consent to our use of cookies.
                <Link href="/privacy" className="text-sage-green hover:underline ml-1">
                  Read Our Privacy Policy
                </Link>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
              <button
                onClick={() => setShowPreferences(true)}
                className="px-4 py-2 border border-gray-300 rounded-md text-charcoal hover:bg-gray-50 transition-colors"
              >
                Cookie Settings
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 bg-sage-green text-white rounded-md hover:bg-sage-green/90 transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Cookie Preferences</h3>
              <button onClick={() => setShowPreferences(false)} className="text-gray-500 hover:text-gray-700">
                Back
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <div className="flex items-center h-5 mt-1">
                  <input
                    id="necessary"
                    type="checkbox"
                    checked={consent.necessary}
                    disabled
                    className="h-4 w-4 border-gray-300 rounded text-sage-green focus:ring-sage-green"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="necessary" className="font-medium text-charcoal">
                    Necessary Cookies
                  </label>
                  <p className="text-sm text-gray-500">
                    These cookies are essential for the website to function properly.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5 mt-1">
                  <input
                    id="analytics"
                    type="checkbox"
                    checked={consent.analytics}
                    onChange={() => handleToggleConsent("analytics")}
                    className="h-4 w-4 border-gray-300 rounded text-sage-green focus:ring-sage-green"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="analytics" className="font-medium text-charcoal">
                    Analytics Cookies
                  </label>
                  <p className="text-sm text-gray-500">
                    These cookies help us understand how visitors interact with our website through Google Analytics. We
                    anonymize IP addresses and do not share your personal data with third parties.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5 mt-1">
                  <input
                    id="marketing"
                    type="checkbox"
                    checked={consent.marketing}
                    onChange={() => handleToggleConsent("marketing")}
                    className="h-4 w-4 border-gray-300 rounded text-sage-green focus:ring-sage-green"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="marketing" className="font-medium text-charcoal">
                    Marketing Cookies
                  </label>
                  <p className="text-sm text-gray-500">
                    These cookies are used to track visitors across websites to display relevant advertisements.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5 mt-1">
                  <input
                    id="preferences"
                    type="checkbox"
                    checked={consent.preferences}
                    onChange={() => handleToggleConsent("preferences")}
                    className="h-4 w-4 border-gray-300 rounded text-sage-green focus:ring-sage-green"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="preferences" className="font-medium text-charcoal">
                    Preferences Cookies
                  </label>
                  <p className="text-sm text-gray-500">
                    These cookies allow the website to remember choices you make and provide enhanced functionality.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSavePreferences}
                className="px-4 py-2 bg-sage-green text-white rounded-md hover:bg-sage-green/90 transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
