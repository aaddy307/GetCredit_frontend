"use client";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

import { useAuth } from "./context/AuthContext";
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";
import DashboardView from "./components/Dashboard/DashboardView";
import CallbacksView from "./components/Callbacks/CallbacksView";
import LeadsView from "./components/Leads/LeadsView";
import BlogView from "./components/Blog/BlogView";
import AnalyticsView from "./components/Analytics/AnalyticsView";

export default function DashboardContent() {
  const { user, logout } = useAuth();
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
        toast.success("Email feature coming soon");
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
      default:
        return <DashboardView onAction={handleAction} />;
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-[#F5F3EE] lg:grid lg:grid-cols-[auto_1fr]">
      <Toaster position="top-right" />

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

        <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
