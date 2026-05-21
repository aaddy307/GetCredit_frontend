"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/admin/profile`, { credentials: "include" });
      if (!res.ok) throw new Error("Not authenticated");
      const data = await res.json();
      if (data.success) {
        setUser(data.admin);
        return true;
      }
    } catch {
      setUser(null);
    }
    return false;
  }, []);

  useEffect(() => {
    const init = async () => {
      const authenticated = await fetchProfile();
      if (!authenticated) {
        setUser(null);
      }
      setLoading(false);
    };
    init();
  }, [fetchProfile]);

  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.success) {
      setUser(data.admin);
      return { success: true };
    }
    return { success: false, message: data.message };
  };

  const logout = async () => {
    try {
      await fetch(`${API_URL}/admin/logout`, { credentials: "include" });
    } catch {}
    setUser(null);
    router.push("/admin/login");
  };

  const hasPermission = (resource, action) => {
    if (!user) return false;
    const perms = {
      leads: ["read", "create", "update", "delete", "export", "import"],
      callbacks: ["read", "create", "update", "delete"],
      blog: ["read", "create", "update", "delete"],
      analytics: ["read"],
      users: ["read", "create", "update", "delete"]
    };
    return perms[resource]?.includes(action) || false;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, hasPermission, refresh: fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
