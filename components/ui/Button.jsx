"use client";

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
    primary: "bg-gold-primary text-white hover:bg-gold-deep shadow-md shadow-gold-primary/20 hover:scale-[1.02] active:scale-[0.98]",
    secondary: "border-2 border-gold-primary text-gold-primary hover:bg-white hover:border-gold-primary hover:text-gold-primary hover:scale-[1.02] active:scale-[0.98]",
    outline: "border border-gold-primary text-gray-700 hover:bg-bg-tertiary hover:border-gold-primary hover:text-gold-primary hover:scale-[1.02] active:scale-[0.98]",
    ghost: "text-gray-700 hover:text-gold-primary hover:scale-[1.02] active:scale-[0.98]",
  };

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {children}
    </button>
  );
}