"use client";
import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-[#C9A84C]/30 p-6 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Cookie Policy</h3>
            <p className="text-gray-600 text-sm">
              We use cookies to improve your experience. By continuing you agree to our Cookie Policy.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={handleDecline}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors w-full sm:w-auto"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2.5 bg-[#c9920a] text-white rounded-lg font-medium text-sm hover:bg-[#a67c00] transition-colors w-full sm:w-auto"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}