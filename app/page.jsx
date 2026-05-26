"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Building2, GraduationCap, User, Briefcase, Car, Award, Clock, Users, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/ui/HeroSection";
import LoanCard from "@/components/ui/LoanCard";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import WhatsAppPopup from "@/components/ui/WhatsAppPopup";

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

const testimonials = [
  { name: "Rajesh Sharma", role: "Home Loan Customer", message: "Get Credit made my home buying journey smooth. The team guided me through every step.", rating: 5 },
  { name: "Priya Menon", role: "Education Loan Customer", message: "Excellent service! Got my education loan approved quickly for my master's degree.", rating: 5 },
  { name: "Amit Patel", role: "Business Loan Customer", message: "Professional approach and competitive rates. Highly recommended for loan services.", rating: 5 },
];

export default function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/blogs`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setBlogs(data.blogs.slice(0, 3));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch blogs:', err);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Loan <span className="text-[#C9A84C]">Categories</span>
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

        <section className="py-20 bg-[#F5F3EE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Why <span className="text-[#C9A84C]">Choose Us</span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                We are committed to providing you with the best loan solutions
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChooseUs.map((item, index) => (
                <GlassCard key={index} delay={index * 0.1} hover className="text-center">
                  <div className="w-14 h-14 bg-[#C9A84C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-[#C9A84C]" />
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
                How It <span className="text-[#C9A84C]">Works</span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Get your loan in four simple steps
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((process, index) => (
                <div key={index} className="relative">
                  <GlassCard delay={index * 0.1} className="h-full">
                    <div className="text-4xl sm:text-6xl font-bold text-[#C9A84C]/20 mb-4">{process.step}</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{process.title}</h3>
                    <p className="text-gray-500">{process.description}</p>
                  </GlassCard>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-[#C9A84C]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#F5F3EE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                What Our <span className="text-[#C9A84C]">Clients Say</span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Trusted by thousands of happy customers
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <GlassCard key={index} delay={index * 0.1} hover>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-[#C9A84C]">★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6">"{testimonial.message}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#C9A84C]/20 rounded-full flex items-center justify-center">
                      <span className="text-[#C9A84C] font-semibold">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="text-gray-800 font-medium">{testimonial.name}</div>
                      <div className="text-gray-400 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Latest <span className="text-[#C9A84C]">Blogs</span>
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
                    <div className="h-48 bg-gradient-to-br from-[#C9A84C]/10 to-[#F5F3EE] flex items-center justify-center">
                      <span className="text-6xl text-[#C9A84C]/30">📰</span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-[#C9A84C] text-sm">{blog.category}</span>
                        <span className="text-gray-400 text-sm">{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 group-hover:text-[#C9A84C] transition-colors">{blog.title}</h3>
                      <Link href={`/blog/${blog.slug || blog._id}`} className="text-[#C9A84C] hover:underline">Read More →</Link>
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

        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="py-20 bg-gradient-to-r from-[#C9A84C] to-[#E5C76B]">
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
      </main>
      <WhatsAppPopup />
      <Footer />
    </>
  );
}