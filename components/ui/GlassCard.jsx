export default function GlassCard({ children, className = "", hover = false, delay = 0 }) {
  const delayClass = delay > 0 ? `delay-${Math.min(delay * 100, 600)}` : "";
  
  return (
    <div
      className={`
        relative
        bg-white
        border border-[rgba(153,102,51,0.35)]
        rounded-2xl
        p-4 sm:p-6
        shadow-[0_4px_24px_rgba(153,102,51,0.12)]
        animate-fade-in-up
        ${delayClass}
        ${hover ? "hover:shadow-[0_8px_32px_rgba(153,102,51,0.18)] hover:border-[rgba(153,102,51,0.6)] transition-all duration-300" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
