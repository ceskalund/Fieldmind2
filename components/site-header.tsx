"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, ArrowRight } from "lucide-react"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4 md:py-6">
          {/* Logo Section */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/Fieldmind Logo.png"
              alt="Fieldmind - AI-Powered Advisory for Modern Farming"
              width={207}
              height={52}
              className="h-auto w-auto max-h-12 sm:max-h-14 md:max-h-16"
              priority={true}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-10">
            <Link href="/about" className="text-charcoal hover:text-sage-green transition-colors">
              About
            </Link>
            <Link href="/team" className="text-charcoal hover:text-sage-green transition-colors">
              Team
            </Link>
            <Link href="/contact" className="text-charcoal hover:text-sage-green transition-colors">
              Contact
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-sage-green text-white px-4 sm:px-5 py-2 rounded-md hover:bg-sage-green/90 transition-colors"
            >
              <span>Get Early Access</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-charcoal p-2.5" // Increased touch target
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-3 space-y-3 flex flex-col"> {/* Adjusted spacing */}
            <Link
              href="/about"
              className="text-lg py-3 text-charcoal hover:text-sage-green transition-colors" // Increased touch target
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/team"
              className="text-lg py-3 text-charcoal hover:text-sage-green transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Team
            </Link>
            <Link
              href="/contact"
              className="text-lg py-3 text-charcoal hover:text-sage-green transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-sage-green text-white px-5 py-3.5 rounded-md hover:bg-sage-green/90 transition-colors w-full mt-2" // Increased touch target and spacing
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Get Early Access</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}