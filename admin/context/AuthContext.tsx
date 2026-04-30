"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Admin = {
  name?: string;
  role?: string;
  permissions?: string[];
};

type AuthContextType = {
  admin: Admin | null;
  hasPermission: (perm: string) => boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    const syncUser = () => {
      const stored = localStorage.getItem("user");
      setAdmin(stored ? JSON.parse(stored) : null);
    };

    syncUser();

    window.addEventListener("storage", syncUser);
    window.addEventListener("authChange", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("authChange", syncUser);
    };
  }, []);

  const hasPermission = (perm: string): boolean => {
    if (!admin) return false;

    if (admin.role === "admin") return true;

    return admin.permissions?.includes(perm) ?? false;
  };

  return (
    <AuthContext.Provider value={{ admin, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};