// components/user/Timeline.tsx

export default function Timeline({ timeline }: any) {
  return (
    <div className="bg-white p-5 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Timeline</h2>

      <div className="border-l-2 border-gray-300 pl-4 space-y-4">
        {timeline.map((item: any, index: number) => (
          <div key={index} className="relative">
            {/* dot */}
            <div className="absolute -left-2 top-2 w-3 h-3 bg-blue-500 rounded-full"></div>

            <div className="ml-3">
              <p className="text-sm text-gray-500">
                {new Date(item.date).toLocaleString("en-IN")}
              </p>

              {item.type === "visit" ? (
                <p className="font-semibold text-green-600">
                  Visit: {item.data.purpose} ({item.data.status})
                </p>
              ) : (
                <p className="font-semibold text-blue-600">
                  Ticket: {item.data.subject} ({item.data.status})
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}