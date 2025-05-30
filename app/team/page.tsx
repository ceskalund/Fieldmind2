import { CTAButton } from "@/components/cta-button"
import { Linkedin, ExternalLink, Users } from "lucide-react"
import Link from "next/link"
import { TeamStructuredData } from "@/components/team-structured-data"

export default function TeamPage() {
  return (
    <>
      <TeamStructuredData />
      <main>
        {/* Hero Section */}
        <section className="massive-spacing text-center px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="hero-text mb-8">Our Team</h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-light">
              Meet the team behind Fieldmind.
            </p>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="section-spacing bg-light-gray px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex flex-col items-center">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden mb-6">
                    <img
                      src="/images/marte.jpeg"
                      alt="Marte Øverdal"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center mb-2">
                    <Link
                      href="https://www.linkedin.com/in/marte-viktoria-%C3%B8verdal-4b47097a/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl font-bold mr-2 hover:text-sage-green transition-colors"
                    >
                      Marte Øverdal
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/marte-viktoria-%C3%B8verdal-4b47097a/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sage-green hover:text-sage-green/80 transition-colors"
                      aria-label="Marte Øverdal LinkedIn profile"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>
                  </div>
                  <p className="text-sage-green font-medium mb-6">Founder & CEO</p>
                  <p className="text-gray-600 text-center">
                    Six-generation Norwegian farmer with executive and project management roles at Yara International
                    (fertilizers), Agoro Carbon Alliance (sustainable agriculture), PwC Management Consulting, TINE
                    (dairy), Nortura (meat), and COOP (retail). MSc Industrial Economics (NTNU), Sustainable Food
                    Production (NMBU). Deep agricultural roots with insight across the full food value chain.
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex flex-col items-center">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden mb-6">
                    <img
                      src="/images/pierre.jpeg"
                      alt="Pierre-Julien Harbonnier"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center mb-2">
                    <Link
                      href="https://www.linkedin.com/in/pierre-julien-harbonnier-30738484/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl font-bold mr-2 hover:text-sage-green transition-colors"
                    >
                      Pierre-Julien Harbonnier
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/pierre-julien-harbonnier-30738484/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sage-green hover:text-sage-green/80 transition-colors"
                      aria-label="Pierre-Julien Harbonnier LinkedIn profile"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>
                  </div>
                  <p className="text-sage-green font-medium mb-6">CTO</p>
                  <p className="text-gray-600 text-center">
                    Co-founded and scaled Parkki (smart mobility tech) to acquisition by Colas Group
                    (construction/infrastructure). MSc Software Development specializing in AI, data management, and
                    web-based products. Proven track record building technology from startup to successful acquisition.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Collaborations Section */}
        <section className="section-spacing px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-center mb-16">Our Collaborations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div className="bg-light-gray p-8 rounded-lg">
                <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center text-center h-full">
                  <div className="w-48 h-24 mb-6 overflow-hidden rounded">
                    <img
                      src="/images/startuplab.jpg"
                      alt="StartupLab Oslo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="mb-4">
                    <Link
                      href="https://startuplab.no/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-sage-green transition-colors"
                    >
                      StartupLab Oslo
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Fieldmind is proud to be part of StartupLab Oslo, Norway's leading technology incubator for
                    ambitious founders.
                  </p>
                  <Link
                    href="https://startuplab.no/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sage-green hover:text-sage-green/80 transition-colors mt-auto"
                  >
                    <span className="mr-1">Visit Website</span>
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="bg-light-gray p-8 rounded-lg">
                <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center text-center h-full">
                  <div className="w-48 h-24 mb-6 overflow-hidden rounded">
                    <img
                      src="/images/NLR.jpg"
                      alt="Norsk landbruksrådgivning"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="mb-4">
                    <Link
                      href="https://www.nlr.no/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-sage-green transition-colors"
                    >
                      Norsk landbruksrådgivning
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We're working closely with Norsk landbruksrådgivning, Norway's leading agricultural advisory
                    service, to develop solutions that address real farming challenges.
                  </p>
                  <Link
                    href="https://www.nlr.no/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sage-green hover:text-sage-green/80 transition-colors mt-auto"
                  >
                    <span className="mr-1">Visit Website</span>
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-spacing bg-light-gray text-center px-6 md:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-8">Join Us on Our Mission</h2>
            <p className="text-xl text-gray-600 mb-12">
              Interested in learning more about Fieldmind or exploring collaboration opportunities? We'd love to hear
              from you.
            </p>
            <CTAButton href="/contact">Contact Us</CTAButton>
          </div>
        </section>
      </main>
    </>
  )
}