"use client";
import Link from "next/link";
import { Home, User, Briefcase, Building2, GraduationCap, Car, ArrowRight, Phone, MapPin, Clock, ShieldCheck } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";

const loanCategories = [
  { icon: User, title: "Personal Loan", description: "Quick funds with same-day disbursement and rates starting from 9.99%.", href: "/services#personal-loan" },
  { icon: Briefcase, title: "Business Loan", description: "Fuel your business growth with flexible funding solutions.", href: "/services#business-loan" },
  { icon: Home, title: "Home Loan", description: "Buy your dream home with financing up to ₹15 Crore.", href: "/services#home-loan" },
  { icon: Building2, title: "Loan Against Property", description: "Funding up to ₹30 Crore for your property.", href: "/services#loan-against-property" },
  { icon: GraduationCap, title: "Education Loan", description: "Fund your studies in India or abroad.", href: "/services#education-loan" },
  { icon: Car, title: "Vehicle Loan", description: "Drive your dream car with affordable EMIs.", href: "/services#vehicle-loan" },
];

const whyChooseUs = [
  { icon: Clock, title: "Fast Approval", description: "Get your loan approved within 24-48 hours." },
  { icon: ShieldCheck, title: "Trusted Partner", description: "50+ banks and financial institutions." },
  { icon: MapPin, title: "Local Presence", description: "Serving customers across Maharashtra." },
];

export default function LocationClient({ location }) {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-16 bg-linear-to-b from-white to-bg-tertiary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fade-in-up">
              <span className="text-gold-primary font-medium">Loan Services Near You</span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-2 mb-4">
                {location.name} Loan Consultancy
              </h1>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Get Credit is your trusted loan partner in {location.name}. We offer home loans,
                personal loans, business loans, and more with competitive rates from 50+ banking partners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link href="/emi-calculator">
                  <Button variant="primary">Calculate EMI</Button>
                </Link>
                <a href="tel:+917738205198">
                  <Button variant="secondary" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                    Call Now
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Loan Services in {location.name}
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Explore our comprehensive range of loan products designed to meet your financial needs.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loanCategories.map((loan, index) => (
                <GlassCard key={index} hover delay={index * 0.1}>
                  <div className="w-14 h-14 bg-gold-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <loan.icon className="w-7 h-7 text-gold-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">{loan.title}</h3>
                  <p className="text-gray-500 text-sm text-center mb-4">{loan.description}</p>
                  <Link href={loan.href} className="flex items-center justify-center gap-2 text-gold-primary hover:underline text-sm font-medium">
                    Learn More <ArrowRight className="w-4 h-4 shrink-0" />
                  </Link>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-bg-tertiary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Why Choose Get Credit in {location.name}?
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                We understand the unique financial needs of {location.name} residents and businesses.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whyChooseUs.map((item, index) => (
                <GlassCard key={index} hover className="text-center">
                  <div className="w-14 h-14 bg-gold-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-gold-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Visit Our Office in {location.name}
            </h2>
            <p className="text-gray-500 mb-6">
              {location.address}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button variant="primary">Get Directions</Button>
              </Link>
              <Link href="/services">
                <Button variant="secondary">View All Services</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
