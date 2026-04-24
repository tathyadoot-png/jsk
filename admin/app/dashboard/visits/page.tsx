"use client";

import { useState } from "react";
import VisitTable from "@/components/visit/VisitTable";
import { useRouter } from "next/navigation";
import { Plus, History, Activity, CalendarDays, Layers } from "lucide-react";

export default function VisitsPage() {
  const [filter, setFilter] = useState("active");
  const router = useRouter();

  const filterTabs = [
    { id: "active", label: "Active Now", icon: Activity, color: "text-emerald-500" },
    { id: "today", label: "Today's List", icon: CalendarDays, color: "text-blue-500" },
    { id: "all", label: "All History", icon: History, color: "text-orange-500" },
  ];

  return (
    <div className="min-h-screen p-4 lg:p-8 space-y-8 bg-[#FAFAFA]">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-black rounded-xl">
              <Layers className="text-white" size={20} />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-gray-900 uppercase italic">
              Visits <span className="text-gray-300 font-light">Log</span>
            </h1>
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] ml-11">
            Manage and track visitor entries
          </p>
        </div>

        <button
          onClick={() => router.push("/dashboard/visits/create")}
          className="group relative flex items-center gap-3 bg-gray-900 hover:bg-black text-white px-6 py-4 rounded-[1.5rem] transition-all duration-300 shadow-xl hover:shadow-gray-200 active:scale-95 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <Plus size={20} className="text-emerald-400" />
          <span className="text-[11px] font-black uppercase tracking-[0.15em]">New Visit Entry</span>
        </button>
      </div>

      {/* --- FILTER TABS (PREMIUM LOOK) --- */}
      <div className="flex flex-wrap items-center gap-3 bg-white/50 p-2 rounded-[2rem] border border-gray-100 w-fit backdrop-blur-sm">
        {filterTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = filter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-[1.25rem] transition-all duration-500 ${
                isActive 
                ? "bg-white text-gray-900 shadow-lg border border-gray-100 scale-105" 
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-50/50 border border-transparent"
              }`}
            >
              <Icon size={16} className={isActive ? tab.color : "text-gray-300"} />
              <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? "opacity-100" : "opacity-60"}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-gray-900 animate-pulse ml-1" />
              )}
            </button>
          );
        })}
      </div>

      {/* --- TABLE CONTAINER --- */}
      <div className="relative">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-orange-50/50 rounded-full blur-3xl -z-10" />
        
        <VisitTable filter={filter} />
      </div>
    </div>
  );
}