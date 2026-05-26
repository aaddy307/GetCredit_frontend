"use client";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";

export default function ContactPage() {

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-gradient-to-b from-white to-[#F5F3EE]">
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
              <span className="text-[#C9A84C] font-medium">Contact Us</span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-2 mb-4">
                Get In <span className="text-[#C9A84C]">Touch</span>
              </h1>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="max-w-3xl mx-auto">
              <GlassCard className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#C9A84C]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-[#C9A84C]" />
                    </div>
                    <div>
                      <h3 className="text-gray-800 font-medium mb-1">Phone</h3>
                      <p className="text-gray-500">+91 7738205198</p>
                      <p className="text-gray-500">+91 8408926551</p>
                      <p className="text-gray-500">+91 8793604734</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#C9A84C]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#C9A84C]" />
                    </div>
                    <div>
                      <h3 className="text-gray-800 font-medium mb-1">Email</h3>
                      <p className="text-gray-500">support@get-credit.in</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#C9A84C]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#C9A84C]" />
                    </div>
                    <div>
                      <h3 className="text-gray-800 font-medium mb-1">Address</h3>
                      <p className="text-gray-500">
                        Shivling Nagar, Near Shivling Recendency<br />
                        Ambernath West
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-[#C9A84C]/10">
                  <h3 className="text-gray-800 font-medium mb-4">Follow Us</h3>
                  <div className="flex flex-wrap gap-2 md:gap-4">
                    {[
                      { name: "Facebook", href: "https://facebook.com/getcredit" },
                      { name: "Twitter", href: "https://x.com/getcredit" },
                      { name: "Instagram", href: "https://instagram.com/getcredit" },
                      { name: "LinkedIn", href: "https://linkedin.com/company/getcredit" },
                    ].map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 md:px-4 py-2 bg-[#F5F3EE] border border-[#C9A84C]/10 rounded-lg text-gray-500 hover:text-[#C9A84C] hover:border-[#C9A84C]/30 transition-colors text-xs md:text-sm whitespace-nowrap"
                      >
                        {social.name}
                      </a>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>

          </div>
        </section>

        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <a
              href="https://wa.me/9637221405"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-[#25D366] text-white rounded-full hover:bg-[#20BD5A] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">Chat on WhatsApp</span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}