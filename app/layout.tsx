import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LazyNewsletterPopup, LazyCookieConsent } from "@/components/lazy-components"
import { AnalyticsProvider } from "@/components/analytics-provider"
import Script from "next/script"
import { Suspense } from "react"

// Load Inter with all weights for more flexibility in typography
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
})

// Define site metadata
const siteConfig = {
  name: "Fieldmind",
  url: "https://fieldmind.ai",
  description:
    "AI-powered advisory tools for modern farming. Data-driven insights for agricultural professionals to make faster, confident farming decisions.",
  keywords: [
    "agriculture",
    "farming",
    "AI",
    "artificial intelligence",
    "farm data",
    "agricultural advisory",
    "crop management",
    "farm management",
    "agricultural technology",
    "agtech",
  ],
  authors: [
    { name: "Marte Øverdal", url: "https://www.linkedin.com/in/marte-viktoria-%C3%B8verdal-4b47097a/" },
    { name: "Pierre-Julien Harbonnier", url: "https://www.linkedin.com/in/pierre-julien-harbonnier-30738484/" },
  ],
  creator: "Fieldmind",
  themeColor: "#4A5D23", // sage-green
  socialImage: "/images/fieldmind-social-card.png",
  locale: "en_US",
  type: "website",
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const themeColor = siteConfig.themeColor

export const metadata: Metadata = {
  // Base metadata
  title: {
    default: `${siteConfig.name} - AI-Powered Advisory for Modern Farming`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  publisher: siteConfig.name,

  // Robots directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: siteConfig.themeColor,
      },
    ],
  },

  // Web app manifest
  manifest: "/site.webmanifest",

  // Open Graph
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: `${siteConfig.name} - AI-Powered Advisory for Modern Farming`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.socialImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - AI-Powered Advisory for Modern Farming`,
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - AI-Powered Advisory for Modern Farming`,
    description: siteConfig.description,
    images: [siteConfig.socialImage],
    creator: "@fieldmind",
  },

  // Verification
  verification: {
    google: "google-site-verification-code", // Replace with actual verification code
  },

  // Canonical URL
  alternates: {
    canonical: siteConfig.url,
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans text-charcoal antialiased`}>
        <Suspense fallback={null}>
          <AnalyticsProvider>
            <SiteHeader />
            <div className="pt-24">{children}</div>
            <SiteFooter />

            {/* Lazy load non-critical UI components */}
            <Suspense fallback={null}>
              <LazyNewsletterPopup />
            </Suspense>

            <Suspense fallback={null}>
              <LazyCookieConsent />
            </Suspense>
          </AnalyticsProvider>
        </Suspense>

        {/* JSON-LD Structured Data */}
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Fieldmind",
              url: "https://fieldmind.ai",
              logo: "https://fieldmind.ai/logo.png",
              sameAs: [
                "https://twitter.com/fieldmind",
                "https://www.linkedin.com/company/fieldmind",
                "https://www.facebook.com/fieldmind",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+47-123-45-678",
                contactType: "customer service",
                email: "info@fieldmind.com",
                areaServed: "NO",
                availableLanguage: ["English", "Norwegian"],
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "Gaustadalléen 21",
                addressLocality: "Oslo",
                postalCode: "0349",
                addressCountry: "NO",
              },
              description:
                "AI-powered advisory tools for modern farming. Data-driven insights for agricultural professionals to make faster, confident farming decisions.",
            }),
          }}
        />
      </body>
    </html>
  )
}
