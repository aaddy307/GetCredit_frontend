"use client";
import { useState, useEffect, useCallback } from "react";
import { Plus, Search, X, Edit2, Trash2, ChevronLeft, ChevronRight, Download, Filter, Calendar, ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const statusOptions = [
  { value: 'Pending', label: 'Pending' },
  { value: 'In Review', label: 'In Review' },
  { value: 'Approved', label: 'Approved' },
  { value: 'Rejected', label: 'Rejected' },
  { value: 'Closed', label: 'Closed' }
];

const loanTypeOptions = [
  { value: 'Home Loan', label: 'Home Loan' },
  { value: 'Loan Against Property', label: 'Loan Against Property' },
  { value: 'Education Loan', label: 'Education Loan' },
  { value: 'Personal Loan', label: 'Personal Loan' },
  { value: 'Business Loan', label: 'Business Loan' },
  { value: 'Vehicle Loan', label: 'Vehicle Loan' }
];

const sourceOptions = [
  { value: '', label: 'All Sources' },
  { value: 'Website', label: 'Website' },
  { value: 'EMI Calculator', label: 'EMI Calculator' },
  { value: 'Admin', label: 'Admin' },
  { value: 'Import', label: 'Import' },
  { value: 'Referral', label: 'Referral' },
  { value: 'Advertisement', label: 'Advertisement' },
  { value: 'Other', label: 'Other' }
];

export default function LeadsView() {
  const { hasPermission } = useAuth();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loanTypeFilter, setLoanTypeFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [statusDropdown, setStatusDropdown] = useState(null);
  const [exporting, setExporting] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();
  const limit = 20;

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (statusFilter) params.append("status", statusFilter);
      if (loanTypeFilter) params.append("loanType", loanTypeFilter);
      if (sourceFilter) params.append("source", sourceFilter);
      if (dateFrom) params.append("startDate", dateFrom);
      if (dateTo) params.append("endDate", dateTo);
      params.append("page", page);
      params.append("limit", limit);

      const response = await fetch(`${API_URL}/admin/all-leads?${params}`, { credentials: 'include' });
      const data = await response.json();

      if (data.success) {
        setLeads(data.leads || []);
        setTotalCount(data.total || 0);
      }
    } catch (err) {
      toast.error("Failed to fetch leads");
    }
    setLoading(false);
  }, [search, statusFilter, loanTypeFilter, sourceFilter, dateFrom, dateTo, page]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      const lead = leads.find(l => l._id === leadId);
      const collection = lead?._collection || 'enquiries';
      const response = await fetch(`${API_URL}/admin/lead/${leadId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus, _collection: collection })
      });
      if (response.ok) {
        setLeads(leads.map(l => l._id === leadId ? { ...l, status: newStatus } : l));
        toast.success("Status updated");
      } else {
        const result = await response.json();
        toast.error(result.message || "Failed to update status");
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
    setStatusDropdown(null);
  };

  const openAddModal = () => {
    setEditingLead(null);
    reset({ fullName: "", phone: "", email: "", city: "", loanType: "Home Loan", loanAmount: "", status: "Pending", leadSource: "Admin - Manual Entry" });
    setShowModal(true);
  };

  const openEditModal = (lead) => {
    setEditingLead(lead);
    reset({ fullName: lead.fullName, phone: lead.phone, email: lead.email, city: lead.city || "", loanType: lead.loanType, loanAmount: lead.loanAmount, status: lead.status, leadSource: lead.leadSource || "Admin - Manual Entry" });
    setShowModal(true);
  };

  const onSubmit = async (data) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const payload = { ...data, loanAmount: parseInt(data.loanAmount) || 0 };
      let response;
      if (editingLead) {
        const collection = editingLead._collection || 'enquiries';
        response = await fetch(`${API_URL}/admin/lead/${editingLead._id}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
          body: JSON.stringify({ ...payload, _collection: collection })
        });
      } else {
        response = await fetch(`${API_URL}/enquiry`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify(payload)
        });
      }
      if (response.ok) {
        toast.success(editingLead ? "Lead updated" : "Lead added");
        setShowModal(false);
        setSubmitting(false);
        fetchLeads();
      } else {
        const result = await response.json();
        toast.error(result.message || (editingLead ? "Failed to update" : "Failed to add"));
        setSubmitting(false);
      }
    } catch (err) {
      toast.error(editingLead ? "Failed to update" : "Failed to add");
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      const lead = leads.find(l => l._id === deleteId);
      const collection = lead?._collection || 'enquiries';
      const response = await fetch(`${API_URL}/admin/lead/${deleteId}?collection=${collection}`, { method: 'DELETE', credentials: 'include' });
      if (response.ok) { toast.success("Lead deleted"); fetchLeads(); }
      else {
        const result = await response.json();
        toast.error(result.message || "Failed to delete");
      }
    } catch (err) { toast.error("Failed to delete"); }
    setShowDeleteConfirm(false);
    setDeleteId(null);
  };

  const handleExport = async (format = 'xlsx') => {
    setExporting(true);
    try {
      const params = new URLSearchParams({ format });
      if (statusFilter) params.append("status", statusFilter);
      if (loanTypeFilter) params.append("loanType", loanTypeFilter);
      if (dateFrom) params.append("startDate", dateFrom);
      if (dateTo) params.append("endDate", dateTo);
      const response = await fetch(`${API_URL}/admin/all-leads/export?${params}`, { credentials: 'include' });
      if (!response.ok) throw new Error('Export failed');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leads-${new Date().toISOString().split('T')[0]}.${format}`;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success(`Exported as ${format.toUpperCase()}`);
    } catch (err) {
      toast.error("Export failed");
    }
    setExporting(false);
  };

  const clearFilters = () => {
    setSearch(''); setStatusFilter(''); setLoanTypeFilter(''); setSourceFilter(''); setDateFrom(''); setDateTo(''); setPage(1);
  };

  const hasActiveFilters = search || statusFilter || loanTypeFilter || sourceFilter || dateFrom || dateTo;

  const totalPages = Math.ceil(totalCount / limit);
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, totalCount);

  const statusColors = {
    'Pending': 'bg-yellow-100 text-yellow-700',
    'In Review': 'bg-blue-100 text-blue-700',
    'Approved': 'bg-green-100 text-green-700',
    'Rejected': 'bg-red-100 text-red-700',
    'Closed': 'bg-gray-100 text-gray-700'
  };

  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const formatCurrency = (value) => {
    if (!value) return '-';
    return `₹${parseInt(value).toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Leads</h2>
          <p className="text-sm text-gray-500">All enquiries across Home, Education, LAP, Personal, Business & Vehicle loans</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {hasPermission('leads', 'export') && (
            <div className="relative">
              <button
                onClick={() => handleExport('xlsx')}
                disabled={exporting}
                className="flex items-center gap-2 px-3 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          )}
          {hasPermission('leads', 'create') && (
            <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2.5 bg-[#C9A84C] text-white rounded-xl font-medium hover:bg-[#A8892A] transition-colors">
              <Plus className="w-4 h-4" />
              Add Lead
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-0 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search name, phone, email..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A84C]"
            />
            {search && (
              <button onClick={() => { setSearch(''); setPage(1); }} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>

          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A84C]">
            <option value="">All Status</option>
            {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>

          <select value={loanTypeFilter} onChange={(e) => { setLoanTypeFilter(e.target.value); setPage(1); }} className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A84C]">
            <option value="">All Loan Types</option>
            {loanTypeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>

          <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Advanced
            <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          {hasActiveFilters && (
            <button onClick={clearFilters} className="text-[#C9A84C] text-sm hover:underline">Clear All</button>
          )}
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Source</label>
              <select value={sourceFilter} onChange={(e) => { setSourceFilter(e.target.value); setPage(1); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A84C]">
                {sourceOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">From Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="date" value={dateFrom} onChange={(e) => { setDateFrom(e.target.value); setPage(1); }} className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A84C]" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">To Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="date" value={dateTo} onChange={(e) => { setDateTo(e.target.value); setPage(1); }} className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A84C]" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">City</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Loan Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Source</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={10} className="px-4 py-12 text-center"><div className="animate-spin w-6 h-6 border-2 border-[#C9A84C] border-t-transparent rounded-full mx-auto"></div></td></tr>
              ) : leads.length === 0 ? (
                <tr><td colSpan={10} className="px-4 py-12 text-center text-gray-500">No leads found</td></tr>
              ) : (
                leads.map((lead, index) => (
                  <tr key={lead._id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{lead.fullName}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{lead.phone}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 break-all max-w-[200px]">{lead.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{lead.city || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{lead.loanType}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        lead._isEMI ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {lead._isEMI ? 'EMI Calculator' : lead.leadSource || 'Website'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{formatCurrency(lead.loanAmount)}</td>
                    <td className="px-4 py-3">
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setStatusDropdown(statusDropdown === lead._id ? null : lead._id);
                          }}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[lead.status] || 'bg-gray-100 text-gray-600'}`}
                        >
                          {lead.status || 'Pending'}
                        </button>
                        {statusDropdown === lead._id && (
                          <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[120px]">
                            {statusOptions.map((opt) => (
                              <button key={opt.value} onClick={(e) => { e.stopPropagation(); handleStatusChange(lead._id, opt.value); }} className="block w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50">{opt.label}</button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">{formatDate(lead.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {hasPermission('leads', 'update') && (
                          <button onClick={() => openEditModal(lead)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded"><Edit2 className="w-4 h-4" /></button>
                        )}
                        {hasPermission('leads', 'delete') && (
                          <button onClick={() => { setDeleteId(lead._id); setShowDeleteConfirm(true); }} className="p-1.5 text-red-500 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                        )}
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
            <div className="px-4 py-12 text-center"><div className="animate-spin w-6 h-6 border-2 border-[#C9A84C] border-t-transparent rounded-full mx-auto"></div></div>
          ) : leads.length === 0 ? (
            <div className="px-4 py-12 text-center text-gray-500">No leads found</div>
          ) : (
            leads.map((lead) => (
              <div key={lead._id} className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 truncate">{lead.fullName}</p>
                    <p className="text-xs text-gray-500">{lead.phone}</p>
                  </div>
                  <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[lead.status] || 'bg-gray-100 text-gray-600'}`}>
                    {lead.status || 'Pending'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-600">
                  <span>{lead.loanType}</span>
                  <span>{formatCurrency(lead.loanAmount)}</span>
                  <span className={`${lead._isEMI ? 'text-purple-600' : 'text-blue-600'}`}>{lead._isEMI ? 'EMI Calculator' : lead.leadSource || 'Website'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400">{formatDate(lead.createdAt)}</p>
                  <div className="flex gap-2">
                    {hasPermission('leads', 'update') && (
                      <button onClick={() => openEditModal(lead)} className="text-xs text-blue-600 font-medium">Edit</button>
                    )}
                    {hasPermission('leads', 'delete') && (
                      <button onClick={() => { setDeleteId(lead._id); setShowDeleteConfirm(true); }} className="text-xs text-red-600 font-medium">Delete</button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-4 py-3 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs sm:text-sm text-gray-500">Showing <span className="font-medium">{startItem}</span> to <span className="font-medium">{endItem}</span> of <span className="font-medium">{totalCount}</span> results</p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(page - 1)} disabled={page <= 1} className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"><ChevronLeft className="w-4 h-4" /></button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = page <= 3 ? i + 1 : page - 2 + i;
              if (pageNum < 1 || pageNum > totalPages) return null;
              return (
                <button key={pageNum} onClick={() => setPage(pageNum)} className={`w-8 h-8 rounded text-sm ${page === pageNum ? 'bg-[#C9A84C] text-white' : 'hover:bg-gray-100'}`}>{pageNum}</button>
              );
            })}
            <button onClick={() => setPage(page + 1)} disabled={page >= totalPages} className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40">
          <div className="bg-white rounded-t-2xl md:rounded-2xl shadow-xl w-full md:max-w-md max-h-[90vh] overflow-y-auto md:mx-4">
            <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
              <h2 className="text-lg font-semibold text-gray-900">{editingLead ? 'Edit Lead' : 'Add New Lead'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input {...register("fullName", { required: "Name is required" })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C]" />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input {...register("phone", { required: "Phone is required", pattern: { value: /^[6-9]\d{9}$/, message: "Enter valid 10-digit number" } })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C]" />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input type="email" {...register("email", { required: "Email is required" })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C]" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input {...register("city")} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C]" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loan Type *</label>
                  <select {...register("loanType", { required: "Loan type is required" })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C]">
                    {loanTypeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount</label>
                  <input type="number" {...register("loanAmount")} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select {...register("status")} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C]">
                  {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
              <input type="hidden" {...register("leadSource")} />
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={submitting} className="flex-1 py-2.5 bg-[#C9A84C] text-white rounded-xl hover:bg-[#A8892A] disabled:opacity-50">{submitting ? 'Saving...' : editingLead ? 'Update' : 'Add'} Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40">
          <div className="bg-white rounded-t-2xl md:rounded-xl shadow-xl p-6 w-full md:max-w-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Lead</h3>
            <p className="text-gray-500 mb-4 text-sm">Are you sure? This action cannot be undone.</p>
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
