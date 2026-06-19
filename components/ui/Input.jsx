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
  const inputId = name ? `input-${name}` : undefined;

  if (type === "select") {
    return (
      <div className="mb-4">
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-gold-primary">*</span>}
        </label>
        <select
          id={inputId}
          {...register(name)}
          className="w-full px-4 py-3 bg-white border border-gold-primary/30 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary/40 transition-colors"
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
        <fieldset>
          <legend className="block text-sm font-medium text-gray-700 mb-2">
            {label} {required && <span className="text-gold-primary">*</span>}
          </legend>
          <div className="space-y-2">
            {options.map((opt) => (
              <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  {...register}
                  value={opt.value}
                  className="accent-gold-primary"
                />
                <span className="text-gray-700">{opt.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-gold-primary">*</span>}
      </label>
      <input
        id={inputId}
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-white border border-gold-primary/30 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary/40 transition-colors ${className}`}
      />
    </div>
  );
}
