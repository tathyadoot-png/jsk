const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const visitorService = {
  searchByMobile: async (mobile: string) => {
    const res = await fetch(`${BASE_URL}/api/user/search?mobile=${mobile}`, {
      credentials: "include",
    });
    return res.json();
  },

  createEntry: async (data: any) => {
    const res = await fetch(`${BASE_URL}/api/user/entry`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};