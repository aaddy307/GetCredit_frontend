"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Target, Eye, Award, Users, Building2, Percent, Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Link from "next/link";

function AnimatedCounter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);

  const formatNumber = (num) => {
    if (num >= 10000000) return (num / 10000000).toFixed(1) + "Cr+";
    if (num >= 1000) return num.toLocaleString("en-IN");
    return num;
  };

  return (
    <span ref={ref} className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#C9A84C] to-[#E5C76B] bg-clip-text text-transparent">
      {formatNumber(count)}{suffix}
    </span>
  );
}

const achievements = [
  { icon: Building2, end: 5000, suffix: "+", label: "Loans Processed", desc: "Successfully processed and disbursed" },
  { icon: Users, end: 10000, suffix: "+", label: "Happy Customers", desc: "Satisfied clients across India" },
  { icon: Award, end: 50, suffix: "+", label: "Partner Banks/NBFCs", desc: "Trusted by leading financial institutions" },
  { icon: Percent, end: 98, suffix: "%", label: "Approval Success Rate", desc: "Among eligible applications" },
  { icon: Clock, end: 10, suffix: "+", label: "Years of Experience", desc: "In the loan consultancy industry" },
];

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
                <Link href="/services">
                  <Button variant="primary">Get Started</Button>
                </Link>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-[#C9A84C]/10 to-[#F5F3EE] rounded-3xl flex items-center justify-center border border-[#C9A84C]/10">
                  <div className="text-center">
                    <span className="text-8xl">&#x1F3E6;</span>
                    <p className="text-[#C9A84C] mt-4 font-semibold">Since 2026</p>
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

        <section className="py-20 bg-gradient-to-b from-[#F5F3EE] to-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNDOUE4NEMiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Our <span className="text-[#C9A84C]">Achievements</span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Milestones that reflect our commitment to excellence
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {achievements.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative bg-white/80 backdrop-blur-sm border border-[#C9A84C]/30 rounded-2xl p-6 text-center hover:shadow-[0_8px_32px_rgba(201,168,76,0.15)] hover:border-[#C9A84C]/60 transition-all duration-500 h-full flex flex-col items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#C9A84C]/10 to-[#E5C76B]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                        <stat.icon className="w-7 h-7 text-[#C9A84C]" />
                      </div>
                      <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                      <h3 className="text-gray-800 font-semibold mt-2">{stat.label}</h3>
                      <p className="text-gray-400 text-xs mt-1">{stat.desc}</p>
                    </div>
                  </div>
                </motion.div>
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
