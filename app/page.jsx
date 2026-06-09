import HomeClient from "./HomeClient";

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

const homepageSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "FinancialService"],
  "name": "Get Credit",
  "url": "https://get-credit.in",
  "logo": "https://get-credit.in/Logo.jpeg",
  "telephone": ["+917738205198", "+918408926551", "+918793604734"],
  "email": "support@get-credit.in",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Shivling Nagar, Near Shivling Residency",
    "addressLocality": "Ambernath West",
    "addressRegion": "Maharashtra",
    "postalCode": "421501",
    "addressCountry": "IN"
  },
  "areaServed": ["Ambernath", "Ulhasnagar", "Kalyan", "Thane", "Maharashtra"],
  "sameAs": [
    "https://facebook.com/getcredit",
    "https://instagram.com/getcredit",
    "https://linkedin.com/company/getcredit"
  ]
};

export default async function HomePage() {
  const blogs = await getBlogs();

  return (
    <>
      <script
        id="home-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }}
      />
      <HomeClient initialBlogs={blogs} />
    </>
  );
}