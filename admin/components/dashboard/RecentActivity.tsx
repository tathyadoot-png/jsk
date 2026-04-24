"use client";

import { MapPin, Ticket, Clock, History, ChevronRight } from "lucide-react";

export default function RecentActivity({ data = [] }: any) {
  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden h-full flex flex-col transition-all hover:shadow-md">
      
      {/* Header Section */}
      <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gray-900 rounded-xl text-white">
            <History size={18} />
          </div>
          <div>
            <h2 className="font-bold text-gray-800 tracking-tight leading-none">Recent Activity</h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">Live Feed</p>
          </div>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="p-6 flex-1 overflow-y-auto max-h-[450px] custom-scrollbar">
        {data.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center py-10 opacity-30">
            <Clock size={40} className="text-gray-300 mb-2" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Log Empty</p>
          </div>
        ) : (
          <div className="relative space-y-6">
            {/* The Vertical Connecting Line */}
            <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-gray-100" />

            {data.map((item: any, i: number) => {
              const date = item.date ? new Date(item.date) : null;
              const isVisit = item.type === "visit";
              
              const formattedDate = date && !isNaN(date.getTime())
                ? date.toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true
                  })
                : "Invalid Date";

              return (
                <div key={i} className="relative pl-12 group">
                  {/* Timeline Dot / Icon */}
                  <div className={`
                    absolute left-0 top-0 w-10 h-10 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10 transition-all duration-300
                    ${isVisit ? "bg-orange-500 text-white" : "bg-green-600 text-white"}
                  `}>
                    {isVisit ? <MapPin size={14} /> : <Ticket size={14} />}
                  </div>

                  {/* Activity Card */}
                  <div className="p-4 rounded-2xl bg-gray-50/50 border border-transparent group-hover:border-gray-200 group-hover:bg-white transition-all duration-300">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${isVisit ? "text-orange-600" : "text-green-700"}`}>
                        {isVisit ? "Visit Logged" : "Ticket Generated"}
                      </span>
                      <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
                    </div>
                    
                    <p className="text-xs font-bold text-gray-400 font-mono tracking-tighter uppercase">
                      {formattedDate}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer Status */}
      <div className="px-8 py-4 bg-gray-50/30 border-t border-gray-50">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em]">System Logs Verified</span>
        </div>
      </div>
    </div>
  );
}