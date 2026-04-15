const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchAPI = async (url: string, options: any = {}) => {
  const res = await fetch(`http://localhost:5000/api${url}`, {
    ...options,
    credentials: "include", 
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  return res.json();
};
