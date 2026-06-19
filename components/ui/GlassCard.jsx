"use client";
import { motion } from "framer-motion";

export default function GlassCard({ children, className = "", hover = false, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay }}
      className={`
        relative
        bg-white
        border border-gold-primary/55
        rounded-2xl
        p-4 sm:p-6
        shadow-[0_4px_24px_rgba(201,168,76,0.12)]
        ${hover ? "hover:shadow-[0_8px_32px_rgba(201,168,76,0.18)] hover:border-gold-primary/90 transition-all duration-300" : ""}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}