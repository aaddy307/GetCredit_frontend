"use client";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";

export default function ContactPage() {

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-linear-to-b from-white to-bg-tertiary">
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
              <span className="text-[gold-primary] font-medium">Contact Us</span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-2 mb-4">
                Get In <span className="text-[gold-primary]">Touch</span>
              </h1>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="max-w-3xl mx-auto">
              <GlassCard className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[gold-primary]/10 rounded-full flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-[gold-primary]" />
                    </div>
                    <div>
                      <h3 className="text-gray-800 font-medium mb-1">Phone</h3>
                      <p className="text-gray-500">+91 7738205198</p>
                      <p className="text-gray-500">+91 8408926551</p>
                      <p className="text-gray-500">+91 8793604734</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[gold-primary]/10 rounded-full flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-[gold-primary]" />
                    </div>
                    <div>
                      <h3 className="text-gray-800 font-medium mb-1">Email</h3>
                      <p className="text-gray-500">support@get-credit.in</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[gold-primary]/10 rounded-full flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-[gold-primary]" />
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

                <div className="mt-8 pt-8 border-t border-[gold-primary]/10">
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
                        className="px-3 md:px-4 py-2 bg-bg-tertiary border border-[gold-primary]/10 rounded-lg text-gray-500 hover:text-[gold-primary] hover:border-[gold-primary]/30 transition-colors text-xs md:text-sm whitespace-nowrap"
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
              href="https://wa.me/919637221405"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-[#25D366] text-white rounded-full hover:bg-[#20BD5A] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="font-medium">Chat on WhatsApp</span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}