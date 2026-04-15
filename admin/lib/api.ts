export const API_URL = "http://localhost:5000/api";

export const fetchAPI = async (endpoint: string, options: any = {}) => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    credentials: "include",
    headers: options.body instanceof FormData
  ? {}
  : { "Content-Type": "application/json" },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};
