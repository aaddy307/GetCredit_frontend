"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

function getInitialFormData(data) {
  if (data) {
    return {
      fullName: data.fullName || "",
      phone: data.phone || "",
      email: data.email || "",
      city: data.city || "",
      status: data.status || "Pending",
      notes: data.notes || "",
    };
  }
  return {
    fullName: "",
    phone: "",
    email: "",
    city: "",
    status: "Pending",
    notes: "",
  };
}

export default function CallbackModal({ isOpen, onClose, callback, onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState(() => getInitialFormData(callback));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData(getInitialFormData(callback));
  }, [callback]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">{callback ? "Edit Callback" : "Add Callback"}</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[gold-primary]"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[gold-primary]"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[gold-primary]"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              id="city"
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[gold-primary]"
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[gold-primary]"
            >
              <option value="Pending">Pending</option>
              <option value="Called">Called</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[gold-primary]"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-gold-primary text-white rounded-lg hover:bg-gold-deep disabled:opacity-50 transition-colors font-medium"
            >
              {isSubmitting ? "Saving..." : callback ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
