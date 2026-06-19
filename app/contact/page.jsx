import ContactClient from "./ContactClient";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata = {
  title: "Contact Get Credit | Loan Consultancy in Ambernath, Thane",
  description: "Get in touch with Get Credit for home loans, personal loans, and financial guidance. Call +91 7738205198 or visit us in Ambernath West.",
  alternates: {
    canonical: "https://get-credit.in/contact",
  },
  openGraph: {
    url: "https://get-credit.in/contact",
    title: "Contact Get Credit | Loan Consultancy in Ambernath, Thane",
    description: "Get in touch with Get Credit for home loans, personal loans, and financial guidance. Call +91 7738205198 or visit us in Ambernath West.",
    siteName: "Get Credit",
    images: [{ url: "https://get-credit.in/Logo.jpeg", width: 1200, height: 630, alt: "Get Credit Logo" }],
  },
  twitter: {
    title: "Contact Get Credit | Loan Consultancy in Ambernath, Thane",
    description: "Get in touch with Get Credit for home loans, personal loans, and financial guidance. Call +91 7738205198 or visit us in Ambernath West.",
    images: ["https://get-credit.in/Logo.jpeg"],
  }
};

const breadcrumbJsonLd = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' },
]);

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Contact Get Credit",
  "description": "Get in touch with Get Credit for home loans, personal loans, and financial guidance.",
  "url": "https://get-credit.in/contact",
  "telephone": "+917738205198",
  "email": "support@get-credit.in",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Near Chinchpada Opp. New Fire Brigade",
    "addressLocality": "Ambernath West",
    "addressRegion": "Maharashtra",
    "postalCode": "421505",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "19.2016",
    "longitude": "73.1856"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "sameAs": [
    "https://facebook.com/getcredit",
    "https://x.com/getcredit",
    "https://instagram.com/getcredit",
    "https://linkedin.com/company/getcredit"
  ]
};

export default function ContactPage() {
  return (
    <>
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        id="contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <ContactClient />
    </>
  );
}