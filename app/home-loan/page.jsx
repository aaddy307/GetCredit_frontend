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
  title: "Home Loan in Ambernath | Up to ₹15 Crore | Get Credit",
  description: "Get home loans up to ₹15 Crore in Ambernath & Thane with rates from 6.50%. Loan tenure up to 30 years. Apply for your dream home.",
  alternates: {
    canonical: "https://get-credit.in/home-loan",
  },
  openGraph: {
    url: "https://get-credit.in/home-loan",
    title: "Home Loan in Ambernath | Up to ₹15 Crore | Get Credit",
    description: "Get home loans up to ₹15 Crore with rates from 6.50%. Loan tenure up to 30 years.",
    siteName: "Get Credit",
    images: [{ url: "https://get-credit.in/Logo.jpeg", width: 1200, height: 630, alt: "Get Credit Home Loan" }],
  },
  twitter: {
    title: "Home Loan in Ambernath | Get Credit",
    description: "Get home loans up to ₹15 Crore with rates from 6.50%.",
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

const content = {
  overview: {
    title: "Home Loans in Maharashtra: Your Path to Owning a Dream Property",
    description: "Buying a home is one of the biggest financial decisions of your life. With home loans in Maharashtra becoming more accessible, realizing your dream of owning a house in Ambernath, Thane, Kalyan, or Ulhasnagar is now easier than ever. Whether you are a first-time homebuyer looking for a 1BHK in a growing suburb or planning to upgrade to a larger family home, our network of 50+ banking partners offers home loan products tailored to every budget and requirement. The historic towns of Maharashtra combined with rapid urbanization make it an excellent time to invest in property here.",
    useCases: [
      "Purchase of new flat, apartment, or row house",
      "Construction of house on owned plot",
      "Buying a resale property from the secondary market",
      "Home extension or adding floors to existing structure",
      "Renovation and interior furnishing of new home",
      "Balance transfer of existing home loan to lower rates",
      "Land purchase for future home construction",
      "Plot + Construction combo loans",
    ],
    tips: [
      "A higher down payment (20-30%) improves your loan approval chances",
      "Maintain a stable job history of at least 2-3 years with current employer",
      "Keep your existing EMI obligations below 40% of monthly income",
      "Consider floating rate loans for longer tenures as rates may decrease",
      "Don't forget to claim tax benefits on principal and interest paid",
    ],
  },
  relatedArticles: [],
};

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
      <LoanProductPage service={service} loanTypeMapKey="home" content={content} />
    </>
  );
}
