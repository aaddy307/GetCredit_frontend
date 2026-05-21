"use client";
import { useState, useEffect } from "react";
import { Users, Phone, TrendingUp, CheckCircle } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function StatsWidget() {
  const [stats, setStats] = useState({
    todayLeads: 0,
    todayCallbacks: 0,
    totalLeads: 0,
    pendingCallbacks: 0,
    conversionRate: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/stats/today`, {
        credentials: 'include'
      });
      
      // Check if response is OK before parsing JSON
      if (!response.ok) {
        console.error('Stats fetch failed:', response.status, response.statusText);
        return;
      }
      
      const data = await response.json();
      
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
    setLoading(false);
  };

  const statCards = [
    {
      label: "Today Leads",
      value: stats.todayLeads,
      icon: Users,
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600'
    },
    {
      label: "Callbacks Today",
      value: stats.todayCallbacks,
      icon: Phone,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      label: "Total Leads",
      value: stats.totalLeads,
      icon: TrendingUp,
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      label: "Pending Callbacks",
      value: stats.pendingCallbacks,
      icon: CheckCircle,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-3 sm:p-5 animate-pulse">
            <div className="h-10 w-10 bg-gray-200 rounded-xl mb-3"></div>
            <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
      {statCards.map((stat, index) => (
        <div 
          key={index}
          className="bg-white rounded-2xl p-3 sm:p-4 lg:p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 ${stat.bgColor} rounded-xl flex items-center justify-center mb-2 sm:mb-3`}>
            <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.textColor}`} />
          </div>
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-0.5 sm:mb-1">
            {stat.value.toLocaleString()}
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 leading-tight">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}