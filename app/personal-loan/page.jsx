import LoanProductPage from "@/components/LoanProductPage";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo";

const service = {
  id: "personal-loan",
  title: "Personal Loan",
  description: "Quick funds for your personal needs with minimal documentation and same-day disbursement. Use for travel, weddings, medical emergencies, or any personal requirement.",
  benefits: [
    "Loan amount up to ₹1 Crore",
    "Interest rates starting from 9.99%",
    "Minimal documentation required",
    "Same-day disbursement",
    "No collateral required",
    "Flexible repayment tenure up to 5 years",
  ],
  eligibility: [
    "Age: 21-60 years",
    "Minimum income: ₹20,000/month",
    "Work experience: 1+ years",
    "CIBIL score: 700+",
    "Indian resident with valid KYC",
  ],
  documents: [
    "Identity proof (Aadhaar/PAN/Voter ID)",
    "Address proof",
    "Bank statements (3 months)",
    "Income proof (Salary slips/ITR)",
    "Passport size photos",
  ],
};

export const metadata = {
  title: "Personal Loan in Ambernath, Thane | Instant Approval | Get Credit",
  description: "Get instant personal loans in Ambernath & Thane with interest rates starting from 9.99%. Same-day disbursement, no collateral required. Apply now with minimal documentation.",
  alternates: {
    canonical: "https://get-credit.in/personal-loan",
  },
  openGraph: {
    url: "https://get-credit.in/personal-loan",
    title: "Personal Loan in Ambernath, Thane | Instant Approval | Get Credit",
    description: "Get instant personal loans in Ambernath & Thane with interest rates starting from 9.99%. Same-day disbursement, no collateral required.",
    siteName: "GETCREDIT",
    images: [{ url: "https://get-credit.in/Logo.jpeg", width: 1200, height: 630, alt: "Get Credit Personal Loan" }],
  },
  twitter: {
    title: "Personal Loan in Ambernath, Thane | Get Credit",
    description: "Get instant personal loans with interest rates starting from 9.99%. Same-day disbursement.",
    images: ["https://get-credit.in/Logo.jpeg"],
  },
};

const breadcrumbJsonLd = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Personal Loan", path: "/personal-loan" },
]);

const serviceJsonLd = serviceSchema({
  title: "Personal Loan",
  description: "Quick funds for your personal needs with minimal documentation and same-day disbursement. Interest rates starting from 9.99%.",
});

export default function PersonalLoanPage() {
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
