"use client";

import { useState } from "react";
import VisitTable from "@/components/visit/VisitTable";
import { useRouter } from "next/navigation";

export default function VisitsPage() {
  const [filter, setFilter] = useState("active");
  const router = useRouter();

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Visits</h1>

        <button
          onClick={() => router.push("/dashboard/visits/create")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          + Create Visit
        </button>
      </div>

      <div className="flex gap-2">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("today")}>Today</button>
      </div>

      <VisitTable filter={filter} />
    </div>
  );
}