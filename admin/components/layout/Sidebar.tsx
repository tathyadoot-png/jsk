"use client";

import { useRouter, usePathname } from "next/navigation";

export default function Sidebar({ admin }: any) {
  const router = useRouter();
  const path = usePathname();

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },

    // 🔥 VISITS (MERGED)
    {
      name: "Visits",
      path: "/dashboard/visits",
      permission: "visit_view",
    },

  

    // 🔐 TICKETS
    {
      name: "Tickets",
      path: "/dashboard/tickets",
      permission: "ticket_view",
    },

    // 🔐 USERS
    {
      name: "User Management",
      path: "/dashboard/user",
      permission: "visitor_create",
    },

    // 🔐 ADMIN ONLY
    {
      name: "Nodal Management",
      path: "/dashboard/nodal",
      permission: "admin_panel",
    },
  ];

  const filteredMenu = menu.filter((item) => {
    if (!item.permission) return true;

    if (admin?.role === "admin") return true;

    if (!admin?.permissions) return false;

    return admin.permissions.includes(item.permission);
  });

  return (
    <div className="w-64 h-screen bg-black text-white p-5">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <ul className="space-y-2">
        {filteredMenu.map((item) => {
          const isActive = path.startsWith(item.path);

          return (
            <li
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`cursor-pointer px-3 py-2 rounded transition ${
                isActive
                  ? "bg-green-500 text-black font-semibold"
                  : "hover:bg-gray-800"
              }`}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}