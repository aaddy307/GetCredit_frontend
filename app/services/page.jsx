"use client";
import { motion } from "framer-motion";
import { Home, Building2, GraduationCap, User, Briefcase, Car, Award, CheckCircle, FileText, Clock, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Link from "next/link";

const services = [
  {
    id: "personal-loan",
    icon: User,
    title: "Personal Loan",
    description: "Quick funds for your personal needs with minimal documentation and instant approval. Use for travel, weddings, medical emergencies, or any personal requirement.",
    priority: true,
    benefits: [
      "Loan amount up to ₹25 lakhs",
      "Interest rates starting from 7.99%",
      "Minimal documentation required",
      "Same-day approval and disbursement",
      "No collateral required",
      "Flexible repayment tenure up to 5 years",
    ],
    eligibility: [
      "Age: 21-60 years",
      "Minimum income: ₹20,000/month",
      "Work experience: 1+ years",
      "CIBIL score: 700+",
      "Indian resident with valid KYC",
    ],
    documents: [
      "Identity proof (Aadhaar/PAN/Voter ID)",
      "Address proof",
      "Bank statements (3 months)",
      "Income proof (Salary slips/ITR)",
      "Passport size photos",
    ],
  },
  {
    id: "business-loan",
    icon: Briefcase,
    title: "Business Loan",
    description: "Fuel your business growth with flexible funding solutions. Expand operations, purchase inventory, or manage working capital with ease.",
    priority: true,
    benefits: [
      "Loan amount up to ₹2 Crores",
      "Interest rates starting from 8.50%",
      "Flexible repayment tenure up to 7 years",
      "Minimal collateral options available",
      "Quick disbursement within 48 hours",
      "Overdraft facility available",
    ],
    eligibility: [
      "Age: 25-65 years",
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
  },
  {
    id: "home-loan",
    icon: Home,
    title: "Home Loan",
    description: "Realize your dream of owning a home with our competitive home loan options. We offer attractive interest rates, flexible repayment tenure, and minimal documentation.",
    benefits: [
      "Competitive interest rates starting from 6.50%",
      "Loan tenure up to 30 years",
      "100% financing available",
      "Quick approval and disbursement",
      "Balance transfer facility available",
    ],
    eligibility: [
      "Age: 21-65 years",
      "Minimum income: ₹25,000/month",
      "Work experience: 2+ years",
      "CIBIL score: 650+",
      "Indian resident",
    ],
    documents: [
      "Identity proof (Aadhaar/PAN/Voter ID)",
      "Address proof",
      "Income documents (Salary slips/ITR)",
      "Property documents",
      "Bank statements (6 months)",
      "Passport size photos",
    ],
  },
  {
    id: "loan-against-property",
    icon: Building2,
    title: "Loan Against Property",
    description: "Unlock the value of your property to meet your business or personal financial needs. Get high loan amounts at attractive interest rates.",
    benefits: [
      "Loan amount up to 70% of property value",
      "Interest rates starting from 7.50%",
      "Flexible repayment tenure up to 15 years",
      "Low processing fees",
      "Both residential and commercial properties",
    ],
    eligibility: [
      "Age: 25-65 years",
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
      "Legal opinion/approval",
    ],
  },
  {
    id: "education-loan",
    icon: GraduationCap,
    title: "Education Loan",
    description: "Fund your higher education or your child's academic aspirations with our education loan options. Study in India or abroad with easy repayment plans.",
    benefits: [
      "Loan up to ₹50 lakhs for India, ₹1 Cr for abroad",
      "Interest rates starting from 7.50%",
      "Moratorium period during studies",
      "Tax benefits under Section 80E",
      "Part-time work options for students",
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
  },
  {
    id: "vehicle-loan",
    icon: Car,
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
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-20 bg-gradient-to-b from-white to-[#F5F3EE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <span className="text-[#C9A84C] font-medium">Our Services</span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-2 mb-4">
                Comprehensive Loan <span className="text-[#C9A84C]">Solutions</span>
              </h1>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Choose from our wide range of loan products designed to meet your specific needs
              </p>
            </motion.div>

            {services.map((service, index) => (
              <section key={service.id} id={service.id} className="py-16">
                <GlassCard className={`p-8 md:p-12 relative ${service.priority ? 'ring-2 ring-[#C9A84C]/40 shadow-lg shadow-[#C9A84C]/10' : ''}`}>
                  {service.priority && (
                    <div className="absolute -top-3 right-6 bg-gradient-to-r from-[#C9A84C] to-[#E5C76B] text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg z-10">
                      <Award className="w-3 h-3" />
                      Best in Class
                    </div>
                  )}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${service.priority ? 'bg-gradient-to-br from-[#C9A84C] to-[#E5C76B]' : 'bg-[#C9A84C]/10'}`}>
                          <service.icon className={`w-8 h-8 ${service.priority ? 'text-white' : 'text-[#C9A84C]'}`} />
                        </div>
                        <h2 className={`text-3xl font-bold ${service.priority ? 'text-gray-900' : 'text-gray-800'}`}>{service.title}</h2>
                      </div>
                      <p className="text-gray-500 text-lg mb-8">{service.description}</p>
                      <Link href="/emi-calculator">
                        <Button variant={service.priority ? "primary" : "primary"} className="flex items-center gap-2">
                          Calculate EMI <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                    <div className="grid gap-6">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <CheckCircle className="w-5 h-5 text-[#C9A84C]" />
                          <h3 className="text-lg font-semibold text-gray-800">Benefits</h3>
                        </div>
                        <ul className="space-y-2">
                          {service.benefits.map((benefit, i) => (
                            <li key={i} className="text-gray-500 flex items-start gap-2">
                              <span className="text-[#C9A84C] mt-1">•</span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-8 border-t border-[#C9A84C]/10">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-5 h-5 text-[#C9A84C]" />
                        <h3 className="text-lg font-semibold text-gray-800">Eligibility Criteria</h3>
                      </div>
                      <ul className="space-y-2">
                        {service.eligibility.map((eligibility, i) => (
                          <li key={i} className="text-gray-500 flex items-start gap-2">
                            <span className="text-[#C9A84C] mt-1">•</span>
                            {eligibility}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <FileText className="w-5 h-5 text-[#C9A84C]" />
                        <h3 className="text-lg font-semibold text-gray-800">Required Documents</h3>
                      </div>
                      <ul className="space-y-2">
                        {service.documents.map((doc, i) => (
                          <li key={i} className="text-gray-500 flex items-start gap-2">
                            <span className="text-[#C9A84C] mt-1">•</span>
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </GlassCard>
              </section>
            ))}
          </div>
        </section>

        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="py-20 bg-gradient-to-r from-[#C9A84C] to-[#E5C76B]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Need Help Choosing the Right Loan?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Our experts are here to guide you through the process.
            </p>
            <Link href="/contact">
              <Button variant="secondary" className="bg-white">
                Talk to an Expert
              </Button>
            </Link>
          </div>
        </motion.section>
      </main>
      <Footer />
    </>
  );
}