"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import { useModal } from "@/context/ModalContext";

const navLinksGroup1 = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "EMI Calculator", href: "/emi-calculator" },
];

const navLinksGroup2 = [
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openEnquiry, openCallback } = useModal();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/98 backdrop-blur-xl shadow-[0_4px_30px_rgba(153,102,51,0.1)] border-b border-[rgba(153,102,51,0.15)]"
            : "bg-white/95 backdrop-blur-md border-b border-[rgba(153,102,51,0.08)]"
        }`}
        style={{ height: "68px" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/Logo.webp" alt="Get Credit – Loan Consultancy Logo" width={32} height={32} className="rounded-lg object-contain shrink-0" priority />
              <span className="text-2xl font-bold text-black-primary leading-none">
                Get <span className="text-gold-primary">Credit</span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center h-full">
              <div className="flex items-center gap-6 h-full">
                {navLinksGroup1.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-sm transition-colors ${
                      pathname === link.href ? "text-gold-primary" : "text-gray-600 hover:text-gold-primary"
                    }`}
                  >
                    {link.name}
                    {pathname === link.href && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-primary shadow-[0_0_10px_rgba(201,168,76,0.5)]" />
                    )}
                  </Link>
                ))}

                <div className="h-6 w-px bg-gray-300" />

                {navLinksGroup2.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-sm transition-colors ${
                      pathname === link.href ? "text-gold-primary" : "text-gray-600 hover:text-gold-primary"
                    }`}
                  >
                    {link.name}
                    {pathname === link.href && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-primary shadow-[0_0_10px_rgba(201,168,76,0.5)]" />
                    )}
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-5">
              <button
                onClick={() => openCallback()}
                className="group flex items-center gap-2 px-4 py-2 border border-gold-primary rounded-lg text-gold-primary hover:bg-gold-primary hover:text-white transition-all duration-200 text-sm font-medium"
              >
                <div className="relative">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                </div>
                Request Callback
              </button>

              <button
                onClick={() => openEnquiry()}
                className="group flex items-center gap-2 px-5 py-2.5 bg-gold-primary rounded-lg text-white font-semibold hover:bg-gold-deep hover:shadow-lg transition-all duration-200"
              >
                <span className="text-sm">Apply Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-800 transition-colors"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`lg:hidden bg-white/98 min-h-screen backdrop-blur-xl border-t border-[rgba(153,102,51,0.1)] ${isOpen ? "animate-slide-down" : "hidden"}`}
        >
          <div className="px-6 py-6 space-y-4">
            {[...navLinksGroup1, ...navLinksGroup2].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block py-3 text-sm ${
                      pathname === link.href ? "text-gold-primary font-medium" : "text-gray-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <button
                onClick={() => { openCallback(); setIsOpen(false); }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gold-primary rounded-lg text-gold-primary"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                Request Callback
              </button>
              <button
                onClick={() => { openEnquiry(); setIsOpen(false); }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gold-primary rounded-lg text-white font-semibold w-full md:w-auto"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
