import Script from "next/script"

export function TeamStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Our Team - The Minds Behind Fieldmind",
    description:
      "Meet the team behind Fieldmind - agricultural experts and technology innovators working to transform farm advisory with AI.",
    url: "https://fieldmind.ai/team",
    mainEntity: {
      "@type": "Organization",
      name: "Fieldmind",
      member: [
        {
          "@type": "Person",
          name: "Marte Øverdal",
          jobTitle: "Founder & CEO",
          sameAs: "https://www.linkedin.com/in/marte-viktoria-%C3%B8verdal-4b47097a/",
          description:
            "Six-generation Norwegian farmer with executive and project management roles at Yara International (fertilizers), Agoro Carbon Alliance (sustainable agriculture), PwC Management Consulting, TINE (dairy), Nortura (meat), and COOP (retail). MSc Industrial Economics (NTNU), Sustainable Food Production (NMBU). Agricultural heritage spanning the entire food value chain.",
        },
        {
          "@type": "Person",
          name: "Pierre-Julien Harbonnier",
          jobTitle: "CTO",
          sameAs: "https://www.linkedin.com/in/pierre-julien-harbonnier-30738484/",
          description:
            "Co-founded and scaled Parkki (smart mobility tech) to acquisition by Colas Group (construction/infrastructure). MSc Software Development specializing in AI, data management, and web-based products. Proven track record building technology from startup to successful acquisition.",
        },
      ],
    },
  }

  return (
    <Script
      id="team-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
