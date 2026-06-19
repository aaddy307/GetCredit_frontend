"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (hasError || !mounted) {
    return (
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={12}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[gold-primary] font-mono text-sm"
        placeholder="Write markdown content here..."
      />
    );
  }

  return (
    <div data-color-mode="light">
      <MDEditor value={value} onChange={onChange} height={height || 300} preview="edit" />
    </div>
  );
}
