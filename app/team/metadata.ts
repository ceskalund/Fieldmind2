import type { Metadata, Viewport } from "next"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const themeColor = "#4A5D23"

export const metadata: Metadata = {
  title: "Our Team - The Minds Behind Fieldmind",
  description:
    "Meet the team behind Fieldmind - agricultural experts and technology innovators working to transform farm advisory with AI.",
  openGraph: {
    title: "Our Team - The Minds Behind Fieldmind",
    description:
      "Meet the team behind Fieldmind - agricultural experts and technology innovators working to transform farm advisory with AI.",
    url: "https://fieldmind.ai/team",
    type: "website",
  },
}
