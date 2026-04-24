"use client";

import { User, Phone, Ticket, Trophy, ArrowRight } from "lucide-react";

export default function RepresentativeTable({ data = [] }: any) {
  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden h-full flex flex-col transition-all hover:shadow-md">
      
      {/* Header Section */}
      <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-black rounded-xl text-white">
            <Trophy size={18} />
          </div>
          <div>
            <h2 className="font-bold text-gray-800 tracking-tight leading-none">Top Representatives</h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">Performance Metrics</p>
          </div>
        </div>
      </div>

      {/* Table Container with Horizontal Scroll for Mobile */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[600px] text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Representative</th>
              <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Contact Details</th>
              <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Ticket Volume</th>
              <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {data.map((r: any, i: number) => (
              <tr 
                key={i} 
                className="group hover:bg-gray-50/80 transition-colors duration-200"
              >
                {/* Name Column */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 font-bold text-xs border border-orange-100 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                      {r.name?.charAt(0) || <User size={14} />}
                    </div>
                    <span className="text-sm font-bold text-gray-800 tracking-tight">{r.name}</span>
                  </div>
                </td>

                {/* Mobile Column */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gray-500">
                    <div className="p-1.5 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <Phone size={12} />
                    </div>
                    <span className="text-xs font-mono font-medium tracking-tight">{r.mobile}</span>
                  </div>
                </td>

                {/* Tickets Column (Badge Style) */}
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 rounded-full border border-green-100 group-hover:border-green-200 transition-all">
                      <Ticket size={12} className="text-green-600" />
                      <span className="text-xs font-black text-green-700">{r.totalTickets}</span>
                    </div>
                  </div>
                </td>

                {/* Action Column */}
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-gray-300 hover:text-black hover:bg-white rounded-xl border border-transparent hover:border-gray-200 transition-all">
                    <ArrowRight size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination Space */}
      <div className="p-4 bg-gray-50/30 border-t border-gray-50 flex justify-between items-center px-8">
         <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em]">Ranked by total issues resolved</span>
         <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-orange-200" />
            <div className="w-1.5 h-1.5 rounded-full bg-orange-100" />
         </div>
      </div>
    </div>
  );
}