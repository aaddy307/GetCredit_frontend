import FAQClient from "./FAQClient";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata = {
  title: "Loan FAQs — Common Questions Answered | Get Credit",
  description: "Got questions about loans? Find answers to the most common questions about eligibility, documents, EMI, interest rates and more at Get Credit.",
  alternates: {
    canonical: "https://get-credit.in/faq",
    languages: {
      "en-IN": "https://get-credit.in/faq",
      "en": "https://get-credit.in/faq",
    },
  },
  openGraph: {
    url: "https://get-credit.in/faq",
    title: "Loan FAQs — Common Questions Answered | Get Credit",
    description: "Got questions about loans? Find answers to the most common questions about eligibility, documents, EMI, interest rates and more at Get Credit.",
    siteName: "GETCREDIT",
    images: [{ url: "https://get-credit.in/Logo.jpeg", width: 256, height: 256, alt: "Get Credit Logo" }],
  },
  twitter: {
    title: "Loan FAQs — Common Questions Answered | Get Credit",
    description: "Got questions about loans? Find answers to the most common questions about eligibility, documents, EMI, interest rates and more at Get Credit.",
    images: ["https://get-credit.in/Logo.jpeg"],
  }
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the minimum credit score required for a loan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The minimum CIBIL score required for most loans is 650-700. However, this may vary depending on the type of loan and the lender. A higher credit score increases your chances of approval and may help you get better interest rates."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to get a loan approved?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The approval time varies depending on the type of loan and your documentation. Typically, for pre-approved customers, it takes 24-48 hours. For new applicants, it may take 3-7 working days after submitting all required documents."
      }
    },
    {
      "@type": "Question",
      "name": "What documents are required for a loan application?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The basic documents required include: Identity proof (Aadhaar/PAN/Voter ID), Address proof, Income documents (Salary slips/ITR for last 2 years), Bank statements (last 6 months), Property documents (for property-related loans), and passport size photographs."
      }
    },
    {
      "@type": "Question",
      "name": "Can I prepay my loan early?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, most loans allow prepayment. However, some lenders may charge a prepayment penalty of 1-2% on the outstanding amount. Home loans usually allow prepayment without charges after a certain period. It's best to check with your lender about their prepayment terms."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between fixed and floating interest rates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A fixed interest rate remains constant throughout the loan tenure, providing stability in monthly payments. A floating interest rate changes with market conditions, which means your EMI may increase or decrease. Floating rates are generally lower than fixed rates."
      }
    },
    {
      "@type": "Question",
      "name": "Can I apply for a loan with a co-applicant?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, having a co-applicant can improve your chances of approval and help you get a higher loan amount. Co-applicants are usually immediate family members like spouse, parents, or siblings who have a stable income."
      }
    },
    {
      "@type": "Question",
      "name": "What is the maximum loan amount I can get?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The maximum loan amount depends on several factors including your income, credit score, the type of loan, and the property value. For home loans, you can get up to ₹15 Crore, while education loans can go up to ₹1.5 Crore for studies abroad (without collateral)."
      }
    },
    {
      "@type": "Question",
      "name": "How is EMI calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "EMI (Equated Monthly Installment) is calculated using the formula: EMI = [P × r × (1+r)^n] / [(1+r)^n-1], where P is the principal loan amount, r is the monthly interest rate, and n is the number of monthly installments. You can use our EMI calculator for instant results."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if I miss an EMI payment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Missing an EMI payment can result in late payment fees and negatively impact your credit score. If you continue to miss payments, the lender may initiate legal proceedings. It's advisable to inform your lender immediately if you're facing payment difficulties."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a processing fee for loans?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, most lenders charge a processing fee which is usually 0.5-1% of the loan amount. This fee covers the cost of processing your application. Some lenders may offer to waive the processing fee for premium customers or during promotional periods."
      }
    }
  ]
};

const breadcrumbJsonLd = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'FAQ', path: '/faq' },
]);

export default function FAQPage() {
  return (
    <>
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FAQClient />
    </>
  );
}