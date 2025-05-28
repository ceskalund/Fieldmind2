import type React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface CTAButtonProps {
  href: string
  children: React.ReactNode
  className?: string
  variant?: "primary" | "outline"
  showArrow?: boolean
  size?: "default" | "small" | "large"
}

export function CTAButton({
  href,
  children,
  className = "",
  variant = "primary",
  showArrow = true,
  size = "default",
}: CTAButtonProps) {
  const baseClasses = variant === "primary" ? "btn-modern-primary" : "btn-modern"
  const arrowClasses = showArrow ? "btn-arrow" : ""

  // Size classes for better mobile adaptability
  const sizeClasses = {
    small: "text-sm px-3 py-2 sm:px-4",
    default: "text-base px-4 py-2 sm:px-6 sm:py-3",
    large: "text-lg px-5 py-3 sm:px-8 sm:py-4",
  }

  return (
    <Link href={href} className={`${baseClasses} ${arrowClasses} ${sizeClasses[size]} ${className}`}>
      <span className="break-words">{children}</span>
      {showArrow && <ArrowRight className="h-4 w-4 flex-shrink-0" />}
    </Link>
  )
}
