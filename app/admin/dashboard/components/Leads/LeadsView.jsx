"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Plus, Search, X, Edit2, Trash2, ChevronLeft, ChevronRight, Download, Filter, Calendar, ChevronDown, Inbox } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { api } from "@/lib/api";


const ITEMS_PER_PAGE = 10;

const statusOptions = [
  { value: 'Pending', label: 'Pending' },
  { value: 'In Review', label: 'In Review' },
  { value: 'Approved', label: 'Approved' },
  { value: 'Rejected', label: 'Rejected' },
  { value: 'Closed', label: 'Closed' },
];

const loanTypeOptions = [
  { value: 'Home Loan', label: 'Home Loan' },
  { value: 'Loan Against Property', label: 'Loan Against Property' },
  { value: 'Education Loan', label: 'Education Loan' },
  { value: 'Personal Loan', label: 'Personal Loan' },
  { value: 'Business Loan', label: 'Business Loan' },
  { value: 'Vehicle Loan', label: 'Vehicle Loan' },
];

const sourceOptions = [
  { value: '', label: 'All Sources' },
  { value: 'Website', label: 'Website' },
  { value: 'EMI Calculator', label: 'EMI Calculator' },
  { value: 'Admin', label: 'Admin' },
  { value: 'Import', label: 'Import' },
  { value: 'Referral', label: 'Referral' },
  { value: 'Advertisement', label: 'Advertisement' },
  { value: 'Other', label: 'Other' },
];

const statusColors = {
  'Pending': 'bg-yellow-100 text-yellow-700',
  'In Review': 'bg-blue-100 text-blue-700',
  'Approved': 'bg-green-100 text-green-700',
  'Rejected': 'bg-red-100 text-red-700',
  'Closed': 'bg-gray-100 text-gray-700',
};

function formatDate(date) {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

const MONTH_TENURE_LOANS = ['Personal Loan', 'Non-Salaried Loan', 'Business Loan'];

function getTenureUnit(loanType, lead) {
  if (lead?.tenureUnit) return lead.tenureUnit;
  return MONTH_TENURE_LOANS.includes(loanType) ? 'Months' : 'Years';
}

function formatTenure(lead) {
  if (!lead?.tenure) return '-';
  return `${lead.tenure} ${getTenureUnit(lead.loanType, lead)}`;
}

function formatCurrency(value) {
  if (!value) return '-';
  return `\u20B9${parseInt(value).toLocaleString()}`;
}

function normalizeLeads(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.filter(Boolean);
}

function Pagination({ page, totalPages, onPageChange }) {
  const items = useMemo(() => {
    if (totalPages <= 1) return [];
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push('...');
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (page < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  }, [page, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center gap-1" aria-label="Pagination">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      {items.map((item, i) =>
        item === '...' ? (
          <span key={`e${i}`} className="w-8 h-8 flex items-center justify-center text-sm text-gray-400 select-none">
            &hellip;
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
              page === item
                ? 'bg-[#C9A84C] text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            aria-current={page === item ? 'page' : undefined}
          >
            {item}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}

function EmptyState({ hasActiveFilters, onClearFilters }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Inbox className="w-7 h-7 text-gray-400" />
      </div>
      <p className="text-gray-500 font-medium">No leads found</p>
      {hasActiveFilters && (
        <button onClick={onClearFilters} className="mt-2 text-sm text-[#C9A84C] hover:underline">
          Clear all filters to see all leads
        </button>
      )}
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="animate-spin w-7 h-7 border-2 border-[#C9A84C] border-t-transparent rounded-full" />
    </div>
  );
}

export default function LeadsView() {
  const { hasPermission } = useAuth();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLeads, setTotalLeads] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [statusDropdown, setStatusDropdown] = useState(null);
  const [exporting, setExporting] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [filters, setFilters] = useState({
    search: '',
    status: '',
    loanType: '',
    source: '',
    fromDate: '',
    toDate: '',
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      });
      if (filters.search) params.append('search', filters.search);
      if (filters.status) params.append('status', filters.status);
      if (filters.loanType) params.append('loanType', filters.loanType);
      if (filters.source) params.append('source', filters.source);
      if (filters.fromDate) params.append('startDate', filters.fromDate);
      if (filters.toDate) params.append('endDate', filters.toDate);

      const response = await api.get(`/admin/all-leads?${params}`);
      const data = response.data;
      setLeads(normalizeLeads(data?.leads));
      setTotalPages(data?.pages || 1);
      setTotalLeads(data?.total || 0);
    } catch (err) {
      toast.error("Failed to fetch leads");
      setLeads([]);
    }
    setLoading(false);
  }, [currentPage, filters]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const hasActiveFilters = filters.search || filters.status || filters.loanType || filters.source || filters.fromDate || filters.toDate;

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ search: '', status: '', loanType: '', source: '', fromDate: '', toDate: '' });
    setCurrentPage(1);
  }, []);

  const handleStatusChange = useCallback(async (leadId, newStatus) => {
    try {
      const lead = leads.find(l => l._id === leadId);
      const collection = lead?._collection || 'enquiries';
      const response = await api.put(`/admin/lead/${leadId}`, { status: newStatus, _collection: collection });
      if (response.status === 200) {
        setLeads(prev => prev.map(l => (l._id === leadId ? { ...l, status: newStatus } : l)));
        toast.success("Status updated");
      } else {
        toast.error(response.data?.message || "Failed to update status");
      }
    } catch {
      toast.error("Failed to update status");
    }
    setStatusDropdown(null);
  }, [leads]);

  const openAddModal = useCallback(() => {
    setEditingLead(null);
    reset({ fullName: '', phone: '', email: '', city: '', loanType: 'Home Loan', loanAmount: '', tenure: '', tenureUnit: 'Years', status: 'Pending', leadSource: 'Admin - Manual Entry' });
    setShowModal(true);
  }, [reset]);

  const openEditModal = useCallback((lead) => {
    setEditingLead(lead);
    reset({
      fullName: lead.fullName, phone: lead.phone, email: lead.email, city: lead.city || '',
      loanType: lead.loanType, loanAmount: lead.loanAmount, status: lead.status,
      tenure: lead.tenure || '', tenureUnit: lead.tenureUnit || 'Years',
      leadSource: lead.leadSource || 'Admin - Manual Entry',
    });
    setShowModal(true);
  }, [reset]);

  const onSubmit = useCallback(async (data) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const payload = {
        ...data,
        loanAmount: parseInt(data.loanAmount) || 0,
        tenure: data.tenure ? parseInt(data.tenure) : undefined,
        tenureUnit: data.tenureUnit || undefined,
      };
      let response;
      if (editingLead) {
        const collection = editingLead._collection || 'enquiries';
        response = await api.put(`/admin/lead/${editingLead._id}`, { ...payload, _collection: collection });
      } else {
        response = await api.post('/enquiry', payload);
      }
      if (response.status === 200 || response.status === 201) {
        toast.success(editingLead ? "Lead updated" : "Lead added");
        setShowModal(false);
        fetchLeads();
      } else {
        toast.error(response.data?.message || (editingLead ? "Failed to update" : "Failed to add"));
      }
    } catch (err) {
      toast.error(err.response?.data?.message || (editingLead ? "Failed to update" : "Failed to add"));
    }
    setSubmitting(false);
  }, [submitting, editingLead, fetchLeads]);

  const handleDelete = useCallback(async () => {
    try {
      const lead = leads.find(l => l._id === deleteId);
      const collection = lead?._collection || 'enquiries';
      const response = await api.delete(`/admin/lead/${deleteId}?collection=${collection}`);
      if (response.status === 200) {
        toast.success("Lead deleted");
        setLeads(prev => {
          const next = prev.filter(l => l._id !== deleteId);
          const maxPage = Math.ceil(next.length / ITEMS_PER_PAGE) || 1;
          if (currentPage > maxPage) setCurrentPage(maxPage);
          return next;
        });
      } else {
        toast.error(response.data?.message || "Failed to delete");
      }
    } catch { toast.error("Failed to delete"); }
    setShowDeleteConfirm(false);
    setDeleteId(null);
  }, [deleteId, leads, currentPage]);

  const handleExport = useCallback(async (format = 'xlsx') => {
    setExporting(true);
    try {
      const params = new URLSearchParams({ format });
      if (filters.status) params.append("status", filters.status);
      if (filters.loanType) params.append("loanType", filters.loanType);
      if (filters.fromDate) params.append("startDate", filters.fromDate);
      if (filters.toDate) params.append("endDate", filters.toDate);
      const response = await api.get(`/admin/all-leads/export?${params}`, { responseType: 'blob' });
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leads-${new Date().toISOString().split('T')[0]}.${format}`;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success(`Exported as ${format.toUpperCase()}`);
    } catch {
      toast.error("Export failed");
    }
    setExporting(false);
  }, [filters]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Leads</h2>
          <p className="text-sm text-gray-500">All enquiries across Home, Education, LAP, Personal, Business &amp; Vehicle loans</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {hasPermission('leads', 'export') && (
            <button
              onClick={() => handleExport('xlsx')}
              disabled={exporting}
              className="flex items-center gap-2 px-3 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          )}
          {hasPermission('leads', 'create') && (
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#C9A84C] text-white rounded-xl font-medium hover:bg-[#A8892A] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Lead
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-0 w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              placeholder="Search name, phone, email..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A84C]"
            />
            {filters.search && (
              <button onClick={() => updateFilter('search', '')} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>

          <select
            value={filters.status}
            onChange={(e) => updateFilter('status', e.target.value)}
            className="w-full md:w-auto px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A84C]"
          >
            <option value="">All Status</option>
            {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>

          <select
            value={filters.loanType}
            onChange={(e) => updateFilter('loanType', e.target.value)}
            className="w-full md:w-auto px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A84C]"
          >
            <option value="">All Loan Types</option>
            {loanTypeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>

          <button
            onClick={() => setShowFilters(prev => !prev)}
            className="w-full md:w-auto flex items-center gap-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
          >
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
              <select
                value={filters.source}
                onChange={(e) => updateFilter('source', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A84C]"
              >
                {sourceOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">From Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={filters.fromDate}
                  onChange={(e) => updateFilter('fromDate', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A84C]"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">To Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={filters.toDate}
                  onChange={(e) => updateFilter('toDate', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A84C]"
                />
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
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tenure</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={11}><LoadingSpinner /></td></tr>
              ) : leads.length === 0 ? (
                <tr><td colSpan={11}><EmptyState hasActiveFilters={hasActiveFilters} onClearFilters={clearFilters} /></td></tr>
              ) : (
                leads.map((lead, index) => (
                  <tr key={lead._id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
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
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{formatTenure(lead)}</td>
                    <td className="px-4 py-3">
                      <div className="relative">
                        <button
                          onClick={(e) => { e.stopPropagation(); setStatusDropdown(prev => prev === lead._id ? null : lead._id); }}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[lead.status] || 'bg-gray-100 text-gray-600'}`}
                        >
                          {lead.status || 'Pending'}
                        </button>
                        {statusDropdown === lead._id && (
                          <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[120px]">
                            {statusOptions.map(opt => (
                              <button
                                key={opt.value}
                                onClick={(e) => { e.stopPropagation(); handleStatusChange(lead._id, opt.value); }}
                                className="block w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50"
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">{formatDate(lead.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {hasPermission('leads', 'update') && (
                          <button onClick={() => openEditModal(lead)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                        )}
                        {hasPermission('leads', 'delete') && (
                          <button onClick={() => { setDeleteId(lead._id); setShowDeleteConfirm(true); }} className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors">
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

        <div className="md:hidden divide-y divide-gray-100">
          {loading ? (
            <LoadingSpinner />
          ) : leads.length === 0 ? (
            <EmptyState hasActiveFilters={hasActiveFilters} onClearFilters={clearFilters} />
          ) : (
            leads.map(lead => (
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
                  <span className="text-[#8B7A2E]">{formatTenure(lead)}</span>
                  <span className={`${lead._isEMI ? 'text-purple-600' : 'text-blue-600'}`}>
                    {lead._isEMI ? 'EMI Calculator' : lead.leadSource || 'Website'}
                  </span>
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

        {!loading && leads.length > 0 && totalPages > 1 && (
          <div className="px-4 py-3 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-xs sm:text-sm text-gray-500">
              Showing {leads.length} of {totalLeads} leads
            </p>
            <Pagination page={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        )}
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tenure</label>
                  <div className="flex gap-2">
                    <input type="number" {...register("tenure")} min="1" max="84" placeholder="Value" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C]" />
                    <select {...register("tenureUnit")} className="w-28 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] text-sm">
                      <option value="Years">Years</option>
                      <option value="Months">Months</option>
                    </select>
                  </div>
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
                <button type="submit" disabled={submitting} className="flex-1 py-2.5 bg-[#C9A84C] text-white rounded-xl hover:bg-[#A8892A] disabled:opacity-50">
                  {submitting ? 'Saving...' : editingLead ? 'Update' : 'Add'} Lead
                </button>
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
