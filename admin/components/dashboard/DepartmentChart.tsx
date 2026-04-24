"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  Cell 
} from "recharts";
import { Building2, TrendingUp } from "lucide-react";

export default function DepartmentChart({ data = [] }: any) {
  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-6 md:p-8 h-full flex flex-col transition-all hover:shadow-md">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-green-50 rounded-xl text-green-600">
            <Building2 size={20} />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 tracking-tight leading-none">Department Analytics</h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">Issue Distribution</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-lg border border-gray-100">
          <TrendingUp size={14} className="text-green-500" />
          <span className="text-[10px] font-bold text-gray-600 uppercase">Live Metrics</span>
        </div>
      </div>

      {/* Chart Container */}
      <div className="flex-1 w-full min-h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0.3}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
            
            <XAxis 
              dataKey="_id" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
              interval={0}
              angle={-15}
              textAnchor="end"
              height={50}
            />
            
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
            />
            
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ 
                borderRadius: '16px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            />
            
            <Bar 
              dataKey="count" 
              fill="url(#barGradient)" 
              radius={[6, 6, 0, 0]} 
              barSize={32}
            >
              {data.map((entry: any, index: number) => (
                <Cell 
                  key={`cell-${index}`}
                  className="hover:opacity-80 transition-opacity cursor-pointer" 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Branding */}
      <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
         <span className="text-[9px] font-bold text-gray-300 uppercase tracking-[0.2em]">Data Node: Dept_Primary</span>
         <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-green-500" />
            <div className="w-1 h-1 rounded-full bg-green-300" />
         </div>
      </div>
    </div>
  );
}