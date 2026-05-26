"use client";
import { useState } from "react";
import { Plus, Download, Mail, Phone } from "lucide-react";
import toast from "react-hot-toast";
import { authHeaders } from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export default function QuickActions({ onAction }) {
  const [loading, setLoading] = useState(null);

  const handleExportLeads = async () => {
    setLoading('export');
    try {
      const response = await fetch(`${API_URL}/admin/all-leads/export?format=xlsx`, {
        headers: authHeaders()
      });
      
      if (!response.ok) throw new Error('Export failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leads-${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
      
      toast.success('Leads exported successfully');
    } catch (error) {
      toast.error('Export failed');
    }
    setLoading(null);
  };

  const actions = [
    {
      id: 'add-lead',
      label: 'Add Lead',
      icon: Plus,
      color: 'bg-[#C9A84C] hover:bg-[#A8892A]',
      onClick: () => onAction('add-lead')
    },
    {
      id: 'export',
      label: 'Export Leads',
      icon: Download,
      color: 'bg-blue-500 hover:bg-blue-600',
      loading: loading === 'export',
      onClick: handleExportLeads
    },
    {
      id: 'email',
      label: 'Send Email',
      icon: Mail,
      color: 'bg-green-500 hover:bg-green-600',
      onClick: () => onAction('email')
    },
    {
      id: 'callback',
      label: 'Add Callback',
      icon: Phone,
      color: 'bg-purple-500 hover:bg-purple-600',
      onClick: () => onAction('callback')
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-6">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
        Quick Actions
      </h3>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            disabled={action.loading}
            className={`
              flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl text-white
              text-xs sm:text-sm font-medium
              transition-all duration-200 hover:scale-105 active:scale-95
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
              ${action.color}
            `}
          >
            {action.loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <action.icon className="w-4 h-4" />
            )}
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}