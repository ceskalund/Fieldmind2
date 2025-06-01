import React from "react"
import Image from "next/image"
import { CTAButton } from "@/components/cta-button"
import { DollarSign, Cloud, Database, Users, Sprout, ArrowRight } from "lucide-react"
import Link from "next/link"
import { AboutStructuredData } from "@/components/about-structured-data"

export default function AboutPage() {
  return (
    <>
      <AboutStructuredData />
      <main>
        {/* Hero Section */}
        <section className="massive-spacing text-center px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="hero-text mb-8">About Fieldmind</h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-light">
              Every farm is different. Your advice should be too.
            </p>
          </div>
        </section>

        {/* Problem Section */}
        <section className="section-spacing bg-light-gray px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="mb-8">The Problem We're Solving</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Agricultural advisors face a growing challenge: they need to process increasing amounts of data to
                  provide accurate recommendations to farmers, but lack the tools to do so efficiently.
                </p>
                <p className="text-lg text-gray-600">
                  Weather patterns are becoming less predictable, market conditions fluctuate rapidly, and farms
                  generate more data than ever before. Without advanced analytical tools, advisors struggle to translate
                  this complexity into actionable advice for their farmers.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src="/Images/problem1.jpg"
                    alt="Agricultural advisor with data"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="section-spacing px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="mb-6">The Challenge Facing Our Food Security</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Farmers today face unprecedented challenges that threaten both their livelihoods and our global food
                systems. The complexity of modern agriculture requires new approaches to support those who feed us.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="bg-sage-green/10 p-4 rounded-full mb-6 relative">
                  <DollarSign className="h-8 w-8 text-sage-green" />
                  <div className="absolute -top-2 -right-2 bg-sage-green/10 p-2 rounded-full">
                    <Sprout className="h-5 w-5 text-sage-green" />
                  </div>
                </div>
                <h3 className="mb-4">Financial Vulnerability</h3>
                <p className="text-gray-600">
                  Striving for optimal yields while remaining economically fragile due to rising costs, unpredictable
                  markets, and slim profit margins.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="bg-sage-green/10 p-4 rounded-full mb-6">
                  <Cloud className="h-8 w-8 text-sage-green" />
                </div>
                <h3 className="mb-4">Climate Uncertainty</h3>
                <p className="text-gray-600">
                  Navigating increasingly unpredictable weather events, changing growing seasons, and new patterns that
                  challenge traditional farming knowledge.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="bg-sage-green/10 p-4 rounded-full mb-6">
                  <Database className="h-8 w-8 text-sage-green" />
                </div>
                <h3 className="mb-4">Data Overload</h3>
                <p className="text-gray-600">
                  Too much information from too many sources, with too little time to interpret what's relevant for
                  specific farm conditions and needs.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="bg-sage-green/10 p-4 rounded-full mb-6">
                  <Users className="h-8 w-8 text-sage-green" />
                </div>
                <h3 className="mb-4">Isolation</h3>
                <p className="text-gray-600">
                  Working alone often means making critical decisions without adequate support or tailored, reliable
                  advice that accounts for local conditions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="section-spacing bg-light-gray px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 bg-white p-8 rounded-lg shadow-sm">
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src="/Images/solution.jpg"
                    alt="Fieldmind platform"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="mb-8">Our Solution</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Fieldmind is an AI-powered platform that helps agricultural advisors make better recommendations by
                  analyzing complex data and generating actionable insights.
                </p>
                <p className="text-lg text-gray-600">
                  Our platform combines weather forecasts, soil data, crop models, and market information to provide
                  personalized recommendations for each farm. By automating data analysis, we free advisors to focus on
                  what they do best: building relationships with farmers and providing contextual expertise.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Fieldmind AI Advisor Section */}
        <section className="section-spacing px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="mb-4">Why Agricultural Advisors Choose FieldMind</h2>
              <h3 className="text-3xl font-medium mb-4">Stop guessing. Start knowing.</h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We combine each farm's unique data with local conditions, quality research, and climate forecasts to
                provide tailored recommendations when it's needed most. Ayntime.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-full h-64 mb-8 bg-white rounded-lg overflow-hidden">
                  <img
                    src="/Images/farmeradvisor.jpg"
                    alt="Local Farm Data"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold mb-4">Local Farm Data</h4>
                <p className="text-gray-600">
                Each farm's specific soil conditions, crops, historical patterns, and current situation form the foundation
                  of our insights.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="relative w-full h-64 mb-8 bg-white rounded-lg overflow-hidden">
                  <img
                    src="/Images/scientist.jpg"
                    alt="Quality Research & Climate Forecasts"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold mb-4">Quality Research & Climate Forecasts</h4>
                <p className="text-gray-600">
                  We integrate the latest agricultural research and localized climate predictions to factor in what's
                  coming.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="relative w-full h-64 mb-8 bg-white rounded-lg overflow-hidden">
                  <img
                    src="/Images/dataanalysis.jpg"
                    alt="Tailored Recommendations"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold mb-4">Tailored Recommendations</h4>
                <p className="text-gray-600">
                  Receive specific, actionable insights customized for each farm's unique context, delivered when and
                  where you need them.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Green Box Result Section */}
        <section className="py-20 px-6 md:px-8 bg-sage-green text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">The Result? Better Decisions, faster.</h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto">
              Make informed choices with confidence, knowing you have the best available data interpreted specifically
              for each farm's unique challenges and context.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-sage-green px-6 py-3 rounded-md hover:bg-white/90 transition-colors"
            >
              <span>Learn How It Works</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Story Section */}
        <section className="section-spacing px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-8">Our Story</h2>
            <p className="text-lg text-gray-600 mb-6">
              Watching farmers struggle with unpredictable weather, complex data, and one-size-fits-all advice inspired
              a simple idea: what if AI could understand each farm's unique conditions?
            </p>
            <p className="text-lg text-gray-600 mb-6">
              The stakes are rising. Climate change, population growth, and economic pressure mean farmers can't afford
              generic recommendations anymore. One wrong decision costs thousands. Yet advisors are working with tools
              that can't address the wide and complex challenges of modern farms. We realized that agricultural advisors
              and farmers needed better tools to analyze the growing amounts of farm data and translate it into
              actionable, real time recommendations.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              FieldMind is changing that. We combine local farm data with climate forecasts and agricultural research to
              deliver personalized recommendations that actually address each farms individual needs. We're building this technology
              alongside Norwegian agricultural advisors because the best solutions come from truly understanding real
              farming challenges.
            </p>
            <p className="text-lg text-gray-600 mb-12">
              Transform generic advice into precise insights. Make confident decisions with data that knows each farm's unique needs.
            </p>
            <CTAButton href="/team">
              Meet Our Team
            </CTAButton>
          </div>
        </section>
      </main>
    </>
  )
}
