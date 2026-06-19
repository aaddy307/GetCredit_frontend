"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import { Loader2 } from "lucide-react";

const API_URL = '/api';
const categories = ["All", "Home Loan", "Education", "LAP", "Personal Loan", "Business Loan", "Vehicle Loan", "Tips", "Finance"];

export default function BlogClient({ initialBlogs }) {
  const [blogs, setBlogs] = useState(initialBlogs || []);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(!initialBlogs);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!initialBlogs) {
      const fetchBlogs = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(`${API_URL}/blogs`);
          if (response.ok) {
            const data = await response.json();
            setBlogs(data.blogs || []);
          } else {
            throw new Error('Failed to fetch blogs');
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchBlogs();
    }
  }, [initialBlogs]);

  const filteredBlogs = activeCategory === "All" 
    ? blogs 
    : blogs.filter(blog => blog.category === activeCategory);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric'
    });
  };

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-linear-to-b from-white to-bg-tertiary">
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
              <span className="text-[gold-primary] font-medium">Our Blog</span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-2 mb-4">
                Latest <span className="text-[gold-primary]">Updates</span>
              </h1>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Stay informed with the latest financial news, tips, and insights
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-wrap gap-4 justify-center mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full transition-all ${
                    activeCategory === cat
                      ? "bg-[gold-primary] text-white"
                      : "bg-bg-tertiary text-gray-700 border border-[gold-primary]/20 hover:border-[gold-primary]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-[gold-primary] animate-spin" />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">Failed to load blogs. Please try again later.</p>
              </div>
            ) : filteredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((blog, index) => (
                  <GlassCard key={blog._id} delay={index * 0.1} hover className="overflow-hidden p-0 group">
                    <div className="h-48 bg-gold-primary/10 flex items-center justify-center relative">
                      <span className="text-6xl text-gold-primary/30">📰</span>
                      <span className="absolute top-4 left-4 px-3 py-1 bg-gold-primary/10 text-gold-primary text-sm rounded-full">
                        {blog.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-gray-400 text-sm">{formatDate(blog.date)}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-[gold-primary] transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-gray-500 text-sm mb-4">{blog.excerpt}</p>
                      <Link href={`/blog/${blog.slug || blog._id}`} className="inline-flex items-center gap-1 text-[gold-primary] hover:text-gold-deep font-medium text-sm transition-colors">
                        Read More <span className="text-lg leading-none">→</span>
                      </Link>
                    </div>
                  </GlassCard>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No blogs found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}