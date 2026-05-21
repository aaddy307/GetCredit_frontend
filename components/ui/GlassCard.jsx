"use client";
import { motion } from "framer-motion";

export default function GlassCard({ children, className = "", hover = false, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`
        relative
        bg-white
        border border-[#C9A84C]/55
        rounded-2xl
        p-6
        shadow-[0_4px_24px_rgba(201,168,76,0.12)]
        ${hover ? "hover:shadow-[0_8px_32px_rgba(201,168,76,0.18)] hover:border-[#C9A84C]/90 transition-all duration-300" : ""}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}