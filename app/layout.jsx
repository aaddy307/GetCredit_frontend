import "./globals.css";
import Script from "next/script";
import ToasterProvider from "@/components/ui/ToasterProvider";
import { ModalProvider } from "@/context/ModalContext";
import { organizationSchema, websiteSchema, localBusinessSchema } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL("https://get-credit.in"),
  title: {
    default: "Home & Personal Loan Consultant India | Get Credit",
    template: "%s | Get Credit",
  },
  description: "Get Credit is a trusted loan DSA in India offering home loans, personal loans, business loans, education loans and loan against property with 50+ banking partners.",
  alternates: {
    canonical: "https://get-credit.in",
  },
  keywords: "home loan consultant, personal loan DSA, business loan India, education loan, loan against property, instant personal loan, MSME business loan, home loan India, best home loan",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Get Credit",
    title: "Home & Personal Loan Consultant India | Get Credit",
    description: "Trusted loan DSA offering home, personal, business & education loans with 50+ banking partners across India.",
    url: "https://get-credit.in",
    images: [{ url: "https://get-credit.in/Logo.jpeg", width: 256, height: 256, alt: "Get Credit logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home & Personal Loan Consultant India | Get Credit",
    description: "Trusted loan DSA offering home, personal, business & education loans with 50+ banking partners across India.",
    images: ["https://get-credit.in/Logo.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/Logo.jpeg",
  },
  other: {
    "theme-color": "gold-primary",
    "geo.region": "IN-MH",
    "geo.placename": "Ambernath, Maharashtra",
    "geo.position": "19.2016;73.1856",
    "ICBM": "19.2016, 73.1856",
    "google-site-verification": process.env.GOOGLE_SITE_VERIFICATION || "",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      websiteSchema(),
      {
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "FinancialService", "LoanOrCredit"],
        "name": "Get Credit",
        "image": "https://get-credit.in/Logo.jpeg",
        "logo": "https://get-credit.in/Logo.jpeg",
        "url": "https://get-credit.in",
        "telephone": "+91-7738205198",
        "email": "support@get-credit.in",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Near Chinchpada Opp. New Fire Brigade",
          "addressLocality": "Ambernath West",
          "addressRegion": "Maharashtra",
          "postalCode": "421505",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "19.2016",
          "longitude": "73.1856"
        },
        "areaServed": [
          "Ambernath",
          "Ulhasnagar",
          "Kalyan",
          "Thane",
          "Maharashtra"
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:00",
            "closes": "18:00"
          }
        ],
        "sameAs": [
          "https://facebook.com/getcredit",
          "https://x.com/getcredit",
          "https://instagram.com/getcredit",
          "https://linkedin.com/company/getcredit"
        ],
        "serviceType": ["Home Loan", "Personal Loan", "Business Loan", "Education Loan", "Loan Against Property", "Vehicle Loan", "Non-Salaried Loan"],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Loan Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Personal Loan", "description": "Quick funds with same-day disbursement and rates starting from 9.99%." } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Loan", "description": "Fuel your business growth with flexible funding solutions." } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Home Loan", "description": "Buy your dream home with financing up to ₹15 Crore." } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Loan Against Property", "description": "Funding up to ₹30 Crore for Residential, Commercial & Plot." } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Education Loan", "description": "Fund your studies in India or abroad." } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Vehicle Loan", "description": "Drive your dream car with affordable EMIs." } }
          ]
        }
      }
    ]
  };

  return (
    <html lang="en" className="h-full scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-[gold-primary] focus:text-white focus:rounded-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <ModalProvider>
          <div id="main-content" className="flex-1 flex flex-col">
            {children}
          </div>
          <ToasterProvider />
        </ModalProvider>
        <script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
