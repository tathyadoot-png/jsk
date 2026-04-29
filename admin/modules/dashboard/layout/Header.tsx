"use client";

import { Globe, Bell, UserCircle, Search, Command, ChevronDown } from "lucide-react";
import headerContent from "./header.content";
import { useLang } from "@/context/LanguageContext";

export default function Header({ admin }: any) {
  const { lang, setLang } = useLang();
  const content = headerContent[lang];

  return (
    <header className="h-20 px-8 flex items-center justify-between border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-50">
      
      {/* Left Section: Title & Welcome */}
      <div className="flex items-center gap-8">
        <div className="space-y-0.5">
          <h1 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
            {content.title}
            <span className="px-2 py-0.5 bg-[#138808]/20 text-[#138808] text-[10px] rounded-md border border-[#138808]/30 uppercase tracking-tighter">
              Live
            </span>
          </h1>
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.15em]">
            {content.subtitle}
          </p>
        </div>

        {/* Quick Search Bar (Visual Only) */}
        <div className="hidden lg:flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl w-64 group focus-within:border-[#FF9933]/50 transition-all">
          <Search size={16} className="text-gray-500 group-focus-within:text-[#FF9933]" />
          <span className="text-xs text-gray-500 font-medium">Search records...</span>
          <div className="ml-auto flex items-center gap-1 bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-gray-400 font-bold">
            <Command size={10} /> K
          </div>
        </div>
      </div>

      {/* Right Section: Actions & Profile */}
      <div className="flex items-center gap-5">
        
        {/* Language Switcher */}
        <button
          onClick={() => setLang(lang === "en" ? "hi" : "en")}
          className="relative flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/5 border border-white/5 hover:border-[#FF9933]/30 hover:bg-white/10 text-[11px] font-black uppercase tracking-widest transition-all group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF9933]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <Globe size={14} className="text-[#FF9933]" />
          <span className="relative z-10 text-gray-300 group-hover:text-white">
            {lang === "en" ? "हिंदी" : "English"}
          </span>
        </button>

        {/* Notifications */}
        <button className="relative p-2.5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all group">
          <Bell size={20} className="text-gray-400 group-hover:text-white transition-colors" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#FF9933] rounded-full border-2 border-[#0a0a0a]" />
        </button>

        {/* Vertical Divider */}
        <div className="w-px h-8 bg-white/10 mx-1" />

        {/* Profile Dropdown */}
        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center text-white group-hover:border-[#138808]/50 transition-all shadow-lg">
              {admin?.avatar ? (
                <img src={admin.avatar} alt="avatar" className="w-full h-full rounded-2xl object-cover" />
              ) : (
                <UserCircle size={22} className="text-gray-400 group-hover:text-[#138808] transition-colors" />
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#138808] border-2 border-[#0a0a0a] rounded-full flex items-center justify-center">
               <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            </div>
          </div>
          
          <div className="hidden sm:block">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black text-white tracking-tight">
                {admin?.name || "Administrator"}
              </span>
              <ChevronDown size={14} className="text-gray-500 group-hover:text-white transition-colors" />
            </div>
            <p className="text-[10px] font-bold text-[#138808] uppercase tracking-widest leading-none mt-0.5">
              Verified Official
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}