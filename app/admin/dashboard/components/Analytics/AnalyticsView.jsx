"use client";
import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Users, FileText } from "lucide-react";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { api } from "@/lib/api";

const COLORS = ['#C9A84C', '#A8892A', '#8B7355', '#D4B86A', '#E8CC8C', '#6B8E7B', '#7BA391'];

export default function AnalyticsView() {
  const [stats, setStats] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loanDistribution, setLoanDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      const [summaryRes, monthlyRes, distributionRes] = await Promise.all([
        api.get('/admin/analytics/summary'),
        api.get('/admin/analytics/monthly-leads'),
        api.get('/admin/analytics/loan-distribution')
      ]);

      const summary = summaryRes.data;
      const monthly = monthlyRes.data;
      const distribution = distributionRes.data;

      if (summary.success) setStats(summary.data);
      if (monthly.success) setMonthlyData(monthly.data || []);
      if (distribution.success) setLoanDistribution(distribution.data || []);
    } catch {
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAnalytics();
  }, []);

  const statCards = [
    { label: 'Total Leads', value: stats?.totalLeads || 0, icon: Users, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'New (7 Days)', value: stats?.newLeads || 0, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Pending', value: stats?.pending || 0, icon: FileText, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'Completed', value: stats?.completed || 0, icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-3 sm:p-5 animate-pulse">
              <div className="h-10 w-10 bg-gray-200 rounded-xl mb-3"></div>
              <div className="h-8 bg-gray-200 rounded w-20 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
        <p className="text-sm text-gray-500">View your performance metrics across all loan types</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className={`w-11 h-11 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-[gold-primary]" />
            <h3 className="font-semibold text-gray-900">Monthly Leads</h3>
          </div>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="gold-primary" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="gold-primary" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }} />
                <Area type="monotone" dataKey="count" stroke="gold-primary" fillOpacity={1} fill="url(#colorLeads)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
              <p className="text-gray-400 text-sm">No data available</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-[gold-primary]" />
            <h3 className="font-semibold text-gray-900">Loan Distribution</h3>
          </div>
          {loanDistribution.length > 0 ? (
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={loanDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="count"
                    nameKey="type"
                  >
                    {loanDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-2">
                {loanDistribution.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-gray-600">{item.type}</span>
                    <span className="font-medium text-gray-900">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
              <p className="text-gray-400 text-sm">No data available</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-[gold-primary]" />
          <h3 className="font-semibold text-gray-900">Status Breakdown</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[
            { key: 'pending', label: 'Pending' },
            { key: 'running', label: 'In Review' },
            { key: 'completed', label: 'Completed' },
            { key: 'rejected', label: 'Rejected' },
            { key: 'totalLeads', label: 'Total' }
          ].map((item) => {
            const count = stats?.[item.key] || 0;
            const total = stats?.totalLeads || 1;
            const percentage = item.key === 'totalLeads' ? 100 : Math.round((count / total) * 100);
            const hexColors = {
              'pending': '#eab308',
              'running': '#3b82f6',
              'completed': '#22c55e',
              'rejected': '#ef4444',
              'totalLeads': 'gold-primary'
            };
            return (
              <div key={item.key} className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={hexColors[item.key] || '#6b7280'} strokeWidth="3" strokeDasharray={`${percentage}, 100`} />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-900">{count}</span>
                </div>
                <p className="text-xs text-gray-500">{item.label}</p>
                <p className="text-xs text-gray-400">{percentage}%</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
