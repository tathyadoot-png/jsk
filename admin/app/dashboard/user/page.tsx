"use client";

import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api";
import { useRouter } from "next/navigation";

type User = {
    _id: string;
    name?: string;
    mobile: string;
    address?: string;
};

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    // 🔥 FETCH USERS
    const getUsers = async () => {
        try {
            const res = await fetchAPI("/admin/users");

            if (res.success) {
                setUsers(res.users);
                setFilteredUsers(res.users);
            }
        } catch (err) {
            alert("Users fetch failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    // 🔍 SEARCH FILTER
    useEffect(() => {
        const filtered = users.filter((u) =>
            `${u.name} ${u.mobile}`
                .toLowerCase()
                .includes(search.toLowerCase())
        );

        setFilteredUsers(filtered);
    }, [search, users]);

    // ❌ DELETE USER
    const handleDelete = async (id: string) => {
        const confirmDelete = confirm("Delete this user?");
        if (!confirmDelete) return;

        try {
            const res = await fetchAPI(`/admin/users/${id}`, {
                method: "DELETE",
            });

            if (res.success) {
                setUsers((prev) => prev.filter((u) => u._id !== id));
            }
        } catch {
            alert("Delete failed");
        }
    };

    if (loading) {
        return (
            <div className="p-10 text-center text-xl font-bold">
                Loading users...
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-10 space-y-6">
            <h1 className="text-2xl font-black">
                👑 Admin User Management
            </h1>

            {/* 🔍 SEARCH */}
            <input
                type="text"
                placeholder="Search by name or mobile..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full max-w-md border p-2 rounded"
            />

            <div className="overflow-x-auto bg-white rounded-2xl shadow">
                <table className="w-full text-left">
                    <thead className="bg-slate-100 text-sm uppercase">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Mobile</th>
                            <th className="p-4">Address</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user._id} className="border-t">
                                <td className="p-4 font-semibold">
                                    {user.name || "N/A"}
                                </td>
                                <td className="p-4">{user.mobile}</td>
                                <td className="p-4">{user.address || "N/A"}</td>

                                <td className="p-4 text-center space-x-2">

                                    {/* 👤 PROFILE */}
                                    <button
                                        className="bg-gray-700 text-white px-3 py-1 rounded"
                                        onClick={() =>
                                            router.push(`/dashboard/user/${user._id}`)
                                        }
                                    >
                                        Profile
                                    </button>

                                    {/* 🎫 RAISE TICKET */}
                                    {/* <button
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() =>
                      router.push(`/dashboard/tickets/create?userId=${user._id}`)
                    }
                  >
                    Ticket
                  </button> */}

                                    {/* ✏️ EDIT */}
                                    <button
                                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                                        onClick={() =>
                                            router.push(`/dashboard/user/edit/${user._id}`)
                                        }
                                    >
                                        Edit
                                    </button>

                                    {/* ❌ DELETE */}
                                    {/* <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button> */}
                                </td>
                            </tr>
                        ))}

                        {filteredUsers.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-6 text-center">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}