"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#facc15", "#3b82f6", "#22c55e"];

export default function TicketChart({ data }: any) {
  return (
    <div className="bg-white p-4 rounded shadow h-[300px]">
      <h2 className="font-bold mb-2">Ticket Status</h2>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="_id"
            outerRadius={100}
          >
            {data.map((entry: any, index: number) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}