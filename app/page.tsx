import { CTAButton } from "@/components/cta-button"
import { DollarSign, Cloud, Database, Users, Sprout, ArrowRight } from "lucide-react"
import Link from "next/link"
import { LazyImageBackground } from "@/components/lazy-components"
import { HomeStructuredData } from "@/components/home-structured-data"
import Image from "next/image"
import { Suspense } from "react"

export default function Home() {
  return (
    <>
      <HomeStructuredData />
      <main>
        {/* Hero Section with Image Background */}
        <section className="relative massive-spacing text-center container-mobile-padding overflow-hidden">
          {/* Image Background with Suspense boundary */}
          <Suspense
            fallback={
              <div className="absolute inset-0 bg-sage-green/30">
                <Image
                  src="/placeholder.svg?height=1080&width=1920"
                  alt=""
                  fill
                  priority
                  className="object-cover mix-blend-overlay"
                />
              </div>
            }
          >
            <LazyImageBackground
              imageSrc="/images/Fieldmind landingpage.jpg"
              overlayOpacity={0.65}
              priority={true}
            />
          </Suspense>

          {/* Content positioned on top of image */}
          <div className="relative z-10 max-w-5xl mx-auto">
            <h1 className="hero-text mb-6 sm:mb-8 text-white">AI-Powered Advisor for Modern Farming</h1>
            <p className="text-mobile-optimized text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto font-light">
              Data-driven insights for faster, confident farming decisions.
            </p>
            <CTAButton href="/contact" className="shadow-lg">
              Explore now
            </CTAButton>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="section-spacing bg-light-gray container-mobile-padding">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="mb-4 sm:mb-6">The Challenge Facing Our Food Security</h2>
              <p className="text-mobile-optimized text-gray-600 max-w-3xl mx-auto">
                Farmers today face unprecedented challenges that threaten both their livelihoods and our global food
                systems. The complexity of modern agriculture requires new approaches to support those who feed us.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="bg-sage-green/10 p-4 rounded-full mb-4 sm:mb-6 relative">
                  <DollarSign className="h-7 w-7 sm:h-8 sm:w-8 text-sage-green" aria-hidden="true" />
                  <div className="absolute -top-2 -right-2 bg-sage-green/10 p-2 rounded-full">
                    <Sprout className="h-4 w-4 sm:h-5 sm:w-5 text-sage-green" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="mb-3 sm:mb-4 text-container">Financial Vulnerability</h3>
                <p className="text-gray-600">
                  Striving for optimal yields while remaining economically fragile due to rising costs, unpredictable
                  markets, and slim profit margins.
                </p>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="bg-sage-green/10 p-4 rounded-full mb-4 sm:mb-6">
                  <Cloud className="h-7 w-7 sm:h-8 sm:w-8 text-sage-green" aria-hidden="true" />
                </div>
                <h3 className="mb-3 sm:mb-4 text-container">Climate Uncertainty</h3>
                <p className="text-gray-600">
                  Navigating increasingly unpredictable weather events, changing growing seasons, and new patterns that
                  challenge traditional farming knowledge.
                </p>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="bg-sage-green/10 p-4 rounded-full mb-4 sm:mb-6">
                  <Database className="h-7 w-7 sm:h-8 sm:w-8 text-sage-green" aria-hidden="true" />
                </div>
                <h3 className="mb-3 sm:mb-4 text-container">Data Overload</h3>
                <p className="text-gray-600">
                  Too much information from too many sources, with too little time to interpret what's relevant for
                  specific farm conditions and needs.
                </p>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="bg-sage-green/10 p-4 rounded-full mb-4 sm:mb-6">
                  <Users className="h-7 w-7 sm:h-8 sm:w-8 text-sage-green" aria-hidden="true" />
                </div>
                <h3 className="mb-3 sm:mb-4 text-container">Isolation</h3>
                <p className="text-gray-600">
                  Working alone often means making critical decisions without adequate support or tailored, reliable
                  advice that accounts for local conditions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Fieldmind AI Advisor Section */}
        <section className="section-spacing container-mobile-padding">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="mb-4 sm:mb-6">Fieldmind: Your AI Farming Advisor</h2>
              <h3 className="text-3xl font-medium mb-4 sm:mb-6">Why Agricultural Advisors Choose FieldMind</h3>
              <p className="text-mobile-optimized text-gray-600 max-w-3xl mx-auto">
              We combine each farm's unique data with local conditions, quality research, and climate forecasts to
              provide tailored recommendations when it's needed most. Ayntime.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-16 mt-20">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-full h-64 mb-8 bg-light-gray rounded-lg overflow-hidden">
                  <Image
                    src="/images/farmeradvisor.jpg"
                    alt="Local Farm Data"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <h4 className="text-xl font-bold mb-4 sm:mb-6">Local Farm Data</h4>
                <p className="text-gray-600">
                  Each farm's specific soil conditions, crops, historical patterns, and current situation form the foundation
                  of our insights.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="relative w-full h-64 mb-8 bg-light-gray rounded-lg overflow-hidden">
                  <Image
                    src="/images/scientist.jpg"
                    alt="Quality Research & Climate Forecasts"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <h4 className="text-xl font-bold mb-4 sm:mb-6">Quality Research & Climate Forecasts</h4>
                <p className="text-gray-600">
                  We integrate the latest agricultural research and localized climate predictions to factor in what's
                  coming.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="relative w-full h-64 mb-8 bg-light-gray rounded-lg overflow-hidden">
                  <Image
                    src="/images/dataanalysis.jpg"
                    alt="Tailored Recommendations"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <h4 className="text-xl font-bold mb-4 sm:mb-6">Tailored Recommendations</h4>
                <p className="text-gray-600">
                Receive specific, actionable insights customized for each farm's unique context, delivered when and
                where you need them.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Green Box Result Section */}
        <section className="py-20 container-mobile-padding bg-sage-green text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">The Result? Better Decisions, faster.</h2>
            <p className="text-mobile-optimized mb-12 max-w-3xl mx-auto">
              Make informed choices with confidence, knowing you have the best available data interpreted specifically
              for each farm's unique challenges and context.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-white text-sage-green px-6 py-3 rounded-md hover:bg-white/90 transition-colors"
            >
              <span>Learn How It Works</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* Solution Section */}
        <section className="section-spacing bg-light-gray container-mobile-padding text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-8 sm:mb-10">Built for Agricultural Professionals</h2>
            <p className="text-mobile-optimized text-gray-600 mb-12 sm:mb-16">
              FieldMind combines farm data, weather forecasts, and agricultural research to deliver actionable insights.
              Currently in development with Norwegian agricultural advisors.
            </p>
            <CTAButton href="/contact">Request Demo</CTAButton>
          </div>
        </section>

        {/* Final CTA */}
        <section className="massive-spacing container-mobile-padding text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-12 sm:mb-16">Ready to transform your advisory practice?</h2>
            <CTAButton href="/contact">Get Early Access</CTAButton>
          </div>
        </section>
      </main>
    </>
  )
}
