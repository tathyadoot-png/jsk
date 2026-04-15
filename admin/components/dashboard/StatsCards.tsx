"use client";

export default function StatsCards({ data }: any) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      
      <div className="bg-white p-4 rounded shadow text-center">
        <p className="text-gray-500">Users</p>
        <h2 className="text-2xl font-bold">{data.totalUsers}</h2>
      </div>

      <div className="bg-white p-4 rounded shadow text-center">
        <p className="text-gray-500">Visits</p>
        <h2 className="text-2xl font-bold">{data.totalVisits}</h2>
      </div>

      <div className="bg-white p-4 rounded shadow text-center">
        <p className="text-gray-500">Active</p>
        <h2 className="text-2xl font-bold text-green-600">
          {data.activeVisits}
        </h2>
      </div>

      <div className="bg-white p-4 rounded shadow text-center">
        <p className="text-gray-500">Tickets</p>
        <h2 className="text-2xl font-bold">{data.totalTickets}</h2>
      </div>

    </div>
  );
}