import BlogClient from "./BlogClient";
import { breadcrumbSchema } from "@/lib/seo";

const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function getBlogs() {
  try {
    const res = await fetch(`${API_URL}/api/blogs`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    return data.blogs || [];
  } catch (error) {
    console.error("Failed to fetch blogs for SSR:", error);
    return null;
  }
}

export const metadata = {
  title: "Loan Tips & Financial Guides | Get Credit Blog",
  description: "Read expert articles on home loans, personal loans, EMI calculation, and financial planning from Get Credit — Ambernath's trusted loan consultancy.",
  alternates: {
    canonical: "https://get-credit.in/blog",
  },
  openGraph: {
    url: "https://get-credit.in/blog",
    title: "Loan Tips & Financial Guides | Get Credit Blog",
    description: "Read expert articles on home loans, personal loans, EMI calculation, and financial planning from Get Credit — Ambernath's trusted loan consultancy.",
    siteName: "GETCREDIT",
  },
  twitter: {
    title: "Loan Tips & Financial Guides | Get Credit Blog",
    description: "Read expert articles on home loans, personal loans, EMI calculation, and financial planning from Get Credit — Ambernath's trusted loan consultancy.",
  }
};

const breadcrumbJsonLd = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
]);

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <>
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BlogClient initialBlogs={blogs} />
    </>
  );
}