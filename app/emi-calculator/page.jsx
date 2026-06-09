import EmiCalculatorClient from "./EmiCalculatorClient";

export const metadata = {
  title: "EMI Calculator for Home, Personal & Business Loans | Get Credit",
  description: "Calculate your monthly EMI instantly for any loan type. Free EMI calculator by Get Credit — Ambernath's trusted loan consultancy.",
  alternates: {
    canonical: "https://get-credit.in/emi-calculator",
  },
  openGraph: {
    url: "https://get-credit.in/emi-calculator",
    title: "EMI Calculator for Home, Personal & Business Loans | Get Credit",
    description: "Calculate your monthly EMI instantly for any loan type. Free EMI calculator by Get Credit — Ambernath's trusted loan consultancy.",
    siteName: "GETCREDIT",
  },
  twitter: {
    title: "EMI Calculator for Home, Personal & Business Loans | Get Credit",
    description: "Calculate your monthly EMI instantly for any loan type. Free EMI calculator by Get Credit — Ambernath's trusted loan consultancy.",
  }
};

export default function EMICalculatorPage() {
  return <EmiCalculatorClient />;
}
