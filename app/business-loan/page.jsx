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
  title: "Business Loan in Ambernath | Up to ₹5 Crore | Get Credit",
  description: "Get business loans up to ₹5 Crore in Ambernath & Thane with rates from 8.50%. Quick disbursement within 48 hours. Fuel your business growth.",
  alternates: {
    canonical: "https://get-credit.in/business-loan",
  },
  openGraph: {
    url: "https://get-credit.in/business-loan",
    title: "Business Loan in Ambernath | Up to ₹5 Crore | Get Credit",
    description: "Get business loans up to ₹5 Crore with rates from 8.50%. Quick disbursement within 48 hours.",
    siteName: "Get Credit",
    images: [{ url: "https://get-credit.in/Logo.jpeg", width: 1200, height: 630, alt: "Get Credit Business Loan" }],
  },
  twitter: {
    title: "Business Loan in Ambernath | Get Credit",
    description: "Get business loans up to ₹5 Crore with rates from 8.50%.",
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

const content = {
  overview: {
    title: "Business Loans for MSMEs and Startups in Maharashtra",
    description: "Small businesses and MSMEs in Maharashtra often struggle to access formal credit due to lack of collateral or limited credit history. Business loans bridge this gap by providing unsecured funding based on your business turnover, vintage, and financial health. Whether you run a manufacturing unit in Ambernath, a retail shop in Kalyan, or a service business in Thane, our partner banks offer customized business loan products to meet your working capital needs, equipment purchase, or expansion plans.",
    useCases: [
      "Working capital management and cash flow gaps",
      "Purchasing inventory and raw materials in bulk",
      "Equipment purchase and machinery upgrades",
      "Expanding to new locations or opening branches",
      "Hiring and training new employees",
      "Marketing and brand building activities",
      "Technology adoption and digital transformation",
      "Meeting seasonal demand fluctuations",
    ],
    tips: [
      "Ensure your business has been operational for at least 3 years for best rates",
      "Maintain healthy bank statements showing consistent transactions",
      "File GST returns regularly as most banks require this",
      "Keep your business and personal finances separate",
      "Consider MSME loans if you qualify for government-subsidized rates",
    ],
  },
  relatedArticles: [
    {
      slug: "loan-against-property-business-expansion",
      title: "Loan Against Property for Business Expansion: A Complete Guide",
      category: "LAP",
      excerpt: "How to leverage your property to fund your business growth",
    },
  ],
};

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
      <LoanProductPage service={service} loanTypeMapKey="business" content={content} />
    </>
  );
}
