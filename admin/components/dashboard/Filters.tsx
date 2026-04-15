"use client";

export default function Filters({ filter, setFilter }: any) {
  return (
    <div className="flex gap-2">
      {["today", "week", "month"].map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-4 py-1 rounded ${
            filter === f
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}