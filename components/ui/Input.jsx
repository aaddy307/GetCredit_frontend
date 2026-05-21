"use client";

export default function Input({
  label,
  type = "text",
  name,
  placeholder,
  required = false,
  className = "",
  options = [],
  register,
  checked,
}) {
  if (type === "select") {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-[#C9A84C]">*</span>}
        </label>
        <select
          {...register(name)}
          className="w-full px-4 py-3 bg-white border border-[#C9A84C]/30 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/40 transition-colors"
        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (type === "radio") {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-[#C9A84C]">*</span>}
        </label>
        <div className="flex gap-4">
          {options.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                {...register(name)}
                value={opt.value}
                defaultChecked={checked === opt.value}
                className="accent-[#C9A84C]"
              />
              <span className="text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-[#C9A84C]">*</span>}
      </label>
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-white border border-[#C9A84C]/30 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/40 transition-colors ${className}`}
      />
    </div>
  );
}