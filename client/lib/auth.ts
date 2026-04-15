

import { fetchAPI } from "./api";

export const getMeUser = async () => {
  const res = await fetchAPI("/user/me", {
    credentials: "include",
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data.user;
};

export const checkAuth = async () => {
  try {
    const res = await fetchAPI("/user/me");

    if (res.success) {
      return res.user;
    }

    return null;
  } catch {
    return null;
  }
};