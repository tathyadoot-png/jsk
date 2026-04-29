// "use client";

// import { useState } from "react";
// import VisitTable from "@/components/visit/VisitTable";
// import { useRouter } from "next/navigation";
// import { Plus, History, Activity, CalendarDays, Layers } from "lucide-react";

// export default function VisitsPage() {
//   const [filter, setFilter] = useState("active");
//   const router = useRouter();

//   const filterTabs = [
//     { id: "active", label: "Active Now", icon: Activity, color: "text-emerald-500" },
//     { id: "today", label: "Today's List", icon: CalendarDays, color: "text-blue-500" },
//     { id: "all", label: "All History", icon: History, color: "text-orange-500" },
//   ];

//   return (
//     <div className="min-h-screen p-4 lg:p-8 space-y-8 bg-[#FAFAFA]">
//       {/* --- HEADER SECTION --- */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
//         <div>
//           <div className="flex items-center gap-3 mb-1">
//             <div className="p-2 bg-black rounded-xl">
//               <Layers className="text-white" size={20} />
//             </div>
//             <h1 className="text-3xl font-black   text-gray-900 uppercase italic">
//               Visits <span className="text-gray-300 font-light">Log</span>
//             </h1>
//           </div>
//           <p className="text-xs font-bold text-gray-400 uppercase   ml-11">
//             Manage and track visitor entries
//           </p>
//         </div>

//         <button
//           onClick={() => router.push("/dashboard/visits/create")}
//           className="group relative flex items-center gap-3 bg-gray-900 hover:bg-black text-white px-6 py-4 rounded-[1.5rem] transition-all duration-300 shadow-xl hover:shadow-gray-200 active:scale-95 overflow-hidden"
//         >
//           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
//           <Plus size={20} className="text-emerald-400" />
//           <span className="text-[11px] font-black uppercase  ">New Visit Entry</span>
//         </button>
//       </div>

//       {/* --- FILTER TABS (PREMIUM LOOK) --- */}
//       <div className="flex flex-wrap items-center gap-3 bg-white/50 p-2 rounded-[2rem] border border-gray-100 w-fit backdrop-blur-sm">
//         {filterTabs.map((tab) => {
//           const Icon = tab.icon;
//           const isActive = filter === tab.id;
//           return (
//             <button
//               key={tab.id}
//               onClick={() => setFilter(tab.id)}
//               className={`flex items-center gap-3 px-6 py-3 rounded-[1.25rem] transition-all duration-500 ${
//                 isActive 
//                 ? "bg-white text-gray-900 shadow-lg border border-gray-100 scale-105" 
//                 : "text-gray-400 hover:text-gray-600 hover:bg-gray-50/50 border border-transparent"
//               }`}
//             >
//               <Icon size={16} className={isActive ? tab.color : "text-gray-300"} />
//               <span className={`text-[10px] font-black uppercase   ${isActive ? "opacity-100" : "opacity-60"}`}>
//                 {tab.label}
//               </span>
//               {isActive && (
//                 <span className="w-1.5 h-1.5 rounded-full bg-gray-900 animate-pulse ml-1" />
//               )}
//             </button>
//           );
//         })}
//       </div>

//       {/* --- TABLE CONTAINER --- */}
//       <div className="relative">
//         <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -z-10" />
//         <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-orange-50/50 rounded-full blur-3xl -z-10" />
        
//         <VisitTable filter={filter} />
//       </div>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import VisitTable from "@/components/visit/VisitTable";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LanguageContext";
import { Plus, History, Activity, CalendarDays, Layers } from "lucide-react";
import visitsContent from "@/modules/pages/visits/visits.content";

export default function VisitsPage() {
  const { lang } = useLang();
  const content = visitsContent[lang as keyof typeof visitsContent] || visitsContent.en;
  
  const [filter, setFilter] = useState("active");
  const router = useRouter();

  const filterTabs = [
    { id: "active", label: content.tabs.active, icon: Activity, color: "text-emerald-500" },
    { id: "today", label: content.tabs.today, icon: CalendarDays, color: "text-blue-500" },
    { id: "all", label: content.tabs.all, icon: History, color: "text-orange-500" },
  ];

  return (
    <div className="min-h-screen p-4 lg:p-8 space-y-8 bg-[#FAFAFA]">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="animate-in fade-in slide-in-from-left duration-700">
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2.5 bg-gray-900 rounded-2xl shadow-lg shadow-gray-200">
              <Layers className="text-white" size={22} />
            </div>
            <h1 className="text-3xl font-black   text-gray-900 uppercase italic">
              {content.title} <span className="text-gray-300 font-light">{content.subtitle}</span>
            </h1>
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase   ml-14">
            {content.description}
          </p>
        </div>

        <button
          onClick={() => router.push("/dashboard/visits/create")}
          className="group relative flex items-center gap-3 bg-gray-900 hover:bg-black text-white px-7 py-4 rounded-[1.75rem] transition-all duration-300 shadow-2xl shadow-gray-300 active:scale-95 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <Plus size={20} className="text-emerald-400 group-hover:rotate-90 transition-transform duration-500" />
          <span className="text-[11px] font-black uppercase  ">{content.newEntry}</span>
        </button>
      </div>

      {/* --- FILTER TABS (STRETCHED TO UTILIZE SPACE) --- */}
      <div className="flex flex-wrap items-center gap-4 bg-white/80 p-2.5 rounded-[2.2rem] border border-gray-100 w-fit backdrop-blur-md shadow-sm shadow-gray-100">
        {filterTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = filter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`flex items-center gap-3 px-7 py-3.5 rounded-[1.5rem] transition-all duration-500 ease-out ${
                isActive 
                ? "bg-white text-gray-900 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] border border-gray-100 scale-105" 
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-50/50 border border-transparent"
              }`}
            >
              <Icon size={18} className={isActive ? tab.color : "text-gray-300"} />
              <span className={`text-[10px] font-black uppercase   ${isActive ? "opacity-100" : "opacity-60"}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />
              )}
            </button>
          );
        })}
      </div>

      {/* --- TABLE CONTAINER WITH GLASS EFFECT --- */}
      <div className="relative group">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-100/30 rounded-full blur-[100px] -z-10 group-hover:bg-blue-200/30 transition-colors duration-1000" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-orange-100/30 rounded-full blur-[100px] -z-10 group-hover:bg-orange-200/30 transition-colors duration-1000" />
        
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden">
          <div className="p-1"> {/* Minimal padding for internal table breathing space */}
            <VisitTable filter={filter} />
          </div>
        </div>
      </div>

    </div>
  );
}