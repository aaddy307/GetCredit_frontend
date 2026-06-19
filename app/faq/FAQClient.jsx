"use client";
import { useState } from "react";

import { ChevronDown } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Link from "next/link";

const faqs = [
  {
    question: "What is the minimum credit score required for a loan?",
    answerParts: [
      "The minimum CIBIL score required for most loans is 650-700. However, this may vary depending on the type of loan and the lender. A higher credit score increases your chances of approval and may help you get ",
      { text: "better interest rates", link: "/personal-loan" },
      ".",
    ],
  },
  {
    question: "How long does it take to get a loan approved?",
    answerParts: [
      "The approval time varies depending on the type of loan and your documentation. Typically, for pre-approved customers, it takes 24-48 hours. For new applicants, it may take 3-7 working days after submitting all required ",
      { text: "documents", link: "/home-loan" },
      ".",
    ],
  },
  {
    question: "What documents are required for a loan application?",
    answerParts: [
      "The basic documents required include: Identity proof (Aadhaar/PAN/Voter ID), Address proof, Income documents (Salary slips/ITR for last 2 years), Bank statements (last 6 months), Property documents (for ",
      { text: "property-related loans", link: "/loan-against-property" },
      "), and passport size photographs.",
    ],
  },
  {
    question: "Can I prepay my loan early?",
    answerParts: [
      "Yes, most loans allow prepayment. However, some lenders may charge a prepayment penalty of 1-2% on the outstanding amount. ",
      { text: "Home loans", link: "/home-loan" },
      " usually allow prepayment without charges after a certain period. It's best to check with your lender about their prepayment terms.",
    ],
  },
  {
    question: "What is the difference between fixed and floating interest rates?",
    answerParts: [
      "A fixed interest rate remains constant throughout the loan tenure, providing stability in monthly payments. A floating interest rate changes with market conditions, which means your EMI may increase or decrease. ",
      { text: "Compare loan options", link: "/emi-calculator" },
      " to understand which rate type suits you better.",
    ],
  },
  {
    question: "Can I apply for a loan with a co-applicant?",
    answerParts: [
      "Yes, having a co-applicant can improve your chances of approval and help you get a higher loan amount. Co-applicants are usually immediate family members like spouse, parents, or siblings who have a stable income. ",
      { text: "Learn about education loans with co-applicant", link: "/education-loan" },
      " for details on how this works.",
    ],
  },
  {
    question: "What is the maximum loan amount I can get?",
    answerParts: [
      "The maximum loan amount depends on several factors including your income, credit score, the type of loan, and the property value. For ",
      { text: "home loans", link: "/home-loan" },
      ", you can get up to ₹15 Crore, while ",
      { text: "education loans", link: "/education-loan" },
      " can go up to ₹1.5 Crore for studies abroad (without collateral).",
    ],
  },
  {
    question: "How is EMI calculated?",
    answerParts: [
      "EMI (Equated Monthly Installor) is calculated using the formula: EMI = [P × r × (1+r)^n] / [(1+r)^n-1]. You can use our ",
      { text: "EMI calculator", link: "/emi-calculator" },
      " for instant results without doing the math manually.",
    ],
  },
  {
    question: "What happens if I miss an EMI payment?",
    answerParts: [
      "Missing an EMI payment can result in late payment fees and negatively impact your credit score. If you continue to miss payments, the lender may initiate legal proceedings. It's advisable to inform your lender immediately if you're facing payment difficulties. Consider using our ",
      { text: "EMI calculator", link: "/emi-calculator" },
      " to plan your repayments better.",
    ],
  },
  {
    question: "Is there a processing fee for loans?",
    answerParts: [
      "Yes, most lenders charge a processing fee which is usually 0.5-1% of the loan amount. This fee covers the cost of processing your application. Some lenders may offer to waive the processing fee for premium customers or during promotional periods. ",
      { text: "Compare loan options", link: "/personal-loan" },
      " to find the best deal.",
    ],
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-linear-to-b from-white to-bg-tertiary">
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-gold-primary font-medium">FAQ</span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-2 mb-4">
                Frequently Asked <span className="text-gold-primary">Questions</span>
              </h1>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Find answers to the most commonly asked questions about our loan services
              </p>
            </div>

            <div className="space-y-4" role="list">
              {faqs.map((faq, index) => (
                <GlassCard key={index} className="p-0 overflow-hidden">
                  <h3>
                    <button
                      onClick={() => toggle(index)}
                      aria-expanded={openIndex === index}
                      aria-controls={`faq-answer-${index}`}
                      id={`faq-question-${index}`}
                      className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-gold-primary/40 focus:ring-inset rounded-xl"
                    >
                      <span className="text-lg font-medium text-gray-800 pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-gold-primary shrink-0 transition-transform ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </h3>
                  <div
                    id={`faq-answer-${index}`}
                    role="listitem"
                    aria-labelledby={`faq-question-${index}`}
                    className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="px-6 pb-6">
                      <p className="text-gray-500 leading-relaxed">
                        {faq.answerParts.map((part, i) =>
                          typeof part === "string" ? (
                            part
                          ) : (
                            <Link key={i} href={part.link} className="text-gold-primary hover:underline font-medium">
                              {part.text}
                            </Link>
                          )
                        )}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-500 mb-6">
              Can&apos;t find the answer you&apos;re looking for? Please contact our support team.
            </p>
            <Link href="/contact">
              <Button variant="primary">Contact Us</Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}