"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function AdminLayout({ children }: any) {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    fetch("/api/admin/me", {
      credentials: "include", // 🔥 VERY IMPORTANT
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("ME API:", data);
        setAdmin(data.user); // 👈 yahi set hoga
      });
  }, []);

  if (!admin) return <p>Loading...</p>;

  return (
    <div className="flex">
      <Sidebar admin={admin} />
      <div className="flex-1">{children}</div>
    </div>
  );
}