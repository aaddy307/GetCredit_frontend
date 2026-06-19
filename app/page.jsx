import HomeClient from "./HomeClient";

const API_URL = process.env.API_URL || 'http://localhost:5000';

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
  title: "Home & Personal Loan Consultant India | Get Credit",
  description: "Get Credit is a trusted loan DSA in India offering home loans, personal loans, business loans, education loans and loan against property with 50+ banking partners.",
  alternates: {
    canonical: "https://get-credit.in",
  },
  openGraph: {
    title: "Home & Personal Loan Consultant India | Get Credit",
    description: "Trusted loan DSA offering home, personal, business & education loans with 50+ banking partners across India.",
    url: "https://get-credit.in",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home & Personal Loan Consultant India | Get Credit',
    description: 'Trusted loan DSA offering home, personal, business & education loans with 50+ banking partners across India.',
    images: ['https://get-credit.in/Logo.jpeg'],
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
    "streetAddress": "Near Chinchpada Opp. New Fire Brigade",
    "addressLocality": "Ambernath West",
    "addressRegion": "Maharashtra",
    "postalCode": "421505",
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