"use client";
import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { PERMISSIONS } from "../utils/roles";
import { api, getToken, setToken, clearToken, clearCSRFToken } from "@/lib/api";

const REFRESH_THRESHOLD = 5 * 60 * 1000;

const AuthContext = createContext(null);

const getRefreshToken = () => {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem('refreshToken');
};

const setRefreshToken = (token) => {
  if (typeof window !== 'undefined' && token) {
    sessionStorage.setItem('refreshToken', token);
  }
};

const clearRefreshToken = () => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('refreshToken');
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const refreshPromiseRef = useRef(null);
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

  const refreshAccessToken = useCallback(async () => {
    if (isRefreshing && refreshPromiseRef.current) {
      return refreshPromiseRef.current;
    }

    setIsRefreshing(true);

    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      clearToken();
      clearRefreshToken();
      clearCSRFToken();
      setUser(null);
      return false;
    }

    try {
      const res = await api.post('/admin/refresh', { refreshToken });

      if (res.data.success && res.data.token) {
        setToken(res.data.token);
        setRefreshToken(res.data.refreshToken);
        clearCSRFToken();
        return true;
      }

      clearToken();
      clearRefreshToken();
      clearCSRFToken();
      setUser(null);
      return false;
    } catch {
      clearToken();
      clearRefreshToken();
      clearCSRFToken();
      setUser(null);
      return false;
    } finally {
      setIsRefreshing(false);
      refreshPromiseRef.current = null;
    }
  }, [isRefreshing]);

  const scheduleTokenRefreshRef = useRef(null);

  const scheduleTokenRefresh = useCallback((expiresIn = 7 * 24 * 60 * 60 * 1000) => {
    const refreshTime = Math.max(expiresIn - REFRESH_THRESHOLD, 0);

    return setTimeout(() => {
      refreshAccessToken().then((success) => {
        if (success && scheduleTokenRefreshRef.current) {
          scheduleTokenRefreshRef.current();
        }
      });
    }, refreshTime);
  }, [refreshAccessToken]);

  useEffect(() => {
    scheduleTokenRefreshRef.current = scheduleTokenRefresh;
  }, [scheduleTokenRefresh]);

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

  useEffect(() => {
    if (!user) return;

    const timeoutId = scheduleTokenRefresh();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [user, scheduleTokenRefresh]);

  const login = async (email, password) => {
    try {
      const res = await api.post('/admin/login', { email, password });
      if (res.data.success) {
        setToken(res.data.token);
        setRefreshToken(res.data.refreshToken);
        clearCSRFToken();
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
    clearRefreshToken();
    clearCSRFToken();
    setUser(null);
    router.push("/admin/login");
  };

  const logoutAll = async () => {
    try {
      await api.post('/admin/logout-all');
    } catch {}
    clearToken();
    clearRefreshToken();
    clearCSRFToken();
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
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      logoutAll,
      hasPermission,
      refresh: fetchProfile,
      refreshToken: refreshAccessToken
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
