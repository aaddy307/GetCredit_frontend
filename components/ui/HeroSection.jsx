"use client";
import Link from "next/link";
import { Calculator, Phone, Award } from "lucide-react";
import Button from "../ui/Button";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 px-4 bg-linear-to-b from-white to-bg-tertiary">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(153,102,51,0.08)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(153,102,51,0.05)_0%,transparent_50%)]" />
      
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-800 mb-4 md:mb-6 leading-tight animate-fade-in-up">
          Home Loan & Personal Loan <span className="text-gold-primary">Consultant</span>
        </h1>

        <p
          className="text-base md:text-lg lg:text-xl text-gray-500 mb-6 max-w-lg md:max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200"
        >
          Get instant approvals on home loans, education loans, and loans against property in Ambernath, Ulhasnagar, Kalyan, Thane, and across Maharashtra.
          Calculate your EMI and apply online in minutes.
        </p>

        <div
          className="flex flex-wrap justify-center gap-3 mb-8 animate-fade-in-up delay-300"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gold-primary/10 border border-gold-primary/20 rounded-full text-gold-primary text-sm font-medium">
            <Award className="w-4 h-4 shrink-0" aria-hidden="true" />
            Best in Personal Loan
          </span>
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gold-primary/10 border border-gold-primary/20 rounded-full text-gold-primary text-sm font-medium">
            <Award className="w-4 h-4 shrink-0" aria-hidden="true" />
            Best in Business Loan
          </span>
        </div>

        <div
          className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center animate-fade-in-up delay-400"
        >
          <Link href="/emi-calculator">
            <Button variant="primary" className="flex items-center gap-2 text-base md:text-lg px-6 md:px-8 py-3 md:py-4">
              <Calculator className="w-5 h-5 shrink-0" aria-hidden="true" />
              Calculate EMI
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="secondary" className="flex items-center gap-2 text-base md:text-lg px-6 md:px-8 py-3 md:py-4">
              <Phone className="w-5 h-5 shrink-0" aria-hidden="true" />
              Contact Us
            </Button>
          </Link>
        </div>

        <div
          className="mt-12 md:mt-16 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12 text-center px-4 animate-fade-in-up delay-500"
        >
          {[
            { value: "50+", label: "Banking Partners" },
            { value: "9AM-6PM", label: "Mon-Sat Support" },
          ].map((stat, index) => (
            <div key={index} className="flex flex-col items-center min-w-[70px]">
              <div className="text-2xl md:text-3xl lg:text-3xl font-bold text-gold-primary">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
