"use client";

export default function RecentActivity({ data }: any) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold mb-2">Recent Activity</h2>

      {data.map((item: any, i: number) => {
        const date = item.date ? new Date(item.date) : null;

        return (
          <div key={i} className="border-b py-2 text-sm">
            {item.type === "visit" ? "🚶 Visit" : "🎫 Ticket"} -{" "}
            
            {date && !isNaN(date.getTime())
              ? date.toLocaleString("en-IN")
              : "Invalid Date"}
          </div>
        );
      })}
    </div>
  );
}