"use client";

import { useEffect, useState } from "react";
import { getTickets, updateTicketStatus } from "@/services/ticket.service";

export default function TicketTable() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await getTickets();
      setTickets(res.data);
      setFilteredTickets(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // 🔍 SEARCH BY MOBILE / TICKET NUMBER
  useEffect(() => {
    const filtered = tickets.filter((t) =>
      `${t.ticketNumber} ${t.userId?.mobile || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredTickets(filtered);
  }, [search, tickets]);

  const handleStatusChange = async (id: string, status: any) => {
    await updateTicketStatus(id, status);
    fetchTickets();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-bold">Tickets</h2>

      {/* 🔍 SEARCH INPUT */}
      <input
        type="text"
        placeholder="Search by ticket number or mobile..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md border p-2 rounded"
      />

      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Ticket</th>
            <th className="p-3">Name</th>
            <th className="p-3">Mobile</th> {/* ✅ NEW */}
            <th className="p-3">Department</th>
            <th className="p-3">Status</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>

        <tbody>
          {filteredTickets.map((t: any) => (
            <tr key={t._id} className="border-t">
              <td className="p-3 font-semibold">
                {t.ticketNumber}
              </td>

              <td className="p-3">{t.userId?.name}</td>

              {/* ✅ MOBILE NUMBER */}
              <td className="p-3">
                {t.userId?.mobile || "N/A"}
              </td>

              <td className="p-3">{t.department}</td>

              <td className="p-3">
                <select
                  value={t.status}
                  onChange={(e) =>
                    handleStatusChange(t._id, e.target.value)
                  }
                  className="border p-1 rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </td>

              <td className="p-3">
                {t.createdAt
                  ? new Date(t.createdAt).toLocaleDateString("en-IN")
                  : "—"}
              </td>
            </tr>
          ))}

          {filteredTickets.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center p-4">
                No tickets found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}