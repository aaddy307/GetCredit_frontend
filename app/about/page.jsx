import AboutClient from "./AboutClient";
import { breadcrumbSchema, BASE_URL } from "@/lib/seo";

export const metadata = {
  title: "About Get Credit | Trusted Loan DSA in Ambernath, Thane",
  description: "Get Credit is a trusted DSA and loan consultancy in Ambernath with 50+ banking partners. Learn about our mission to make loans accessible across Maharashtra.",
  alternates: {
    canonical: "https://get-credit.in/about",
  },
  openGraph: {
    url: "https://get-credit.in/about",
    title: "About Get Credit | Trusted Loan DSA in Ambernath, Thane",
    description: "Get Credit is a trusted DSA and loan consultancy in Ambernath with 50+ banking partners. Learn about our mission to make loans accessible across Maharashtra.",
    siteName: "GETCREDIT",
    images: [{ url: "https://get-credit.in/Logo.jpeg", width: 1200, height: 630, alt: "Get Credit Logo" }],
  },
  twitter: {
    title: "About Get Credit | Trusted Loan DSA in Ambernath, Thane",
    description: "Get Credit is a trusted DSA and loan consultancy in Ambernath with 50+ banking partners. Learn about our mission to make loans accessible across Maharashtra.",
    images: ["https://get-credit.in/Logo.jpeg"],
  }
};

const breadcrumbJsonLd = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
]);

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "About Get Credit",
  "description": "Get Credit is a trusted DSA and loan consultancy in Ambernath with 50+ banking partners.",
  "url": "https://get-credit.in/about",
  "about": {
    "@type": "Organization",
    "name": "Get Credit",
    "url": "https://get-credit.in",
    "logo": "https://get-credit.in/Logo.jpeg",
    "description": "Loan consultancy and DSA business helping individuals find the best loan solutions.",
    "foundingDate": "2020",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Near Chinchpada Opp. New Fire Brigade",
      "addressLocality": "Ambernath West",
      "addressRegion": "Maharashtra",
      "postalCode": "421505",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      telephone: "+91-7738205198",
      contactType: "customer support",
      email: "support@get-credit.in",
      availableLanguage: ["English", "Hindi"],
    },
    "sameAs": [
      "https://facebook.com/getcredit",
      "https://x.com/getcredit",
      "https://instagram.com/getcredit",
      "https://linkedin.com/company/getcredit",
    ],
    "areaServed": "India",
    "serviceType": ["Home Loan", "Personal Loan", "Business Loan", "Education Loan", "Loan Against Property", "Vehicle Loan"]
  }
};

export default function AboutPage() {
  return (
    <>
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        id="about-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <AboutClient />
    </>
  );
}
