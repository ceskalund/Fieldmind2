import Link from "next/link"

export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

      <div className="prose prose-lg max-w-none">
        <h2>Introduction</h2>
        <p>
          At Fieldmind, we respect your privacy and are committed to protecting your personal data. This privacy policy
          will inform you about how we look after your personal data when you visit our website and tell you about your
          privacy rights and how the law protects you.
        </p>

        <h2>Data We Collect</h2>
        <p>
          We may collect, use, store and transfer different kinds of personal data about you which we have grouped
          together as follows:
        </p>
        <ul>
          <li>
            <strong>Identity Data</strong> includes first name, last name, username or similar identifier.
          </li>
          <li>
            <strong>Contact Data</strong> includes email address and telephone numbers.
          </li>
          <li>
            <strong>Technical Data</strong> includes internet protocol (IP) address (anonymized), browser type and
            version, time zone setting and location, browser plug-in types and versions, operating system and platform,
            and other technology on the devices you use to access this website.
          </li>
          <li>
            <strong>Usage Data</strong> includes information about how you use our website and services.
          </li>
        </ul>

        <h2>Analytics and Cookies</h2>
        <p>
          We use Google Analytics 4 to help us understand how our visitors use the site. Google Analytics uses cookies
          to collect information about your visit to our website, including:
        </p>
        <ul>
          <li>Pages you visit</li>
          <li>How long you spend on each page</li>
          <li>How you got to the site</li>
          <li>What you click on while you're visiting the site</li>
        </ul>

        <p>
          We have configured Google Analytics to anonymize IP addresses and we do not allow Google to use or share our
          analytics data for any purpose besides providing us with analytics information.
        </p>

        <h3>Cookie Consent</h3>
        <p>
          When you first visit our website, you will be asked to consent to our use of cookies. You can choose to accept
          all cookies or customize your preferences. You can change your preferences at any time by clicking on "Cookie
          Settings" in the footer of our website.
        </p>

        <h3>Types of Cookies We Use</h3>
        <ul>
          <li>
            <strong>Necessary Cookies:</strong> These cookies are essential for the website to function properly.
          </li>
          <li>
            <strong>Analytics Cookies:</strong> These cookies help us understand how visitors interact with our website
            through Google Analytics.
          </li>
          <li>
            <strong>Marketing Cookies:</strong> These cookies are used to track visitors across websites to display
            relevant advertisements.
          </li>
          <li>
            <strong>Preferences Cookies:</strong> These cookies allow the website to remember choices you make and
            provide enhanced functionality.
          </li>
        </ul>

        <h2>How We Use Your Data</h2>
        <p>We use your data to:</p>
        <ul>
          <li>Provide and improve our services</li>
          <li>Respond to your inquiries</li>
          <li>Send you updates and newsletters if you've subscribed</li>
          <li>Analyze how our website is used to improve it</li>
        </ul>

        <h2>Your Rights</h2>
        <p>Under data protection laws, you have rights including:</p>
        <ul>
          <li>
            <strong>Right to access</strong> - You can ask for copies of your personal data.
          </li>
          <li>
            <strong>Right to rectification</strong> - You can ask us to rectify information you think is inaccurate or
            incomplete.
          </li>
          <li>
            <strong>Right to erasure</strong> - You can ask us to erase your personal data in certain circumstances.
          </li>
          <li>
            <strong>Right to restriction of processing</strong> - You can ask us to restrict the processing of your
            information in certain circumstances.
          </li>
          <li>
            <strong>Right to object to processing</strong> - You can object to the processing of your personal data in
            certain circumstances.
          </li>
          <li>
            <strong>Right to data portability</strong> - You can ask that we transfer information you've provided to
            another organization or to you.
          </li>
        </ul>

        <h2>Contact Us</h2>
        <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
        <p>
          Email: privacy@fieldmind.ai
          <br />
          Address: Gaustadalléen 21, 0349 Oslo, Norway
        </p>

        <div className="mt-8">
          <Link href="/" className="text-sage-green hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
