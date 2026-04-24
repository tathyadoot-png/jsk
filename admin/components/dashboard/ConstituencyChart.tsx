"use client";

import { 
  PieChart, 
  Pie, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  Legend 
} from "recharts";
import { MapPin } from "lucide-react";

const COLORS = [
  "#f97316", // Saffron
  "#16a34a", // Green
  "#000000", // Black
  "#94a3b8", // Slate
  "#fcd34d", // Amber
];

export default function ConstituencyChart({ data = [] }: any) {
  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-6 md:p-8 h-full flex flex-col transition-all hover:shadow-md">
      
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-orange-50 rounded-xl text-orange-600">
            <MapPin size={20} />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 tracking-tight leading-none">Area-wise Distribution</h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">Constituency Analytics</p>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="_id"
              innerRadius={70}  // Doughnut Effect
              outerRadius={95}
              paddingAngle={5}
              stroke="none"
            >
              {data.map((entry: any, index: number) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              ))}
            </Pie>
            
            <Tooltip 
              contentStyle={{ 
                borderRadius: '16px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                fontSize: '12px',
                fontWeight: 'bold'
              }} 
            />
            
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tighter ml-1">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Subtle Bottom Insight */}
      <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-center">
         <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Geographic Data Active</span>
         </div>
      </div>
    </div>
  );
}