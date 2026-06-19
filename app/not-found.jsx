import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center pt-20 bg-linear-to-b from-white to-bg-tertiary">
        <div className="text-center px-4">
          <div className="w-20 h-20 bg-gold-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🔍</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
          <p className="text-xl text-gray-500 mb-2">Page not found</p>
          <p className="text-gray-400 mb-8">The page you are looking for does not exist or has been moved.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="px-6 py-3 bg-gold-primary text-white rounded-xl hover:bg-gold-deep transition-colors font-medium">
              Go Home
            </Link>
            <Link href="/services" className="px-6 py-3 border border-gold-primary text-gold-primary rounded-xl hover:bg-gold-primary/5 transition-colors font-medium">
              View Services
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
