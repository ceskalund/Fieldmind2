import Script from "next/script"

export function HomeStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Fieldmind - AI-Powered Advisory for Modern Farming",
    description:
      "Data-driven insights for agricultural professionals. Real-time recommendations for better farm decisions.",
    url: "https://fieldmind.ai",
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Fieldmind",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/ComingSoon",
      },
      description:
        "AI-powered advisory tools for modern farming. Data-driven insights for agricultural professionals to make faster, confident farming decisions.",
    },
  }

  return (
    <Script
      id="home-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
