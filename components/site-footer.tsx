"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { CookieConsent } from "./cookie-consent"

export function SiteFooter() {
  const [showCookieSettings, setShowCookieSettings] = useState(false)
  
  const handleShowCookieSettings = () => {
    localStorage.removeItem("fieldmind_cookie_consent")
    setShowCookieSettings(true)
    window.location.reload()
  }
  
  return (
    <footer className="bg-[#354e41] py-12 sm:py-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {/* Company Info */}
          <div className="space-y-4 sm:space-y-6">
            {/* Logo Section */}
            <Link href="/" className="inline-block">
              <Image
                src="/Images/Fieldmind Logo.png"
                alt="Fieldmind - AI-Powered Advisory for Modern Farming"
                width={207}
                height={52}
                className="h-auto w-auto max-h-12 sm:max-h-14 md:max-h-16"  // More granular responsive sizing
                priority={false}
              />
            </Link>
            
            <address className="not-italic text-gray-200 text-sm sm:text-base">
              Forskningsparken – Oslo Science Park<br />
              Gaustadalléen 21<br />
              0349 Oslo, Norway
            </address>
            
            <a
              href="https://linkedin.com/company/fieldmind"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-gray-200 hover:text-white transition-colors p-2" // Added padding for better touch target
              aria-label="Visit Fieldmind on LinkedIn"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
          
          {/* Navigation Links */}
          <div className="flex flex-col space-y-3 sm:space-y-4">
            <h3 className="font-medium text-white text-lg sm:text-xl">Navigation</h3>
            <Link href="/about" className="text-gray-200 hover:text-white transition-colors py-2"> {/* Added padding for better touch target */}
              About
            </Link>
            <Link href="/contact" className="text-gray-200 hover:text-white transition-colors py-2">
              Contact
            </Link>
            <Link href="/privacy" className="text-gray-200 hover:text-white transition-colors py-2">
              Privacy
            </Link>
            <button
              onClick={handleShowCookieSettings}
              className="text-left text-gray-200 hover:text-white transition-colors cursor-pointer py-2"
            >
              Cookie Settings
            </button>
          </div>
          
          {/* Legal */}
          <div className="flex flex-col space-y-3 sm:space-y-4">
            <h3 className="font-medium text-white text-lg sm:text-xl">Legal</h3>
            <Link href="/privacy" className="text-gray-200 hover:text-white transition-colors py-2">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-200 hover:text-white transition-colors py-2">
              Terms of Service
            </Link>
          </div>
        </div>
        
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-700 text-center text-gray-300 text-sm sm:text-base">
          © {new Date().getFullYear()} Fieldmind. All rights reserved.
        </div>
      </div>
      
      {showCookieSettings && <CookieConsent />}
    </footer>
  )
}