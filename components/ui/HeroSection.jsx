"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calculator, Phone, Award } from "lucide-react";
import Button from "../ui/Button";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 px-4 bg-linear-to-b from-white to-bg-tertiary">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,149,42,0.08)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,149,42,0.05)_0%,transparent_50%)]" />
      
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-800 mb-4 md:mb-6 leading-tight">
          Home Loan & Personal Loan <span className="text-gold-primary">Consultant in Ambernath, Thane</span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base md:text-lg lg:text-xl text-gray-500 mb-6 max-w-lg md:max-w-2xl mx-auto leading-relaxed"
        >
          Get instant approvals on home loans, education loans, and loans against property in Ambernath, Ulhasnagar, Kalyan, Thane, and across Maharashtra.
          Calculate your EMI and apply online in minutes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[gold-primary]/10 border border-[gold-primary]/20 rounded-full text-[gold-primary] text-sm font-medium">
            <Award className="w-4 h-4 shrink-0" />
            Best in Personal Loan
          </span>
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[gold-primary]/10 border border-[gold-primary]/20 rounded-full text-[gold-primary] text-sm font-medium">
            <Award className="w-4 h-4 shrink-0" />
            Best in Business Loan
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center"
        >
          <Link href="/emi-calculator">
            <Button variant="primary" className="flex items-center gap-2 text-base md:text-lg px-6 md:px-8 py-3 md:py-4">
              <Calculator className="w-5 h-5 shrink-0" />
              Calculate EMI
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="secondary" className="flex items-center gap-2 text-base md:text-lg px-6 md:px-8 py-3 md:py-4">
              <Phone className="w-5 h-5 shrink-0" />
              Contact Us
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 md:mt-16 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12 text-center px-4"
        >
          {[
            { value: "50+", label: "Banking Partners" },
            { value: "24/7", label: "Customer Support" },
          ].map((stat, index) => (
            <div key={index} className="flex flex-col items-center min-w-[70px]">
              <div className="text-2xl md:text-3xl lg:text-3xl font-bold text-[gold-primary]">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}