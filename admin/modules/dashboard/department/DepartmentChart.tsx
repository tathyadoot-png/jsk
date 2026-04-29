"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { Building2, TrendingUp, ArrowUpRight } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import departmentContent from "./department.content";

export default function DepartmentChart({ data = [] }: any) {
  const { lang } = useLang();
  const content = departmentContent[lang] || departmentContent.en;

  return (
    <div className="bg-white rounded-[40px] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] p-8 h-full flex flex-col transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] group">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-[#138808]/10 rounded-2xl text-[#138808] group-hover:scale-110 transition-transform duration-500">
            <Building2 size={24} />
          </div>
          <div>
            <h2 className="font-black text-gray-900 tracking-tight text-xl leading-none">
              {content.title}
            </h2>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">
              {content.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-2xl border border-gray-100/50 group/status">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </div>
          <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
            {content.live}
          </span>
          <ArrowUpRight size={14} className="text-gray-300 group-hover/status:text-green-500 transition-colors" />
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -25, bottom: 20 }}
            barGap={12}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#138808" stopOpacity={1} />
                <stop offset="100%" stopColor="#138808" stopOpacity={0.6} />
              </linearGradient>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                <feOffset dx="0" dy="4" result="offsetblur" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.1" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <CartesianGrid
              vertical={false}
              strokeDasharray="8 8"
              stroke="#f1f5f9"
            />

            <XAxis
              dataKey="_id"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 11, fontWeight: 700 }}
              interval={0}
              height={60}
              tickFormatter={(value) => value.length > 12 ? `${value.substring(0, 10)}...` : value}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }}
            />

            <Tooltip
              cursor={{ fill: "#f8fafc", radius: 12 }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-[#080808] p-4 rounded-2xl shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-200">
                      <p className="text-[10px] font-black text-green-500 uppercase tracking-[0.2em] mb-1">
                        Department Data
                      </p>
                      <p className="text-sm font-bold text-white mb-2">{payload[0].payload._id}</p>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <p className="text-lg font-black text-white leading-none">
                          {payload[0].value} <span className="text-[10px] font-medium text-gray-400">Total</span>
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Bar
              dataKey="count"
              fill="url(#barGradient)"
              radius={[10, 10, 10, 10]}
              barSize={36}
              style={{ filter: "url(#shadow)" }}
            >
              {data.map((entry: any, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  className="hover:saturate-150 transition-all duration-300 cursor-pointer"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Modern Footer */}
      <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp size={14} className="text-green-500" />
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em]">
            {content.footer}
          </span>
        </div>
        <div className="h-1.5 w-24 bg-gray-50 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 w-2/3 rounded-full" />
        </div>
      </div>
    </div>
  );
}