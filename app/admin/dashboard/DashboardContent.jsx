"use client";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useAuth } from "./context/AuthContext";
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";
import DashboardView from "./components/Dashboard/DashboardView";
import CallbacksView from "./components/Callbacks/CallbacksView";
import LeadsView from "./components/Leads/LeadsView";
import BlogView from "./components/Blog/BlogView";
import AnalyticsView from "./components/Analytics/AnalyticsView";
import EmailView from "./components/Email/EmailView";

export default function DashboardContent() {
  const { user, logout } = useAuth();
  const prefersReducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleAction = (action) => {
    switch (action) {
      case 'add-lead':
      case 'view-leads':
        setActiveTab('leads');
        break;
      case 'view-callbacks':
      case 'callback':
        setActiveTab('callbacks');
        break;
      case 'email':
        setActiveTab('email');
        break;
      default:
        break;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardView onAction={handleAction} />;
      case "leads":
        return <LeadsView />;
      case "callbacks":
        return <CallbacksView />;
      case "blog":
        return <BlogView />;
      case "analytics":
        return <AnalyticsView />;
      case "email":
        return <EmailView />;
      default:
        return <DashboardView onAction={handleAction} />;
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-bg-tertiary lg:grid lg:grid-cols-[auto_1fr]">

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => { setActiveTab(tab); setSidebarOpen(false); }}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-col min-w-0 h-full lg:h-screen overflow-hidden">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          onTabChange={setActiveTab}
        />

        {prefersReducedMotion ? (
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
            {renderContent()}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
