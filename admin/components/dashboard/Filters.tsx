"use client";

import { CalendarDays, Clock, CalendarRange } from "lucide-react";

export default function Filters({ filter, setFilter }: any) {
  const options = [
    { id: "today", label: "Today", icon: <Clock size={14} /> },
    { id: "week", label: "This Week", icon: <CalendarDays size={14} /> },
    { id: "month", label: "Monthly", icon: <CalendarRange size={14} /> },
  ];

  return (
    <div className="w-full md:w-auto inline-flex p-1.5 bg-gray-100/80 backdrop-blur-sm rounded-2xl border border-gray-200/50">
      <div className="flex w-full md:w-auto gap-1">
        {options.map((option) => {
          const isActive = filter === option.id;

          return (
            <button
              key={option.id}
              onClick={() => setFilter(option.id)}
              className={`
                flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase   transition-all duration-300
                ${isActive 
                  ? "bg-white text-orange-600 shadow-sm border border-gray-200/50 scale-100" 
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50 scale-95"
                }
              `}
            >
              <span className={`transition-transform duration-300 ${isActive ? "scale-110" : "opacity-60"}`}>
                {option.icon}
              </span>
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}