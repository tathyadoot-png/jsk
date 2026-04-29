"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { TicketCheck, Info, ArrowUpRight } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import ticketChartContent from "./ticketChart.content";

const STATUS_COLORS: Record<string, { main: string; light: string }> = {
  PENDING: { main: "#ef4444", light: "#fee2e2" },
  IN_PROGRESS: { main: "#2563eb", light: "#dbeafe" },
  PROCESSING: { main: "#8b5cf6", light: "#ede9fe" },
  RESOLVED: { main: "#10b981", light: "#d1fae5" },
  REJECTED: { main: "#f97316", light: "#ffedd5" },
};

export default function TicketChart({ data = [] }: any) {
  const { lang } = useLang();
  const content = ticketChartContent[lang] || ticketChartContent.en;

  const totalTickets = data.reduce(
    (acc: number, curr: any) => acc + (curr.count || 0),
    0
  );

  return (
    <div className="bg-white rounded-[40px] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] p-6 md:p-8 h-full flex flex-col transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] group/chart min-h-[480px]">
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 group-hover/chart:rotate-12 transition-transform">
            <TicketCheck size={22} />
          </div>
          <div>
            <h2 className="text-lg font-black text-gray-900 tracking-tight leading-none">
              {content.title}
            </h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">
              {content.subtitle}
            </p>
          </div>
        </div>
        <button className="p-2 text-gray-300 hover:text-gray-900">
          <Info size={18} />
        </button>
      </div>

      {/* Chart Wrapper - Relative position important for the center text */}
      <div className="relative flex-1 w-full min-h-[300px]">
        
        {/* Absolute Center Text - Properly Centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 -translate-y-4">
          <span className="text-3xl font-black text-gray-900 leading-none">
            {totalTickets}
          </span>
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter mt-1">
            {content.total}
          </span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          {/* Added margin to prevent clipping */}
          <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Pie
              data={data}
              dataKey="count"
              nameKey="_id"
              // Adjusting radii to fit container
              innerRadius="65%" 
              outerRadius="85%"
              paddingAngle={5}
              stroke="none"
              cx="50%"
              cy="50%"
              animationDuration={1500}
            >
              {data.map((entry: any, index: number) => {
                const statusKey = entry._id?.toUpperCase() || "";
                const colorSet = STATUS_COLORS[statusKey] || { main: "#cbd5e1" };
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={colorSet.main}
                    className="hover:opacity-80 transition-opacity outline-none"
                  />
                );
              })}
            </Pie>

            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const rawName = payload[0].name || "Unknown";
                  const statusKey = typeof rawName === 'string' ? rawName.toUpperCase() : "";
                  const colorSet = STATUS_COLORS[statusKey] || { main: "#334155" };
                  
                  return (
                    <div className="bg-white p-3 rounded-xl shadow-xl border border-gray-100 flex flex-col gap-1">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                        {typeof rawName === 'string' ? rawName.replace("_", " ") : rawName}
                      </p>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-lg font-black text-gray-900">{payload[0].value}</span>
                        <div className="p-1 rounded bg-gray-50" style={{ color: colorSet.main }}>
                           <ArrowUpRight size={12} />
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ bottom: 0 }}
              formatter={(value) => (
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
                  {typeof value === 'string' ? value.replace("_", " ") : value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Branding */}
      <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
            {content.footer}
          </span>
        </div>
        <div className="flex -space-x-1">
          {Object.values(STATUS_COLORS).slice(0, 3).map((c, i) => (
            <div key={i} className="w-2 h-2 rounded-full border border-white" style={{ backgroundColor: c.main }} />
          ))}
        </div>
      </div>
    </div>
  );
}