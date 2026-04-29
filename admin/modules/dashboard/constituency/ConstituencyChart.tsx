"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { MapPin, Info } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import constituencyContent from "./constituency.content";

// Premium Branding Palette
const COLORS = ["#FF9933", "#138808", "#080808", "#64748b", "#fbbf24"];

export default function ConstituencyChart({ data = [] }: any) {
  const { lang } = useLang();
  const content = constituencyContent[lang] || constituencyContent.en;

  // Calculate Total for Center Label
  const totalCount = data.reduce((acc: number, curr: any) => acc + curr.count, 0);

  return (
    <div className="bg-white rounded-[40px] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] p-8 h-full flex flex-col transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] group">
      
      {/* Header Section */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#FF9933]/10 rounded-2xl text-[#FF9933] group-hover:rotate-12 transition-transform duration-500">
            <MapPin size={22} />
          </div>
          <div>
            <h2 className="font-black text-gray-900   text-xl">
              {content.title}
            </h2>
            <p className="text-[11px] font-bold text-gray-400 uppercase   mt-1">
              {content.subtitle}
            </p>
          </div>
        </div>
        <button className="text-gray-300 hover:text-gray-500 transition-colors">
          <Info size={18} />
        </button>
      </div>

      {/* Main Chart Area */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-between gap-6 relative">
        
        {/* Donut Chart with Center Text */}
        <div className="w-full h-[320px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="_id"
                innerRadius={85}
                outerRadius={115}
                paddingAngle={8}
                stroke="none"
                animationBegin={0}
                animationDuration={1500}
              >
                {data.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    className="hover:opacity-90 transition-all duration-300 outline-none cursor-pointer"
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-gray-100 flex flex-col gap-1">
                        <span className="text-[10px] font-black text-gray-400 uppercase  ">{payload[0].name}</span>
                        <span className="text-lg font-black text-gray-900">{payload[0].value} <span className="text-xs font-medium text-gray-500">Visitors</span></span>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Absolute Center Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-4xl font-black text-gray-900 leading-none">
              {totalCount}
            </span>
            <span className="text-[10px] font-black text-gray-400 uppercase   mt-1">
              {lang === "hi" ? "कुल डेटा" : "TOTAL DATA"}
            </span>
          </div>
        </div>

        {/* Custom Legend for Better UI */}
        <div className="w-full lg:w-48 space-y-3">
          {data.slice(0, 5).map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between group/item cursor-default">
              <div className="flex items-center gap-3">
                <div 
                  className="w-2.5 h-2.5 rounded-full shadow-sm" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                />
                <span className="text-xs font-bold text-gray-500 uppercase  er truncate w-24 group-hover/item:text-gray-900 transition-colors">
                  {entry._id}
                </span>
              </div>
              <span className="text-xs font-black text-gray-900">
                {Math.round((entry.count / totalCount) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Branding */}
      <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-[#138808] animate-pulse" />
           <span className="text-[9px] font-black text-gray-400 uppercase  ">
             {content.footer}
           </span>
        </div>
        <div className="flex -space-x-2">
           {/* Visual "Team" or "Verified" effect */}
           <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-100" />
           <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-200" />
           <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-300" />
        </div>
      </div>
    </div>
  );
}