import LoanProductPage from "@/components/LoanProductPage";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo";

const service = {
  id: "vehicle-loan",
  title: "Vehicle Loan",
  description: "Drive your dream car with affordable EMIs and quick loan processing. New and used vehicle financing available with flexible tenure options.",
  benefits: [
    "Loan amount up to 100% of vehicle value",
    "Interest rates starting from 7.50%",
    "Repayment tenure up to 7 years",
    "Both new and used vehicles covered",
    "Zero down payment options available",
    "Quick approval and disbursement",
  ],
  eligibility: [
    "Age: 21-65 years",
    "Minimum income: ₹20,000/month",
    "CIBIL score: 650+",
    "Indian resident with valid license",
    "Work experience: 1+ years",
  ],
  documents: [
    "Identity proof (Aadhaar/PAN/Voter ID)",
    "Address proof",
    "Income proof (Salary slips/ITR)",
    "Driving license",
    "Bank statements (3 months)",
    "Passport size photos",
  ],
};

export const metadata = {
  title: "Vehicle Loan in Ambernath, Thane | Car Loan | Get Credit",
  description: "Get vehicle loans for new and used cars in Ambernath, Thane. Interest rates starting from 7.50%, tenure up to 7 years. Drive your dream car today.",
  alternates: {
    canonical: "https://get-credit.in/vehicle-loan",
  },
  openGraph: {
    url: "https://get-credit.in/vehicle-loan",
    title: "Vehicle Loan in Ambernath, Thane | Car Loan | Get Credit",
    description: "Get vehicle loans for new and used cars. Interest rates starting from 7.50%.",
    siteName: "GETCREDIT",
    images: [{ url: "https://get-credit.in/Logo.jpeg", width: 1200, height: 630, alt: "Get Credit Vehicle Loan" }],
  },
  twitter: {
    title: "Vehicle Loan | Get Credit",
    description: "Get vehicle loans for new and used cars. Interest rates starting from 7.50%.",
    images: ["https://get-credit.in/Logo.jpeg"],
  },
};

const breadcrumbJsonLd = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Vehicle Loan", path: "/vehicle-loan" },
]);

const serviceJsonLd = serviceSchema({
  title: "Vehicle Loan",
  description: "Drive your dream car with affordable EMIs. Loan for new and used vehicles with interest rates starting from 7.50%.",
});

export default function VehicleLoanPage() {
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
      <LoanProductPage service={service} loanTypeMapKey="vehicle" />
    </>
  );
}
