import { useState, useCallback, useEffect } from 'react';
import { api } from '../api.js';

const INITIAL_FILTERS = {
  search: '',
  status: 'All',
  loanType: 'All',
  source: 'All',
  startDate: '',
  endDate: '',
};

export const useLeadsFilters = () => {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    if (key === 'startDate' || key === 'endDate') return false;
    return value !== 'All' && value !== '';
  });

  return {
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters,
  };
};

export const useLeadsData = (filters, page = 1, limit = 20) => {
  const [data, setData] = useState({
    leads: [],
    total: 0,
    page: 1,
    pages: 0,
    loading: false,
    error: null,
  });

  const [retryCount, setRetryCount] = useState(0);

  const fetchLeads = useCallback(async () => {
    setData(prev => ({ ...prev, loading: true, error: null }));

    try {
      const params = new URLSearchParams();
      params.set('page', page.toString());
      params.set('limit', limit.toString());

      if (filters.search) params.set('search', filters.search);
      if (filters.status !== 'All') params.set('status', filters.status);
      if (filters.loanType !== 'All') params.set('loanType', filters.loanType);
      if (filters.source !== 'All') params.set('source', filters.source);
      if (filters.startDate) params.set('startDate', filters.startDate);
      if (filters.endDate) params.set('endDate', filters.endDate);

      const response = await api.get(`/admin/all-leads?${params.toString()}`);

      if (response.data.success) {
        setData({
          leads: response.data.leads || [],
          total: response.data.total || 0,
          page: response.data.page || 1,
          pages: response.data.pages || 0,
          loading: false,
          error: null,
        });
      } else {
        setData(prev => ({
          ...prev,
          loading: false,
          error: response.data.message || 'Failed to fetch leads',
        }));
      }
    } catch (error) {
      setData(prev => ({
        ...prev,
        loading: false,
        error: error.response?.data?.message || 'Network error. Please try again.',
      }));
    }
  }, [filters, page, limit, retryCount]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const retry = useCallback(() => {
    setRetryCount(prev => prev + 1);
  }, []);

  return {
    ...data,
    retry,
  };
};

export const useLeadActions = () => {
  const updateLead = useCallback(async (leadId, collection, updateData) => {
    try {
      const response = await api.put(`/admin/leads/${leadId}`, {
        _collection: collection,
        ...updateData,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update lead' };
    }
  }, []);

  const deleteLead = useCallback(async (leadId, collection) => {
    try {
      const response = await api.delete(`/admin/leads/${leadId}?collection=${collection}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete lead' };
    }
  }, []);

  const exportLeads = useCallback(async (format = 'xlsx', filterParams = {}) => {
    try {
      const params = new URLSearchParams();
      params.set('format', format);
      Object.entries(filterParams).forEach(([key, value]) => {
        if (value && value !== 'All') params.set(key, value);
      });

      const response = await api.get(`/admin/all-leads/export?${params.toString()}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `leads-${new Date().toISOString().split('T')[0]}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      return { success: true };
    } catch (error) {
      throw error.response?.data || { message: 'Failed to export leads' };
    }
  }, []);

  return {
    updateLead,
    deleteLead,
    exportLeads,
  };
};

export const useLeads = () => {
  const { filters, updateFilter, resetFilters, hasActiveFilters } = useLeadsFilters();
  const [page, setPage] = useState(1);
  const { leads, total, pages, loading, error, retry } = useLeadsData(filters, page);
  const { updateLead, deleteLead, exportLeads } = useLeadActions();

  const goToPage = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const refresh = useCallback(() => {
    resetFilters();
    setPage(1);
  }, [resetFilters]);

  return {
    leads,
    total,
    page,
    pages,
    loading,
    error,
    filters,
    hasActiveFilters,
    updateFilter,
    resetFilters: refresh,
    goToPage,
    refresh,
    updateLead,
    deleteLead,
    exportLeads,
    retry,
  };
};
