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
    siteName: "Get Credit",
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

const content = {
  overview: {
    title: "Vehicle Loans in Maharashtra: New & Used Car Financing",
    description: "Whether you are looking to buy your first car, upgrade to a larger vehicle for family, or need a commercial vehicle for your business, vehicle loans in Maharashtra offer affordable financing solutions. With interest rates starting from 7.50% and repayment tenures up to 7 years, you can own a vehicle without straining your monthly budget. Both new and pre-owned vehicles are eligible, and many banks offer 100% financing on the vehicle's on-road price. For those in Ambernath, Thane, Kalyan, and surrounding areas, having a vehicle significantly improves commute quality and opens up better employment opportunities.",
    useCases: [
      "Purchase of new car for personal or family use",
      "Buying a pre-owned or certified pre-owned vehicle",
      "Commercial vehicle for business transport needs",
      "Two-wheeler loan for daily commute",
      "Loan for electric or hybrid vehicles",
      "Vehicle loan balance transfer to lower rates",
      "加装车载配件或改装升级",
      "Emergency vehicle replacement after accident",
    ],
    tips: [
      "A higher down payment reduces your EMI burden significantly",
      "Compare interest rates across banks as they can vary by 1-2%",
      "Check if your employer has tie-ups with banks for better rates",
      "Consider processing fees when comparing total loan costs",
      "Used car loans typically have slightly higher rates than new car loans",
    ],
  },
  relatedArticles: [],
};

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
      <LoanProductPage service={service} loanTypeMapKey="vehicle" content={content} />
    </>
  );
}
