import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

export default function ConstituencyChart({ data }: any) {
  return (
    <div className="bg-white p-5 rounded shadow h-80">
      <h2 className="font-bold mb-3">Area-wise Issues</h2>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="_id"
            outerRadius={100}
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}