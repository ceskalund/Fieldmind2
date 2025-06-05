// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Rate limiting cache
const rateLimitCache = new Map<string, { count: number; timestamp: number }>();

/**
 * Validates an email address format
 */
export function isValidEmailFormat(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

/**
 * Validates an email address and returns detailed validation result
 */
export function validateEmail(email: string): { isValid: boolean; reason?: string } {
  if (!email.trim()) {
    return { isValid: false, reason: 'Email is required' };
  }

  if (!isValidEmailFormat(email)) {
    return { isValid: false, reason: 'Please enter a valid email address' };
  }

  return { isValid: true };
}

/**
 * Checks if a honeypot field has been filled (indicating bot activity)
 */
export function isHoneypotFilled(value?: string): boolean {
  return Boolean(value && value.trim().length > 0);
}

/**
 * Implements rate limiting for form submissions
 * @param identifier - Unique identifier for the rate limit (e.g., IP address or user ID)
 * @param maxAttempts - Maximum number of attempts allowed
 * @param windowMs - Time window in milliseconds
 */
export function checkRateLimit(identifier: string, maxAttempts: number, windowMs: number): boolean {
  const now = Date.now();
  const record = rateLimitCache.get(identifier);

  if (!record) {
    rateLimitCache.set(identifier, { count: 1, timestamp: now });
    return true;
  }

  // Reset if window has passed
  if (now - record.timestamp > windowMs) {
    rateLimitCache.set(identifier, { count: 1, timestamp: now });
    return true;
  }

  // Check if under limit
  if (record.count < maxAttempts) {
    record.count++;
    return true;
  }

  return false;
}

/**
 * Cleans up old rate limit records
 * Should be called periodically to prevent memory leaks
 */
export function cleanupRateLimits(windowMs: number): void {
  const now = Date.now();
  for (const [key, value] of rateLimitCache.entries()) {
    if (now - value.timestamp > windowMs) {
      rateLimitCache.delete(key);
    }
  }
}

// Run cleanup every 5 minutes
setInterval(() => cleanupRateLimits(5 * 60 * 1000), 5 * 60 * 1000);

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
