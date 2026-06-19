"use client";
import { Target, Eye, Users, Award, Clock, ShieldCheck, Building2, Phone } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";

const stats = [
  { value: "50+", label: "Banking Partners" },
  { value: "10,000+", label: "Happy Customers" },
  { value: "₹500Cr+", label: "Loans Disbursed" },
  { value: "4.8/5", label: "Customer Rating" },
];

const values = [
  { icon: ShieldCheck, title: "Transparency", description: "We believe in complete transparency. No hidden charges, no surprise fees. What you see is what you get." },
  { icon: Clock, title: "Speed", description: "Time is money. Our streamlined process ensures you get loan approvals within 24-48 hours." },
  { icon: Users, title: "Customer First", description: "Your needs come first. We work around your schedule and requirements, not the other way around." },
  { icon: Award, title: "Expertise", description: "With decades of combined experience in banking and finance, our team knows how to get you the best deals." },
];

const teamValues = [
  { icon: Building2, title: "Strong Banking Partnerships", description: "Our relationships with 50+ banks and financial institutions mean we can shop around for the best rates on your behalf." },
  { icon: Target, title: "Tailored Solutions", description: "One size doesn't fit all. We analyze your financial situation to recommend the most suitable loan products." },
  { icon: Eye, title: "Pan-Maharashtra Presence", description: "From Ambernath to Mumbai, we serve customers across Maharashtra with the same commitment to excellence." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-20 bg-linear-to-b from-white to-bg-tertiary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fade-in-up">
              <div>
                <span className="text-gold-primary font-medium">About Get Credit</span>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-2 mb-6">
                  Your Trusted Loan Consultancy Partner in Maharashtra
                </h1>
                <p className="text-gray-500 text-lg mb-6">
                  Get Credit is a leading loan consultancy and DSA (Direct Selling Agent)
                  business committed to helping individuals and families achieve their dreams
                  of owning a home, funding their education, or expanding their business.
                  Based in Ambernath, we proudly serve customers across Maharashtra.
                </p>
                <p className="text-gray-500 text-lg mb-6">
                  With years of experience and partnerships with over 50 leading banks and
                  financial institutions including HDFC, SBI, ICICI, Axis, and more, we provide
                  personalized loan solutions tailored to your unique needs and financial situation.
                </p>
                <p className="text-gray-500 text-lg mb-8">
                  Whether you are a salaried professional in Thane, a business owner in Kalyan,
                  or a first-time loan applicant in Ulhasnagar, our expert team guides you through
                  every step of the loan process—from application to disbursement.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/services">
                    <Button variant="primary">Explore Our Services</Button>
                  </Link>
                  <a href="tel:+917738205198">
                    <Button variant="secondary" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Call Us Now
                    </Button>
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gold-primary/10 rounded-3xl flex items-center justify-center border border-gold-primary/10">
                  <div className="text-center">
                    <span className="text-8xl">🏦</span>
                    <p className="text-gold-primary mt-4 font-semibold">Serving Since 2020</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-bg-tertiary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Why People Choose Us</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Our track record speaks for itself. Here is what sets us apart from other loan consultancies in the region.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <GlassCard key={index} hover className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-gold-primary mb-2">{stat.value}</div>
                  <div className="text-gray-500">{stat.label}</div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <GlassCard hover className="flex gap-6">
                <div className="w-16 h-16 bg-gold-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Target className="w-8 h-8 text-gold-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Our Mission</h3>
                  <p className="text-gray-500">
                    To make loan services accessible, transparent, and hassle-free for
                    every individual. We strive to empower our clients with the right
                    financial products that align with their goals and aspirations.
                    From home loans to personal loans, we ensure you get the best deal.
                  </p>
                </div>
              </GlassCard>
              <GlassCard hover className="flex gap-6">
                <div className="w-16 h-16 bg-gold-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Eye className="w-8 h-8 text-gold-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Our Vision</h3>
                  <p className="text-gray-500">
                    To become the most trusted and preferred loan consultancy in India,
                    known for our integrity, expertise, and exceptional customer service.
                    We envision a future where everyone has access to affordable credit,
                    regardless of their location or background.
                  </p>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        <section className="py-20 bg-bg-tertiary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">These principles guide every interaction we have with our customers and banking partners.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <GlassCard key={index} hover className="flex gap-6">
                  <div className="w-16 h-16 bg-gold-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <value.icon className="w-8 h-8 text-gold-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                    <p className="text-gray-500">{value.description}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">What We Offer</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Our comprehensive range of loan services covers all your financial needs.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamValues.map((item, index) => (
                <GlassCard key={index} hover className="text-center">
                  <div className="w-16 h-16 bg-gold-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-gold-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-gray-500">{item.description}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gold-primary">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Get Your Dream Loan?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Whether it is a home loan, personal loan, or business loan—let us help you get the best rates.
              Get in touch with us today and take the first step towards your financial goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/emi-calculator">
                <Button variant="secondary" className="bg-white">
                  Calculate EMI
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="secondary" className="bg-white">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
