import LoanProductPage from "@/components/LoanProductPage";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo";

const service = {
  id: "business-loan",
  title: "Business Loan",
  description: "Fuel your business growth with flexible funding solutions. Expand operations, purchase inventory, or manage working capital with ease.",
  benefits: [
    "Loan amount up to ₹5 Crores",
    "Interest rates starting from 8.50%",
    "Flexible repayment tenure up to 7 years",
    "Minimal collateral options available",
    "Quick disbursement within 48 hours",
    "Overdraft facility available",
  ],
  eligibility: [
    "Age: 21-25 years",
    "Business vintage: 3+ years",
    "Minimum turnover: ₹5 lakhs/year",
    "CIBIL score: 680+",
    "GST registration preferred",
  ],
  documents: [
    "Business registration proof",
    "ITR for last 2 years",
    "Bank statements (6 months)",
    "GST returns",
    "KYC of business owner(s)",
    "Business continuity proof",
  ],
};

export const metadata = {
  title: "Business Loan in Ambernath, Thane | Up to ₹5 Crore | Get Credit",
  description: "Get business loans up to ₹5 Crore in Ambernath, Thane with interest rates starting from 8.50%. Quick disbursement within 48 hours. Fuel your business growth today.",
  alternates: {
    canonical: "https://get-credit.in/business-loan",
  },
  openGraph: {
    url: "https://get-credit.in/business-loan",
    title: "Business Loan in Ambernath, Thane | Up to ₹5 Crore | Get Credit",
    description: "Get business loans up to ₹5 Crore with interest rates starting from 8.50%. Quick disbursement within 48 hours.",
    siteName: "GETCREDIT",
    images: [{ url: "https://get-credit.in/Logo.jpeg", width: 1200, height: 630, alt: "Get Credit Business Loan" }],
  },
  twitter: {
    title: "Business Loan in Ambernath, Thane | Get Credit",
    description: "Get business loans up to ₹5 Crore with interest rates starting from 8.50%.",
    images: ["https://get-credit.in/Logo.jpeg"],
  },
};

const breadcrumbJsonLd = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Business Loan", path: "/business-loan" },
]);

const serviceJsonLd = serviceSchema({
  title: "Business Loan",
  description: "Fuel your business growth with flexible funding solutions up to ₹5 Crores. Interest rates starting from 8.50%.",
});

export default function BusinessLoanPage() {
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
      <LoanProductPage service={service} loanTypeMapKey="business" />
    </>
  );
}
