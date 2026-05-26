"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, ChevronDown } from "lucide-react";

const WHATSAPP_NUMBER = "917738205198";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export default function WhatsAppPopup() {
  const [isVisible, setIsVisible] = useState(true);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const tooltipTimer = setTimeout(() => setShowTooltip(false), 8000);
    return () => clearTimeout(tooltipTimer);
  }, []);

  useEffect(() => {
    const reopenTimer = setTimeout(() => {
      setShowTooltip(true);
      const hideTimer = setTimeout(() => setShowTooltip(false), 4000);
      return () => clearTimeout(hideTimer);
    }, 12000);
    return () => clearTimeout(reopenTimer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-xl shadow-lg border border-[#C9A84C]/20 p-3 pr-8 max-w-[200px]"
          >
            <p className="text-sm text-gray-700 font-medium">
              Need help choosing the right loan?
            </p>
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-1.5 right-1.5 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-r border-b border-[#C9A84C]/20 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg cursor-pointer hover:shadow-[#25D366]/30 hover:scale-110 transition-all duration-300"
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </motion.a>

      <button
        onClick={() => setIsVisible(false)}
        className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm"
        title="Minimize"
      >
        <ChevronDown className="w-3 h-3" />
        Hide
      </button>
    </div>
  );
}
