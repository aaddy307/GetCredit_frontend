import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Terms & Conditions | Get Credit",
  description: "Read the terms and conditions for using Get Credit's loan consultancy services and website.",
  alternates: {
    canonical: "https://get-credit.in/terms",
  },
  openGraph: {
    url: "https://get-credit.in/terms",
    title: "Terms & Conditions | Get Credit",
    description: "Read the terms and conditions for using Get Credit's loan consultancy services and website.",
    siteName: "GETCREDIT",
  },
  twitter: {
    title: "Terms & Conditions | Get Credit",
    description: "Read the terms and conditions for using Get Credit's loan consultancy services and website.",
  },
};

export default function Terms() {
  return (
    <>
      <Navbar />
      <div className="animate-fade-in min-h-screen bg-linear-to-b from-white to-[#F5F3EE]">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Terms & Conditions</h1>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#C9A84C]/20 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-[#C9A84C] mb-4">1. Service Description</h2>
              <p className="text-gray-600">
                Get Credit is a loan consultancy platform that connects users with banks and financial
                institutions. We are <strong>not a lender</strong> ourselves. Our service is to help you
                find and apply for suitable loan products from our partner institutions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#C9A84C] mb-4">2. User Responsibilities</h2>
              <p className="text-gray-600 mb-4">By using our website, you agree to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Provide accurate and complete information in all enquiry forms</li>
                <li>Use the website only for legitimate loan enquiry purposes</li>
                <li>Not attempt to gain unauthorized access to our systems</li>
                <li>Not use the website for any illegal or unauthorized purpose</li>
                <li>Be at least 18 years of age to apply for loans</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#C9A84C] mb-4">3. Disclaimer — Not Financial Advice</h2>
              <p className="text-gray-600">
                The information provided on this website is for general informational purposes only.
                We do not provide financial, legal, or tax advice. The final decision on loan approval,
                interest rates, and terms depends entirely on the lending institution. Please consult with
                a qualified financial advisor before making any financial decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#C9A84C] mb-4">4. Limitation of Liability</h2>
              <p className="text-gray-600 mb-4">Get Credit shall not be liable for:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Any decision made by banks or financial institutions regarding your loan application</li>
                <li>Any delays or issues in the loan processing workflow</li>
                <li>Any discrepancies in the terms offered by third-party lenders</li>
                <li>Any loss or damage resulting from reliance on information on this website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#C9A84C] mb-4">5. User Content</h2>
              <p className="text-gray-600">
                You are responsible for any information you submit through our website. You represent
                and warrant that all information provided is accurate, current, and complete, and that
                you have the right to share such information with us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#C9A84C] mb-4">6. Governing Law</h2>
              <p className="text-gray-600">
                These Terms & Conditions are governed by the laws of <strong>India</strong>. Any disputes
                arising out of or related to these terms shall be subject to the exclusive jurisdiction
                of the courts in Mumbai, Maharashtra.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#C9A84C] mb-4">7. Changes to Terms</h2>
              <p className="text-gray-600">
                We reserve the right to modify these Terms & Conditions at any time. Any changes will
                be posted on this page with an updated &quot;Last Modified&quot; date. Your continued use of the
                website after such changes constitutes your acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#C9A84C] mb-4">8. Contact Information</h2>
              <p className="text-gray-600">
                For questions about these Terms & Conditions, please contact us at:<br />
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
