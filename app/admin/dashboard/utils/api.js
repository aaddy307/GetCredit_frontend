const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const api = {
  getUsers: () =>
    fetch(`${API_URL}/admin/users`, { credentials: "include" }).then((r) =>
      r.json()
    ),

  createUser: (data) =>
    fetch(`${API_URL}/admin/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  updateUser: (id, data) =>
    fetch(`${API_URL}/admin/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  deleteUser: (id) =>
    fetch(`${API_URL}/admin/users/${id}`, {
      method: "DELETE",
      credentials: "include",
    }).then((r) => r.json()),
};

export default api;
