// "use client";

// import { useEffect, useState } from "react";
// import { fetchAPI } from "@/lib/api";
// import { useRouter } from "next/navigation";

// type User = {
//     _id: string;
//     name?: string;
//     mobile: string;
//     address?: string;
// };

// export default function AdminUsersPage() {
//     const [users, setUsers] = useState<User[]>([]);
//     const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
//     const [search, setSearch] = useState("");
//     const [loading, setLoading] = useState(true);

//     const router = useRouter();

//     // 🔥 FETCH USERS
//     const getUsers = async () => {
//         try {
//             const res = await fetchAPI("/admin/users");

//             if (res.success) {
//                 setUsers(res.users);
//                 setFilteredUsers(res.users);
//             }
//         } catch (err) {
//             alert("Users fetch failed");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         getUsers();
//     }, []);

//     // 🔍 SEARCH FILTER
//     useEffect(() => {
//         const filtered = users.filter((u) =>
//             `${u.name} ${u.mobile}`
//                 .toLowerCase()
//                 .includes(search.toLowerCase())
//         );

//         setFilteredUsers(filtered);
//     }, [search, users]);

//     // ❌ DELETE USER
//     const handleDelete = async (id: string) => {
//         const confirmDelete = confirm("Delete this user?");
//         if (!confirmDelete) return;

//         try {
//             const res = await fetchAPI(`/admin/users/${id}`, {
//                 method: "DELETE",
//             });

//             if (res.success) {
//                 setUsers((prev) => prev.filter((u) => u._id !== id));
//             }
//         } catch {
//             alert("Delete failed");
//         }
//     };

//     if (loading) {
//         return (
//             <div className="p-10 text-center text-xl font-bold">
//                 Loading users...
//             </div>
//         );
//     }

//     return (
//         <div className="p-6 lg:p-10 space-y-6">
//             <h1 className="text-2xl font-black">
//                 👑 Admin User Management
//             </h1>

//             {/* 🔍 SEARCH */}
//             <input
//                 type="text"
//                 placeholder="Search by name or mobile..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full max-w-md border p-2 rounded"
//             />

//             <div className="overflow-x-auto bg-white rounded-2xl shadow">
//                 <table className="w-full text-left">
//                     <thead className="bg-slate-100 text-sm uppercase">
//                         <tr>
//                             <th className="p-4">Name</th>
//                             <th className="p-4">Mobile</th>
//                             <th className="p-4">Address</th>
//                             <th className="p-4 text-center">Actions</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {filteredUsers.map((user) => (
//                             <tr key={user._id} className="border-t">
//                                 <td className="p-4 font-semibold">
//                                     {user.name || "N/A"}
//                                 </td>
//                                 <td className="p-4">{user.mobile}</td>
//                                 <td className="p-4">{user.address || "N/A"}</td>

//                                 <td className="p-4 text-center space-x-2">

//                                     {/* 👤 PROFILE */}
//                                     <button
//                                         className="bg-gray-700 text-white px-3 py-1 rounded"
//                                         onClick={() =>
//                                             router.push(`/dashboard/user/${user._id}`)
//                                         }
//                                     >
//                                         Profile
//                                     </button>

//                                     {/* 🎫 RAISE TICKET */}
//                                     {/* <button
//                     className="bg-blue-600 text-white px-3 py-1 rounded"
//                     onClick={() =>
//                       router.push(`/dashboard/tickets/create?userId=${user._id}`)
//                     }
//                   >
//                     Ticket
//                   </button> */}

//                                     {/* ✏️ EDIT */}
//                                     <button
//                                         className="bg-yellow-500 text-white px-3 py-1 rounded"
//                                         onClick={() =>
//                                             router.push(`/dashboard/user/edit/${user._id}`)
//                                         }
//                                     >
//                                         Edit
//                                     </button>

//                                     {/* ❌ DELETE */}
//                                     {/* <button
//                     className="bg-red-600 text-white px-3 py-1 rounded"
//                     onClick={() => handleDelete(user._id)}
//                   >
//                     Delete
//                   </button> */}
//                                 </td>
//                             </tr>
//                         ))}

//                         {filteredUsers.length === 0 && (
//                             <tr>
//                                 <td colSpan={4} className="p-6 text-center">
//                                     No users found
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }




"use client";

import { useEffect, useState, useMemo } from "react";
import { fetchAPI } from "@/lib/api";
import { useRouter } from "next/navigation";
import { 
  Search, MapPin, Phone, Edit3, 
  Loader2, ChevronRight,
  ChevronLeft, Calendar, UserCircle2,
  FilterX, BadgeCheck, BadgeAlert
} from "lucide-react";

type User = {
  _id: string;
  name?: string;
  mobile: string;
  address?: string;
  isVerified: boolean;
  verifiedAt?: string;
  createdAt: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState(""); 
  const itemsPerPage = 10;
  
  const router = useRouter();

  const getUsers = async () => {
    try {
      const res = await fetchAPI("/admin/users");
      if (res.success) {
        setUsers(res.users);
      }
    } catch (err) {
      console.error("Users fetch failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { getUsers(); }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch = `${u.name || ""} ${u.mobile}`
        .toLowerCase()
        .includes(search.toLowerCase());
      
      const matchesDate = dateFilter 
        ? new Date(u.createdAt).toISOString().split('T')[0] === dateFilter 
        : true;

      return matchesSearch && matchesDate;
    });
  }, [search, users, dateFilter]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedData = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-gray-400">
        <Loader2 className="animate-spin mb-4" size={40} />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] italic text-gray-300">Scanning Database...</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* --- HEADER --- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gray-900 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl">
            <UserCircle2 size={32} strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight italic">User Management</h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Administrative Control</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-gray-50 p-2 pl-4 rounded-2xl border border-gray-100 transition-all focus-within:ring-2 focus-within:ring-blue-500/5">
          <Calendar size={16} className="text-gray-400" />
          <input 
            type="date" 
            value={dateFilter}
            onChange={(e) => { setDateFilter(e.target.value); setCurrentPage(1); }}
            className="bg-transparent text-xs font-black uppercase outline-none text-gray-700 cursor-pointer"
          />
          {dateFilter && (
            <button onClick={() => setDateFilter("")} className="p-1 hover:bg-gray-200 rounded-lg">
              <FilterX size={14} className="text-red-400" />
            </button>
          )}
        </div>
      </div>

      {/* --- SEARCH --- */}
      <div className="relative group max-w-2xl">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 transition-colors group-focus-within:text-blue-500" size={20} />
        <input 
          type="text"
          placeholder="Filter by name or contact number..."
          className="w-full pl-16 pr-8 py-5 bg-white border border-transparent focus:border-blue-500/10 rounded-[2rem] outline-none shadow-sm focus:shadow-2xl transition-all text-sm font-medium placeholder:text-gray-300"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
        />
      </div>

      {/* --- DATA TABLE --- */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left hidden md:table">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="p-6 text-[10px] font-black uppercase text-gray-400 w-16 text-center italic">#</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500 italic">User Detail</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500 italic text-center">Join Date</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500 italic">Verification Status</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500 italic text-right">Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginatedData.map((user, index) => (
              <tr key={user._id} className="hover:bg-blue-50/10 transition-all group">
                <td className="p-6 text-center">
                  <span className="text-[10px] font-black text-gray-200 group-hover:text-gray-400 transition-colors italic">
                    {String((currentPage - 1) * itemsPerPage + index + 1).padStart(2, '0')}
                  </span>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-300 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-all shadow-sm">
                      <UserCircle2 size={24} strokeWidth={1} />
                    </div>
                    <div>
                      <p className="font-black text-gray-900 text-sm tracking-tight">{user.name || "N/A"}</p>
                      <p className="text-[10px] font-bold text-blue-500 tracking-tighter">{user.mobile}</p>
                    </div>
                  </div>
                </td>
                <td className="p-6 text-center">
                  <span className="text-[10px] font-black text-gray-600 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                    {new Date(user.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </td>
                <td className="p-6">
                  {user.isVerified ? (
                    <div className="flex items-center gap-2 text-emerald-500">
                      <BadgeCheck size={16} />
                      <span className="text-[10px] font-black uppercase tracking-tighter">Identity Verified</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-amber-500">
                      <BadgeAlert size={16} className="animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-tighter">Verification Pending</span>
                    </div>
                  )}
                </td>
                <td className="p-6 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => router.push(`/dashboard/user/${user._id}`)}
                      title="View Profile"
                      className="p-2.5 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-xl border border-gray-100 hover:border-gray-300 transition-all shadow-sm"
                    >
                      <UserCircle2 size={18} strokeWidth={2} />
                    </button>
                    <button 
                      onClick={() => router.push(`/dashboard/user/edit/${user._id}`)}
                      className="p-2.5 bg-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all"
                    >
                      <Edit3 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile View */}
        <div className="md:hidden p-4 space-y-4">
          {paginatedData.map((user, index) => (
            <div key={user._id} className="p-5 bg-white border border-gray-100 rounded-3xl relative overflow-hidden shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gray-900 text-white flex items-center justify-center shadow-lg shadow-gray-200">
                    <UserCircle2 size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 text-sm tracking-tight">{user.name || "Unnamed"}</h3>
                    <p className="text-[10px] font-bold text-gray-400 italic">Entry #{(currentPage - 1) * itemsPerPage + index + 1}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button onClick={() => router.push(`/dashboard/user/${user._id}`)} className="flex-1 py-3 bg-gray-50 text-gray-900 rounded-2xl text-[10px] font-black uppercase border border-gray-100 flex items-center justify-center gap-2">
                  <UserCircle2 size={14} /> Profile
                </button>
                <button onClick={() => router.push(`/dashboard/user/edit/${user._id}`)} className="w-14 py-3 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100">
                  <Edit3 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- PAGINATION --- */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm gap-4">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">
          Audit Log: {paginatedData.length} of {filteredUsers.length} Entries
        </p>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="p-3 rounded-xl border border-gray-100 hover:bg-gray-50 disabled:opacity-20 transition-all shadow-sm"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex gap-1">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-xl text-[10px] font-black transition-all ${
                  currentPage === i + 1 
                  ? "bg-gray-900 text-white shadow-xl shadow-gray-200" 
                  : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            )).slice(Math.max(0, currentPage - 2), Math.min(totalPages, currentPage + 1))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="p-3 rounded-xl border border-gray-100 hover:bg-gray-50 disabled:opacity-20 transition-all shadow-sm"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}