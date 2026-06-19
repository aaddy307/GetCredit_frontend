import LoanProductPage from "@/components/LoanProductPage";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo";

const service = {
  id: "home-loan",
  title: "Home Loan",
  description: "Realize your dream of owning a home with financing up to ₹15 Crore. We offer competitive rates, flexible tenure, and minimal documentation.",
  benefits: [
    "Competitive interest rates starting from 6.50%",
    "Loan tenure up to 30 years",
    "Financing up to ₹15 Crore",
    "Quick approval and disbursement",
    "Balance transfer facility available",
    "Tax benefits under Section 80C and 24(b)",
  ],
  eligibility: [
    "Age: 21-65 years",
    "Minimum income: ₹25,000/month",
    "Work experience required in same company",
    "CIBIL score: 650+",
    "Indian resident",
  ],
  documents: [
    "Identity proof (Aadhaar/PAN/Voter ID)",
    "Address proof",
    "Income documents (Salary slips/ITR)",
    "Property documents",
    "Bank statements (6 months)",
    "Passport size photos",
  ],
};

export const metadata = {
  title: "Home Loan in Ambernath, Thane | Up to ₹15 Crore | Get Credit",
  description: "Get home loans up to ₹15 Crore in Ambernath, Thane with interest rates starting from 6.50%. Loan tenure up to 30 years. Apply now for your dream home.",
  alternates: {
    canonical: "https://get-credit.in/home-loan",
  },
  openGraph: {
    url: "https://get-credit.in/home-loan",
    title: "Home Loan in Ambernath, Thane | Up to ₹15 Crore | Get Credit",
    description: "Get home loans up to ₹15 Crore with interest rates starting from 6.50%. Loan tenure up to 30 years.",
    siteName: "GETCREDIT",
    images: [{ url: "https://get-credit.in/Logo.jpeg", width: 1200, height: 630, alt: "Get Credit Home Loan" }],
  },
  twitter: {
    title: "Home Loan in Ambernath, Thane | Get Credit",
    description: "Get home loans up to ₹15 Crore with interest rates starting from 6.50%.",
    images: ["https://get-credit.in/Logo.jpeg"],
  },
};

const breadcrumbJsonLd = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Home Loan", path: "/home-loan" },
]);

const serviceJsonLd = serviceSchema({
  title: "Home Loan",
  description: "Realize your dream of owning a home with financing up to ₹15 Crore. Interest rates starting from 6.50%.",
});

export default function HomeLoanPage() {
  return (
    <>
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <LoanProductPage service={service} loanTypeMapKey="home" />
    </>
  );
}
