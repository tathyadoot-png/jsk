"use client";

import { useState } from "react";

export default function TicketList({ tickets, title = "Tickets" }: any) {
  const [openId, setOpenId] = useState<string | null>(null);

  const downloadPDF = async (t: any) => {
    const res = await fetch("http://localhost:5000/api/pdf/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: t.letterBody,
        name: t.userId?.name,
        mobile: t.userId?.mobile,
      }),
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "letter.pdf";
    a.click();
  };

  return (
    <div className="bg-white p-5 rounded shadow">
      <h2 className="text-xl font-bold mb-3">{title}</h2>

      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th>Ticket</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Department</th>
            <th>Type</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th> {/* 🔥 NEW */}
          </tr>
        </thead>

        <tbody>
          {tickets.map((t: any) => (
            <>
              <tr key={t._id} className="border-t">
                <td>{t.ticketNumber}</td>
                <td>{t.userId?.name || "N/A"}</td>
                <td>{t.userId?.mobile || "N/A"}</td>
                <td>{t.department}</td>
                <td>{t.entryType}</td>
                <td>{t.status}</td>
                <td>{new Date(t.createdAt).toLocaleString("en-IN")}</td>

                {/* 🔥 ACTIONS */}
                <td>
                  <button
                    onClick={() =>
                      setOpenId(openId === t._id ? null : t._id)
                    }
                    className="text-blue-600 mr-2 underline"
                  >
                    {openId === t._id ? "Hide" : "View"}
                  </button>

                  <button
                    onClick={() => downloadPDF(t)}
                    className="text-green-600 underline"
                  >
                    PDF
                  </button>
                </td>
              </tr>

              {/* 🔥 EXPANDED LETTER VIEW */}
              {openId === t._id && (
                <tr className="bg-gray-50">
                  <td colSpan={8} className="p-4">
                    <b>Letter:</b>

                    <pre className="whitespace-pre-wrap text-sm bg-white p-3 rounded border mt-2">
                      {t.letterBody || "No letter found"}
                    </pre>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}