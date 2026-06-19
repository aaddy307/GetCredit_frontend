"use client";
import { useState, useEffect } from "react";

import StatsWidget from "./StatsWidget";
import QuickActions from "./QuickActions";
import { useNotifications } from "../../context/NotificationContext";
import { api } from "@/lib/api";

export default function DashboardView({ onAction }) {
  useNotifications();
  const [recentLeads, setRecentLeads] = useState([]);
  const [recentCallbacks, setRecentCallbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecentData = async () => {
    try {
      const [leadsRes, callbacksRes] = await Promise.all([
        api.get('/enquiry?page=1&limit=5'),
        api.get('/callback?page=1&limit=5')
      ]);

      const leadsData = leadsRes.data;
      const callbacksData = callbacksRes.data;

      if (leadsData.success) setRecentLeads(leadsData.enquiries || []);
      if (callbacksData.success) setRecentCallbacks(callbacksData.data || []);
    } catch {
      // Error fetching data
    }
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRecentData();
  }, []);

  const statusColors = {
    'Pending': 'bg-yellow-100 text-yellow-700',
    'In Review': 'bg-blue-100 text-blue-700',
    'Approved': 'bg-green-100 text-green-700',
    'Rejected': 'bg-red-100 text-red-700',
    'Closed': 'bg-gray-100 text-gray-700',
    'Called': 'bg-purple-100 text-purple-700'
  };

  return (
    <div className="space-y-6">
      <StatsWidget />
      <QuickActions onAction={onAction} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Recent Leads</h3>
            <button onClick={() => onAction('view-leads')} className="text-sm text-[gold-primary] hover:underline">View All</button>
          </div>
          <div className="divide-y divide-gray-100">
            {loading ? (
              <div className="p-8 text-center"><div className="animate-spin w-6 h-6 border-2 border-[gold-primary] border-t-transparent rounded-full mx-auto"></div></div>
            ) : recentLeads.length > 0 ? (
              recentLeads.map((lead) => (
                <div key={lead._id} className="px-5 py-3 hover:bg-gray-50 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{lead.fullName}</p>
                    <p className="text-xs text-gray-500">{lead.phone} • {lead.city}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[lead.status] || 'bg-gray-100 text-gray-600'}`}>{lead.status || 'Pending'}</span>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500 text-sm">No recent leads</div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Recent Callbacks</h3>
            <button onClick={() => onAction('view-callbacks')} className="text-sm text-[gold-primary] hover:underline">View All</button>
          </div>
          <div className="divide-y divide-gray-100">
            {loading ? (
              <div className="p-8 text-center"><div className="animate-spin w-6 h-6 border-2 border-[gold-primary] border-t-transparent rounded-full mx-auto"></div></div>
            ) : recentCallbacks.length > 0 ? (
              recentCallbacks.map((callback) => (
                <div key={callback._id} className="px-5 py-3 hover:bg-gray-50 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{callback.fullName}</p>
                    <p className="text-xs text-gray-500">{callback.phone} • {callback.email}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[callback.status] || 'bg-yellow-100 text-yellow-700'}`}>{callback.status || 'Pending'}</span>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500 text-sm">No recent callbacks</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
