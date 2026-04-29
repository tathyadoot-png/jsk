"use client";

import { Users, MapPin, Activity, Ticket, ArrowUpRight } from "lucide-react";
import statsContent from "./stats.content";
import { useLang } from "@/context/LanguageContext";

export default function StatsCards({ data }: any) {
  const { lang } = useLang();
  const content = statsContent[lang] || statsContent["en"];

  const stats = [
    {
      key: "users",
      value: data.totalUsers,
      icon: <Users size={22} />,
      color: "text-blue-600",
      bg: "bg-blue-50",
      glow: "group-hover:shadow-blue-200",
    },
    {
      key: "visits",
      value: data.totalVisits,
      icon: <MapPin size={22} />,
      color: "text-[#FF9933]",
      bg: "bg-orange-50",
      glow: "group-hover:shadow-orange-200",
    },
    {
      key: "active",
      value: data.activeVisits,
      icon: <Activity size={22} />,
      color: "text-[#138808]",
      bg: "bg-green-50",
      glow: "group-hover:shadow-green-200",
      isLive: true,
    },
    {
      key: "tickets",
      value: data.totalTickets,
      icon: <Ticket size={22} />,
      color: "text-purple-600",
      bg: "bg-purple-50",
      glow: "group-hover:shadow-purple-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat: any, i) => {
        const item = content?.[stat.key];
        if (!item) return null;

        return (
          <div
            key={i}
            className={`group relative bg-white p-7 rounded-[40px] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] overflow-hidden ${stat.glow}`}
          >
            {/* Background Decorative Pattern */}
            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-[0.03] group-hover:scale-150 transition-transform duration-700 ${stat.bg.replace('bg-', 'bg-')}`} />

            <div className="relative z-10 flex justify-between items-start mb-6">
              <div className={`p-4 rounded-[22px] ${stat.bg} ${stat.color} shadow-inner transition-transform duration-500 group-hover:rotate-[10deg]`}>
                {stat.icon}
              </div>

              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100 group-hover:bg-white transition-colors">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">
                  {item.trend || "+12%"}
                </span>
                <ArrowUpRight size={10} className="text-green-500" />
              </div>
            </div>

            <div className="relative z-10 space-y-1">
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
                {item.label}
              </p>
              
              <div className="flex items-baseline gap-2">
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter">
                  {stat.value || 0}
                </h2>
                {stat.isLive && (
                   <div className="flex items-center gap-1.5 mb-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">
                        {item.live}
                      </span>
                   </div>
                )}
              </div>
            </div>

            {/* Bottom Progress Spark (Visual) */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-50 overflow-hidden">
                <div className={`h-full w-0 group-hover:w-full transition-all duration-1000 ease-out ${stat.color.replace('text-', 'bg-')}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}