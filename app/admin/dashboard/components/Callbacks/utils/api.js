import { authHeaders } from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const callbackApi = {
  getCallbacks: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/callback${query ? `?${query}` : ''}`, {
      headers: authHeaders()
    });
    return response.json();
  },

  createCallback: async (data) => {
    const response = await fetch(`${API_URL}/callback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  updateCallback: async (id, data) => {
    const response = await fetch(`${API_URL}/callback/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  updateStatus: async (id, status) => {
    const response = await fetch(`${API_URL}/callback/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({ status })
    });
    return response.json();
  },

  deleteCallback: async (id) => {
    const response = await fetch(`${API_URL}/callback/${id}`, {
      method: 'DELETE',
      headers: authHeaders()
    });
    return response.json();
  }
};

export default callbackApi;
