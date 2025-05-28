import type { Metadata, Viewport } from "next"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const themeColor = "#4A5D23"

export const metadata: Metadata = {
  title: "Contact Fieldmind - Get in Touch",
  description:
    "Contact the Fieldmind team to learn more about our AI-powered agricultural advisory tools or to request a demo.",
  openGraph: {
    title: "Contact Fieldmind - Get in Touch",
    description:
      "Contact the Fieldmind team to learn more about our AI-powered agricultural advisory tools or to request a demo.",
    url: "https://fieldmind.ai/contact",
    type: "website",
  },
}
