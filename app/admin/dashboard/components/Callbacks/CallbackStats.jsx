"use client";
import { Clock, CheckCircle, XCircle, List } from "lucide-react";

export default function CallbackStats({ stats }) {
  const statItems = [
    { label: "Total", value: stats.total, icon: List, color: "#6B7280" },
    { label: "Pending", value: stats.pending, icon: Clock, color: "#F59E0B" },
    { label: "Called", value: stats.called, icon: CheckCircle, color: "#10B981" },
    { label: "Closed", value: stats.closed, icon: XCircle, color: "#6B7280" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item) => (
        <div
          key={item.label}
          className="bg-white rounded-xl p-4 border border-[gold-primary]/10 shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">{item.label}</span>
            <item.icon className="w-5 h-5" style={{ color: item.color }} />
          </div>
          <div className="text-2xl font-bold text-gray-800">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
