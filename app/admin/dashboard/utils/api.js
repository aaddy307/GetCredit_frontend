import { authHeaders } from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const api = {
  getUsers: () =>
    fetch(`${API_URL}/admin/users`, { headers: authHeaders() }).then((r) =>
      r.json()
    ),

  createUser: (data) =>
    fetch(`${API_URL}/admin/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  updateUser: (id, data) =>
    fetch(`${API_URL}/admin/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  deleteUser: (id) =>
    fetch(`${API_URL}/admin/users/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    }).then((r) => r.json()),
};

export default api;
