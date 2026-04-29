"use client";

import {
  User,
  Phone,
  Ticket,
  Trophy,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import representativeContent from "./representative.content";

export default function RepresentativeTable({ data = [] }: any) {
  const { lang } = useLang();
  const content = representativeContent[lang] || representativeContent.en;

  return (
    <div className="bg-white rounded-[40px] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] overflow-hidden h-full flex flex-col transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
      
      {/* Premium Header */}
      <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gradient-to-r from-gray-50/50 to-transparent">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-[#080808] rounded-2xl text-[#FF9933] shadow-xl shadow-black/10">
            <Trophy size={22} className="group-hover:rotate-12 transition-transform" />
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
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-100 transition-all group">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-gray-900">View All</span>
          <ExternalLink size={14} className="text-gray-400 group-hover:text-gray-900" />
        </button>
      </div>

      {/* Enhanced Table Area */}
      <div className="overflow-x-auto custom-scrollbar flex-1">
        <table className="w-full min-w-[700px] text-left border-separate border-spacing-y-0">
          <thead>
            <tr className="sticky top-0 bg-white/80 backdrop-blur-md z-20">
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50">
                {content.columns.name}
              </th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50">
                {content.columns.contact}
              </th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-center border-b border-gray-50">
                {content.columns.tickets}
              </th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right border-b border-gray-50">
                {content.columns.action}
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50/50">
            {(data || []).map((r: any, i: number) => (
              <tr
                key={i}
                className="group hover:bg-gray-50/60 transition-all duration-300 cursor-default"
              >
                {/* Name with Dynamic Avatar */}
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FF9933]/10 to-[#FF9933]/5 flex items-center justify-center text-[#FF9933] font-black text-sm border border-[#FF9933]/20 group-hover:scale-105 group-hover:bg-[#FF9933] group-hover:text-white transition-all duration-500 shadow-sm">
                        {r.name?.charAt(0) || <User size={18} />}
                      </div>
                      {i < 3 && (
                        <div className="absolute -top-1 -right-1">
                          <ShieldCheck size={16} className="text-[#138808] fill-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-gray-900 tracking-tight group-hover:translate-x-1 transition-transform">
                        {r.name}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Verified Agent</span>
                    </div>
                  </div>
                </td>

                {/* Contact with Modern Mono font */}
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-xl group-hover:bg-white border border-transparent group-hover:border-gray-100 transition-all">
                      <Phone size={14} className="text-gray-400 group-hover:text-[#138808]" />
                    </div>
                    <span className="text-[13px] font-bold text-gray-600 font-mono tracking-tight">
                      {r.mobile}
                    </span>
                  </div>
                </td>

                {/* Status-based Tickets Badge */}
                <td className="px-8 py-5">
                  <div className="flex justify-center">
                    <div className="inline-flex items-center gap-2.5 px-5 py-2 bg-[#138808]/5 rounded-2xl border border-[#138808]/10 group-hover:bg-[#138808] group-hover:shadow-lg group-hover:shadow-[#138808]/20 transition-all duration-500">
                      <Ticket size={14} className="text-[#138808] group-hover:text-white" />
                      <span className="text-xs font-black text-[#138808] group-hover:text-white">
                        {r.totalTickets}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Interaction Action */}
                <td className="px-8 py-5 text-right">
                  <button className="inline-flex items-center justify-center w-10 h-10 text-gray-300 hover:text-white hover:bg-[#080808] rounded-2xl border border-gray-100 hover:border-[#080808] transition-all duration-300 group/btn shadow-sm">
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Data Summary Footer */}
      <div className="px-10 py-5 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((x) => (
              <div key={x} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200" />
            ))}
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em]">
            {content.footer}
          </span>
        </div>
        
        <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-gray-100 shadow-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF9933] animate-pulse" />
          <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Live Updates</span>
        </div>
      </div>
    </div>
  );
}