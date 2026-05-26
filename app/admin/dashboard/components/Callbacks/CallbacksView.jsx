"use client";
import { useState, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import callbackApi from "./utils/api";
import CallbackStats from "./CallbackStats";
import CallbackFilterBar from "./CallbackFilterBar";
import CallbackTable from "./CallbackTable";
import CallbackModal from "./CallbackModal";

export default function CallbacksView() {
  const [callbacks, setCallbacks] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, called: 0, closed: 0 });
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 20, totalPages: 1 });

  const [showModal, setShowModal] = useState(false);
  const [editingCallback, setEditingCallback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchCallbacks = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 20 };
      if (statusFilter) params.status = statusFilter;
      if (search) params.search = search;

      const result = await callbackApi.getCallbacks(params);
      if (result.success) {
        setCallbacks(result.data || []);
        setStats(result.stats || { total: 0, pending: 0, called: 0, closed: 0 });
        setPagination(result.pagination || { total: 0, page: 1, limit: 20, totalPages: 1 });
      }
    } catch (error) {
      toast.error("Failed to fetch callbacks");
    }
    setLoading(false);
  }, [statusFilter, search, page]);

  useEffect(() => {
    fetchCallbacks();
  }, [fetchCallbacks]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const result = await callbackApi.updateStatus(id, newStatus);
      if (result.success) {
        setCallbacks(callbacks.map(c => c._id === id ? { ...c, status: newStatus } : c));
        toast.success("Status updated");
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const openAddModal = () => {
    setEditingCallback(null);
    setShowModal(true);
  };

  const openEditModal = (callback) => {
    setEditingCallback(callback);
    setShowModal(true);
  };

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (editingCallback) {
        const result = await callbackApi.updateCallback(editingCallback._id, data);
        if (result.success) {
          toast.success("Callback updated");
          setShowModal(false);
          fetchCallbacks();
        } else {
          const msg = Array.isArray(result.errors) ? result.errors.join('. ') : result.message;
          toast.error(msg || "Failed to update");
        }
      } else {
        const result = await callbackApi.createCallback(data);
        if (result.success) {
          toast.success("Callback added");
          setShowModal(false);
          fetchCallbacks();
        } else {
          const msg = Array.isArray(result.errors) ? result.errors.join('. ') : result.message;
          toast.error(msg || "Failed to add");
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
    setIsSubmitting(false);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      const result = await callbackApi.deleteCallback(deleteId);
      if (result.success) {
        toast.success("Callback deleted");
        fetchCallbacks();
      }
    } catch (error) {
      toast.error("Failed to delete");
    }
    setShowDeleteConfirm(false);
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Callback Requests</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage callback requests from users</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#C9A84C] text-white rounded-xl text-sm font-semibold hover:bg-[#A8892A] transition-colors whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          Add Request
        </button>
      </div>

      <CallbackStats stats={stats} />

      <CallbackFilterBar
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        search={search}
        setSearch={setSearch}
        setPage={setPage}
      />

      <CallbackTable
        callbacks={callbacks}
        loading={loading}
        pagination={pagination}
        onPageChange={setPage}
        onStatusChange={handleStatusChange}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      <CallbackModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        callback={editingCallback}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40">
          <div className="bg-white rounded-t-2xl md:rounded-xl shadow-xl p-6 w-full md:max-w-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Callback Request</h3>
            <p className="text-gray-500 mb-4 text-sm">Are you sure you want to delete this callback request? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
