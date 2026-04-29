"use client";

import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api";
import { useLang } from "@/context/LanguageContext";

import StatsCards from "@/modules/dashboard/stats/StatsCards";
import VisitChart from "@/modules/dashboard/visitChart/VisitChart";
import TicketChart from "@/modules/dashboard/ticketChart/TicketChart";
import ActiveVisitors from "@/modules/dashboard/activeVisitors/ActiveVisitors";
import RecentActivity from "@/modules/dashboard/recentActivity/RecentActivity";

import RepresentativeTable from "@/modules/dashboard/representative/RepresentativeTable";
import DepartmentChart from "@/modules/dashboard/department/DepartmentChart";
import ConstituencyChart from "@/modules/dashboard/constituency/ConstituencyChart";
import GroupVisitCard from "@/modules/dashboard/groupVisit/GroupVisitCard";

import { LayoutDashboard, RefreshCcw, Bell, Search } from "lucide-react";
import dashboardHeaderContent from "@/modules/dashboard/dashboardHeader/dashboardHeader.content";

export default function DashboardPage() {
  const { lang } = useLang();
  const content = dashboardHeaderContent[lang] || dashboardHeaderContent.en;

  const [data, setData] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [visitors, setVisitors] = useState([]);

  const loadData = async () => {
    setIsRefreshing(true);
    try {
      const [dashRes, activeRes] = await Promise.all([
        fetchAPI("/dashboard/advanced"),
        fetchAPI("/visit/active")
      ]);
      setData(dashRes.data);
      setVisitors(activeRes.visits || []);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
    setTimeout(() => setIsRefreshing(false), 800);
  };

  useEffect(() => { loadData(); }, []);

  if (!data) return (
    <div className="min-h-[90vh] flex items-center justify-center bg-white">
      <div className="w-10 h-10 border-2 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
    </div>
  );

  return (
    // 1. Remove max-w limit and use full width
    <div className="min-h-screen bg-[#FBFBFC] text-gray-900 selection:bg-orange-100 w-full overflow-x-hidden">
      <div className="w-full px-4 md:px-8 lg:px-10 py-8 space-y-10">
        
        {/* --- Header Optimized for Full Width --- */}
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-gray-100 pb-8">
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex p-4 bg-orange-500 rounded-[24px] text-white shadow-lg shadow-orange-200">
               <LayoutDashboard size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight text-gray-900">{content.title}</h1>
              <p className="text-sm font-medium text-gray-400 mt-1">Live analytics and visitor management system.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="hidden sm:flex items-center bg-white border border-gray-100 px-4 py-2.5 rounded-2xl shadow-sm focus-within:ring-2 ring-orange-100 transition-all">
                <Search size={18} className="text-gray-400" />
                <input type="text" placeholder="Search data..." className="bg-transparent border-none outline-none ml-2 text-sm w-48" />
             </div>
             <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-gray-900 shadow-sm transition-all hover:-translate-y-1">
               <Bell size={20} />
             </button>
             <button
               onClick={loadData}
               disabled={isRefreshing}
               className="flex items-center gap-2.5 bg-gray-900 text-white px-7 py-3.5 rounded-2xl text-sm font-bold transition-all hover:shadow-xl hover:bg-black active:scale-95 disabled:opacity-50"
             >
               <RefreshCcw size={16} className={isRefreshing ? "animate-spin" : ""} />
               <span>{isRefreshing ? content.updating : content.refresh}</span>
             </button>
          </div>
        </header>

        {/* --- 01 Overview --- */}
        <section className="w-full">
          <StatsCards data={data.summary} />
        </section>

        {/* --- 02 Main Analytics (8:4 Ratio) --- */}
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-8 w-full">
          <div className="xl:col-span-8 bg-white rounded-[40px] border border-gray-50 shadow-sm">
            <VisitChart data={data.visitGraph} />
          </div>
          <div className="xl:col-span-4 bg-white rounded-[40px] border border-gray-50 shadow-sm">
            <TicketChart data={data.ticketStats} />
          </div>
        </section>

        {/* --- 03 Distribution (3:3:6 or Balanced) --- */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <DepartmentChart data={data.department} />
            <ConstituencyChart data={data.constituency} />
            {/* Added Recent Activity here to utilize horizontal space better */}
            <RecentActivity data={data.recentActivity} />
        </section>

        {/* --- 04 High Priority Data Table (Full Width) --- */}
        <section className="w-full">
          <RepresentativeTable data={data.representative} />
        </section>

        {/* --- 05 Bottom Intelligence (Split to fill both sides) --- */}
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-8 w-full">
          {/* Left: Group Visits (Utilizing 7 columns) */}
          <div className="xl:col-span-7">
            <GroupVisitCard data={data.groupVisits} />
          </div>
          {/* Right: Active Visitors (Utilizing 5 columns) */}
          <div className="xl:col-span-5">
             <ActiveVisitors data={visitors} />
          </div>
        </section>

      </div>
    </div>
  );
}