import { api } from "@/lib/api";

async function handleResponse(promise) {
  try {
    const response = await promise;
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Something went wrong' };
  }
}

export const callbackApi = {
  getCallbacks: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return handleResponse(api.get(`/callback${query ? `?${query}` : ''}`));
  },

  createCallback: async (data) => {
    return handleResponse(api.post('/callback', data));
  },

  updateCallback: async (id, data) => {
    return handleResponse(api.put(`/callback/${id}`, data));
  },

  updateStatus: async (id, status) => {
    return handleResponse(api.patch(`/callback/${id}/status`, { status }));
  },

  deleteCallback: async (id) => {
    return handleResponse(api.delete(`/callback/${id}`));
  }
};

export default callbackApi;
