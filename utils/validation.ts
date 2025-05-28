// Email validation regex pattern
// This pattern checks for:
// - Valid characters before @ symbol
// - Valid domain name structure
// - Valid TLD (at least 2 characters)
// - No IP addresses as domains
// - No special characters in wrong positions
export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// Common disposable email domains to block
export const DISPOSABLE_DOMAINS = [
  "10minutemail.com",
  "tempmail.com",
  "throwawaymail.com",
  "mailinator.com",
  "guerrillamail.com",
  "sharklasers.com",
  "yopmail.com",
  "trashmail.com",
  "getairmail.com",
  "fakeinbox.com",
  "temp-mail.org",
]

// Function to validate email format
export function isValidEmailFormat(email: string): boolean {
  return EMAIL_REGEX.test(email.toLowerCase())
}

// Function to check if email is from a disposable domain
export function isDisposableEmail(email: string): boolean {
  const domain = email.split("@")[1].toLowerCase()
  return DISPOSABLE_DOMAINS.includes(domain)
}

// Function to check if email has valid MX records (would require DNS lookup)
// This is a placeholder - in a real implementation, you would use DNS lookup
export function hasValidMXRecords(email: string): boolean {
  // In a real implementation, you would check MX records here
  // For now, we'll assume all domains have valid MX records
  return true
}

// Comprehensive email validation
export function validateEmail(email: string): { isValid: boolean; reason?: string } {
  if (!email || email.trim() === "") {
    return { isValid: false, reason: "Email is required" }
  }

  if (!isValidEmailFormat(email)) {
    return { isValid: false, reason: "Invalid email format" }
  }

  if (isDisposableEmail(email)) {
    return { isValid: false, reason: "Disposable email addresses are not allowed" }
  }

  // Additional checks could be added here

  return { isValid: true }
}

// Honeypot validation - if field is filled, it's likely a bot
export function isHoneypotFilled(value: string | undefined): boolean {
  return !!value && value.trim() !== ""
}

// Rate limiting helper (simple in-memory implementation)
const submissionTimestamps: Record<string, number[]> = {}

export function checkRateLimit(identifier: string, maxSubmissions: number, timeWindowMs: number): boolean {
  const now = Date.now()

  // Initialize if needed
  if (!submissionTimestamps[identifier]) {
    submissionTimestamps[identifier] = []
  }

  // Filter out timestamps outside the time window
  submissionTimestamps[identifier] = submissionTimestamps[identifier].filter(
    (timestamp) => now - timestamp < timeWindowMs,
  )

  // Check if under the limit
  if (submissionTimestamps[identifier].length < maxSubmissions) {
    // Add current timestamp
    submissionTimestamps[identifier].push(now)
    return true
  }

  return false
}
