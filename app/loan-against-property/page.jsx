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
  title: "Loan Against Property in Ambernath, Thane | Up to ₹30 Crore | Get Credit",
  description: "Get loan against property up to ₹30 Crore in Ambernath, Thane. Fund Residential, Commercial & Plot properties at interest rates starting from 7.50%.",
  alternates: {
    canonical: "https://get-credit.in/loan-against-property",
  },
  openGraph: {
    url: "https://get-credit.in/loan-against-property",
    title: "Loan Against Property in Ambernath, Thane | Up to ₹30 Crore | Get Credit",
    description: "Get loan against property up to ₹30 Crore. Interest rates starting from 7.50%.",
    siteName: "GETCREDIT",
    images: [{ url: "https://get-credit.in/Logo.jpeg", width: 1200, height: 630, alt: "Get Credit Loan Against Property" }],
  },
  twitter: {
    title: "Loan Against Property | Get Credit",
    description: "Get loan against property up to ₹30 Crore at interest rates starting from 7.50%.",
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
      <LoanProductPage service={service} loanTypeMapKey="lap" />
    </>
  );
}
