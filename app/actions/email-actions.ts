"use server"

import nodemailer from "nodemailer"
import { validateEmail, isHoneypotFilled, checkRateLimit } from "@/utils/validation"

// Email configuration
const RECIPIENT_EMAIL = "marte@fieldmind.ai"

// Configure nodemailer with SMTP settings
// Note: In production, you should use environment variables for these settings
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Replace with your SMTP host
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "your-email@gmail.com", // Replace with your email
    pass: "your-app-password", // Replace with your app password
  },
})

// Type for contact form data
type ContactFormData = {
  name: string
  email: string
  company?: string
  message: string
  newsletter: boolean
  honeypot?: string // Hidden field to catch bots
}

// Type for newsletter signup
type NewsletterSignup = {
  email: string
  honeypot?: string // Hidden field to catch bots
}

// Function to send contact form submission
export async function submitContactForm(formData: ContactFormData) {
  try {
    // Check honeypot field
    if (isHoneypotFilled(formData.honeypot)) {
      // Silently reject bot submissions but return success to avoid alerting bots
      console.log("Bot submission detected and blocked")
      return { success: true, message: "Your message has been sent successfully!" }
    }

    // Rate limiting - allow 3 submissions per IP in 10 minutes
    // In a real implementation, you would use the user's IP address
    const identifier = "contact_form_user_identifier"
    if (!checkRateLimit(identifier, 3, 10 * 60 * 1000)) {
      return {
        success: false,
        message: "Too many submissions. Please try again later.",
      }
    }

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return { success: false, message: "Please fill in all required fields." }
    }

    // Validate email
    const emailValidation = validateEmail(formData.email)
    if (!emailValidation.isValid) {
      return { success: false, message: emailValidation.reason }
    }

    // Validate message length
    if (formData.message.length < 10) {
      return { success: false, message: "Please provide a more detailed message." }
    }

    // Prepare email content
    const mailOptions = {
      from: `"Fieldmind Website" <${transporter.options.auth.user}>`,
      to: RECIPIENT_EMAIL,
      subject: `New Contact Form Submission from ${formData.name}`,
      text: `
        Name: ${formData.name}
        Email: ${formData.email}
        Company: ${formData.company || "Not provided"}
        Message: ${formData.message}
        Newsletter Signup: ${formData.newsletter ? "Yes" : "No"}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Company:</strong> ${formData.company || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message.replace(/\n/g, "<br>")}</p>
        <p><strong>Newsletter Signup:</strong> ${formData.newsletter ? "Yes" : "No"}</p>
      `,
    }

    // Send the email
    await transporter.sendMail(mailOptions)

    // If user opted in for newsletter, store their email for newsletter too
    if (formData.newsletter) {
      await storeNewsletterEmail({ email: formData.email })
    }

    return { success: true, message: "Your message has been sent successfully!" }
  } catch (error) {
    console.error("Error sending contact form:", error)
    return { success: false, message: "Failed to send your message. Please try again later." }
  }
}

// Function to store newsletter signup
export async function storeNewsletterEmail(data: NewsletterSignup) {
  try {
    // Check honeypot field
    if (isHoneypotFilled(data.honeypot)) {
      // Silently reject bot submissions but return success to avoid alerting bots
      console.log("Bot submission detected and blocked")
      return { success: true, message: "Thank you for subscribing to our newsletter!" }
    }

    // Rate limiting - allow 2 submissions per IP in 5 minutes
    // In a real implementation, you would use the user's IP address
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

    // Prepare email content
    const mailOptions = {
      from: `"Fieldmind Website" <${transporter.options.auth.user}>`,
      to: RECIPIENT_EMAIL,
      subject: "New Newsletter Signup",
      text: `
        Email: ${data.email}
        Source: Newsletter Popup
        Date: ${new Date().toISOString()}
      `,
      html: `
        <h2>New Newsletter Signup</h2>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Source:</strong> Newsletter Popup</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      `,
    }

    // Send the email
    await transporter.sendMail(mailOptions)

    return { success: true, message: "Thank you for subscribing to our newsletter!" }
  } catch (error) {
    console.error("Error storing newsletter email:", error)
    return { success: false, message: "Failed to subscribe. Please try again later." }
  }
}
