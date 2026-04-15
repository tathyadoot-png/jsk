"use client";

import { useAdmins } from "@/hooks/useAdmins";
import { useRouter } from "next/navigation";

export default function NodalListPage() {
  const { admins, deleteAdmin } = useAdmins();
  const router = useRouter();

  return (
    <div className="p-6 bg-white rounded shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Nodal Users</h1>

        <button
          onClick={() => router.push("/dashboard/nodal/create")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          + Create Nodal
        </button>
      </div>

      {/* Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {admins.map((item: any) => (
            <tr key={item._id} className="border-t">
              <td className="p-3">{item.name}</td>
              <td className="p-3">{item.email}</td>
              <td className="p-3 capitalize">{item.role}</td>

              <td className="p-3 space-x-2">
                {/* Edit */}
                <button
                  onClick={() =>
                    router.push(`/dashboard/nodal/create?id=${item._id}`)
                  }
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                {/* Delete */}
                <button
                  onClick={() => {
                    if (confirm("Are you sure?")) {
                      deleteAdmin(item._id);
                    }
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Empty State */}
      {admins.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No nodal users found
        </p>
      )}
    </div>
  );
}