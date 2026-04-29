// "use client";

// import { useRouter, usePathname } from "next/navigation";
// import {
//   LayoutDashboard,
//   Users,
//   Ticket,
//   UserCog,
//   ShieldAlert,
//   LogOut,
//   ChevronRight,
//   ClipboardList
// } from "lucide-react";

// export default function Sidebar({ admin }: any) {
//   const router = useRouter();
//   const path = usePathname();

//   const handleLogout = () => {
//     // 1. Clear Auth Data (Local Storage / Cookies)
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     // 2. Redirect to Login Page
//     router.push("/login");

//     // 3. Optional: Refresh to clear state
//     router.refresh();
//   };

//   const menu = [
//     {
//       name: "Dashboard",
//       path: "/dashboard",
//       icon: <LayoutDashboard size={20} />,
//     },
//     {
//       name: "Visits",
//       path: "/dashboard/visits",
//       permission: "visit_view",
//       icon: <ClipboardList size={20} />,
//     },
//     {
//       name: "Tickets",
//       path: "/dashboard/tickets",
//       permission: "ticket_view",
//       icon: <Ticket size={20} />,
//     },
//     {
//       name: "User Management",
//       path: "/dashboard/user",
//       permission: "visitor_create",
//       icon: <Users size={20} />,
//     },
//     {
//       name: "Nodal Management",
//       path: "/dashboard/nodal",
//       permission: "admin_panel",
//       icon: <UserCog size={20} />,
//     },
//   ];

//   const filteredMenu = menu.filter((item) => {
//     if (!item.permission) return true;
//     if (admin?.role === "admin") return true;
//     if (!admin?.permissions) return false;
//     return admin.permissions.includes(item.permission);
//   });

//   return (
//     <div className="flex flex-col h-full bg-[#0a0a0a] text-white overflow-hidden border-r border-white/5">

//       {/* --- SIDEBAR HEADER --- */}
//       <div className="p-8">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
//             <ShieldAlert className="text-white w-6 h-6" />
//           </div>
//           <div>
//             <h2 className="text-lg font-black   uppercase leading-none">Control</h2>
//             <span className="text-[10px] font-bold text-gray-500   uppercase">Panel v4.0</span>
//           </div>
//         </div>
//       </div>

//       {/* --- MENU SECTION --- */}
//       <nav className="flex-1 px-4 space-y-1.5">
//         <p className="text-[10px] font-bold text-gray-600 uppercase   mb-4 ml-4">Main Menu</p>

//         <ul className="space-y-1.5">
//           {filteredMenu.map((item) => {
//             // Check if current path matches item path
//             const isActive = path === item.path || (item.path !== "/dashboard" && path.startsWith(item.path));

//             return (
//               <li
//                 key={item.path}
//                 onClick={() => router.push(item.path)}
//                 className={`
//                   relative group flex items-center justify-between px-4 py-3.5 rounded-2xl cursor-pointer transition-all duration-300
//                   ${isActive
//                     ? "bg-white/10 text-white shadow-xl shadow-black/20"
//                     : "text-gray-500 hover:bg-white/5 hover:text-gray-300"
//                   }
//                 `}
//               >
//                 <div className="flex items-center gap-3.5 relative z-10">
//                   <div className={`transition-colors duration-300 ${isActive ? "text-orange-500" : "group-hover:text-gray-300"}`}>
//                     {item.icon}
//                   </div>
//                   <span className={`text-sm font-bold tracking-wide transition-all ${isActive ? "translate-x-0" : "-translate-x-1"}`}>
//                     {item.name}
//                   </span>
//                 </div>

//                 {/* Right Arrow / Indicator */}
//                 {isActive ? (
//                   <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_10px_#f97316]" />
//                 ) : (
//                   <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
//                 )}

//                 {/* Subtle Hover Glow Line */}
//                 {isActive && (
//                   <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-orange-500 rounded-r-full shadow-[2px_0_12px_rgba(249,115,22,0.4)]" />
//                 )}
//               </li>
//             );
//           })}
//         </ul>
//       </nav>

//       {/* --- USER PROFILE SECTION --- */}
//       <div className="p-6 mt-auto border-t border-white/5 bg-white/[0.02]">
//         <div className="flex items-center gap-3 p-2">
//           <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-800 to-gray-700 border border-white/10 flex items-center justify-center font-bold text-orange-500 uppercase">
//             {admin?.name?.charAt(0) || "A"}
//           </div>
//           <div className="flex-1 min-w-0">
//             <p className="text-sm font-bold truncate">{admin?.name || "Administrator"}</p>
//             <p className="text-[10px] font-bold text-green-500 uppercase  er">
//               {admin?.role || "System User"}
//             </p>
//           </div>
//         </div>

//         <button
//           onClick={handleLogout}
//           className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/5 text-gray-500 hover:text-red-400 hover:bg-red-500/5 hover:border-red-500/20 transition-all text-xs font-bold uppercase  "
//         >
//           <LogOut size={14} />
//           Sign Out
//         </button>
//       </div>

//       {/* --- SYSTEM INTEGRITY LINE --- */}
//       <div className="h-1 w-full flex">
//         <div className="flex-1 bg-orange-500/50" />
//         <div className="flex-1 bg-white/10" />
//         <div className="flex-1 bg-green-500/50" />
//       </div>
//     </div>
//   );
// }




