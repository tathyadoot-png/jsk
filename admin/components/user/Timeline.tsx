"use client";

import { 
  Calendar, 
  MapPin, 
  Ticket, 
  Clock, 
  ChevronRight,
  Activity
} from "lucide-react";

export default function Timeline({ timeline = [] }: any) {
  return (
    <div className="bg-white/80 backdrop-blur-xl p-6 sm:p-8 rounded-[2.5rem] border border-white shadow-xl shadow-gray-200/50 space-y-6">
      
      {/* --- HEADER --- */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 rotate-3">
          <Activity size={24} />
        </div>
        <div>
          <h2 className="text-xl font-black uppercase   text-gray-900 italic">User Timeline</h2>
          <p className="text-[10px] font-black text-gray-400 uppercase   italic">Chronological Activity Log</p>
        </div>
      </div>

      {/* --- TIMELINE BODY --- */}
      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
        
        {timeline.map((item: any, index: number) => {
          const isVisit = item.type === "visit";
          
          return (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              
              {/* Dot / Icon Container */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white shadow-md bg-white text-indigo-500 z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-transform group-hover:scale-110 duration-300">
                {isVisit ? <MapPin size={16} className="text-emerald-500" /> : <Ticket size={16} className="text-blue-500" />}
              </div>

              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-3xl border border-gray-100 shadow-sm group-hover:shadow-md transition-all group-hover:-translate-y-1">
                <div className="flex items-center justify-between mb-2">
                  <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase   ${
                    isVisit ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-blue-50 text-blue-600 border border-blue-100"
                  }`}>
                    {item.type}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 italic">
                    <Clock size={12} />
                    {new Date(item.date).toLocaleDateString("en-IN", { day: '2-digit', month: 'short' })}
                  </div>
                </div>

                <h3 className="text-sm font-black text-gray-800 uppercase italic leading-tight group-hover:text-indigo-600 transition-colors">
                  {isVisit ? item.data.purpose : (item.data.subject || `Ticket #${item.data.ticketNumber}`)}
                </h3>

                <div className="mt-3 flex items-center justify-between border-t border-gray-50 pt-3">
                   <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase  er">
                      Status: <span className={isVisit ? "text-emerald-500" : "text-blue-500"}>{item.data.status}</span>
                   </div>
                   <ChevronRight size={14} className="text-gray-300 group-hover:text-indigo-500 transition-all" />
                </div>
              </div>
            </div>
          );
        })}

        {/* --- EMPTY STATE --- */}
        {timeline.length === 0 && (
          <div className="text-center py-10">
            <p className="text-[10px] font-black text-gray-300 uppercase   italic">No timeline entries found</p>
          </div>
        )}
      </div>
    </div>
  );
}