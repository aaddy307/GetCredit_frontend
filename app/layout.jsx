import "./globals.css";
import { Toaster } from "react-hot-toast";
import CookieConsent from "@/components/ui/CookieConsent";

export const metadata = {
  title: "Get Credit - Fast & Easy Loan Solutions",
  description: "Get Credit is a loan consultancy/DSA business that helps users calculate EMI and submit loan enquiries for lead generation.",
  keywords: "loan, EMI calculator, home loan, education loan, loan against property, financial consultancy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col">
        {children}
        <CookieConsent />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1A1A1A',
              color: '#fff',
              border: '1px solid #C9A84C',
            },
            success: {
              iconTheme: {
                primary: '#C9A84C',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}