"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMe } from "@/lib/auth";
import Sidebar from "@/modules/dashboard/sidebar/Sidebar";
import Header from "@/modules/dashboard/layout/Header";
import { Toaster } from "sonner";
import { Menu, X, ShieldCheck } from "lucide-react";
import { Lang } from "@/modules/dashboard/layout/types";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("en"); // ✅ single source of truth

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getMe();
      if (!user || (user.role !== "admin" && user.role !== "nodal")) {
        router.push("/login");
        return;
      }
      setAdmin(user);
      setLoading(false);
    };
    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#fcfcfc]">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
          <ShieldCheck className="absolute w-6 h-6 text-orange-500" />
        </div>
        <p className="mt-4 font-mono text-[10px] uppercase   text-gray-400 animate-pulse">
          Authenticating Secure Session
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col md:flex-row">
      <Toaster position="top-right" expand={false} richColors />

      {/* 🔹 MOBILE TOPBAR */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <ShieldCheck className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-sm   text-gray-900 uppercase">
            Admin Portal
          </span>
        </div>

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 🔹 SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-72 bg-white transform transition-transform duration-300 ease-in-out border-r border-gray-100
          md:relative md:translate-x-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar admin={admin} />
      </aside>

      {/* 🔹 OVERLAY (mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 🔹 MAIN */}
      <main className="flex-1 flex flex-col min-w-0">

        {/* HEADER (desktop only) */}
        <div className="hidden md:block">
          <Header  admin={admin} />
        </div>

        {/* Decorative strip */}
        <div className="hidden md:block h-1.5 w-full bg-gradient-to-r from-orange-500 via-white to-green-600" />

        {/* CONTENT */}
        <div className="p-4 md:p-8 lg:p-10 max-w-[1600px] mx-auto w-full">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          {children}
          </div>
        </div>

        {/* FOOTER */}
        <footer className="mt-auto p-6 flex flex-col md:flex-row justify-between items-center gap-4 opacity-40">
          <span className="text-[10px] font-bold uppercase   text-gray-500">
            © 2026 NIC Infrastructure • Secure Terminal
          </span>

          <div className="flex gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[9px] font-bold uppercase text-gray-500">
                Node Active
              </span>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}