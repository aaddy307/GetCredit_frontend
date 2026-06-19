"use client";
import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";
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
        <section className="py-20 bg-linear-to-b from-white to-bg-tertiary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[gold-primary] font-medium">About Get Credit</span>
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
                <Link href="/services">
                  <Button variant="primary">Get Started</Button>
                </Link>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gold-primary/10 rounded-3xl flex items-center justify-center border border-gold-primary/10">
                  <div className="text-center">
                    <span className="text-8xl">🏦</span>
                    <p className="text-gold-primary mt-4 font-semibold">Since 2026</p>
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
                <div className="w-16 h-16 bg-[gold-primary]/10 rounded-full flex items-center justify-center shrink-0">
                  <Target className="w-8 h-8 text-[gold-primary]" />
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
                <div className="w-16 h-16 bg-[gold-primary]/10 rounded-full flex items-center justify-center shrink-0">
                  <Eye className="w-8 h-8 text-[gold-primary]" />
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

        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="py-20 bg-gold-primary">
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
