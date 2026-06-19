import LoanProductPage from "@/components/LoanProductPage";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo";

const service = {
  id: "loan-against-property",
  title: "Loan Against Property",
  description: "Unlock the value of your property with funding up to ₹30 Crore. We fund Residential, Commercial & Plot properties at attractive rates.",
  benefits: [
    "Funding up to ₹30 Crore",
    "Interest rates starting from 7.50%",
    "Flexible repayment tenure up to 15 years",
    "Low processing fees",
    "Up to 80% LTV on Residential properties",
    "Up to 75% LTV on Commercial & Industrial properties",
  ],
  eligibility: [
    "Age: 21-65 years",
    "Property owner with clear title",
    "Minimum property value: ₹50 lakhs",
    "Stable income source",
    "No ongoing litigation on property",
  ],
  documents: [
    "Property documents (Title deed/Registry)",
    "Income proof",
    "KYC documents",
    "Property tax receipts",
    "Bank statements",
    "NOC from existing lender (if applicable)",
  ],
};

export const metadata = {
  title: "Loan Against Property in Ambernath | Up to ₹30 Crore | Get Credit",
  description: "Get loan against property up to ₹30 Crore in Ambernath & Thane. Fund Residential, Commercial & Plot at rates from 7.50%.",
  alternates: {
    canonical: "https://get-credit.in/loan-against-property",
  },
  openGraph: {
    url: "https://get-credit.in/loan-against-property",
    title: "Loan Against Property in Ambernath | Up to ₹30 Crore | Get Credit",
    description: "Get loan against property up to ₹30 Crore at rates from 7.50%.",
    siteName: "Get Credit",
    images: [{ url: "https://get-credit.in/Logo.jpeg", width: 1200, height: 630, alt: "Get Credit Loan Against Property" }],
  },
  twitter: {
    title: "Loan Against Property in Ambernath | Get Credit",
    description: "Get loan against property up to ₹30 Crore at rates from 7.50%.",
    images: ["https://get-credit.in/Logo.jpeg"],
  },
};

const breadcrumbJsonLd = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Loan Against Property", path: "/loan-against-property" },
]);

const serviceJsonLd = serviceSchema({
  title: "Loan Against Property",
  description: "Unlock the value of your property with funding up to ₹30 Crore. Interest rates starting from 7.50%.",
});

const content = {
  overview: {
    title: "Loan Against Property: Unlock Your Property's Value",
    description: "A Loan Against Property (LAP) is one of the most versatile financial products available for property owners in Maharashtra. Unlike home loans which are specifically for purchasing property, LAP allows you to leverage any owned property - residential, commercial, or even plot land - to secure substantial funding for business expansion, medical emergencies, education expenses, or any other financial need. With funding up to ₹30 Crore and interest rates starting from 7.50%, LAP offers lower rates than personal or business loans since it's secured against your property. The loan amount typically ranges from 50-80% of the property's market value depending on the property type and your credit profile.",
    useCases: [
      "Business expansion and working capital needs",
      "Medical treatment and healthcare expenses",
      "Children's education and wedding expenses",
      "Debt consolidation and clearing high-interest debts",
      "Purchasing additional property or investments",
      "Home renovation without disturbing savings",
      "Emergency cash requirements",
      "Starting a new venture or side business",
    ],
    tips: [
      "Residential properties typically offer higher LTV ratios than commercial properties",
      "Properties with clear title and no legal disputes get approved faster",
      "Maintaining a good credit score improves your LAP interest rate",
      "Consider the loan tenure carefully - longer tenure means more interest paid",
      "Some banks offer flexible repayment options for LAP",
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

export default function LoanAgainstPropertyPage() {
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
      <LoanProductPage service={service} loanTypeMapKey="lap" content={content} />
    </>
  );
}
