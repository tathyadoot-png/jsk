"use client";

import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api";

type User = {
  _id: string;
  name?: string;
  mobile: string;
  address?: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH USERS
  const getUsers = async () => {
    try {
      const res = await fetchAPI("/admin/users");

      if (res.success) {
        setUsers(res.users);
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

  // 🔥 DELETE USER
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
    <div className="p-6 lg:p-10">
      <h1 className="text-2xl font-black mb-6">
        👑 Admin User Management
      </h1>

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
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="p-4 font-semibold">
                  {user.name || "N/A"}
                </td>
                <td className="p-4">{user.mobile}</td>
                <td className="p-4">{user.address || "N/A"}</td>

                <td className="p-4 text-center space-x-3">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() =>
                      alert("Edit feature next step 😎")
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
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