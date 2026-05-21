"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Loader2, ArrowLeft, Calendar, Tag, Clock, ChevronLeft, ChevronRight, Share2, Globe, Copy, Check, UserPlus, MessageCircle } from "lucide-react";
import MDE from "@uiw/react-md-editor";
const MarkdownRenderer = MDE.Markdown;

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function estimateReadTime(content) {
  if (!content) return 1;
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function extractHeadings(content) {
  if (!content) return [];
  const lines = content.split('\n');
  const headings = [];
  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)/);
    if (match) {
      const level = match[1].length;
      const text = match[2];
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      headings.push({ level, text, id });
    }
  }
  return headings;
}

function addHeadingIds(content) {
  if (!content) return content;
  return content.replace(/^(#{2,3})\s+(.+)/gm, (match, hashes, text) => {
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return `${hashes} ${text} {#${id}}`;
  });
}

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const contentRef = useRef(null);

  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/blogs/${slug}`);
        if (!response.ok) return setError(response.status === 404 ? "Blog not found" : "Failed to fetch blog");
        const data = await response.json();
        setBlog(data.blog);
        setRelated(data.related || []);
        setPrev(data.prev || null);
        setNext(data.next || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchBlog();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const article = contentRef.current;
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const total = rect.height - window.innerHeight + rect.top;
      const current = -rect.top;
      setProgress(total > 0 ? Math.min(100, Math.max(0, (current / total) * 100)) : 100);

      const headings = article?.querySelectorAll('h2, h3');
      if (!headings) return;
      let active = null;
      headings.forEach(h => {
        if (h.getBoundingClientRect().top <= 100) active = h.id;
      });
      setActiveHeading(active);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [blog]);

  const copyUrl = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const readTime = blog ? estimateReadTime(blog.content) : 0;
  const headings = blog ? extractHeadings(blog.content) : [];
  const contentWithIds = blog ? addHeadingIds(blog.content) : '';

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <Loader2 className="w-10 h-10 animate-spin text-[#C9A84C] mx-auto mb-4" />
            <p className="text-gray-400">Loading article...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !blog) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-20 bg-gradient-to-b from-white to-[#F5F3EE]">
          <div className="text-center px-4">
            <div className="w-20 h-20 bg-[#C9A84C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📄</span>
            </div>
            <p className="text-gray-500 text-lg mb-6">{error || "Blog not found"}</p>
            <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A84C] text-white rounded-xl hover:bg-[#A8892A] transition-colors font-medium">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="fixed top-0 left-0 h-1 bg-[#C9A84C] z-50 transition-all duration-150" style={{ width: `${progress}%` }} />

      <Navbar />
      <main className="pt-20 min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            <div className="flex flex-wrap items-center gap-3 text-gray-400 text-sm mb-5">
              <span className="px-3 py-1 bg-[#C9A84C]/15 text-[#C9A84C] rounded-full text-xs font-medium">
                {blog.category}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(blog.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {readTime} min read
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {blog.title}
            </h1>
            {blog.excerpt && (
              <p className="text-gray-300 text-lg md:text-xl mt-6 max-w-3xl leading-relaxed">
                {blog.excerpt}
              </p>
            )}
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/10">
              <div className="w-10 h-10 bg-gradient-to-br from-[#C9A84C] to-[#A8892A] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">{blog.author?.charAt(0) || 'G'}</span>
              </div>
              <div>
                <p className="text-white text-sm font-medium">{blog.author || 'Get Credit Team'}</p>
                <p className="text-gray-400 text-xs">Published on {formatDate(blog.date)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex gap-12">
            {/* Table of Contents - Desktop */}
            {headings.length > 0 && (
              <aside className="hidden xl:block w-64 flex-shrink-0">
                <div className="sticky top-28">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">On this page</h4>
                  <nav className="space-y-1">
                    {headings.map((h) => (
                      <a
                        key={h.id}
                        href={`#${h.id}`}
                        className={`block text-sm py-1.5 transition-colors ${
                          h.level === 3 ? 'pl-4' : ''
                        } ${
                          activeHeading === h.id
                            ? 'text-[#C9A84C] font-medium'
                            : 'text-gray-500 hover:text-gray-800'
                        }`}
                      >
                        {h.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            )}

            {/* Main Content */}
            <article ref={contentRef} className="flex-1 min-w-0 max-w-3xl">
              <div className="prose prose-lg max-w-none prose-headings:scroll-mt-28 prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-[#C9A84C] prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-img:rounded-2xl prose-img:shadow-lg prose-blockquote:border-[#C9A84C] prose-blockquote:text-gray-600 prose-blockquote:bg-[#C9A84C]/5 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-li:text-gray-600 prose-hr:border-gray-200" data-color-mode="light">
                {contentWithIds ? (
                  <MarkdownRenderer source={contentWithIds} />
                ) : (
                  <p className="text-gray-400">No content available.</p>
                )}
              </div>

              {/* Tags / Categories */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm text-gray-500">Category:</span>
                  <Link href={`/blog?category=${encodeURIComponent(blog.category)}`} className="px-4 py-1.5 bg-[#C9A84C]/10 text-[#C9A84C] rounded-full text-sm font-medium hover:bg-[#C9A84C]/20 transition-colors">
                    {blog.category}
                  </Link>
                </div>
              </div>

              {/* Share */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-gray-600 font-medium">Share this article</p>
                  <div className="flex items-center gap-3">
                    <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank', 'noopener')} className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors" title="Share on Facebook">
                      <UserPlus className="w-5 h-5" />
                    </button>
                    <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank', 'noopener')} className="p-2.5 bg-sky-50 text-sky-600 rounded-xl hover:bg-sky-100 transition-colors" title="Share on Twitter / X">
                      <MessageCircle className="w-5 h-5" />
                    </button>
                    <button onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank', 'noopener')} className="p-2.5 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors" title="Share on LinkedIn">
                      <Globe className="w-5 h-5" />
                    </button>
                    <button onClick={copyUrl} className="p-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors relative" title="Copy link">
                      {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Previous / Next Navigation */}
              {(prev || next) && (
                <div className="mt-12 pt-8 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {prev ? (
                    <Link href={`/blog/${prev.slug}`} className="group p-5 rounded-2xl border border-gray-200 hover:border-[#C9A84C]/30 hover:bg-[#C9A84C]/5 transition-all">
                      <span className="text-xs text-gray-400 uppercase tracking-wider flex items-center gap-1 mb-2">
                        <ChevronLeft className="w-3 h-3" /> Previous
                      </span>
                      <p className="text-sm font-medium text-gray-800 group-hover:text-[#C9A84C] transition-colors line-clamp-2">
                        {prev.title}
                      </p>
                    </Link>
                  ) : <div />}
                  {next ? (
                    <Link href={`/blog/${next.slug}`} className="group p-5 rounded-2xl border border-gray-200 hover:border-[#C9A84C]/30 hover:bg-[#C9A84C]/5 transition-all text-right">
                      <span className="text-xs text-gray-400 uppercase tracking-wider flex items-center gap-1 justify-end mb-2">
                        Next <ChevronRight className="w-3 h-3" />
                      </span>
                      <p className="text-sm font-medium text-gray-800 group-hover:text-[#C9A84C] transition-colors line-clamp-2">
                        {next.title}
                      </p>
                    </Link>
                  ) : <div />}
                </div>
              )}
            </article>
          </div>
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <section className="bg-gradient-to-b from-white to-[#F5F3EE] py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <span className="text-[#C9A84C] text-sm font-medium">More Articles</span>
                <h2 className="text-3xl font-bold text-gray-800 mt-2">Related {blog.category} Articles</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {related.map((post) => (
                  <Link key={post._id} href={`/blog/${post.slug}`} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#C9A84C]/20 transition-all duration-300">
                    <div className="h-40 bg-gradient-to-br from-[#C9A84C]/5 to-gray-100 flex items-center justify-center">
                      <span className="text-5xl text-[#C9A84C]/20 group-hover:scale-110 transition-transform duration-300">📰</span>
                    </div>
                    <div className="p-5">
                      <span className="text-xs text-[#C9A84C] font-medium">{post.category}</span>
                      <h3 className="text-base font-semibold text-gray-800 mt-1 mb-2 group-hover:text-[#C9A84C] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
                      <span className="inline-flex items-center gap-1 text-sm text-[#C9A84C] font-medium mt-3 group-hover:gap-2 transition-all">
                        Read More →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-10">
                <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A84C] text-white rounded-xl hover:bg-[#A8892A] transition-colors font-medium">
                  View All Articles
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
