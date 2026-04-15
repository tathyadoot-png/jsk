"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function VisitChart({ data }: any) {
  return (
    <div className="bg-white p-4 rounded shadow h-[300px]">
      <h2 className="font-bold mb-2">Daily Visits</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}