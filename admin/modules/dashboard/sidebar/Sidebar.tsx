"use client";

import { useRouter, usePathname } from "next/navigation";
import { LogOut, ChevronRight, ShieldAlert } from "lucide-react";
import sidebarContent from "./sidebar.content";
import menuLabels from "./menu.labels";
import { menuConfig } from "./menu.config";
import { MenuKey } from "./types";
import { useLang } from "@/context/LanguageContext"; // ✅ IMPORTANT

type SidebarProps = {
  admin?: {
    name?: string;
    role?: string;
    permissions?: string[];
  };
};

export default function Sidebar({ admin }: SidebarProps) {
  const { lang } = useLang(); // ✅ context से language
  const router = useRouter();
  const path = usePathname();

  const content = sidebarContent[lang] || sidebarContent["en"]; // ✅ safe fallback
  const labels = menuLabels[lang] || menuLabels["en"]; // ✅ safe fallback

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
    router.refresh();
  };

  const filteredMenu = menuConfig.filter((item) => {
    if (!item.permission) return true;
    if (admin?.role === "admin") return true;
    if (!admin?.permissions) return false;
    return admin.permissions.includes(item.permission);
  });

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] text-white overflow-hidden border-r border-white/5">

      {/* HEADER */}
      <div className="p-8 flex items-center gap-3">
        <ShieldAlert className="w-6 h-6 text-orange-500" />
        <div>
          <h2 className="text-lg font-bold uppercase tracking-tight">
            {content.header}
          </h2>
          <span className="text-xs text-gray-500 uppercase tracking-widest">
            {content.subHeader}
          </span>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-4 space-y-2">
        <p className="text-xs text-gray-500 uppercase tracking-widest ml-2 mb-3">
          {content.menuTitle}
        </p>

        {filteredMenu.map((item) => {
          const isActive =
            path === item.path ||
            (item.path !== "/dashboard" && path.startsWith(item.path));

          const Icon = item.icon;
          const label = labels[item.key as MenuKey]; // ✅ safe typed access

          return (
            <div
              key={item.key}
              onClick={() => router.push(item.path)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all
                ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={18}
                  className={isActive ? "text-orange-500" : ""}
                />
                <span className="text-sm font-semibold">{label}</span>
              </div>

              {isActive && (
                <ChevronRight size={14} className="text-orange-500" />
              )}
            </div>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all"
        >
          <LogOut size={14} />
          {content.logout}
        </button>
      </div>
    </div>
  );
}