"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import EnquiryPopup from "../forms/EnquiryPopup";
import CallbackRequestPopup from "../forms/CallbackRequestPopup";

const navLinksGroup1 = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
];

const navLinksGroup2 = [
  { name: "EMI Calculator", href: "/emi-calculator" },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{ 
          height: "68px",
          background: scrolled 
            ? "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 100%)" 
            : "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(16px) saturate(150%)",
          boxShadow: scrolled ? "0 4px 30px rgba(201,149,42,0.1)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,149,42,0.15)" : "1px solid rgba(201,149,42,0.08)"
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            <Link href="/" className="flex items-center gap-2.5">
              <img src="/Logo.jpeg" alt="Get Credit" className="h-8 w-8 rounded-lg object-contain flex-shrink-0" />
              <span className="text-2xl font-bold text-[#1A1A1A] leading-none">
                Get <span className="text-[#C9A84C]">Credit</span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center h-full">
              <div className="flex items-center gap-6 h-full">
                {navLinksGroup1.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-sm transition-colors ${
                      pathname === link.href ? "text-[#C9A84C]" : "text-gray-600 hover:text-[#C9A84C]"
                    }`}
                  >
                    {link.name}
                    {pathname === link.href && (
                      <span className="absolute -bottom-0 left-0 right-0 h-0.5 bg-[#C9A84C] shadow-[0_0_10px_rgba(201,149,42,0.5)]" />
                    )}
                  </Link>
                ))}

                <div className="h-6 w-px bg-gray-300" />

                {navLinksGroup2.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-sm transition-colors ${
                      pathname === link.href ? "text-[#C9A84C]" : "text-gray-600 hover:text-[#C9A84C]"
                    }`}
                  >
                    {link.name}
                    {pathname === link.href && (
                      <span className="absolute -bottom-0 left-0 right-0 h-0.5 bg-[#C9A84C] shadow-[0_0_10px_rgba(201,149,42,0.5)]" />
                    )}
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-5">
              <button
                onClick={() => setCallbackOpen(true)}
                className="group flex items-center gap-2 px-4 py-2 border border-[#C9A84C] rounded-lg text-[#C9A84C] hover:bg-[#C9A84C] hover:text-white transition-all duration-200 text-sm font-medium"
              >
                <div className="relative">
                  <Phone className="w-4 h-4" />
                </div>
                Request Callback
              </button>

              <button
                onClick={() => setEnquiryOpen(true)}
                className="group flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] rounded-lg text-white font-semibold hover:bg-[#A8892A] hover:shadow-lg hover:shadow-[#C9A84C]/30 transition-all duration-200"
              >
                <span className="text-sm">Apply Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <Link
                href="/admin/login"
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:text-[#C9A84C] hover:border-[#C9A84C] text-sm transition-colors"
              >
                Admin
              </Link>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-600"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-[#C9A84C]/10"
            >
              <div className="px-6 py-6 space-y-4 bg-white">
                {[...navLinksGroup1, ...navLinksGroup2].map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block py-3 text-sm ${
                      pathname === link.href ? "text-[#C9A84C] font-medium" : "text-gray-600"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <button
                    onClick={() => { setCallbackOpen(true); setIsOpen(false); }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-[#C9A84C] rounded-lg text-[#C9A84C]"
                  >
                    <Phone className="w-4 h-4" />
                    Request Callback
                  </button>
                  <button
                    onClick={() => { setEnquiryOpen(true); setIsOpen(false); }}
                    className="mobile-apply-btn flex items-center justify-center gap-2 px-4 py-3 bg-[#C9A84C] rounded-lg text-white font-semibold"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <Link
                    href="/admin/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-600"
                  >
                    Admin Login
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <EnquiryPopup isOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
      <CallbackRequestPopup isOpen={callbackOpen} onClose={() => setCallbackOpen(false)} />
    </>
  );
}