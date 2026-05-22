"use client";
import { motion } from "framer-motion";
import { Target, Eye, Award, Users } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-20 bg-gradient-to-b from-white to-[#F5F3EE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[#C9A84C] font-medium">About Get Credit</span>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-2 mb-6">
                  Your Trusted Loan Consultancy Partner
                </h1>
                <p className="text-gray-500 text-lg mb-6">
                  Get Credit is a leading loan consultancy and DSA (Direct Selling Agent)
                  business committed to helping individuals and families achieve their dreams
                  of owning a home, funding their education, or expanding their business.
                </p>
                <p className="text-gray-500 text-lg mb-8">
                  With years of experience and partnerships with over 50 leading banks and
                  financial institutions, we provide personalized loan solutions tailored
                  to your unique needs and financial situation.
                </p>
                <Link href="/contact">
                  <Button variant="primary">Get Started</Button>
                </Link>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-[#C9A84C]/10 to-[#F5F3EE] rounded-3xl flex items-center justify-center border border-[#C9A84C]/10">
                  <div className="text-center">
                    <span className="text-8xl">🏦</span>
                    <p className="text-[#C9A84C] mt-4 font-semibold">Since 2015</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <GlassCard hover className="flex gap-6">
                <div className="w-16 h-16 bg-[#C9A84C]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="w-8 h-8 text-[#C9A84C]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Our Mission</h3>
                  <p className="text-gray-500">
                    To make loan services accessible, transparent, and hassle-free for
                    every individual. We strive to empower our clients with the right
                    financial products that align with their goals and aspirations.
                  </p>
                </div>
              </GlassCard>
              <GlassCard hover className="flex gap-6">
                <div className="w-16 h-16 bg-[#C9A84C]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Eye className="w-8 h-8 text-[#C9A84C]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Our Vision</h3>
                  <p className="text-gray-500">
                    To become the most trusted and preferred loan consultancy in India,
                    known for our integrity, expertise, and exceptional customer service.
                    We envision a future where everyone has access to affordable credit.
                  </p>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#F5F3EE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Our <span className="text-[#C9A84C]">Achievements</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Users, value: "10,000+", label: "Happy Customers" },
                { icon: Award, value: "500Cr+", label: "Loans Disbursed" },
                { icon: Target, value: "50+", label: "Banking Partners" },
                { icon: Eye, value: "98%", label: "Approval Rate" },
              ].map((stat, index) => (
                <GlassCard key={index} delay={index * 0.1} className="text-center">
                  <stat.icon className="w-10 h-10 text-[#C9A84C] mx-auto mb-4" />
                  <div className="text-4xl font-bold text-[#C9A84C] mb-2">{stat.value}</div>
                  <div className="text-gray-500">{stat.label}</div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="py-20 bg-gradient-to-r from-[#C9A84C] to-[#E5C76B]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Let us help you find the perfect loan solution for your needs.
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
        </motion.section>
      </main>
      <Footer />
    </>
  );
}