import "./globals.css";
import ToasterProvider from "@/components/ui/ToasterProvider";
import { ModalProvider } from "@/context/ModalContext";
import { organizationSchema, websiteSchema, localBusinessSchema } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL("https://get-credit.in"),
  title: {
    default: "Get Credit - Fast & Easy Loan Solutions",
    template: "%s | Get Credit",
  },
  description: "Get Credit is a loan consultancy/DSA business that helps users calculate EMI and submit loan enquiries for lead generation for home loan, education loan, loan against property, and more.",
  keywords: "loan, EMI calculator, home loan, education loan, loan against property, financial consultancy, personal loan, business loan, vehicle loan",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Get Credit",
    title: "Get Credit - Fast & Easy Loan Solutions",
    description: "Get Credit is a loan consultancy/DSA business helping individuals find the best loan solutions for home, education, business, and personal needs.",
    url: "https://get-credit.in",
    images: [{ url: "/Logo.jpeg", width: 256, height: 256, alt: "GetCredit logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Credit - Fast & Easy Loan Solutions",
    description: "Loan consultancy/DSA for home loan, education loan, loan against property, and more.",
    images: ["/Logo.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/Logo.jpeg",
  },
  other: {
    "theme-color": "#C9A84C",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = [
    organizationSchema(),
    websiteSchema(),
    localBusinessSchema(),
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
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#C9A84C] focus:text-white focus:rounded-lg focus:outline-none"
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
      </body>
    </html>
  );
}
