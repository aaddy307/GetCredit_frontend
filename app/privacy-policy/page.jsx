import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata = {
  title: "Privacy Policy | Get Credit",
  description: "Read the Get Credit privacy policy to understand how we collect, protect, and handle your loan enquiry data.",
  alternates: {
    canonical: "https://get-credit.in/privacy-policy",
  },
  openGraph: {
    url: "https://get-credit.in/privacy-policy",
    title: "Privacy Policy | Get Credit",
    description: "Read the Get Credit privacy policy to understand how we collect, protect, and handle your loan enquiry data.",
    siteName: "GETCREDIT",
    images: [{ url: "https://get-credit.in/Logo.jpeg", width: 1200, height: 630, alt: "Get Credit Logo" }],
  },
  twitter: {
    title: "Privacy Policy | Get Credit",
    description: "Read the Get Credit privacy policy to understand how we collect, protect, and handle your loan enquiry data.",
    images: ["https://get-credit.in/Logo.jpeg"],
  },
};

const breadcrumbJsonLd = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: "/privacy-policy" },
]);

const privacySchema = {
  "@context": "https://schema.org",
  "@type": "PrivacyPolicyPage",
  "name": "Privacy Policy",
  "description": "Read the Get Credit privacy policy to understand how we collect, protect, and handle your loan enquiry data.",
  "url": "https://get-credit.in/privacy-policy",
  "lastReviewed": "2026-05-18",
  "reviewer": {
    "@type": "Organization",
    "name": "Get Credit"
  },
  "about": {
    "@type": "CreativeWork",
    "name": "Personal Data Handling",
    "description": "Get Credit collects and processes personal data for loan consultancy services including name, phone, email, city, loan type, and loan amount."
  }
};

export default function PrivacyPolicy() {
  return (
    <>
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        id="privacy-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacySchema) }}
      />
      <Navbar />
      <div className="animate-fade-in min-h-screen bg-linear-to-b from-white to-bg-tertiary">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Privacy Policy</h1>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-[gold-primary]/20 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-[gold-primary] mb-4">1. What Data We Collect</h2>
              <p className="text-gray-600 mb-4">We collect the following personal information when you submit an enquiry on our website:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Full Name</li>
                <li>Phone Number</li>
                <li>Email Address</li>
                <li>City</li>
                <li>Loan Type (Home Loan, Education Loan, Loan Against Property)</li>
                <li>Loan Amount</li>
                <li>Additional Message</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[gold-primary] mb-4">2. How We Use Your Data</h2>
              <p className="text-gray-600 mb-4">Your information is used for the following purposes:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>To process your loan enquiry and connect you with appropriate lenders</li>
                <li>To provide you with loan eligibility information and EMI calculations</li>
                <li>To contact you regarding your enquiry within 24-48 hours</li>
                <li>To send you relevant loan offers and promotional materials</li>
                <li>For internal admin review and customer service purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[gold-primary] mb-4">3. Data Storage & Security</h2>
              <p className="text-gray-600">
                Your personal data is stored securely on our servers with industry-standard encryption.
                We implement appropriate technical and organizational measures to protect your data
                against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[gold-primary] mb-4">4. Third Party Sharing</h2>
              <p className="text-gray-600 mb-4">We may share your information with:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Partner banks and financial institutions to process your loan application</li>
                <li>Our authorized service providers who assist in operating our website</li>
                <li>Legal authorities when required by law or to protect our rights</li>
              </ul>
              <p className="text-gray-600 mt-4">We <strong>do not sell</strong> your personal information to third parties.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[gold-primary] mb-4">5. Your Rights</h2>
              <p className="text-gray-600 mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
                <li><strong>Correct:</strong> Request correction of any inaccurate data</li>
                <li><strong>Delete:</strong> Request deletion of your personal data</li>
                <li><strong>Opt-out:</strong> Unsubscribe from promotional communications at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[gold-primary] mb-4">6. Contact Us</h2>
              <p className="text-gray-600">
                For any privacy concerns or data requests, please contact us at:<br />
                <strong>Email:</strong> support@get-credit.in<br />
                <strong>Phone:</strong> +91 7738205198, +91 8408926551, +91 8793604734
              </p>
            </section>

            <section>
              <p className="text-gray-500 text-sm border-t border-gray-200 pt-4">
                <strong>Last Updated:</strong> May 18, 2026
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
