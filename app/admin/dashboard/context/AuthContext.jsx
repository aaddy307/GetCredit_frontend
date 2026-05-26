"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PERMISSIONS } from "../utils/roles";
import { api, getToken, setToken, clearToken } from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProfile = useCallback(async () => {
    try {
      const token = getToken();
      if (!token) return false;
      const res = await api.get('/admin/profile');
      if (res.data.success) {
        setUser(res.data.admin);
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
    try {
      const res = await api.post('/admin/login', { email, password });
      if (res.data.success) {
        setToken(res.data.token);
        setUser(res.data.admin);
        return { success: true };
      }
      return { success: false, message: res.data.message };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Login failed. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      await api.post('/admin/logout');
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
