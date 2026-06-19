"use client";
import { CheckCircle, Clock, FileText, ArrowRight, Info, Award, Home, Building2, GraduationCap, User, Briefcase, Car } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useModal } from "@/context/ModalContext";

export default function LoanProductPage({ service, loanTypeMapKey, content }) {
  const { openEnquiry } = useModal();

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-20 bg-linear-to-b from-white to-bg-tertiary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="text-center mb-16 animate-fade-in"
            >
              <span className="text-gold-primary font-medium">Our Services</span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-2 mb-4">
                {service.title}
              </h1>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                {service.description}
              </p>
            </div>

            <GlassCard className="p-8 md:p-12 mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gold-primary shrink-0">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800">Why Choose Our {service.title}?</h2>
                    </div>
                  </div>
                  <p className="text-gray-500 text-lg mb-8">{service.description}</p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/emi-calculator">
                      <Button variant="primary" className="flex items-center gap-2">
                        Calculate EMI <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="secondary"
                      onClick={() => openEnquiry(loanTypeMapKey)}
                      className="flex items-center gap-2"
                    >
                      Apply Now <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-[gold-primary] shrink-0" />
                    <h3 className="text-lg font-semibold text-gray-800">Key Benefits</h3>
                  </div>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="text-gray-500 flex items-start gap-2">
                        <span className="text-[gold-primary] mt-1">•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-8 border-t border-[gold-primary]/10">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-[gold-primary] shrink-0" />
                    <h3 className="text-lg font-semibold text-gray-800">Eligibility Criteria</h3>
                  </div>
                  <ul className="space-y-2">
                    {service.eligibility.map((eligibility, i) => (
                      <li key={i} className="text-gray-500 flex items-start gap-2">
                        <span className="text-[gold-primary] mt-1">•</span>
                        {eligibility}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-[gold-primary] shrink-0" />
                    <h3 className="text-lg font-semibold text-gray-800">Required Documents</h3>
                  </div>
                  <ul className="space-y-2">
                    {service.documents.map((doc, i) => (
                      <li key={i} className="text-gray-500 flex items-start gap-2">
                        <span className="text-[gold-primary] mt-1">•</span>
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>

            {content?.overview && (
              <GlassCard className="p-8 mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">{content.overview.title}</h2>
                <div className="prose prose-lg max-w-none text-gray-600">
                  <p className="text-lg leading-relaxed">{content.overview.description}</p>
                  {content.overview.useCases && (
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Common Use Cases</h3>
                      <ul className="space-y-2">
                        {content.overview.useCases.map((useCase, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[gold-primary] mt-1">✓</span>
                            {useCase}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {content.overview.tips && (
                    <div className="mt-6 bg-gold-primary/5 p-6 rounded-xl border border-gold-primary/10">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Tips to Improve Your Approval Chances</h3>
                      <ul className="space-y-2">
                        {content.overview.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[gold-primary] mt-1">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </GlassCard>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <GlassCard className="p-6 text-center">
                <div className="w-14 h-14 bg-gold-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-7 h-7 text-gold-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Fast Approval</h3>
                <p className="text-gray-500 text-sm">Get your loan approved within 24-48 hours with minimal documentation.</p>
              </GlassCard>
              <GlassCard className="p-6 text-center">
                <div className="w-14 h-14 bg-gold-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-7 h-7 text-gold-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">50+ Banking Partners</h3>
                <p className="text-gray-500 text-sm">We work with over 50 leading banks and financial institutions.</p>
              </GlassCard>
              <GlassCard className="p-6 text-center">
                <div className="w-14 h-14 bg-gold-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-7 h-7 text-gold-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Expert Support</h3>
                <p className="text-gray-500 text-sm">Dedicated relationship managers to guide you through the process.</p>
              </GlassCard>
            </div>

            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">How to Apply</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gold-primary rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">1</div>
                  <h4 className="font-semibold text-gray-800 mb-2">Submit Inquiry</h4>
                  <p className="text-gray-500 text-sm">Fill out our simple online form with your requirements.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gold-primary rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">2</div>
                  <h4 className="font-semibold text-gray-800 mb-2">Document Verification</h4>
                  <p className="text-gray-500 text-sm">Submit required documents digitally for verification.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gold-primary rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">3</div>
                  <h4 className="font-semibold text-gray-800 mb-2">Bank Matching</h4>
                  <p className="text-gray-500 text-sm">We match you with the best-suited banks from our partners.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gold-primary rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">4</div>
                  <h4 className="font-semibold text-gray-800 mb-2">Disbursal</h4>
                  <p className="text-gray-500 text-sm">Get your loan amount disbursed to your account.</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        {content?.relatedArticles && content.relatedArticles.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {content.relatedArticles.map((article) => (
                  <Link key={article.slug} href={`/blog/${article.slug}`} className="group">
                    <GlassCard hover className="p-0 overflow-hidden">
                      <div className="h-40 bg-gold-primary/5 flex items-center justify-center">
                        <span className="text-5xl text-gold-primary/30">📰</span>
                      </div>
                      <div className="p-6">
                        <span className="text-xs text-gold-primary font-medium">{article.category}</span>
                        <h3 className="text-base font-semibold text-gray-800 mt-2 mb-2 group-hover:text-gold-primary transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2">{article.excerpt}</p>
                        <span className="inline-flex items-center gap-1 text-sm text-gold-primary font-medium mt-3 group-hover:gap-2 transition-all">
                          Read More →
                        </span>
                      </div>
                    </GlassCard>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link href="/blog" className="text-gold-primary hover:underline font-medium">
                  View All Articles →
                </Link>
              </div>
            </div>
          </section>
        )}

        <section
          className="py-20 bg-gold-primary animate-fade-in"
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Calculate your EMI today and take the first step towards your financial goals.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/emi-calculator">
                <Button variant="secondary" className="bg-white px-6 sm:px-8 py-4 text-base sm:text-lg font-semibold">
                  Calculate EMI Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-6 sm:px-8 py-4 text-base sm:text-lg font-semibold">
                  Talk to an Expert
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <GlassCard className="p-6">
                <h4 className="font-semibold text-gray-800 mb-2">What is the interest rate for a {service.title.toLowerCase()}?</h4>
                <p className="text-gray-500">Interest rates vary based on your profile and the bank. Our team will help you find the best rate from our 50+ partner banks. Contact us for a personalized quote.</p>
              </GlassCard>
              <GlassCard className="p-6">
                <h4 className="font-semibold text-gray-800 mb-2">How long does the approval process take?</h4>
                <p className="text-gray-500">For pre-approved customers, it takes 24-48 hours. For new applicants, it may take 3-7 working days after submitting all required documents.</p>
              </GlassCard>
              <GlassCard className="p-6">
                <h4 className="font-semibold text-gray-800 mb-2">Can I prepay my loan early?</h4>
                <p className="text-gray-500">Yes, most loans allow prepayment. Some lenders may charge a prepayment penalty of 1-2% on the outstanding amount. Check with your lender for specific terms.</p>
              </GlassCard>
            </div>
            <div className="text-center mt-8">
              <Link href="/faq" className="text-gold-primary hover:underline font-medium">
                View All FAQs →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
