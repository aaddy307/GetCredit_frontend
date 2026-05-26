import "./globals.css";
import CookieConsent from "@/components/ui/CookieConsent";
import ToasterProvider from "@/components/ui/ToasterProvider";
import { ModalProvider } from "@/context/ModalContext";

export const metadata = {
  title: "Get Credit - Fast & Easy Loan Solutions",
  description: "Get Credit is a loan consultancy/DSA business that helps users calculate EMI and submit loan enquiries for lead generation.",
  keywords: "loan, EMI calculator, home loan, education loan, loan against property, financial consultancy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col">
        <ModalProvider>
          {children}
          <CookieConsent />
          <ToasterProvider />
        </ModalProvider>
      </body>
    </html>
  );
}