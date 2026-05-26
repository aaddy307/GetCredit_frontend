"use client";
import { motion } from "framer-motion";
import { Home, Building2, GraduationCap, User, Briefcase, Car, Award, CheckCircle, FileText, Clock, ArrowRight, Info } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import { useModal } from "@/context/ModalContext";

const serviceIcons = {
  "Personal Loan": User,
  "Business Loan": Briefcase,
  "Non-Salaried Loan": User,
  "Home Loan": Home,
  "Loan Against Property": Building2,
  "Education Loan": GraduationCap,
  "Vehicle Loan": Car,
};

const loanTypeMap = {
  "Personal Loan": "personal",
  "Business Loan": "business",
  "Non-Salaried Loan": "personal",
  "Home Loan": "home",
  "Loan Against Property": "lap",
  "Education Loan": "education",
  "Vehicle Loan": "vehicle",
};

export default function ServicesPage() {
  const { openEnquiry } = useModal();

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

            {SERVICES.map((service, index) => {
              const Icon = serviceIcons[service.title] || User;
              const isPersonal = service.id === "personal-loan";
              return (
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
                            <Icon className={`w-8 h-8 ${service.priority ? 'text-white' : 'text-[#C9A84C]'}`} />
                          </div>
                          <h2 className={`text-3xl font-bold ${service.priority ? 'text-gray-900' : 'text-gray-800'}`}>{service.title}</h2>
                        </div>
                        <p className="text-gray-500 text-lg mb-8">{service.description}</p>
                        <div className="flex flex-wrap gap-3">
                          <Link href="/emi-calculator">
                            <Button variant={service.priority ? "primary" : "primary"} className="flex items-center gap-2">
                              Calculate EMI <ArrowRight className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="secondary"
                            onClick={() => openEnquiry(loanTypeMap[service.title] || "personal")}
                            className="flex items-center gap-2"
                          >
                            Apply Now <ArrowRight className="w-4 h-4" />
                          </Button>
                        </div>
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
                        {isPersonal && (
                          <div className="mt-4 p-3 bg-[#C9A84C]/5 border border-[#C9A84C]/20 rounded-lg">
                            <p className="text-sm text-gray-700">
                              <span className="font-semibold text-[#C9A84C]">Maximum Personal Loan for Non-Salaried applicants: ₹10 Lakhs</span>
                            </p>
                          </div>
                        )}
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
                        {isPersonal && (
                          <div className="mt-6 p-4 bg-blue-50/80 border border-blue-200/60 rounded-xl flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Info className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-700 leading-relaxed">
                                <span className="font-semibold text-blue-700">Note:</span> Applicants with CIBIL score above 650 may still be eligible even if they have recent bounce history. Approval depends on bank scorecard and final CIBIL verification. <span className="font-medium text-gray-500">Terms &amp; Conditions apply.</span>
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                </section>
              );
            })}
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
