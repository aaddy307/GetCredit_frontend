import { api as axiosApi } from "@/lib/api";

export const api = {
  getUsers: () =>
    axiosApi.get('/admin/users').then((r) => r.data),

  createUser: (data) =>
    axiosApi.post('/admin/users', data).then((r) => r.data),

  updateUser: (id, data) =>
    axiosApi.put(`/admin/users/${id}`, data).then((r) => r.data),

  deleteUser: (id) =>
    axiosApi.delete(`/admin/users/${id}`).then((r) => r.data),
};

export default api;
