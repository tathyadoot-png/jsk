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

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);

  const loadData = async () => {
    const res = await fetchAPI("/dashboard/advanced");
    setData(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!data) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-6 space-y-6">

      {/* 🔥 STATS */}
      <StatsCards data={data.summary} />

      {/* 📊 MAIN CHARTS */}
      <div className="grid md:grid-cols-2 gap-6">
        <VisitChart data={data.visitGraph} />
        <TicketChart data={data.ticketStats} />
      </div>

      {/* 📈 TRENDS */}
      <div className="grid md:grid-cols-2 gap-6">
        <DepartmentChart data={data.department} />
        <ConstituencyChart data={data.constituency} />
      </div>

      {/* 🧠 REPRESENTATIVE */}
      <RepresentativeTable data={data.representative} />

      {/* 👥 GROUP VISIT */}
      <GroupVisitCard data={data.groupVisits} />

      {/* 🔴 LIVE + ACTIVITY */}
      <div className="grid md:grid-cols-2 gap-6">
        <ActiveVisitors />
        <RecentActivity data={data.ticketTrend} />
      </div>

    </div>
  );
}