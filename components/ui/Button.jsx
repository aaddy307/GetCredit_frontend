"use client";
import { motion } from "framer-motion";

export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
  type = "button",
}) {
  const baseStyles = "px-6 py-3 rounded-lg font-medium transition-all duration-300 cursor-pointer";
  
  const variants = {
    primary: "bg-[#C9A84C] text-white hover:bg-[#A8892A] shadow-md shadow-[#C9A84C]/20",
    secondary: "border-2 border-[#C9A84C] text-[#C9A84C] hover:bg-white hover:border-[#C9A84C] hover:text-[#C9A84C]",
    outline: "border border-[#C9A84C] text-gray-700 hover:bg-[#F5F3EE] hover:border-[#C9A84C] hover:text-[#C9A84C]",
    ghost: "text-gray-700 hover:text-[#C9A84C]",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {children}
    </motion.button>
  );
}