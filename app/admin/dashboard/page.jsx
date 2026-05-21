"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import DashboardContent from "./DashboardContent";

function AuthGuard({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F5F3EE]">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-3 border-[#C9A84C] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return children;
}

export default function AdminDashboardPage() {
  return (
    <AuthProvider>
      <AuthGuard>
        <NotificationProvider>
          <DashboardContent />
        </NotificationProvider>
      </AuthGuard>
    </AuthProvider>
  );
}
