import Script from "next/script"

export function AboutStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Fieldmind - Our Mission and Story",
    description:
      "Learn about Fieldmind's mission to transform agricultural advisory with AI-powered insights tailored to each farm's unique conditions.",
    url: "https://fieldmind.ai/about",
    mainEntity: {
      "@type": "Organization",
      name: "Fieldmind",
      foundingDate: "2022",
      foundingLocation: {
        "@type": "Place",
        name: "Oslo, Norway",
      },
      description:
        "AI-powered advisory tools for modern farming. Data-driven insights for agricultural professionals to make faster, confident farming decisions.",
    },
  }

  return (
    <Script
      id="about-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
