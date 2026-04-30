"use client";

import { MapPin, Calendar, User } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { visitListContent } from "./visitList.content";

export default function VisitList({ visits = [] }: any) {
  const { lang } = useLang();
  const t = visitListContent[lang];

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-black uppercase text-gray-900 italic">
          {t.title}
        </h2>

        <span className="text-[10px] font-black bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full uppercase italic">
          {visits.length} {t.total}
        </span>
      </div>

      {/* Empty State */}
      {visits.length === 0 && (
        <p className="text-center text-gray-400 text-sm font-bold">
          {t.empty}
        </p>
      )}

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visits.map((v: any) => (
          <div
            key={v._id}
            className="group relative bg-white border border-gray-100 p-5 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            {/* BG */}
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10">
              
              {/* Top */}
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-2xl">
                  <MapPin size={20} />
                </div>

                <div className="text-right">
                  <p className="text-[10px] font-black text-gray-400 uppercase italic">
                    {t.status}
                  </p>

                  <p className="text-xs font-black text-emerald-500 uppercase italic">
                    {v.status}
                  </p>
                </div>
              </div>

              {/* Purpose */}
              <h3 className="text-lg font-black text-gray-800 uppercase italic leading-tight mb-2">
                {v.purpose}
              </h3>

              {/* Bottom */}
              <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-50">
                
                <div className="flex items-center gap-2">
                  <User size={14} className="text-gray-300" />
                  <span className="text-xs font-bold text-gray-500 uppercase italic">
                    {v.meetPerson}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-gray-300" />
                  <span className="text-[10px] font-bold text-gray-400 italic">
                    {new Date(v.createdAt).toLocaleDateString(
                      lang === "hi" ? "hi-IN" : "en-IN",
                      { day: "2-digit", month: "short", year: "numeric" }
                    )}
                  </span>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}