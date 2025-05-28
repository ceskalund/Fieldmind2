"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { submitContactForm } from "../actions/email-actions"
import { LazyNewsletterForm } from "@/components/lazy-components"
import { isValidEmailFormat } from "@/utils/validation"
import { ArrowRight } from "lucide-react"
import { ContactStructuredData } from "@/components/contact-structured-data"
import { useAnalytics } from "@/hooks/use-analytics"

export default function ContactPage() {
  const { trackEvent } = useAnalytics()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    newsletter: false,
    honeypot: "", // Hidden field to catch bots
  })

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({
    type: null,
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitCount, setSubmitCount] = useState(0)
  const [lastSubmitTime, setLastSubmitTime] = useState(0)

  // Reset error when field is changed
  useEffect(() => {
    setFormErrors({
      name: "",
      email: "",
      message: "",
    })
  }, [formData.name, formData.email, formData.message])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const validateForm = (): boolean => {
    let isValid = true
    const newErrors = {
      name: "",
      email: "",
      message: "",
    }

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
      isValid = false
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters"
      isValid = false
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!isValidEmailFormat(formData.email)) {
      newErrors.email = "Please enter a valid email address"
      isValid = false
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
      isValid = false
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters"
      isValid = false
    }

    setFormErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Client-side validation
    if (!validateForm()) {
      trackEvent({
        action: "form_validation_error",
        category: "Contact",
        label: Object.keys(formErrors)
          .filter((key) => !!formErrors[key as keyof typeof formErrors])
          .join(","),
      })
      return
    }

    // Simple client-side rate limiting
    const now = Date.now()
    if (submitCount >= 3 && now - lastSubmitTime < 10 * 60 * 1000) {
      setFormStatus({
        type: "error",
        message: "Too many submissions. Please try again later.",
      })

      trackEvent({
        action: "form_rate_limited",
        category: "Contact",
      })
      return
    }

    setIsSubmitting(true)
    setFormStatus({ type: null, message: "" })

    try {
      const result = await submitContactForm(formData)

      if (result.success) {
        setFormStatus({
          type: "success",
          message: result.message ?? "",
        })
        // Reset form on success
        setFormData({
          name: "",
          email: "",
          company: "",
          message: "",
          newsletter: false,
          honeypot: "",
        })
        // Update submission tracking
        setSubmitCount((prev) => prev + 1)
        setLastSubmitTime(now)

        // Track successful submission
        trackEvent({
          action: "form_submission_success",
          category: "Contact",
          label: formData.newsletter ? "with_newsletter" : "without_newsletter",
        })
      } else {
        setFormStatus({
          type: "error",
          message: result.message ?? "",
        })

        // Track submission error
        trackEvent({
          action: "form_submission_error",
          category: "Contact",
          label: result.message,
        })
      }
    } catch (error) {
      setFormStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again later.",
      })

      // Track unexpected error
      trackEvent({
        action: "form_submission_exception",
        category: "Contact",
        label: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <ContactStructuredData />
      <main>
        {/* Hero Section */}
        <section className="massive-spacing text-center px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="hero-text mb-8">Get in Touch</h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-light">
              Interested in Fieldmind? We'd love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="section-spacing bg-light-gray px-6 md:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm">
              {formStatus.type && (
                <div
                  className={`mb-6 p-4 rounded-md ${
                    formStatus.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                  }`}
                >
                  {formStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent ${
                      formErrors.name ? "border-red-500" : "border-gray-200"
                    }`}
                    aria-invalid={!!formErrors.name}
                    aria-describedby={formErrors.name ? "name-error" : undefined}
                  />
                  {formErrors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-600">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent ${
                      formErrors.email ? "border-red-500" : "border-gray-200"
                    }`}
                    aria-invalid={!!formErrors.email}
                    aria-describedby={formErrors.email ? "email-error" : undefined}
                  />
                  {formErrors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-charcoal mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent ${
                      formErrors.message ? "border-red-500" : "border-gray-200"
                    }`}
                    aria-invalid={!!formErrors.message}
                    aria-describedby={formErrors.message ? "message-error" : undefined}
                  ></textarea>
                  {formErrors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-600">
                      {formErrors.message}
                    </p>
                  )}
                </div>

                {/* Honeypot field - hidden from real users but bots will fill it */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="honeypot">Leave this field empty</label>
                  <input
                    type="text"
                    id="honeypot"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleCheckboxChange}
                    className="mt-1 mr-3"
                  />
                  <label htmlFor="newsletter" className="text-sm text-gray-600">
                    Subscribe to our newsletter for updates on our product and agricultural AI insights
                  </label>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-sage-green text-white px-8 py-3 rounded-md hover:bg-sage-green/90 transition-colors disabled:opacity-70"
                  >
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                    {!isSubmitting && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="section-spacing px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-8">Stay Updated</h2>
            <p className="text-lg text-gray-600 mb-12">
              Subscribe to our newsletter for the latest updates on Fieldmind and insights on AI in agriculture.
            </p>
            <div className="bg-light-gray p-8 rounded-lg">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <Suspense
                  fallback={
                    <div className="h-20 flex items-center justify-center">
                      <div className="w-8 h-8 border-4 border-sage-green/20 border-t-sage-green rounded-full animate-spin"></div>
                    </div>
                  }
                >
                  <LazyNewsletterForm />
                </Suspense>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
