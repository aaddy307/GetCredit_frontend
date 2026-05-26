"use client";
import dynamic from "next/dynamic";
import { useState } from "react";

const loadModule = () => import("@uiw/react-md-editor");
const MDEditor = dynamic(loadModule, { ssr: false });

export function MDPreview({ value }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 min-h-[200px] bg-gray-50">
      <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
        {value || "*No content*"}
      </pre>
    </div>
  );
}

export default function MDEditorWrapper({ value, onChange, height }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={12}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] font-mono text-sm"
        placeholder="Write markdown content here..."
      />
    );
  }

  try {
    return (
      <div data-color-mode="light">
        <MDEditor value={value} onChange={onChange} height={height || 300} preview="edit" />
      </div>
    );
  } catch {
    setHasError(true);
    return null;
  }
}
