import type { Metadata, Viewport } from "next"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const themeColor = "#4A5D23"

export const metadata: Metadata = {
  title: "About Fieldmind - Our Mission and Story",
  description:
    "Learn about Fieldmind's mission to transform agricultural advisory with AI-powered insights tailored to each farm's unique conditions.",
  openGraph: {
    title: "About Fieldmind - Our Mission and Story",
    description:
      "Learn about Fieldmind's mission to transform agricultural advisory with AI-powered insights tailored to each farm's unique conditions.",
    url: "https://fieldmind.ai/about",
    type: "website",
  },
}
