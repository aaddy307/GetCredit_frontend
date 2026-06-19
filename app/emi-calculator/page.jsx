import EmiCalculatorClient from "./EmiCalculatorClient";
import { breadcrumbSchema } from "@/lib/seo";

const breadcrumbJsonLd = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'EMI Calculator', path: '/emi-calculator' },
]);

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "EMI Calculator | Get Credit",
  "description": "Free EMI calculator to calculate monthly loan repayments for home loans, personal loans, business loans, education loans, and vehicle loans.",
  "url": "https://get-credit.in/emi-calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR"
  },
  "browserRequirements": "Requires JavaScript",
  "softwareHelp": {
    "@type": "CreativeWork",
    "url": "https://get-credit.in/emi-calculator"
  }
};

export const metadata = {
  title: "EMI Calculator for Home, Personal & Business Loans | Get Credit",
  description: "Calculate your monthly EMI instantly for home loans, personal loans, business loans, education loans & more. Free tool by Get Credit — Ambernath's trusted loan consultancy with 50+ banking partners.",
  alternates: {
    canonical: "https://get-credit.in/emi-calculator",
  },
  openGraph: {
    url: "https://get-credit.in/emi-calculator",
    title: "EMI Calculator for Home, Personal & Business Loans | Get Credit",
    description: "Calculate your monthly EMI instantly for home loans, personal loans, business loans, education loans & more. Free tool by Get Credit — Ambernath's trusted loan consultancy with 50+ banking partners.",
    siteName: "Get Credit",
    images: [{ url: "https://get-credit.in/Logo.jpeg", width: 1200, height: 630, alt: "Get Credit Logo" }],
  },
  twitter: {
    title: "EMI Calculator for Home, Personal & Business Loans | Get Credit",
    description: "Calculate your monthly EMI instantly for any loan type. Free EMI calculator by Get Credit — Ambernath's trusted loan consultancy.",
    images: ["https://get-credit.in/Logo.jpeg"],
  }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Calculate EMI Using Our Free EMI Calculator",
  "description": "Learn how to use Get Credit's free EMI calculator to estimate your monthly loan repayments for home loans, personal loans, business loans, education loans, and more.",
  "url": "https://get-credit.in/emi-calculator",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Select Loan Type",
      "text": "Choose the type of loan you want to calculate EMI for: Home Loan, Loan Against Property, Education Loan, Personal Loan, Business Loan, or Vehicle Loan."
    },
    {
      "@type": "HowToStep",
      "name": "Enter Loan Details",
      "text": "Input the loan amount, interest rate, and tenure. For certain loan types, you may also need to enter property value or other details."
    },
    {
      "@type": "HowToStep",
      "name": "Click Calculate",
      "text": "Press the 'Calculate EMI' button to instantly see your estimated monthly EMI, total interest payable, and total amount payable."
    },
    {
      "@type": "HowToStep",
      "name": "Submit Enquiry",
      "text": "To unlock full details and get personalized loan offers, submit an enquiry form with your contact information."
    }
  ],
  "tool": [
    {
      "@type": "HowToTool",
      "name": "EMI Calculator"
    }
  ],
  "supply": [
    {
      "@type": "HowToSupply",
      "name": "Loan Amount"
    },
    {
      "@type": "HowToSupply",
      "name": "Interest Rate"
    },
    {
      "@type": "HowToSupply",
      "name": "Loan Tenure"
    }
  ]
};

export default function EMICalculatorPage() {
  return (
    <>
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        id="howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        id="webapplication-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      <EmiCalculatorClient />
    </>
  );
}
