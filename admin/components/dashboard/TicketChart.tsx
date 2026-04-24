"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TicketCheck } from "lucide-react";

const COLORS = [
  "#f97316", // Saffron / Pending
  "#3b82f6", // Blue / Processing
  "#16a34a", // Green / Resolved
  "#ef4444", // Red / Rejected
];

export default function TicketChart({ data = [] }: any) {
  // Calculate total for the center label
  const totalTickets = data.reduce((acc: number, curr: any) => acc + curr.count, 0);

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-6 md:p-8 h-full flex flex-col transition-all hover:shadow-md min-h-[400px]">
      
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
            <TicketCheck size={20} />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 tracking-tight leading-none">Ticket Status</h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">Lifecycle Overview</p>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="flex-1 w-full relative">
        {/* Center Label for Doughnut */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-black text-gray-900 leading-none">{totalTickets}</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-1">Total</span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="_id"
              innerRadius={75}
              outerRadius={100}
              paddingAngle={8}
              stroke="none"
              animationBegin={0}
              animationDuration={1500}
            >
              {data.map((entry: any, index: number) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  className="hover:opacity-80 transition-opacity cursor-pointer outline-none"
                />
              ))}
            </Pie>

            <Tooltip 
              contentStyle={{ 
                borderRadius: '16px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                fontSize: '12px',
                fontWeight: 'bold',
                padding: '12px'
              }}
              itemStyle={{ color: '#1f2937' }}
            />

            <Legend 
              verticalAlign="bottom" 
              align="center"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => (
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tighter ml-1">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Status Info */}
      <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
         <span className="text-[9px] font-bold text-gray-300 uppercase tracking-[0.2em]">Priority Queue: High</span>
         <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-200" />
         </div>
      </div>
    </div>
  );
}