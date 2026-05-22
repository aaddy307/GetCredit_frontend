"use client";
import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#1A1A1A',
          color: '#fff',
          border: '1px solid #C9A84C',
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
        },
      }}
    />
  );
}
