import { useState } from "react";
import { fetchAPI } from "@/lib/api";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await fetchAPI("/adminAuth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Something went wrong" };
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};