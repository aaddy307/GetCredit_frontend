"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function Modal({ isOpen, onClose, children, title }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50">
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white rounded-2xl p-6 sm:p-8 shadow-2xl shadow-[#C9A84C]/15"
            >
              {title && (
                <div className="flex items-center justify-between mb-6 pr-10">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">{title}</h3>
                </div>
              )}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F5F3EE] transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 hover:text-[#C9A84C]" />
              </button>
              {children}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}