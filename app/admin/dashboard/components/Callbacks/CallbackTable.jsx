"use client";
import { Edit2, Trash2 } from "lucide-react";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Called: "bg-blue-100 text-blue-700",
  Closed: "bg-gray-100 text-gray-700",
};

export default function CallbackTable({ callbacks, loading, onStatusChange, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-[gold-primary]/10 shadow-sm p-8">
        <div className="flex justify-center">
          <div className="w-8 h-8 border-4 border-[gold-primary] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (callbacks.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-[gold-primary]/10 shadow-sm p-8 text-center">
        <p className="text-gray-500">No callback requests found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[gold-primary]/10 shadow-sm overflow-hidden">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-bg-tertiary">
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Phone</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Email</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">City</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {callbacks.map((cb) => (
              <tr key={cb._id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">{cb.fullName}</td>
                <td className="py-3 px-4">{cb.phone}</td>
                <td className="py-3 px-4 break-all max-w-[200px]">{cb.email}</td>
                <td className="py-3 px-4">{cb.city || '-'}</td>
                <td className="py-3 px-4">
                  <select
                    value={cb.status}
                    onChange={(e) => onStatusChange(cb._id, e.target.value)}
                    className={`px-2 py-1 rounded-full text-xs font-medium border-0 ${statusColors[cb.status] || statusColors.Pending}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Called">Called</option>
                    <option value="Closed">Closed</option>
                  </select>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => onEdit(cb)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => onDelete(cb._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y divide-gray-100">
        {callbacks.map((cb) => (
          <div key={cb._id} className="p-4 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900 truncate">{cb.fullName}</p>
                <p className="text-xs text-gray-500">{cb.phone}</p>
              </div>
              <select
                value={cb.status}
                onChange={(e) => onStatusChange(cb._id, e.target.value)}
                className={`shrink-0 px-2 py-1 rounded-full text-xs font-medium border-0 ${statusColors[cb.status] || statusColors.Pending}`}
              >
                <option value="Pending">Pending</option>
                <option value="Called">Called</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div className="text-xs text-gray-600">
              <span>{cb.email}</span>
              {cb.city && <span> • {cb.city}</span>}
            </div>
            <div className="flex gap-3 pt-1">
              <button onClick={() => onEdit(cb)} className="text-xs text-blue-600 font-medium">Edit</button>
              <button onClick={() => onDelete(cb._id)} className="text-xs text-red-600 font-medium">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
