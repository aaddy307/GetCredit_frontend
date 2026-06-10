"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { SERVICES, QUICK_LINKS, SOCIAL_LINKS, CONTACT_INFO } from "@/lib/constants";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);
  useEffect(() => { setCurrentYear(new Date().getFullYear()); }, []);

  return (
    <footer className="bg-linear-to-r from-[#C9A84C] to-[#E5C76B] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Image
                src="/Logo.jpeg"
                alt="Get Credit – Loan Consultancy Logo"
                width={40}
                height={40}
                className="rounded-lg object-cover"
              />
              <span className="text-2xl font-bold text-white">
                Get <span className="text-white">Credit</span>
              </span>
            </div>
            <p className="text-white/80 mb-6">
              Your trusted loan consultancy partner. We help you find the best loan
              solutions tailored to your needs.
            </p>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white hover:bg-white hover:text-[#C9A84C] transition-colors"
                  aria-label={social.name}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d={social.icon}/></svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <nav aria-label="Quick links">
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
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
            </nav>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Services</h4>
            <nav aria-label="Services">
            <ul className="space-y-3">
              {SERVICES.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
            </nav>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contact Info</h4>
            <ul className="space-y-4">
              {CONTACT_INFO.phones.map((phone, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80">
                  <Phone className="w-5 h-5 text-white" />
                  <span>{phone}</span>
                </li>
              ))}
              <li className="flex items-center gap-3 text-white/80">
                <Mail className="w-5 h-5 text-white" />
                <span>{CONTACT_INFO.email}</span>
              </li>
              <li className="flex items-start gap-3 text-white/80">
                <MapPin className="w-5 h-5 text-white mt-1" />
                <span>{CONTACT_INFO.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm">
              Made by <a href="https://ahmed.nexcoreinstitute.org/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Ahmed Khan</a>. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/faq" className="text-white/70 text-sm hover:text-white">
                FAQ
              </Link>
              <Link href="/privacy-policy" className="text-white/70 text-sm hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/70 text-sm hover:text-white">
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
