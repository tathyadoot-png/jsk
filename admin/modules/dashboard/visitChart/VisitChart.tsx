"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { TrendingUp, Calendar } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import visitChartContent from "./visitChart.content";

export default function VisitChart({ data = [] }: any) {
  const { lang } = useLang(); // ✅ context
  const content = visitChartContent[lang] || visitChartContent.en;

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-6 md:p-8 h-full flex flex-col transition-all hover:shadow-md min-h-[400px]">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-orange-50 rounded-xl text-orange-600">
            <TrendingUp size={20} />
          </div>
          <div>
            <h2 className="font-bold text-gray-900   leading-none">
              {content.title}
            </h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase   mt-1.5">
              {content.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
          <Calendar size={14} className="text-gray-400" />
          <span className="text-[10px] font-bold text-gray-600 uppercase">
            {content.range}
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />

            <XAxis
              dataKey="_id"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 600 }}
              dy={10}
              minTickGap={30}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 600 }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "16px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                fontSize: "12px",
                fontWeight: "bold",
                padding: "12px",
              }}
              cursor={{
                stroke: "#f97316",
                strokeWidth: 2,
                strokeDasharray: "5 5",
              }}
            />

            <Area
              type="monotone"
              dataKey="count"
              stroke="#f97316"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#colorVisits)"
              activeDot={{
                r: 6,
                fill: "#f97316",
                stroke: "#fff",
                strokeWidth: 3,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-[9px] font-bold text-gray-400 uppercase  ">
            {content.footerLeft}
          </span>
        </div>
        <span className="text-[9px] font-bold text-gray-300 uppercase  er">
          {content.footerRight}
        </span>
      </div>
    </div>
  );
}