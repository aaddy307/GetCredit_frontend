import HomeClient from "./HomeClient";
import { localBusinessSchema, homepageFaqSchema, loanProductsSchema } from "@/lib/seo";

const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function getBlogs() {
  try {
    const res = await fetch(`${API_URL}/api/blogs`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    if (data.success && data.blogs) {
      return data.blogs.slice(0, 3);
    }
  } catch (error) {
    console.error("Failed to fetch blogs for home SSR:", error);
  }
  return [];
}

export const metadata = {
  title: "Home Loan & Personal Loan Consultant in Ambernath, Thane | Get Credit",
  description: "Get Credit is a premier loan consultancy and DSA in Ambernath, Thane, offering home, personal, business, and education loans with 50+ banking partners.",
  alternates: {
    canonical: "https://get-credit.in",
  },
  openGraph: {
    title: "Home Loan & Personal Loan Consultant in Ambernath, Thane | Get Credit",
    description: "Get Credit is a premier loan consultancy and DSA in Ambernath, Thane, offering home, personal, business, and education loans with 50+ banking partners.",
    url: "https://get-credit.in",
  },
  twitter: {
    title: "Home Loan & Personal Loan Consultant in Ambernath, Thane | Get Credit",
    description: "Get Credit is a premier loan consultancy and DSA in Ambernath, Thane, offering home, personal, business, and education loans with 50+ banking partners.",
  }
};

export default async function HomePage() {
  const blogs = await getBlogs();

  const jsonLd = [
    localBusinessSchema(),
    homepageFaqSchema(),
    ...loanProductsSchema()
  ];

  return (
    <>
      <script
        id="home-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient initialBlogs={blogs} />
    </>
  );
}