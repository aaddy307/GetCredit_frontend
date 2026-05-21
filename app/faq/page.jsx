"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Link from "next/link";

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
    answer: "The basic documents required include: Identity proof (Aadhaar/PAN/Voter ID), Address proof, Income documents (Salary slips/ITR for last 2 years), Bank statements (last 6 months), Property documents (for property-related loans), and passport size photographs.",
  },
  {
    question: "Can I prepay my loan early?",
    answer: "Yes, most loans allow prepayment. However, some lenders may charge a prepayment penalty of 1-2% on the outstanding amount. Home loans usually allow prepayment without charges after a certain period. It's best to check with your lender about their prepayment terms.",
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
    answer: "The maximum loan amount depends on several factors including your income, credit score, the type of loan, and the property value. For home loans, you can get up to ₹5 Crore, while education loans can go up to ₹1 Crore for studies abroad.",
  },
  {
    question: "How is EMI calculated?",
    answer: "EMI (Equated Monthly Installment) is calculated using the formula: EMI = [P × r × (1+r)^n] / [(1+r)^n-1], where P is the principal loan amount, r is the monthly interest rate, and n is the number of monthly installments. You can use our EMI calculator for instant results.",
  },
  {
    question: "What happens if I miss an EMI payment?",
    answer: "Missing an EMI payment can result in late payment fees and negatively impact your credit score. If you continue to miss payments, the lender may initiate legal proceedings. It's advisable to inform your lender immediately if you're facing payment difficulties.",
  },
  {
    question: "Is there a processing fee for loans?",
    answer: "Yes, most lenders charge a processing fee which is usually 0.5-1% of the loan amount. This fee covers the cost of processing your application. Some lenders may offer to waive the processing fee for premium customers or during promotional periods.",
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
      <main className="pt-20 min-h-screen bg-gradient-to-b from-white to-[#F5F3EE]">
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#C9A84C] font-medium">FAQ</span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-2 mb-4">
                Frequently Asked <span className="text-[#C9A84C]">Questions</span>
              </h1>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Find answers to the most commonly asked questions about our loan services
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <GlassCard key={index} className="p-0 overflow-hidden">
                  <button
                    onClick={() => toggle(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                  >
                    <span className="text-lg font-medium text-gray-800 pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#C9A84C] flex-shrink-0 transition-transform ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <p className="text-gray-500 leading-relaxed">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
              Can't find the answer you're looking for? Please contact our support team.
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