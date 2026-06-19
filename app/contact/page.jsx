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
    siteName: "GETCREDIT",
  },
  twitter: {
    title: "Contact Get Credit | Loan Consultancy in Ambernath, Thane",
    description: "Get in touch with Get Credit for home loans, personal loans, and financial guidance. Call +91 7738205198 or visit us in Ambernath West.",
  }
};

const breadcrumbJsonLd = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' },
]);

export default function ContactPage() {
  return (
    <>
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ContactClient />
    </>
  );
}