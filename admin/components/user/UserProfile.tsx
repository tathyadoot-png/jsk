"use client";
import React, { cloneElement } from "react";
import { User, Phone, Mail, MapPin, ShieldCheck, Globe } from "lucide-react";

export default function UserProfile({ user }: any) {
  if (!user) return null;

  return (
    <div className="relative overflow-hidden bg-white rounded-[2rem] border border-gray-100 shadow-sm">
      {/* Top Accent Line */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1 bg-[#FF9933]" /><div className="flex-1 bg-[#000080]" /><div className="flex-1 bg-[#138808]" />
      </div>

      <div className="p-5 flex flex-col md:flex-row items-center gap-6">
        {/* Profile Image - Smaller & Sharp */}
        <div className="relative shrink-0">
          <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 shadow-inner">
             <User size={32} className="text-[#000080]/30" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-[#138808] text-white p-1 rounded-md shadow-sm border border-white">
            <ShieldCheck size={12} />
          </div>
        </div>

        {/* Info Grid */}
        <div className="flex-1 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-50 pb-3 mb-3 gap-2">
            <div>
              <h1 className="text-xl font-black text-[#000080] uppercase italic tracking-tighter leading-none">
                {user.name}
              </h1>
              <div className="flex gap-2 mt-1">
                <span className="text-[9px] font-black text-[#FF9933] uppercase tracking-widest bg-[#FF9933]/5 px-2 py-0.5 rounded border border-[#FF9933]/10">
                  {user.role || "USER"}
                </span>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                  REF: {user.uniqueId || "N/A"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MiniBox icon={<Phone />} label="Primary Contact" value={user.mobile} />
            <MiniBox icon={<Mail />} label="Email Address" value={user.email} />
            <MiniBox icon={<MapPin />} label="Constituency" value={user.constituency} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniBox({ icon, label, value }: any) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
        {cloneElement(icon, { size: 14 })}
      </div>
      <div className="min-w-0">
        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none mb-0.5">{label}</p>
        <p className="text-[10px] font-bold text-gray-700 uppercase truncate leading-none">{value || "TEST"}</p>
      </div>
    </div>
  );
}