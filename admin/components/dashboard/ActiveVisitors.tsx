"use client";

export default function ActiveVisitors({ data = [] }: any) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold mb-2">Active Visitors</h2>

      {data.length === 0 && (
        <p className="text-gray-500 text-sm">No active visitors</p>
      )}

      {data.map((v: any, i: number) => (
        <div key={i} className="border-b py-2 text-sm">
          {v.userId?.name} ({v.userId?.mobile})
        </div>
      ))}
    </div>
  );
}