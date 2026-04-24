"use client";

import { Users, User, ArrowUpRight, Layers } from "lucide-react";

export default function GroupVisitCard({ data }: any) {
  const total = (data?.totalGroupVisits || 0) + (data?.normalVisits || 0);
  const groupPercentage = total > 0 ? Math.round((data.totalGroupVisits / total) * 100) : 0;

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-50">
        
        {/* --- Group Visits Metric --- */}
        <div className="p-8 relative group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-50 rounded-2xl text-orange-600 group-hover:scale-110 transition-transform">
              <Users size={24} />
            </div>
            <div className="flex items-center gap-1 text-orange-600 bg-orange-50 px-2 py-1 rounded-lg">
              <ArrowUpRight size={12} />
              <span className="text-[10px] font-bold uppercase tracking-tighter">Bulk</span>
            </div>
          </div>
          
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Group Visits</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-4xl font-black text-gray-900 tracking-tight">
                {data?.totalGroupVisits || 0}
              </h2>
              <span className="text-xs font-bold text-gray-400">entries</span>
            </div>
          </div>

          {/* Subtle Progress Bar */}
          <div className="mt-6 h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-orange-500 rounded-full transition-all duration-1000" 
              style={{ width: `${groupPercentage}%` }}
            />
          </div>
        </div>

        {/* --- Normal Visits Metric --- */}
        <div className="p-8 relative group bg-gray-50/30">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-50 rounded-2xl text-green-600 group-hover:scale-110 transition-transform">
              <User size={24} />
            </div>
            <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-lg">
              <Layers size={12} />
              <span className="text-[10px] font-bold uppercase tracking-tighter">Single</span>
            </div>
          </div>
          
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Normal Visits</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-4xl font-black text-gray-900 tracking-tight">
                {data?.normalVisits || 0}
              </h2>
              <span className="text-xs font-bold text-gray-400">entries</span>
            </div>
          </div>

          {/* Subtle Progress Bar */}
          <div className="mt-6 h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full transition-all duration-1000" 
              style={{ width: `${100 - groupPercentage}%` }}
            />
          </div>
        </div>

      </div>

      {/* Decorative Branding Line */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-white to-green-600 opacity-30" />
    </div>
  );
}