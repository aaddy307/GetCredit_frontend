"use client";
import { useState, useEffect, useCallback } from "react";
import { Plus, Search, X, Edit2, Trash2, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import { useAuth } from "../../context/AuthContext";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const categoryOptions = [
  { value: "Home Loan", label: "Home Loan" },
  { value: "Education", label: "Education" },
  { value: "LAP", label: "Loan Against Property" },
  { value: "Tips", label: "Tips" },
  { value: "Finance", label: "Finance" },
  { value: "Personal Loan", label: "Personal Loan" },
  { value: "Business Loan", label: "Business Loan" },
  { value: "Vehicle Loan", label: "Vehicle Loan" }
];

const statusOptions = [
  { value: "Draft", label: "Draft" },
  { value: "Published", label: "Published" }
];

export default function BlogView() {
  const { hasPermission } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [statusDropdown, setStatusDropdown] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);

  const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm();
  const contentValue = watch("content");
  const limit = 20;

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (categoryFilter) params.append("category", categoryFilter);
      params.append("page", page);

      const response = await fetch(`${API_URL}/blogs?${params}`, { credentials: 'include' });
      const data = await response.json();

      if (data.blogs) {
        setBlogs(data.blogs || []);
        setTotalCount(data.total || 0);
      }
    } catch (err) {
      toast.error("Failed to fetch blogs");
    }
    setLoading(false);
  }, [search, categoryFilter, page]);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  const handleStatusChange = async (blogId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/blogs/${blogId}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        setBlogs(blogs.map(b => b._id === blogId ? { ...b, status: newStatus } : b));
        toast.success("Status updated");
      }
    } catch (err) { toast.error("Failed to update status"); }
    setStatusDropdown(null);
  };

  const openAddModal = () => {
    setEditingBlog(null);
    setPreviewMode(false);
    reset({ title: "", category: "Home Loan", excerpt: "", content: "", author: "", status: "Draft" });
    setShowModal(true);
  };

  const openEditModal = (blog) => {
    setEditingBlog(blog);
    setPreviewMode(false);
    reset({ title: blog.title, category: blog.category, excerpt: blog.excerpt || "", content: blog.content, author: blog.author || "", status: blog.status || "Draft" });
    setShowModal(true);
  };

  const onSubmit = async (data) => {
    try {
      let response;
      if (editingBlog) {
        response = await fetch(`${API_URL}/blogs/${editingBlog._id}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify(data)
        });
      } else {
        response = await fetch(`${API_URL}/blogs`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify(data)
        });
      }
      if (response.ok) {
        toast.success(editingBlog ? "Blog updated" : "Blog added");
        setShowModal(false);
        fetchBlogs();
      }
    } catch (err) { toast.error(editingBlog ? "Failed to update" : "Failed to add"); }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/blogs/${deleteId}`, { method: 'DELETE', credentials: 'include' });
      if (response.ok) { toast.success("Blog deleted"); fetchBlogs(); }
    } catch (err) { toast.error("Failed to delete"); }
    setShowDeleteConfirm(false);
    setDeleteId(null);
  };

  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const statusColors = { 'Draft': 'bg-gray-100 text-gray-700', 'Published': 'bg-green-100 text-green-700' };

  const totalPages = Math.ceil(totalCount / limit);
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, totalCount);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Blog</h2>
          <p className="text-sm text-gray-500">Manage blog posts</p>
        </div>
        {hasPermission('blog', 'create') && (
          <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2.5 bg-[#C9A84C] text-white rounded-xl font-medium hover:bg-[#A8892A] transition-colors">
            <Plus className="w-4 h-4" />
            Add Blog
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-0 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search by title..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A84C]" />
            {search && (<button onClick={() => { setSearch(''); setPage(1); }} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-gray-400" /></button>)}
          </div>
          <select value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }} className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A84C]">
            <option value="">All Categories</option>
            {categoryOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
          {(search || categoryFilter) && (<button onClick={() => { setSearch(''); setCategoryFilter(''); setPage(1); }} className="text-[#C9A84C] text-sm hover:underline">Clear Filters</button>)}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Title</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Author</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (<tr><td colSpan={6} className="px-4 py-12 text-center"><div className="animate-spin w-6 h-6 border-2 border-[#C9A84C] border-t-transparent rounded-full mx-auto"></div></td></tr>) : blogs.length === 0 ? (<tr><td colSpan={6} className="px-4 py-12 text-center text-gray-500">No blogs found</td></tr>) : (
                blogs.map((blog, index) => (
                  <tr key={blog._id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 max-w-xs truncate">{blog.title}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{blog.category}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{blog.author || '-'}</td>
                    <td className="px-4 py-3">
                      <div className="relative">
                        <button onClick={(e) => { e.stopPropagation(); setStatusDropdown(statusDropdown === blog._id ? null : blog._id); }} className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[blog.status] || 'bg-gray-100 text-gray-600'}`}>
                          {blog.status || 'Draft'}
                        </button>
                        {statusDropdown === blog._id && (
                          <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[100px]">
                            {statusOptions.map((opt) => (<button key={opt.value} onClick={(e) => { e.stopPropagation(); handleStatusChange(blog._id, opt.value); }} className="block w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50">{opt.label}</button>))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{formatDate(blog.date)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {hasPermission('blog', 'update') && (<button onClick={() => openEditModal(blog)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded"><Edit2 className="w-4 h-4" /></button>)}
                        {hasPermission('blog', 'delete') && (<button onClick={() => { setDeleteId(blog._id); setShowDeleteConfirm(true); }} className="p-1.5 text-red-500 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>)}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="md:hidden divide-y divide-gray-100">
          {loading ? (
            <div className="p-8 text-center"><div className="animate-spin w-6 h-6 border-2 border-[#C9A84C] border-t-transparent rounded-full mx-auto"></div></div>
          ) : blogs.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No blogs found</div>
          ) : (
            blogs.map((blog) => (
              <div key={blog._id} className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 truncate">{blog.title}</p>
                    <p className="text-xs text-gray-500">{blog.category}</p>
                  </div>
                  <span className={`shrink-0 px-2 py-1 rounded-full text-xs font-medium ${statusColors[blog.status] || 'bg-gray-100 text-gray-600'}`}>
                    {blog.status || 'Draft'}
                  </span>
                </div>
                <div className="flex items-center text-xs text-gray-500 gap-2">
                  {blog.author && <span>{blog.author}</span>}
                  <span>{formatDate(blog.date)}</span>
                </div>
                <div className="flex gap-3 pt-1">
                  {hasPermission('blog', 'update') && <button onClick={() => openEditModal(blog)} className="text-xs text-blue-600 font-medium">Edit</button>}
                  {hasPermission('blog', 'delete') && <button onClick={() => { setDeleteId(blog._id); setShowDeleteConfirm(true); }} className="text-xs text-red-600 font-medium">Delete</button>}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-4 py-3 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm text-gray-500">Showing <span className="font-medium">{startItem}</span> to <span className="font-medium">{endItem}</span> of <span className="font-medium">{totalCount}</span> results</p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(page - 1)} disabled={page <= 1} className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"><ChevronLeft className="w-4 h-4" /></button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = page <= 3 ? i + 1 : page - 2 + i;
              if (pageNum < 1 || pageNum > totalPages) return null;
              return (<button key={pageNum} onClick={() => setPage(pageNum)} className={`w-8 h-8 rounded text-sm ${page === pageNum ? 'bg-[#C9A84C] text-white' : 'hover:bg-gray-100'}`}>{pageNum}</button>);
            })}
            <button onClick={() => setPage(page + 1)} disabled={page >= totalPages} className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40">
          <div className="bg-white rounded-t-2xl md:rounded-2xl shadow-xl w-full md:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
              <h2 className="text-lg font-semibold text-gray-900">{editingBlog ? 'Edit Blog' : 'Add New Blog'}</h2>
              <div className="flex items-center gap-2">
                <button onClick={() => setPreviewMode(!previewMode)} className="p-2 hover:bg-gray-100 rounded-lg" title={previewMode ? "Edit" : "Preview"}>
                  <Eye className="w-5 h-5 text-gray-500" />
                </button>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5 text-gray-500" /></button>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input {...register("title", { required: "Title is required" })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C]" />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select {...register("category", { required: "Category is required" })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C]">
                    {categoryOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select {...register("status")} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C]">
                    {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                <input {...register("author")} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C]" placeholder="Enter author name" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                <textarea {...register("excerpt")} rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] resize-none" placeholder="Short description..." />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
                {previewMode ? (
                  <div className="border border-gray-200 rounded-lg p-4 min-h-[200px] prose prose-sm max-w-none" data-color-mode="light">
                    <MDEditor.Markdown source={contentValue || "*No content*"} />
                  </div>
                ) : (
                  <div data-color-mode="light">
                    <MDEditor value={contentValue} onChange={(val) => setValue("content", val)} height={300} preview="edit" />
                  </div>
                )}
                {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
                <p className="text-xs text-gray-400 mt-1">Supports Markdown formatting</p>
              </div>

              <div className="flex gap-3 pt-2 flex-shrink-0">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 bg-[#C9A84C] text-white rounded-xl hover:bg-[#A8892A]">{editingBlog ? 'Update' : 'Add'} Blog</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40">
          <div className="bg-white rounded-t-2xl md:rounded-xl shadow-xl p-6 w-full md:max-w-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Blog</h3>
            <p className="text-gray-500 mb-4">Are you sure? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleDelete} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
