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
    siteName: "GETCREDIT",
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
      <LoanProductPage service={service} loanTypeMapKey="personal" />
    </>
  );
}
