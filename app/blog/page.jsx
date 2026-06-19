import BlogClient from "./BlogClient";
import { breadcrumbSchema } from "@/lib/seo";

const API_URL = process.env.API_URL || '';
const BASE_URL = 'https://get-credit.in';

async function getBlogs() {
  try {
    const url = API_URL ? `${API_URL}/api/blogs` : `${BASE_URL}/api/blogs`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    return data.blogs || [];
  } catch (error) {
    console.error("Failed to fetch blogs for SSR:", error);
    return null;
  }
}

export const metadata = {
  title: "Expert Loan Tips & Financial Planning Guides | Get Credit Blog",
  description: "Read expert articles on home loans, personal loans, EMI calculation, and CIBIL score tips from Get Credit — Ambernath's trusted loan consultancy.",
  alternates: {
    canonical: "https://get-credit.in/blog",
  },
  openGraph: {
    url: "https://get-credit.in/blog",
    title: "Expert Loan Tips & Financial Planning Guides | Get Credit Blog",
    description: "Read expert articles on home loans, personal loans, EMI calculation, and CIBIL score tips from Get Credit — Ambernath's trusted loan consultancy.",
    siteName: "Get Credit",
    images: [{ url: "https://get-credit.in/Logo.jpeg", width: 1200, height: 630, alt: "Get Credit Logo" }],
  },
  twitter: {
    title: "Loan Tips & Financial Guides | Get Credit Blog",
    description: "Read expert articles on home loans, personal loans, EMI calculation, and CIBIL score tips from Get Credit — Ambernath's trusted loan consultancy.",
    images: ["https://get-credit.in/Logo.jpeg"],
  }
};

const breadcrumbJsonLd = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
]);

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Loan Tips & Financial Guides | Get Credit Blog",
  "description": "Read expert articles on home loans, personal loans, EMI calculation, and financial planning from Get Credit — Ambernath's trusted loan consultancy.",
  "url": "https://get-credit.in/blog",
  "publisher": {
    "@type": "Organization",
    "name": "Get Credit",
    "url": "https://get-credit.in",
    "logo": "https://get-credit.in/Logo.jpeg"
  }
};

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <>
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        id="collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <BlogClient initialBlogs={blogs} />
    </>
  );
}