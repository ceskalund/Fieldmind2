import Script from "next/script"

export function ContactStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Fieldmind - Get in Touch",
    description:
      "Contact the Fieldmind team to learn more about our AI-powered agricultural advisory tools or to request a demo.",
    url: "https://fieldmind.ai/contact",
    mainEntity: {
      "@type": "Organization",
      name: "Fieldmind",
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
    },
  }

  return (
    <Script
      id="contact-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
