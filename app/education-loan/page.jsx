import LoanProductPage from "@/components/LoanProductPage";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo";

const service = {
  id: "education-loan",
  title: "Education Loan",
  description: "Fund your higher education with our education loan options. Study in India (up to ₹50L) or abroad (up to ₹1.5Cr without collateral) with easy repayment plans.",
  benefits: [
    "Loan up to ₹50 lakhs for India, ₹1.5 Cr for abroad (without collateral)",
    "Interest rates starting from 7.50%",
    "Moratorium period during studies",
    "Tax benefits under Section 80E",
    "No collateral required for abroad studies",
    "Co-borrower can be parent/spouse",
  ],
  eligibility: [
    "Age: 18-35 years",
    "Admission in recognized institution",
    "Co-borrower required for minor students",
    "Good academic record",
    "Co-borrower with stable income",
  ],
  documents: [
    "Admission letter",
    "Fee structure",
    "Income proof of co-borrower",
    "Academic records",
    "KYC documents",
    "Collateral documents (if applicable)",
  ],
};

export const metadata = {
  title: "Education Loan in Ambernath | Study India & Abroad | Get Credit",
  description: "Get education loans up to ₹1.5 Crore for abroad studies without collateral. Rates from 7.50%. Fund your dream education with Get Credit.",
  alternates: {
    canonical: "https://get-credit.in/education-loan",
  },
  openGraph: {
    url: "https://get-credit.in/education-loan",
    title: "Education Loan in Ambernath | Study India & Abroad | Get Credit",
    description: "Get education loans up to ₹1.5 Crore for abroad studies without collateral.",
    siteName: "Get Credit",
    images: [{ url: "https://get-credit.in/Logo.jpeg", width: 1200, height: 630, alt: "Get Credit Education Loan" }],
  },
  twitter: {
    title: "Education Loan | Get Credit",
    description: "Get education loans up to ₹1.5 Crore for abroad studies without collateral.",
    images: ["https://get-credit.in/Logo.jpeg"],
  },
};

const breadcrumbJsonLd = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Education Loan", path: "/education-loan" },
]);

const serviceJsonLd = serviceSchema({
  title: "Education Loan",
  description: "Fund your higher education with loans up to ₹1.5 Crore for abroad studies. Interest rates starting from 7.50%.",
});

const content = {
  overview: {
    title: "Education Loans for Indian Students: Study in India & Abroad",
    description: "Higher education costs can be substantial, especially for premium Indian institutions or international universities. Education loans provide a structured way to finance your or your child's academic dreams without depleting savings. In Maharashtra, students from Ambernath, Thane, and surrounding areas can access education loans up to ₹50 lakhs for studying in India and up to ₹1.5 Crore for studying abroad without collateral. The moratorium period allows students to focus on their studies while the co-borrower (usually a parent) manages the loan until the student completes education and starts earning.",
    useCases: [
      "Tuition fees for engineering, medical, or management programs",
      "Living expenses and accommodation costs",
      "Purchase of laptop and study materials",
      "Examination and registration fees",
      "Travel expenses for students going abroad",
      "Post-graduation professional courses in India",
      "MBA programs in top Indian B-schools",
      "Master's or PhD programs in foreign universities",
    ],
    tips: [
      "Start your education loan process 2-3 months before admission deadlines",
      "Government banks often offer lower rates for premier institutions",
      "Some banks offer 0% processing fees during promotional periods",
      "Consider education loans for diploma courses from recognized institutes",
      "Keep all admission-related documents ready for faster processing",
    ],
  },
  relatedArticles: [],
};

export default function EducationLoanPage() {
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
      <LoanProductPage service={service} loanTypeMapKey="education" content={content} />
    </>
  );
}
