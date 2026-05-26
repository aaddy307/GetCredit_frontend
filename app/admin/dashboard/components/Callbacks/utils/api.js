import { api } from "@/lib/api";

export const callbackApi = {
  getCallbacks: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await api.get(`/callback${query ? `?${query}` : ''}`);
    return response.data;
  },

  createCallback: async (data) => {
    const response = await api.post('/callback', data);
    return response.data;
  },

  updateCallback: async (id, data) => {
    const response = await api.put(`/callback/${id}`, data);
    return response.data;
  },

  updateStatus: async (id, status) => {
    const response = await api.patch(`/callback/${id}/status`, { status });
    return response.data;
  },

  deleteCallback: async (id) => {
    const response = await api.delete(`/callback/${id}`);
    return response.data;
  }
};

export default callbackApi;
