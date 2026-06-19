"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Error({ error, reset }) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center pt-20 bg-linear-to-b from-white to-bg-tertiary">
        <div className="text-center px-4">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h1>
          <p className="text-gray-500 mb-6">An unexpected error occurred. Please try again.</p>
          <button
            onClick={reset}
            className="px-6 py-3 bg-gold-primary text-white rounded-xl hover:bg-gold-deep transition-colors font-medium"
          >
            Try again
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
