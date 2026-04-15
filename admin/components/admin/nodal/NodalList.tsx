// app/admin/nodal/page.tsx
"use client";

import { useAdmins } from "@/hooks/useAdmins";
import { useRouter } from "next/navigation";

export default function NodalListPage() {
  const { admins, deleteAdmin } = useAdmins();
  const router = useRouter();

  return (
    <div>
      <h1>Nodal List</h1>

      <button onClick={() => router.push("/admin/nodal/create")}>
        + Create
      </button>

      {admins.map((item: any) => (
        <div key={item._id}>
          <p>{item.name}</p>

          <button
            onClick={() =>
              router.push(`/admin/nodal/edit/${item._id}`)
            }
          >
            Edit
          </button>

          <button onClick={() => deleteAdmin(item._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}