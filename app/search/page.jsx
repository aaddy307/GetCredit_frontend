import SearchClient from "./SearchClient";
import { BASE_URL } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/seo";

const API_URL = process.env.API_URL || '';

async function getSearchResults(query) {
  if (!query) return [];
  try {
    const url = API_URL ? `${API_URL}/api/blogs?search=${encodeURIComponent(query)}` : `${BASE_URL}/api/blogs?search=${encodeURIComponent(query)}`;
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.blogs || [];
  } catch (error) {
    return [];
  }
}

export const metadata = {
  title: "Search Articles | Get Credit Blog",
  description: "Search our articles for tips on home loans, personal loans, EMI calculation, CIBIL score improvement, and more.",
  alternates: {
    canonical: "https://get-credit.in/search",
  },
  openGraph: {
    url: "https://get-credit.in/search",
    title: "Search Articles | Get Credit Blog",
    description: "Search our articles for tips on home loans, personal loans, EMI calculation, CIBIL score improvement, and more.",
    siteName: "Get Credit",
    images: [{ url: "https://get-credit.in/Logo.jpeg", width: 1200, height: 630, alt: "Get Credit Logo" }],
  },
  twitter: {
    title: "Search Articles | Get Credit Blog",
    description: "Search our articles for tips on home loans, personal loans, EMI calculation, and more.",
    images: ["https://get-credit.in/Logo.jpeg"],
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default async function SearchPage({ searchParams }) {
  const query = searchParams?.q || "";
  const initialResults = await getSearchResults(query);

  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Search", path: "/search" },
  ]);

  return (
    <>
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SearchClient initialQuery={query} initialResults={initialResults} />
    </>
  );
}
