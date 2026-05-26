"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PERMISSIONS } from "../utils/roles";
import { getToken, setToken, clearToken, authHeaders } from "@/lib/api";

const API_URL = "/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProfile = useCallback(async () => {
    try {
      const token = getToken();
      if (!token) return false;
      const res = await fetch(`${API_URL}/admin/profile`, { headers: authHeaders() });
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
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.success) {
      setToken(data.token);
      setUser(data.admin);
      return { success: true };
    }
    return { success: false, message: data.message };
  };

  const logout = async () => {
    try {
      await fetch(`${API_URL}/admin/logout`, { headers: authHeaders() });
    } catch {}
    clearToken();
    setUser(null);
    router.push("/admin/login");
  };

  const hasPermission = (resource, action) => {
    if (!user) return false;
    const role = user.role || 'admin';
    const permissions = PERMISSIONS[role];
    if (!permissions) return false;
    return permissions[resource]?.includes(action) || false;
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
