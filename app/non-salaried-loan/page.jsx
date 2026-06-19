import LoanProductPage from "@/components/LoanProductPage";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo";

const service = {
  id: "non-salaried-loan",
  title: "Non-Salaried Loan",
  description: "Designed for self-employed professionals and business owners whose income is not credited to a bank account. Get funding based on your bank transactions and CIBIL score.",
  benefits: [
    "Loan amount up to ₹10 lakhs",
    "No salary account required",
    "Based on bank transaction history",
    "Quick approval and disbursement",
    "No collateral required",
    "Flexible repayment tenure up to 5 years",
  ],
  eligibility: [
    "Age: 21-60 years",
    "Good CIBIL score",
    "Good bank account transactions (6+ months)",
    "Valid KYC documents",
    "Indian resident",
  ],
  documents: [
    "Identity proof (Aadhaar/PAN/Voter ID)",
    "Address proof",
    "Bank statements (6+ months with good transactions)",
    "ITR (if filed)",
    "Passport size photos",
    "Business proof (if applicable)",
  ],
};

export const metadata = {
  title: "Non-Salaried Loan in Ambernath, Thane | Self-Employed | Get Credit",
  description: "Get loans for self-employed professionals and business owners in Ambernath, Thane. Based on bank transactions, no salary account required. Apply now.",
  alternates: {
    canonical: "https://get-credit.in/non-salaried-loan",
  },
  openGraph: {
    url: "https://get-credit.in/non-salaried-loan",
    title: "Non-Salaried Loan in Ambernath, Thane | Self-Employed | Get Credit",
    description: "Get loans for self-employed professionals. Based on bank transactions, no salary account required.",
    siteName: "Get Credit",
    images: [{ url: "https://get-credit.in/Logo.jpeg", width: 1200, height: 630, alt: "Get Credit Non-Salaried Loan" }],
  },
  twitter: {
    title: "Non-Salaried Loan | Get Credit",
    description: "Get loans for self-employed professionals based on bank transactions.",
    images: ["https://get-credit.in/Logo.jpeg"],
  },
};

const breadcrumbJsonLd = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Non-Salaried Loan", path: "/non-salaried-loan" },
]);

const serviceJsonLd = serviceSchema({
  title: "Non-Salaried Loan",
  description: "Loans for self-employed professionals and business owners based on bank transactions and CIBIL score.",
});

const content = {
  overview: {
    title: "Loans for Self-Employed & Non-Salaried Professionals in Maharashtra",
    description: "Self-employed professionals, freelancers, small business owners, and individuals with non-traditional income sources often struggle to get loans from traditional banks that primarily cater to salaried employees. Non-salaried loans specifically address this gap by evaluating your income based on bank transaction history, business vintage, and CIBIL score rather than salary slips. Whether you are a freelancer in Mumbai, a small shop owner in Thane, or a successful trader in Ambernath, our partner banks offer personalized loan products that recognize your unique income pattern.",
    useCases: [
      "Growing your freelance or consulting practice",
      "Purchasing equipment for your business",
      "Managing irregular income periods between projects",
      "Expanding your small retail or wholesale business",
      "Investing in professional certifications or training",
      "Managing seasonal business fluctuations",
      "Purchasing inventory for your shop or store",
      "Emergency personal expenses between project payments",
    ],
    tips: [
      "Maintain healthy bank transactions showing regular income for 6+ months",
      "Avoid large cash deposits that cannot be explained",
      "Keep your business and personal bank accounts separate",
      "A CIBIL score of 700+ significantly improves approval chances",
      "Having GST registration strengthens your loan application",
    ],
  },
  relatedArticles: [],
};

export default function NonSalariedLoanPage() {
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
      <LoanProductPage service={service} loanTypeMapKey="personal" content={content} />
    </>
  );
}
