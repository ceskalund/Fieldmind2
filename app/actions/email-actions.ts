"use server"

import { validateEmail, isHoneypotFilled, checkRateLimit } from "@/utils/validation"

// Type for newsletter signup
type NewsletterSignup = {
  email: string
  honeypot?: string
}

// Function to store newsletter signup
export async function storeNewsletterEmail(data: NewsletterSignup) {
  try {
    // Check honeypot field
    if (isHoneypotFilled(data.honeypot)) {
      console.log("Bot submission detected and blocked")
      return { success: true, message: "Thank you for subscribing to our newsletter!" }
    }

    // Rate limiting - allow 2 submissions per IP in 5 minutes
    const identifier = "newsletter_user_identifier"
    if (!checkRateLimit(identifier, 2, 5 * 60 * 1000)) {
      return {
        success: false,
        message: "Too many subscription attempts. Please try again later.",
      }
    }

    // Validate email
    const emailValidation = validateEmail(data.email)
    if (!emailValidation.isValid) {
      return { success: false, message: emailValidation.reason }
    }

    // Call our Mailchimp API route
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/Newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: data.email }),
    })

    const result = await response.json()

    if (response.ok) {
      return { 
        success: true, 
        message: result.message || "Thank you for subscribing to our newsletter!" 
      }
    } else {
      console.error('Mailchimp API error:', result)
      return { 
        success: false, 
        message: result.error || "Failed to subscribe. Please try again later." 
      }
    }

  } catch (error) {
    console.error("Error storing newsletter email:", error)
    return { 
      success: false, 
      message: "Failed to subscribe. Please try again later." 
    }
  }
}