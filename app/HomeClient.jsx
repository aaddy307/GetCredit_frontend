"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Building2, GraduationCap, User, Briefcase, Car, Award, Clock, Users, ShieldCheck, ArrowRight, ChevronDown, Banknote, TrendingUp, FileCheck } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/ui/HeroSection";
import LoanCard from "@/components/ui/LoanCard";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import WhatsAppPopup from "@/components/ui/WhatsAppPopup";
import { homepageFaqSchema } from "@/lib/seo";

const loanCategories = [
  { icon: User, title: "Personal Loan", description: "Quick funds with same-day disbursement and rates starting from 9.99%.", href: "/services#personal-loan", best: true },
  { icon: Briefcase, title: "Business Loan", description: "Fuel your business growth with flexible funding solutions and competitive rates.", href: "/services#business-loan", best: true },
  { icon: Users, title: "Non-Salaried Loan", description: "Loans for self-employed & business owners based on bank transactions.", href: "/services#non-salaried-loan", best: true },
  { icon: Home, title: "Home Loan", description: "Buy your dream home with financing up to ₹15 Crore and easy EMIs.", href: "/services#home-loan" },
  { icon: Building2, title: "Loan Against Property", description: "Funding up to ₹30 Crore for Residential, Commercial & Plot.", href: "/services#loan-against-property" },
  { icon: GraduationCap, title: "Education Loan", description: "Fund your studies in India (up to ₹50L) or abroad (up to ₹1.5Cr, no collateral).", href: "/services#education-loan" },
  { icon: Car, title: "Vehicle Loan", description: "Drive your dream car with affordable EMIs and quick loan processing.", href: "/services#vehicle-loan" },
];

const whyChooseUs = [
  { icon: Clock, title: "Fast Approval", description: "Get your loan approved within 24-48 hours with minimal documentation." },
  { icon: ShieldCheck, title: "Low Documentation", description: "Simple documentation process with digital verification options." },
  { icon: Users, title: "Expert Support", description: "Dedicated relationship managers to guide you through the process." },
  { icon: Award, title: "Trusted Partners", description: "Tie-ups with 50+ leading banks and financial institutions." },
];

const processSteps = [
  { step: "01", title: "Choose Loan", description: "Select the loan type that best suits your needs" },
  { step: "02", title: "Calculate EMI", description: "Use our EMI calculator to plan your repayments" },
  { step: "03", title: "Submit Inquiry", description: "Fill out the inquiry form with your details" },
  { step: "04", title: "Executive Contact", description: "Our team will reach out within 24 hours" },
];

const testimonials = [];

export default function HomeClient({ initialBlogs }) {
  const [blogs, setBlogs] = useState(initialBlogs || []);
  const [loading, setLoading] = useState(!initialBlogs);

  useEffect(() => {
    if (!initialBlogs || initialBlogs.length === 0) {
      fetch(`/api/blogs`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setBlogs(data.blogs.slice(0, 3));
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [initialBlogs]);

  return (
    <>
      <script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqSchema()) }}
      />
      <Navbar />
      <main>
        <HeroSection />

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Loan <span className="text-gold-primary">Categories</span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Choose from our wide range of loan products designed to meet your specific needs
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {loanCategories.map((loan, index) => (
                <LoanCard key={index} {...loan} delay={index * 0.1} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-bg-tertiary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Why <span className="text-gold-primary">Choose Us</span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                We are committed to providing you with the best loan solutions
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChooseUs.map((item, index) => (
                <GlassCard key={index} delay={index * 0.1} hover className="text-center">
                  <div className="w-14 h-14 bg-gold-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-gold-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                How It <span className="text-gold-primary">Works</span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Get your loan in four simple steps
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((process, index) => (
                <div key={index} className="relative">
                  <GlassCard delay={index * 0.1} className="h-full">
                    <div className="text-4xl sm:text-6xl font-bold text-gold-primary/20 mb-4">{process.step}</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{process.title}</h3>
                    <p className="text-gray-500">{process.description}</p>
                  </GlassCard>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-gold-primary" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>



        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Latest <span className="text-gold-primary">Blogs</span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Stay updated with the latest financial news and tips
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {loading ? (
                <div className="col-span-3 text-center py-8 text-gray-500">Loading blogs...</div>
              ) : blogs.length > 0 ? (
                blogs.map((blog, index) => (
                  <GlassCard key={blog._id || index} delay={index * 0.1} hover className="overflow-hidden p-0 group">
                    <div className="h-48 bg-linear-to-br from-gold-primary/10 to-bg-tertiary flex items-center justify-center">
                      <span className="text-6xl text-gold-primary/30">📰</span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-gold-primary text-sm">{blog.category}</span>
                        <span className="text-gray-400 text-sm">{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 group-hover:text-gold-primary transition-colors">{blog.title}</h3>
                      <Link href={`/blog/${blog.slug || blog._id}`} className="text-gold-primary hover:underline">Read More →</Link>
                    </div>
                  </GlassCard>
                ))
              ) : (
                <div className="col-span-3 text-center py-8 text-gray-500">No blogs available</div>
              )}
            </div>
            <div className="text-center mt-12">
              <Link href="/blog">
                <Button variant="secondary">View All Blogs</Button>
              </Link>
            </div>
          </div>
        </section>

        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="py-20 bg-gold-primary">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Get Your Dream Home?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Calculate your EMI today and take the first step towards your new home.
            </p>
            <Link href="/emi-calculator">
              <Button variant="secondary" className="bg-white px-6 sm:px-8 py-4 text-base sm:text-lg font-semibold">
                Calculate EMI Now
              </Button>
            </Link>
          </div>
        </motion.section>

        <section className="py-20 bg-bg-tertiary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Frequently Asked <span className="text-gold-primary"> Questions</span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Find answers to common questions about our loan services
              </p>
            </motion.div>
            <FaqAccordion faqs={[
              { q: "What is the minimum CIBIL score required for a home loan?", a: "Most banks require a minimum CIBIL score of 650-700 for home loans. However, with Get Credit's tie-ups with 50+ banking partners, we can help you find suitable options even with lower scores." },
              { q: "How much loan can I get as a home loan consultant in India?", a: "Home loans in India can go up to ₹15 Crore depending on your income, property value, and credit profile. As a trusted home loan consultant, Get Credit helps you secure the maximum loan amount at competitive interest rates." },
              { q: "What documents are required for personal loan DSA application?", a: "Basic documents include identity proof (Aadhaar/PAN), address proof, income documents (salary slips or ITR for 2 years), bank statements (6 months), and property documents for home loans or LAP." },
              { q: "Can I get an education loan for abroad studies without collateral?", a: "Yes, education loans for abroad studies up to ₹1.5 Crore are available without collateral through Get Credit's partner banks. We specialize in instant personal loan and education loan processing for students." },
              { q: "What is loan against property and how does it work?", a: "Loan against property (LAP) is a secured loan where you pledge your residential, commercial property, or plot as collateral. You can get funding up to ₹30 Crore at lower interest rates compared to unsecured loans." },
            ]} />
            <div className="text-center mt-8">
              <Link href="/faq" className="text-gold-primary hover:underline font-medium">
                View All FAQs →
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Our <span className="text-gold-primary">Process</span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Simple four-step process to get your loan approved
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: FileCheck, title: "Apply", description: "Fill out our simple online form with your loan requirements and basic details." },
                { icon: Banknote, title: "Documents", description: "Submit required documents digitally - ID proof, income proof, and property details." },
                { icon: TrendingUp, title: "Bank Match", description: "Our algorithm matches you with the best-suited banks and loan products from our 50+ partners." },
                { icon: Award, title: "Disbursal", description: "Get your loan amount disbursed directly to your account within 24-48 hours of approval." },
              ].map((step, index) => (
                <GlassCard key={index} delay={index * 0.1} className="text-center">
                  <div className="w-14 h-14 bg-gold-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-7 h-7 text-gold-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm">{step.description}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      </main>
      <WhatsAppPopup />
      <Footer />
    </>
  );
}

function FaqAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <h3>
            <button
              onClick={() => toggle(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggle(index);
                }
              }}
              aria-expanded={openIndex === index}
              aria-controls={`home-faq-answer-${index}`}
              id={`home-faq-question-${index}`}
              className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-gold-primary/40 focus:ring-inset"
            >
              <span className="text-lg font-semibold text-gray-800 pr-4">{faq.q}</span>
              <ChevronDown
                className={`w-5 h-5 text-gold-primary shrink-0 transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
          </h3>
          {openIndex === index && (
            <div id={`home-faq-answer-${index}`} role="region" aria-labelledby={`home-faq-question-${index}`} className="px-6 pb-6 text-gray-500 leading-relaxed">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
