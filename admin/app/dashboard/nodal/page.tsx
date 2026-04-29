// "use client";

// import { useAdmins } from "@/hooks/useAdmins";
// import { useRouter } from "next/navigation";

// export default function NodalListPage() {
//   const { admins, deleteAdmin } = useAdmins();
//   const router = useRouter();

//   return (
//     <div className="p-6 bg-white rounded shadow">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Nodal Users</h1>

//         <button
//           onClick={() => router.push("/dashboard/nodal/create")}
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           + Create Nodal
//         </button>
//       </div>

//       {/* Table */}
//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-100 text-left">
//             <th className="p-3">Name</th>
//             <th className="p-3">Email</th>
//             <th className="p-3">Role</th>
//             <th className="p-3">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {admins.map((item: any) => (
//             <tr key={item._id} className="border-t">
//               <td className="p-3">{item.name}</td>
//               <td className="p-3">{item.email}</td>
//               <td className="p-3 capitalize">{item.role}</td>

//               <td className="p-3 space-x-2">
//                 {/* Edit */}
//                 <button
//                   onClick={() =>
//                     router.push(`/dashboard/nodal/create?id=${item._id}`)
//                   }
//                   className="bg-blue-500 text-white px-3 py-1 rounded"
//                 >
//                   Edit
//                 </button>

//                 {/* Delete */}
//                 <button
//                   onClick={() => {
//                     if (confirm("Are you sure?")) {
//                       deleteAdmin(item._id);
//                     }
//                   }}
//                   className="bg-red-500 text-white px-3 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Empty State */}
//       {admins.length === 0 && (
//         <p className="text-center text-gray-500 mt-4">
//           No nodal users found
//         </p>
//       )}
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { useAdmins } from "@/hooks/useAdmins";
import { useRouter } from "next/navigation";
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  UserCheck, 
  Mail, 
  Shield, 
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  FilterX
} from "lucide-react";

export default function NodalListPage() {
  const { admins, deleteAdmin } = useAdmins();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  // Frontend Filtering Logic
  const filteredAdmins = admins.filter((admin: any) => 
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-1 sm:p-4 animate-in fade-in duration-700">
      
      {/* --- TOP ACTION BAR --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-6 rounded-[2rem] border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black   text-gray-800 italic">Nodal Directory</h1>
          <p className="text-[10px] font-black text-gray-400 uppercase  ">Authorized Personnel Management</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Search by name/email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-12 pr-4 text-sm font-bold text-gray-900 outline-none ring-2 ring-transparent focus:ring-indigo-500/10 transition-all"
            />
          </div>
          
          <button
            onClick={() => router.push("/dashboard/nodal/create")}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase   shadow-xl shadow-indigo-100 transition-all active:scale-95"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Create Nodal</span>
          </button>
        </div>
      </div>

      {/* --- DATA TABLE CONTAINER --- */}
     {/* --- DATA TABLE CONTAINER --- */}
<div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-gray-50/50 border-b border-gray-100">
          {/* S.No Column Head */}
          <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase   w-16">S.No</th>
          <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase  ">Officer Details</th>
          <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase   hidden md:table-cell">Authorization</th>
          <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase   hidden lg:table-cell">Status</th>
          <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase   text-right">Actions</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-50">
        {filteredAdmins.map((item: any, index: number) => (
          <tr key={item._id} className="group hover:bg-indigo-50/30 transition-colors">
            
            {/* S.No Cell */}
            <td className="px-6 py-5">
              <span className="text-xs font-black text-gray-300 group-hover:text-indigo-400 transition-colors">
                {(index + 1).toString().padStart(2, '0')}
              </span>
            </td>

            {/* Name & Email Column */}
            <td className="px-6 py-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-indigo-600 font-black text-sm border border-gray-200">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-black text-gray-800 text-sm italic">{item.name}</h3>
                  <div className="flex items-center gap-1.5 text-gray-400 mt-0.5">
                    <Mail size={10} />
                    <span className="text-[10px] font-bold  ">{item.email}</span>
                  </div>
                </div>
              </div>
            </td>

            {/* Role Column */}
            <td className="px-6 py-5 hidden md:table-cell">
              <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-3 py-1 rounded-lg">
                <Shield size={12} className="text-indigo-500" />
                <span className="text-[9px] font-black text-gray-600 uppercase  ">{item.role}</span>
              </div>
            </td>

            {/* Status Column */}
            <td className="px-6 py-5 hidden lg:table-cell">
              <div className="flex items-center gap-2 text-emerald-600">
                <UserCheck size={14} />
                <span className="text-[9px] font-black uppercase   italic">Active</span>
              </div>
            </td>

            {/* Actions Column */}
            <td className="px-6 py-5 text-right">
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => router.push(`/dashboard/nodal/create?id=${item._id}`)}
                  className="p-2 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-all"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => {
                    if (confirm("Are you sure?")) deleteAdmin(item._id);
                  }}
                  className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

      {/* --- MOBILE STATS HINT --- */}
      <div className="flex items-center justify-center gap-2 py-2 md:hidden">
        <MoreHorizontal className="text-gray-300" size={16} />
        <p className="text-[9px] font-black text-gray-300 uppercase   italic text-center">
          Slide table rows to view full details
        </p>
      </div>
    </div>
  );
}