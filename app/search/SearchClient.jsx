"use client";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import { Search, Loader2 } from "lucide-react";

const API_URL = '/api';

export default function SearchClient({ initialQuery, initialResults }) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery || "");
  const [blogs, setBlogs] = useState(initialResults || []);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(!!initialQuery);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setSearched(true);

    try {
      const res = await fetch(`${API_URL}/blogs?search=${encodeURIComponent(query)}`);
      const data = await res.json();
      setBlogs(data.blogs || []);
    } catch (err) {
      setBlogs([]);
    } finally {
      setIsLoading(false);
    }
  };

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
            <div className="text-center mb-12 animate-fade-in-up">
              <span className="text-gold-primary font-medium">Search</span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-2 mb-4">
                Search <span className="text-gold-primary">Articles</span>
              </h1>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Find helpful articles about loans, finance, and more
              </p>
            </div>

            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for articles..."
                  className="w-full px-6 py-4 pr-14 text-lg border-2 border-gray-200 rounded-full focus:border-[gold-primary] focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-[gold-primary] text-white rounded-full hover:bg-[gold-deep] transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                </button>
              </div>
            </form>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-[gold-primary] animate-spin" />
              </div>
            ) : searched ? (
              blogs.length > 0 ? (
                <>
                  <p className="text-gray-500 text-center mb-8">
                    Found {blogs.length} result{blogs.length !== 1 ? "s" : ""} for &quot;{query}&quot;
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog, index) => (
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
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg mb-4">
                    No results found for &quot;{query}&quot;
                  </p>
                  <p className="text-gray-400">
                    Try different keywords or browse our{" "}
                    <Link href="/blog" className="text-[gold-primary] hover:underline">
                      all articles
                    </Link>
                  </p>
                </div>
              )
            ) : (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Enter a search term to find articles</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
