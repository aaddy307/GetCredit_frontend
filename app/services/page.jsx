import ServicesClient from "./ServicesClient";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo";
import { SERVICES } from "@/lib/constants";

export const metadata = {
  title: "Loan Services in Ambernath, Thane | Get Credit",
  description: "Explore Get Credit's full range of loan products — personal loans from 9.99%, home loans up to ₹15Cr, business loans, education loans and more in Ambernath, Thane.",
  alternates: {
    canonical: "https://get-credit.in/services",
    languages: {
      "en-IN": "https://get-credit.in/services",
      "en": "https://get-credit.in/services",
    },
  },
  openGraph: {
    url: "https://get-credit.in/services",
    title: "Loan Services in Ambernath, Thane | Get Credit",
    description: "Explore Get Credit's full range of loan products — personal loans from 9.99%, home loans up to ₹15Cr, business loans, education loans and more in Ambernath, Thane.",
    siteName: "GETCREDIT",
    images: [{ url: "https://get-credit.in/Logo.jpeg", width: 256, height: 256, alt: "Get Credit Logo" }],
  },
  twitter: {
    title: "Loan Services in Ambernath, Thane | Get Credit",
    description: "Explore Get Credit's full range of loan products — personal loans from 9.99%, home loans up to ₹15Cr, business loans, education loans and more in Ambernath, Thane.",
    images: ["https://get-credit.in/Logo.jpeg"],
  }
};

const breadcrumbJsonLd = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
]);

const serviceSchemas = SERVICES.map(service => serviceSchema({
  title: service.title,
  description: service.description,
}));

export default function ServicesPage() {
  return (
    <>
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {serviceSchemas.map((schema, index) => (
        <script
          key={index}
          id={`service-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <ServicesClient />
    </>
  );
}
