"use client";

import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function VisitTable({ filter }: { filter: string }) {
    const [visits, setVisits] = useState([]);
    const router = useRouter();
    const fetchVisits = async () => {
        let endpoint = "/visit/all";

        if (filter === "active") endpoint = "/visit/active";
        if (filter === "today") endpoint = "/visit/today";

        const res = await fetchAPI(endpoint);

        if (res.success) setVisits(res.visits);
    };

    useEffect(() => {
        fetchVisits();

        // 🔥 only active auto refresh
        if (filter === "active") {
            const interval = setInterval(fetchVisits, 5000);
            return () => clearInterval(interval);
        }
    }, [filter]);

    const handleCheckout = async (id: string) => {
        await fetchAPI(`/visit/checkout/${id}`, {
            method: "PUT",
        });

        fetchVisits();
    };

    return (
        <table className="w-full border">
            <thead>
                <tr className="bg-gray-100">
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Purpose</th>
                    <th>Status</th>
                    <th>Time</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {visits.map((v: any) => (
                    <tr key={v._id} className="border-t">
                        <td>{v.userId?.name}</td>
                        <td>{v.userId?.mobile}</td>
                        <td>{v.purpose}</td>
                        <td>{v.status}</td>

                        <td>
                            {new Date(v.inTime).toLocaleString("en-IN")}
                        </td>


                        <td className="space-x-2 flex flex-wrap gap-2">

                            {/* 👤 PROFILE */}
                            <button
                                onClick={() => {
                                    if (!v.userId?._id) return alert("User not found");
                                    router.push(`/dashboard/user/${v.userId._id}`);
                                }}
                                className="bg-gray-700 hover:bg-gray-800 text-white px-2 py-1 rounded text-sm"
                            >
                                👤 Profile
                            </button>

                            {/* 🔥 TICKET */}
                            {!v.hasTicket ? (
                                <button
                                    onClick={() =>
                                        router.push(`/dashboard/tickets/create?visitId=${v._id}`)
                                    }
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm"
                                >
                                    🎫 Ticket
                                </button>
                            ) : (
                                <span className="text-green-600 text-xs font-semibold">
                                    ✅ Ticket Done
                                </span>
                            )}

                            {/* 🚪 CHECKOUT */}
                            {v.status === "IN" && (
                                <button
                                    onClick={() => handleCheckout(v._id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                                >
                                    🚪 Out
                                </button>
                            )}

                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}