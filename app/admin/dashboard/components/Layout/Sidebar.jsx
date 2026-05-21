"use client";
import { 
  LayoutDashboard, 
  Users, 
  Phone, 
  FileText, 
  BarChart3, 
  Mail,
  LogOut,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { canAccess, ROLE_LABELS } from "../../utils/roles";

const iconMap = {
  LayoutDashboard,
  Users,
  Phone,
  FileText,
  BarChart3,
  Mail,
};

export default function Sidebar({ activeTab, onTabChange, isOpen, onClose }) {
  const { user, logout } = useAuth();
  const role = user?.role || 'admin';

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard", resource: "analytics" },
    { id: "leads", label: "Leads", icon: "Users", resource: "leads" },
    { id: "callbacks", label: "Callbacks", icon: "Phone", resource: "callbacks" },
    { id: "blog", label: "Blog", icon: "FileText", resource: "blog" },
    { id: "analytics", label: "Analytics", icon: "BarChart3", resource: "analytics" },
    { id: "email", label: "Email", icon: "Mail", resource: "email" },
  ].filter(item => canAccess(role, item.resource));

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-64 h-full bg-white border-r border-gray-200
      flex flex-col overflow-hidden
      transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0 lg:relative lg:inset-auto lg:z-auto
    `}>
      <div className="flex items-center justify-between h-14 px-3 sm:px-4 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#C9A84C] to-[#A8892A] rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">GC</span>
          </div>
          <span className="text-lg font-bold text-gray-900">GetCredit</span>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 p-2 sm:p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`
                w-full flex items-center gap-3 px-2 sm:px-4 py-2.5 sm:py-3 rounded-xl text-sm font-medium
                transition-all duration-200
                ${activeTab === item.id
                  ? 'bg-gradient-to-r from-[#C9A84C] to-[#B8943D] text-white shadow-lg shadow-[#C9A84C]/25'
                  : 'text-gray-600 hover:bg-[#C9A84C]/5 hover:text-[#C9A84C]'
                }
              `}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-2 sm:p-3 border-t border-gray-100 flex-shrink-0">
        <div className="px-2 mb-2">
          <p className="text-xs text-gray-400 uppercase tracking-wide">Role</p>
          <p className="text-sm font-medium text-[#C9A84C]">{ROLE_LABELS[role]}</p>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-2 sm:px-4 py-2.5 sm:py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
