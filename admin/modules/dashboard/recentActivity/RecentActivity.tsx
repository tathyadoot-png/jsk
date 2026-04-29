"use client";

import {
  MapPin,
  Ticket,
  Clock,
  History,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import recentActivityContent from "./recentActivity.content";

export default function RecentActivity({ data = [] }: any) {
  const { lang } = useLang();
  const content = recentActivityContent[lang] || recentActivityContent.en;

  return (
    <div className="bg-white rounded-[40px] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] overflow-hidden h-full flex flex-col transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
      
      {/* Premium Header */}
      <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gradient-to-b from-gray-50/50 to-transparent">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gray-900 rounded-2xl text-white shadow-lg shadow-black/20">
            <History size={22} className="animate-[spin_10s_linear_infinite]" />
          </div>
          <div>
            <h2 className="font-black text-gray-900   text-xl leading-none">
              {content.title}
            </h2>
            <p className="text-[11px] font-bold text-gray-400 uppercase   mt-2">
              {content.subtitle}
            </p>
          </div>
        </div>
        <div className="p-2 rounded-xl bg-gray-50 text-gray-300 hover:text-gray-900 transition-colors cursor-pointer">
           <ArrowUpRight size={18} />
        </div>
      </div>

      {/* Timeline Body */}
      <div className="p-8 flex-1 overflow-y-auto max-h-[480px] custom-scrollbar relative">
        {data.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-dashed border-gray-200">
              <Clock size={28} className="text-gray-200" />
            </div>
            <p className="text-[10px] font-black uppercase   text-gray-300">
              {content.empty}
            </p>
          </div>
        ) : (
          <div className="relative space-y-8">
            {/* The Animated Timeline Line */}
            <div className="absolute left-[23px] top-2 bottom-2 w-[3px] bg-gradient-to-b from-orange-500 via-green-500 to-gray-100 rounded-full opacity-20" />

            {data.map((item: any, i: number) => {
              const date = item?.date ? new Date(item.date) : null;
              const isVisit = item.type === "visit";

              const formattedDate =
                date && !isNaN(date.getTime())
                  ? date.toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : "Invalid Date";

              return (
                <div key={i} className="relative pl-16 group">
                  {/* Indicator Icon with Glow */}
                  <div
                    className={`
                      absolute left-0 top-0 w-12 h-12 rounded-2xl border-[5px] border-white shadow-xl flex items-center justify-center z-10
                      transition-all duration-500 group-hover:scale-110 group-hover:rotate-6
                      ${isVisit 
                        ? "bg-[#FF9933] text-white shadow-orange-200" 
                        : "bg-[#138808] text-white shadow-green-200"}
                    `}
                  >
                    {isVisit ? <MapPin size={18} /> : <Ticket size={18} />}
                  </div>

                  {/* Activity Content Card */}
                  <div className="p-5 rounded-[28px] bg-white border border-gray-100 shadow-sm group-hover:shadow-md group-hover:border-gray-200 transition-all duration-300 relative overflow-hidden">
                    {/* Subtle Background Pattern */}
                    <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-[0.03] pointer-events-none ${isVisit ? "bg-[#FF9933]" : "bg-[#138808]"}`} />

                    <div className="flex items-center justify-between gap-4 mb-3">
                      <div className="flex flex-col">
                        <span
                          className={`text-[10px] font-black uppercase   mb-1 ${
                            isVisit ? "text-[#FF9933]" : "text-[#138808]"
                          }`}
                        >
                          {isVisit ? content.visit : content.ticket}
                        </span>
                        <h3 className="text-sm font-black text-gray-900  ">
                          {isVisit ? "New Locality Visit" : "Support Ticket Generated"}
                        </h3>
                      </div>

                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-gray-300 group-hover:text-gray-900 group-hover:bg-gray-100 transition-all">
                        <ChevronRight size={16} />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock size={12} className="text-gray-300" />
                      <p className="text-[11px] font-bold text-gray-400 font-mono   uppercase">
                        {formattedDate}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer Branding */}
      <div className="px-10 py-5 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase  ">
            {content.footer}
          </span>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3].map((dot) => (
            <div key={dot} className="w-1 h-1 rounded-full bg-gray-200" />
          ))}
        </div>
      </div>
    </div>
  );
}