const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const handleResponse = async (res: Response) => {
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const adminService = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/api/admin/list`, {
      credentials: "include",
    });
    return handleResponse(res);
  },

  getById: async (id: string) => {
    const res = await fetch(`${BASE_URL}/api/admin/${id}`, {
      credentials: "include",
    });
    return handleResponse(res);
  },

  create: async (data: any) => {
    const res = await fetch(`${BASE_URL}/api/admin/create`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  update: async (id: string, data: any) => {
    const res = await fetch(`${BASE_URL}/api/admin/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  delete: async (id: string) => {
    const res = await fetch(`${BASE_URL}/api/admin/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return handleResponse(res);
  },
};