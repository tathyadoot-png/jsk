"use client";

import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api";

import StatsCards from "@/components/dashboard/StatsCards";
import VisitChart from "@/components/dashboard/VisitChart";
import TicketChart from "@/components/dashboard/TicketChart";
import ActiveVisitors from "@/components/dashboard/ActiveVisitors";
import RecentActivity from "@/components/dashboard/RecentActivity";

// 🔥 NEW COMPONENTS
import RepresentativeTable from "@/components/dashboard/RepresentativeTable";
import DepartmentChart from "@/components/dashboard/DepartmentChart";
import ConstituencyChart from "@/components/dashboard/ConstituencyChart";
import GroupVisitCard from "@/components/dashboard/GroupVisitCard";
import { LayoutDashboard, RefreshCcw, ShieldCheck } from "lucide-react";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetchAPI("/visit/active");
      setVisitors(res.visits  || []);
    };

    loadData();
  }, []);



  
  const loadData = async () => {
    setIsRefreshing(true);
    const res = await fetchAPI("/dashboard/advanced");
    setData(res.data);
    setTimeout(() => setIsRefreshing(false), 600);
  };




  useEffect(() => {
    loadData();
  }, []);

  if (!data) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-orange-500/10 border-t-orange-500 rounded-full animate-spin" />
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Syncing Data</span>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-10 animate-in fade-in duration-700">

      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <LayoutDashboard size={18} className="text-orange-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600/70">Intelligence Overview</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Main Dashboard</h1>
        </div>

        <button
          onClick={loadData}
          disabled={isRefreshing}
          className="flex items-center justify-center gap-2 bg-white border border-gray-200 px-5 py-2.5 rounded-2xl text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95 shadow-sm"
        >
          <RefreshCcw size={16} className={`${isRefreshing ? "animate-spin" : ""}`} />
          {isRefreshing ? "Updating..." : "Refresh Data"}
        </button>
      </div>

      {/* --- 01. PRIMARY METRICS --- */}
      <section className="animate-in slide-in-from-bottom-4 duration-500">
        <StatsCards data={data.summary} />
      </section>

      {/* --- 02. MAIN ANALYTICS BENTO --- */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Large Chart Area */}
        <div className="xl:col-span-2 bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6 px-2">
            <h3 className="font-bold text-gray-800">Volume Analysis</h3>
            <div className="flex gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="w-2 h-2 rounded-full bg-green-500" />
            </div>
          </div>
          <VisitChart data={data.visitGraph} />
        </div>

        {/* Square Stats Area */}
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col">
          <TicketChart data={data.ticketStats} />
        </div>
      </div>

      {/* --- 03. DISTRIBUTION TRENDS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <ShieldCheck size={80} />
          </div>
          <DepartmentChart data={data.department} />
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
          <ConstituencyChart data={data.constituency} />
        </div>
      </div>

      {/* --- 04. REPRESENTATIVE DATA TABLE --- */}
      <section className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
          <h3 className="font-bold text-gray-800 tracking-tight uppercase text-xs">Representative Performance</h3>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase tracking-tighter">Live Sync</span>
        </div>
        <div className="p-2">
          <RepresentativeTable data={data.representative} />
        </div>
      </section>

      {/* --- 05. GROUP VISITS & ACTIVITY --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        <div className="lg:col-span-8 flex flex-col gap-8">
          <GroupVisitCard data={data.groupVisits} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm">
              <ActiveVisitors  data={visitors} />
            </div>
            <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm">
              <RecentActivity data={data.ticketTrend} />
            </div>
          </div>
        </div>

        {/* Small Sticky Insight or Decoration */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-black text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden h-full min-h-[300px]">
            <div className="relative z-10">
              <h4 className="text-xl font-bold mb-4">System Integrity</h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                All data streams are currently optimized. No anomalies detected in constituency patterns.
              </p>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-800 border-2 border-black" />
                ))}
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500 rounded-full blur-[80px] opacity-20" />
          </div>
        </div>

      </div>

    </div>
  );
}