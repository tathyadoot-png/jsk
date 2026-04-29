"use client";

import { User, Smartphone, Activity, Radio, ChevronRight } from "lucide-react";
import activeVisitorsContent from "./activeVisitors.content";
import { useLang } from "@/context/LanguageContext";

export default function ActiveVisitors({ data = [] }: any) {
  const { lang } = useLang();
  const content = activeVisitorsContent[lang] || activeVisitorsContent.en;

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden h-full flex flex-col transition-all duration-500 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]">
      
      {/* Header Section */}
      <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gradient-to-r from-gray-50/50 to-transparent">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="p-2.5 bg-[#138808]/10 rounded-xl text-[#138808]">
              <Activity size={20} className="relative z-10" />
            </div>
            {/* Live Radar Animation */}
            <span className="absolute inset-0 rounded-xl bg-[#138808]/20 animate-ping" />
          </div>
          <div>
            <h2 className="font-black text-gray-900 tracking-tight text-lg">
              {content.title}
            </h2>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">System Live</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-[#080808] rounded-2xl shadow-lg shadow-black/10">
          <Radio size={12} className="text-[#FF9933] animate-pulse" />
          <span className="text-white text-xs font-black tracking-tighter">
            {data.length} <span className="text-gray-400 font-medium ml-0.5">{content.live}</span>
          </span>
        </div>
      </div>

      {/* List Container */}
      <div className="p-4 flex-1 overflow-y-auto max-h-[420px] custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
        {data.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-dashed border-gray-200">
              <User size={32} className="text-gray-200" />
            </div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] text-center">
              {content.empty}
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {data.map((v: any, i: number) => {
              const name = v.userId?.name || content.unknown;
              const initials = name.split(" ").map((n: any) => n[0]).join("").toUpperCase().slice(0, 2);

              return (
                <div
                  key={i}
                  className="group flex items-center justify-between p-3.5 rounded-[24px] border border-gray-50 bg-white hover:border-[#FF9933]/20 hover:shadow-md hover:shadow-[#FF9933]/5 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Subtle Hover Accent */}
                  <div className="absolute left-0 top-0 w-1 h-full bg-[#FF9933] opacity-0 group-hover:opacity-100 transition-all duration-300" />

                  <div className="flex items-center gap-4 min-w-0">
                    {/* Avatar with Saffron Glow on Hover */}
                    <div className="w-11 h-11 rounded-2xl bg-gray-900 flex items-center justify-center text-[13px] font-black text-white shrink-0 group-hover:scale-105 group-hover:bg-[#FF9933] transition-all duration-500 shadow-inner">
                      {initials}
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-black text-gray-900 truncate tracking-tight group-hover:text-[#FF9933] transition-colors">
                        {name}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="flex items-center justify-center w-4 h-4 rounded bg-gray-50 text-gray-400">
                           <Smartphone size={10} />
                        </div>
                        <span className="text-[11px] font-bold text-gray-400 group-hover:text-gray-600 transition-colors">
                          {v.userId?.mobile}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status & Action */}
                  <div className="flex items-center gap-3">
                    <div className="hidden group-hover:flex items-center justify-center w-7 h-7 rounded-full bg-gray-50 text-gray-400 animate-in fade-in slide-in-from-right-2">
                       <ChevronRight size={14} />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="relative w-2.5 h-2.5">
                        <div className="absolute inset-0 rounded-full bg-[#138808] animate-ping opacity-40" />
                        <div className="relative w-2.5 h-2.5 rounded-full bg-[#138808] border-2 border-white shadow-sm" />
                      </div>
                      <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest group-hover:text-[#138808] transition-colors">
                        {content.verified}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer with Branding Colors */}
      <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
        <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.25em]">
          {content.footer}
        </span>
        <div className="flex gap-1.5">
          <div className="w-4 h-1 rounded-full bg-[#FF9933]/30" />
          <div className="w-4 h-1 rounded-full bg-gray-200" />
          <div className="w-4 h-1 rounded-full bg-[#138808]/30" />
        </div>
      </div>
    </div>
  );
}