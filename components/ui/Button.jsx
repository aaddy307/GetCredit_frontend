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
    primary: "bg-gold-primary text-white hover:bg-gold-deep shadow-md shadow-gold-primary/20",
    secondary: "border-2 border-gold-primary text-gold-primary hover:bg-white hover:border-gold-primary hover:text-gold-primary",
    outline: "border border-gold-primary text-gray-700 hover:bg-bg-tertiary hover:border-gold-primary hover:text-gold-primary",
    ghost: "text-gray-700 hover:text-gold-primary",
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