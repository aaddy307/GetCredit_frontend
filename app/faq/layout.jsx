import { faqSchema } from "@/lib/seo";

const faqs = [
  {
    question: "What is the minimum credit score required for a loan?",
    answer: "The minimum CIBIL score required for most loans is 650-700. However, this may vary depending on the type of loan and the lender. A higher credit score increases your chances of approval and may help you get better interest rates.",
  },
  {
    question: "How long does it take to get a loan approved?",
    answer: "The approval time varies depending on the type of loan and your documentation. Typically, for pre-approved customers, it takes 24-48 hours. For new applicants, it may take 3-7 working days after submitting all required documents.",
  },
  {
    question: "What documents are required for a loan application?",
    answer: "The basic documents required include Identity proof (Aadhaar/PAN/Voter ID), Address proof, Income documents (Salary slips/ITR for last 2 years), Bank statements (last 6 months), Property documents (for property-related loans), and passport size photographs.",
  },
  {
    question: "Can I prepay my loan early?",
    answer: "Yes, most loans allow prepayment. However, some lenders may charge a prepayment penalty of 1-2% on the outstanding amount. Home loans usually allow prepayment without charges after a certain period.",
  },
  {
    question: "What is the difference between fixed and floating interest rates?",
    answer: "A fixed interest rate remains constant throughout the loan tenure, providing stability in monthly payments. A floating interest rate changes with market conditions, which means your EMI may increase or decrease. Floating rates are generally lower than fixed rates.",
  },
  {
    question: "Can I apply for a loan with a co-applicant?",
    answer: "Yes, having a co-applicant can improve your chances of approval and help you get a higher loan amount. Co-applicants are usually immediate family members like spouse, parents, or siblings who have a stable income.",
  },
  {
    question: "What is the maximum loan amount I can get?",
    answer: "The maximum loan amount depends on several factors including your income, credit score, the type of loan, and the property value. For home loans, you can get up to ₹15 Crore, while education loans can go up to ₹1.5 Crore for studies abroad.",
  },
  {
    question: "How is EMI calculated?",
    answer: "EMI (Equated Monthly Installment) is calculated using the formula: EMI = [P × r × (1+r)^n] / [(1+r)^n-1], where P is the principal loan amount, r is the monthly interest rate, and n is the number of monthly installments. You can use our EMI calculator for instant results.",
  },
  {
    question: "What happens if I miss an EMI payment?",
    answer: "Missing an EMI payment can result in late payment fees and negatively impact your credit score. If you continue to miss payments, the lender may initiate legal proceedings.",
  },
  {
    question: "Is there a processing fee for loans?",
    answer: "Yes, most lenders charge a processing fee which is usually 0.5-1% of the loan amount. Some lenders may offer to waive the processing fee for premium customers or during promotional periods.",
  },
];

export const metadata = {
  title: "Frequently Asked Questions",
  description: "Find answers to commonly asked questions about loan services, CIBIL score requirements, EMI calculation, interest rates, document requirements, and loan approval process at Get Credit.",
  openGraph: {
    title: "Frequently Asked Questions | Get Credit",
    description: "Find answers to commonly asked questions about loans, CIBIL scores, EMI calculation, and more at Get Credit.",
    url: "https://get-credit.in/faq",
  },
  twitter: {
    title: "Frequently Asked Questions | Get Credit",
    description: "Find answers to commonly asked loan questions at Get Credit.",
  },
};

export default function FAQLayout({ children }) {
  return (
    <>
      {children}
      <script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
    </>
  );
}
