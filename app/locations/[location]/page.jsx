import LocationClient from "./LocationClient";
import { breadcrumbSchema } from "@/lib/seo";

const locationsData = {
  ambernath: {
    name: "Ambernath",
    title: "Loan Services in Ambernath, Thane | Get Credit",
    description: "Get Credit offers home loans, personal loans, business loans & more in Ambernath. Fast approval, 50+ banking partners. Visit our Ambernath office.",
    address: "Near Chinchpada Opp. New Fire Brigade, Ambernath West, Maharashtra 421505",
    keywords: "loan in Ambernath, home loan Ambernath, personal loan Ambernath, business loan Ambernath, loan consultancy Ambernath",
  },
  thane: {
    name: "Thane",
    title: "Loan Services in Thane, Maharashtra | Get Credit",
    description: "Get Credit offers home loans, personal loans, business loans & more in Thane. Fast approval, 50+ banking partners. Serving Thane and surrounding areas.",
    address: "Serving Thane, Maharashtra and surrounding areas",
    keywords: "loan in Thane, home loan Thane, personal loan Thane, business loan Thane, loan consultancy Thane",
  },
  kalyan: {
    name: "Kalyan",
    title: "Loan Services in Kalyan, Thane | Get Credit",
    description: "Get Credit offers home loans, personal loans, business loans & more in Kalyan. Fast approval, 50+ banking partners. Serving Kalyan and surrounding areas.",
    address: "Serving Kalyan, Thane, Maharashtra and surrounding areas",
    keywords: "loan in Kalyan, home loan Kalyan, personal loan Kalyan, business loan Kalyan, loan consultancy Kalyan",
  },
  ulhasnagar: {
    name: "Ulhasnagar",
    title: "Loan Services in Ulhasnagar, Thane | Get Credit",
    description: "Get Credit offers home loans, personal loans, business loans & more in Ulhasnagar. Fast approval, 50+ banking partners. Serving Ulhasnagar and surrounding areas.",
    address: "Serving Ulhasnagar, Thane, Maharashtra and surrounding areas",
    keywords: "loan in Ulhasnagar, home loan Ulhasnagar, personal loan Ulhasnagar, business loan Ulhasnagar, loan consultancy Ulhasnagar",
  },
};

export async function generateStaticParams() {
  return Object.keys(locationsData).map((location) => ({
    location,
  }));
}

export async function generateMetadata({ params }) {
  const locationData = locationsData[params.location];
  if (!locationData) {
    return { title: "Location Not Found" };
  }
  return {
    title: locationData.title,
    description: locationData.description,
    keywords: locationData.keywords,
    alternates: {
      canonical: `https://get-credit.in/locations/${params.location}`,
    },
    openGraph: {
      url: `https://get-credit.in/locations/${params.location}`,
      title: locationData.title,
      description: locationData.description,
      siteName: "Get Credit",
      images: [{ url: "https://get-credit.in/Logo.jpeg", width: 1200, height: 630, alt: "Get Credit Logo" }],
    },
    twitter: {
      title: locationData.title,
      description: locationData.description,
      images: ["https://get-credit.in/Logo.jpeg"],
    },
  };
}

export default function LocationPage({ params }) {
  const locationData = locationsData[params.location];
  if (!locationData) {
    return null;
  }

  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Locations", path: "/locations" },
    { name: locationData.name, path: `/locations/${params.location}` },
  ]);

  const locationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Get Credit - ${locationData.name}`,
    "description": locationData.description,
    "url": `https://get-credit.in/locations/${params.location}`,
    "areaServed": {
      "@type": "Place",
      "name": locationData.name,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": locationData.name,
        "addressRegion": "Maharashtra",
        "addressCountry": "IN"
      }
    },
    "telephone": "+91-7738205198",
    "priceRange": "$$",
  };

  return (
    <>
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        id="location-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema) }}
      />
      <LocationClient location={locationData} />
    </>
  );
}
