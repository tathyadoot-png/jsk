export const getMe = async () => {
  const res = await fetch("http://localhost:5000/api/adminAuth/me", {
    credentials: "include",
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data.user;
};
