"use client";

import { Users, User, ArrowUpRight, Layers, Fingerprint } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import groupVisitContent from "./groupVisit.content";

export default function GroupVisitCard({ data }: any) {
  const { lang } = useLang();
  const content = groupVisitContent[lang] || groupVisitContent.en;

  const total = (data?.totalGroupVisits || 0) + (data?.normalVisits || 0);

  const groupPercentage = total > 0 ? Math.round((data?.totalGroupVisits / total) * 100) : 0;
  const normalPercentage = 100 - groupPercentage;

  return (
    <div className="bg-white rounded-[40px] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] group/card">
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-50">

        {/* --- Group Visits (Saffron Theme) --- */}
        <div className="p-10 relative overflow-hidden group">
          {/* Decorative Background Icon */}
          <Users size={120} className="absolute -bottom-6 -right-6 text-gray-50 opacity-0 group-hover:opacity-40 transition-all duration-700 -rotate-12" />
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div className="p-4 bg-[#FF9933]/10 rounded-[22px] text-[#FF9933] shadow-inner">
                <Users size={28} className="group-hover:animate-bounce" />
              </div>

              <div className="flex items-center gap-1.5 text-[#FF9933] bg-[#FF9933]/5 border border-[#FF9933]/10 px-3 py-1.5 rounded-xl">
                <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-wider">
                  {content.bulk}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.25em]">
                {content.groupTitle}
              </p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-5xl font-black text-gray-900 tracking-tighter">
                  {data?.totalGroupVisits || 0}
                </h2>
                <span className="text-sm font-bold text-gray-300 italic">
                  {content.entries}
                </span>
              </div>
            </div>

            {/* Progress Section */}
            <div className="mt-10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Efficiency Rate</span>
                <span className="text-[10px] font-black text-[#FF9933]">{groupPercentage}%</span>
              </div>
              <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden p-[2px] border border-gray-100">
                <div
                  className="h-full bg-gradient-to-r from-[#FF9933] to-[#FF9933]/60 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,153,51,0.3)]"
                  style={{ width: `${groupPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- Normal Visits (Green Theme) --- */}
        <div className="p-10 relative overflow-hidden group bg-gray-50/20">
          {/* Decorative Background Icon */}
          <Fingerprint size={120} className="absolute -bottom-6 -right-6 text-gray-50 opacity-0 group-hover:opacity-40 transition-all duration-700 rotate-12" />

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div className="p-4 bg-[#138808]/10 rounded-[22px] text-[#138808] shadow-inner">
                <User size={28} className="group-hover:scale-110 transition-transform" />
              </div>

              <div className="flex items-center gap-1.5 text-[#138808] bg-[#138808]/5 border border-[#138808]/10 px-3 py-1.5 rounded-xl">
                <Layers size={14} />
                <span className="text-[10px] font-black uppercase tracking-wider">
                  {content.single}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.25em]">
                {content.normalTitle}
              </p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-5xl font-black text-gray-900 tracking-tighter">
                  {data?.normalVisits || 0}
                </h2>
                <span className="text-sm font-bold text-gray-300 italic">
                  {content.entries}
                </span>
              </div>
            </div>

            {/* Progress Section */}
            <div className="mt-10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Fulfillment Rate</span>
                <span className="text-[10px] font-black text-[#138808]">{normalPercentage}%</span>
              </div>
              <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden p-[2px] border border-gray-100">
                <div
                  className="h-full bg-gradient-to-r from-[#138808] to-[#138808]/60 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(19,136,8,0.3)]"
                  style={{ width: `${normalPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Branding Line */}
      <div className="flex w-full h-1.5">
        <div className="w-1/2 h-full bg-[#FF9933]" />
        <div className="w-1/4 h-full bg-black/5" />
        <div className="w-1/4 h-full bg-[#138808]" />
      </div>
    </div>
  );
}