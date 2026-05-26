"use client";
import { useState, useEffect, useCallback } from "react";
import { Plus, X, Edit2, Trash2, Shield } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/api";
import { ROLE_LABELS } from "../../utils/roles";

export default function UsersView() {
  const { user, hasPermission } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    document.body.style.overflow = showModal || showDeleteConfirm ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [showModal, showDeleteConfirm]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const result = await api.getUsers();
      if (result.success) {
        setUsers(result.admins || []);
      }
    } catch (err) {
      toast.error("Failed to fetch users");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const openAddModal = () => {
    setEditingUser(null);
    reset({ name: "", email: "", password: "" });
    setShowModal(true);
  };

  const openEditModal = (u) => {
    setEditingUser(u);
    reset({ name: u.name, email: u.email });
    setShowModal(true);
  };

  const onSubmit = async (data) => {
    try {
      if (editingUser) {
        const result = await api.updateUser(editingUser._id, { name: data.name });
        if (result.success) {
          toast.success("User updated");
          setShowModal(false);
          fetchUsers();
        } else {
          toast.error(result.message || "Failed to update");
        }
      } else {
        const result = await api.createUser(data);
        if (result.success) {
          toast.success("User created");
          setShowModal(false);
          fetchUsers();
        } else {
          toast.error(result.message || "Failed to create");
        }
      }
    } catch (err) {
      toast.error(editingUser ? "Failed to update" : "Failed to create");
    }
  };

  const handleDelete = async () => {
    try {
      const result = await api.deleteUser(deleteId);
      if (result.success) {
        toast.success("User deleted");
        fetchUsers();
      } else {
        toast.error(result.message || "Failed to delete");
      }
    } catch (err) {
      toast.error("Failed to delete");
    }
    setShowDeleteConfirm(false);
    setDeleteId(null);
  };

  const roleColors = {
    admin: 'bg-purple-100 text-purple-700'
  };

  if (!hasPermission('users', 'read')) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">You don't have permission to view users.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Users</h2>
          <p className="text-sm text-gray-500">Manage admin users and roles</p>
        </div>
        {hasPermission('users', 'create') && (
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#C9A84C] text-white rounded-xl font-medium hover:bg-[#A8892A] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add User
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Role</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Created</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center">
                    <div className="animate-spin w-6 h-6 border-2 border-[#C9A84C] border-t-transparent rounded-full mx-auto"></div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-gray-500">No users found</td>
                </tr>
              ) : (
                users.map((u, index) => (
                  <tr key={u._id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#C9A84C] to-[#A8892A] rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-medium">{u.name?.charAt(0)?.toUpperCase() || 'A'}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{u.email}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${roleColors[u.role]}`}>
                        {ROLE_LABELS[u.role]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(u.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {hasPermission('users', 'update') && (
                          <button onClick={() => openEditModal(u)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded">
                            <Edit2 className="w-4 h-4" />
                          </button>
                        )}
                        {hasPermission('users', 'delete') && u._id !== user?.id && (
                          <button onClick={() => { setDeleteId(u._id); setShowDeleteConfirm(true); }} className="p-1.5 text-red-500 hover:bg-red-50 rounded">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingUser ? 'Edit User' : 'Add New User'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C]"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  disabled={!!editingUser}
                  className={`w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] ${editingUser ? 'bg-gray-50' : ''}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              {!editingUser && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                  <input
                    type="password"
                    {...register("password", { required: "Password is required", minLength: { value: 12, message: "Min 12 characters" } })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C]"
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                  <p className="text-xs text-gray-400 mt-1">Min 12 chars, uppercase, lowercase, number, special char</p>
                </div>
              )}

              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-4 h-4 text-[#C9A84C]" />
                  <span className="text-sm font-medium text-gray-700">
                    {ROLE_LABELS.admin} Permissions
                  </span>
                </div>
                <p className="text-xs text-gray-500">Full access to everything including user management</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-2.5 bg-[#C9A84C] text-white rounded-xl hover:bg-[#A8892A]">
                  {editingUser ? 'Update' : 'Create'} User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete User</h3>
            <p className="text-gray-500 mb-4">Are you sure? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={handleDelete} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
