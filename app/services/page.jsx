import ServicesClient from "./ServicesClient";

export const metadata = {
  title: "Loan Services in Ambernath — Home, Personal, Business & Education Loans | Get Credit",
  description: "Explore Get Credit's full range of loan products — personal loans from 9.99%, home loans up to ₹15Cr, business loans, education loans and more in Ambernath, Thane.",
  alternates: {
    canonical: "https://get-credit.in/services",
  },
  openGraph: {
    url: "https://get-credit.in/services",
    title: "Loan Services in Ambernath — Home, Personal, Business & Education Loans | Get Credit",
    description: "Explore Get Credit's full range of loan products — personal loans from 9.99%, home loans up to ₹15Cr, business loans, education loans and more in Ambernath, Thane.",
    siteName: "GETCREDIT",
  },
  twitter: {
    title: "Loan Services in Ambernath — Home, Personal, Business & Education Loans | Get Credit",
    description: "Explore Get Credit's full range of loan products — personal loans from 9.99%, home loans up to ₹15Cr, business loans, education loans and more in Ambernath, Thane.",
  }
};

export default function ServicesPage() {
  return <ServicesClient />;
}
