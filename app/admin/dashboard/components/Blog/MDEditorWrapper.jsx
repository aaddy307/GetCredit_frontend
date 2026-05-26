"use client";
import dynamic from "next/dynamic";
import { useState, useCallback } from "react";

const loadModule = () => import("@uiw/react-md-editor");
const MDEditor = dynamic(loadModule, { ssr: false });

export function MDPreview({ value }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <div className="p-4 text-gray-500 text-sm">Preview unavailable</div>;
  }

  try {
    const MD = MDEditor;
    return (
      <div className="border border-gray-200 rounded-lg p-4 min-h-[200px] prose prose-sm max-w-none" data-color-mode="light">
        <MD.Markdown source={value || "*No content*"} />
      </div>
    );
  } catch {
    setHasError(true);
    return null;
  }
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
