"use client";
import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#FFFFFF',
          color: '#1A1A1A',
          border: '1px solid rgba(201, 168, 76, 0.3)',
          boxShadow: '0 4px 12px rgba(201, 168, 76, 0.1)',
        },
        success: {
          duration: 4000,
          iconTheme: {
            primary: '#C9A84C',
            secondary: '#fff',
          },
        },
        error: {
          duration: 5000,
          iconTheme: {
            primary: '#e11d48',
            secondary: '#fff',
          },
        },
      }}
    />
  );
}
