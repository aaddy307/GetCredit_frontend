"use client";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-[#C9A84C] to-[#E5C76B] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-[#C9A84C] font-bold text-xl">G</span>
              </div>
              <span className="text-2xl font-bold text-white">
                Get <span className="text-white">Credit</span>
              </span>
            </div>
            <p className="text-white/80 mb-6">
              Your trusted loan consultancy partner. We help you find the best loan
              solutions tailored to your needs.
            </p>
            <div className="flex gap-4">
              {["FB", "X", "IG", "LI"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white hover:bg-white hover:text-[#C9A84C] transition-colors text-xs font-bold border border-white/30"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Services", href: "/services" },
                { name: "EMI Calculator", href: "/emi-calculator" },
                { name: "Blog", href: "/blog" },
                { name: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                { name: "Home Loan", href: "/services" },
                { name: "Loan Against Property", href: "/services" },
                { name: "Education Loan", href: "/services" },
                { name: "Business Loan", href: "/services" },
                { name: "Personal Loan", href: "/services" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-white/80">
                <Phone className="w-5 h-5 text-white" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <Mail className="w-5 h-5 text-white" />
                <span>info@getcredit.com</span>
              </li>
              <li className="flex items-start gap-3 text-white/80">
                <MapPin className="w-5 h-5 text-white mt-1" />
                <span>123 Business Park, Mumbai, Maharashtra 400001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm">
              © {currentYear} Get Credit. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/faq" className="text-white/70 text-sm hover:text-white">
                FAQ
              </Link>
              <Link href="/privacy-policy" className="text-white/70 text-sm hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/70 text-sm hover:text-white">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}