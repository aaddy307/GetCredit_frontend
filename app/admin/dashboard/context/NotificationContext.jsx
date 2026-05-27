"use client";
import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { getToken } from "@/lib/api";

const API_URL = "/api";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const eventSourceRef = useRef(null);

  const getNotificationTitle = (type) => {
    switch (type) {
      case "new_lead": return "New Lead";
      case "new_callback": return "New Callback Request";
      case "status_change": return "Status Updated";
      default: return "Notification";
    }
  };

  const addNotification = useCallback((notification) => {
    const newNotif = {
      id: Date.now() + Math.random(),
      read: false,
      timestamp: new Date().toISOString(),
      ...notification
    };
    setNotifications(prev => [newNotif, ...prev].slice(0, 50));
    setUnreadCount(prev => prev + 1);
  }, []);

  useEffect(() => {
    if (!user) return;

    const token = getToken();
    const eventSource = new EventSource(`${API_URL}/admin/notifications/stream?token=${token}`);
    eventSourceRef.current = eventSource;

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type) {
          addNotification({
            type: data.type,
            title: data.payload?.title || getNotificationTitle(data.type),
            message: data.payload?.message || "",
            data: data.payload
          });
        }
      } catch {
        // SSE parse error — ignore malformed events
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
      setTimeout(() => {
        if (user) {
          const token = getToken();
          const newES = new EventSource(`${API_URL}/admin/notifications/stream?token=${token}`);
          eventSourceRef.current = newES;
        }
      }, 5000);
    };

    return () => {
      eventSource.close();
    };
  }, [user, addNotification]);

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications, addNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
}
