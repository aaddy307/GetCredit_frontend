import "./globals.css";
import ToasterProvider from "@/components/ui/ToasterProvider";
import { ModalProvider } from "@/context/ModalContext";

export const metadata = {
  title: "Get Credit - Fast & Easy Loan Solutions",
  description: "Get Credit is a loan consultancy/DSA business that helps users calculate EMI and submit loan enquiries for lead generation.",
  keywords: "loan, EMI calculator, home loan, education loan, loan against property, financial consultancy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary font-sans">
        <ModalProvider>
          {children}
          <ToasterProvider />
        </ModalProvider>
      </body>
    </html>
  );
}