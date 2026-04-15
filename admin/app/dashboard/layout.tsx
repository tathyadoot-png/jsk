"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMe } from "@/lib/auth";
import Sidebar from "@/components/layout/Sidebar";
import { Toaster } from "sonner";

export default function DashboardLayout({ children }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState<any>(null); // 🔥 ADD THIS

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getMe();

      console.log("USER:", user); // 🔥 DEBUG

      if (!user) {
        router.push("/login");
        return;
      }

      // Only admin & nodal allowed
      if (user.role !== "admin" && user.role !== "nodal") {
        router.push("/login");
        return;
      }

      setAdmin(user); // 🔥 IMPORTANT
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) return <div>Checking auth...</div>;

  return (
    <div className="flex">
      <Sidebar admin={admin} /> {/* 🔥 PASS HERE */}
      <div className="flex-1 p-6">{children}<Toaster position="top-right" /></div>
    </div>
  );
}