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
    "theme-color": "#C9A84C",
    "geo.region": "IN-MH",
    "geo.placename": "Ambernath, Maharashtra",
    "geo.position": "19.2016;73.1856",
    "ICBM": "19.2016, 73.1856",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = [
    organizationSchema(),
    websiteSchema(),
    localBusinessSchema(),
    {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "Get Credit",
      "url": "https://get-credit.in",
      "description": "Trusted loan consultancy and DSA offering home loans, personal loans, business loans, education loans and loan against property across India.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Near Chinchpada Opp. New Fire Brigade",
        "addressLocality": "Ambernath West",
        "addressRegion": "Maharashtra",
        "postalCode": "421505",
        "addressCountry": "IN"
      },
      "areaServed": "IN",
      "serviceType": ["Home Loan", "Personal Loan", "Business Loan", "Education Loan", "Loan Against Property"]
    },
  ];

  return (
    <html lang="en" className="h-full scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-[#C9A84C] focus:text-white focus:rounded-lg focus:outline-none"
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
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="ga4-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </body>
    </html>
  );
}
