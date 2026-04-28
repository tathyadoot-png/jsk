"use client";

import { Globe, Bell, UserCircle } from "lucide-react";
import headerContent from "./header.content";
import { Lang } from "./types";

type HeaderProps = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  admin?: {
    name?: string;
  };
};

export default function Header({ lang, setLang, admin }: HeaderProps) {
  const content = headerContent[lang];

  return (
    <div className="h-20 px-6 flex items-center justify-between border-b border-white/5 bg-[#0a0a0a] text-white">

      {/* LEFT: Title */}
      <div>
        <h1 className="text-xl font-bold">{content.title}</h1>
        <p className="text-xs text-gray-500">{content.subtitle}</p>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-4">

        {/* Language Switch */}
        <button
          onClick={() => setLang(lang === "en" ? "hi" : "en")}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-widest"
        >
          <Globe size={14} />
          {lang === "en" ? "हिंदी" : "English"}
        </button>

        {/* Notification */}
        <button className="p-2 rounded-lg hover:bg-white/10">
          <Bell size={18} />
        </button>

        {/* User */}
        <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg">
          <UserCircle size={18} />
          <span className="text-sm font-semibold">
            {admin?.name || "Admin"}
          </span>
        </div>
      </div>
    </div>
  );
}