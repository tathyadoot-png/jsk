"use client";

import { Users, MapPin, Activity, Ticket, ArrowUpRight } from "lucide-react";



export default function StatsCards({ data }: any) {
  const stats = [
    {
      label: "Total Users",
      value: data.totalUsers,
      icon: <Users size={20} />,
      color: "text-blue-600",
      bg: "bg-blue-50",
      trend: "+12%",
    },
    {
      label: "Total Visits",
      value: data.totalVisits,
      icon: <MapPin size={20} />,
      color: "text-orange-600",
      bg: "bg-orange-50",
      trend: "+5.4%",
    },
    {
      label: "Active Sessions",
      value: data.activeVisits,
      icon: <Activity size={20} />,
      color: "text-green-600",
      bg: "bg-green-50",
      trend: "Live",
      isLive: true,
    },
    {
      label: "Issues Raised",
      value: data.totalTickets,
      icon: <Ticket size={20} />,
      color: "text-purple-600",
      bg: "bg-purple-50",
      trend: "Daily",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="group relative bg-white p-5 md:p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          {/* Background Decorative Element */}
          <div className={`absolute -right-4 -top-4 w-24 h-24 ${stat.bg} rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500`} />

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} transition-colors group-hover:bg-opacity-80`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-0.5 px-2 py-1 rounded-lg bg-gray-50 border border-gray-100`}>
                {stat.isLive && <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping mr-1" />}
                <span className="text-[9px] font-black uppercase  er text-gray-500">
                  {stat.trend}
                </span>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase   mb-1">
                {stat.label}
              </p>
              <div className="flex items-baseline gap-1">
                <h2 className="text-2xl md:text-3xl font-black text-gray-900  ">
                  {stat.value || 0}
                </h2>
                {stat.isLive && (
                  <span className="text-[10px] font-bold text-green-600 uppercase">Online</span>
                )}
              </div>
            </div>
          </div>
          
          {/* Bottom Accent Line */}
          <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ${stat.color.replace('text', 'bg')}`} />
        </div>
      ))}
    </div>
  );
}