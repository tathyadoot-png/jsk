"use client";

import { User, Smartphone, Activity } from "lucide-react";

export default function ActiveVisitors({ data = [] }: any) {
  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden h-full flex flex-col">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-green-50 rounded-lg text-green-600">
            <Activity size={18} className="animate-pulse" />
          </div>
          <h2 className="font-bold text-gray-800  ">Active Visitors</h2>
        </div>
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase  ">
          {data.length} Live
        </span>
      </div>

      {/* List Container */}
      <div className="p-4 flex-1 overflow-y-auto max-h-[400px] custom-scrollbar">
        {data.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center py-10 opacity-40">
            <User size={40} className="text-gray-300 mb-2" />
            <p className="text-gray-500 text-xs font-bold uppercase  ">No Active Sessions</p>
          </div>
        ) : (
          <div className="space-y-3">
            {data.map((v: any, i: number) => {
              const name = v.userId?.name || "Unknown User";
              const initials = name.split(" ").map((n: any) => n[0]).join("").toUpperCase().slice(0, 2);

              return (
                <div 
                  key={i} 
                  className="group flex items-center justify-between p-3 rounded-2xl border border-transparent hover:border-gray-100 hover:bg-gray-50/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {/* User Avatar */}
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 shrink-0 group-hover:from-orange-500 group-hover:to-orange-600 group-hover:text-white transition-all duration-500">
                      {initials}
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate   leading-none mb-1">
                        {name}
                      </p>
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <Smartphone size={12} />
                        <span className="text-[11px] font-medium font-mono">{v.userId?.mobile}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex flex-col items-end gap-1">
                     <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                     <span className="text-[9px] font-bold text-gray-300 uppercase  er">Verified</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer Branding */}
      <div className="px-6 py-4 bg-gray-50/30 border-t border-gray-50 flex justify-center">
         <span className="text-[9px] font-bold text-gray-400 uppercase  ">Real-time Session Monitoring</span>
      </div>
    </div>
  );
}