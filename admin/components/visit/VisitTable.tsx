// "use client";

// import { useEffect, useState } from "react";
// import { fetchAPI } from "@/lib/api";
// import { useRouter } from "next/navigation";

// export default function VisitTable({ filter }: { filter: string }) {
//     const [visits, setVisits] = useState([]);
//     const router = useRouter();
//     const fetchVisits = async () => {
//         let endpoint = "/visit/all";

//         if (filter === "active") endpoint = "/visit/active";
//         if (filter === "today") endpoint = "/visit/today";

//         const res = await fetchAPI(endpoint);

//         if (res.success) setVisits(res.visits);
//     };

//     useEffect(() => {
//         fetchVisits();

//         // 🔥 only active auto refresh
//         if (filter === "active") {
//             const interval = setInterval(fetchVisits, 5000);
//             return () => clearInterval(interval);
//         }
//     }, [filter]);

//     const handleCheckout = async (id: string) => {
//         await fetchAPI(`/visit/checkout/${id}`, {
//             method: "PUT",
//         });

//         fetchVisits();
//     };

//     return (
//         <table className="w-full border">
//             <thead>
//                 <tr className="bg-gray-100">
//                     <th>Name</th>
//                     <th>Mobile</th>
//                     <th>Purpose</th>
//                     <th>Status</th>
//                     <th>Time</th>
//                     <th>Action</th>
//                 </tr>
//             </thead>

//             <tbody>
//                 {visits.map((v: any) => (
//                     <tr key={v._id} className="border-t">
//                         <td>{v.userId?.name}</td>
//                         <td>{v.userId?.mobile}</td>
//                         <td>{v.purpose}</td>
//                         <td>{v.status}</td>

//                         <td>
//                             {new Date(v.inTime).toLocaleString("en-IN")}
//                         </td>


//                         <td className="space-x-2 flex flex-wrap gap-2">

//                             {/* 👤 PROFILE */}
//                             <button
//                                 onClick={() => {
//                                     if (!v.userId?._id) return alert("User not found");
//                                     router.push(`/dashboard/user/${v.userId._id}`);
//                                 }}
//                                 className="bg-gray-700 hover:bg-gray-800 text-white px-2 py-1 rounded text-sm"
//                             >
//                                 👤 Profile
//                             </button>

//                             {/* 🔥 TICKET */}
//                             {!v.hasTicket ? (
//                                 <button
//                                     onClick={() =>
//                                         router.push(`/dashboard/tickets/create?visitId=${v._id}`)
//                                     }
//                                     className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm"
//                                 >
//                                     🎫 Ticket
//                                 </button>
//                             ) : (
//                                 <span className="text-green-600 text-xs font-semibold">
//                                     ✅ Ticket Done
//                                 </span>
//                             )}

//                             {/* 🚪 CHECKOUT */}
//                             {v.status === "IN" && (
//                                 <button
//                                     onClick={() => handleCheckout(v._id)}
//                                     className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
//                                 >
//                                     🚪 Out
//                                 </button>
//                             )}

//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );
// }



"use client";

import { useEffect, useState, useMemo } from "react";
import { fetchAPI } from "@/lib/api";
import { useRouter } from "next/navigation";
import { 
  User, Ticket, LogOut, Search, CheckCircle2, 
  Loader2, Users, ArrowRight, Filter,
  ChevronLeft, ChevronRight, Phone, Clock, Target
} from "lucide-react";

// --- Pagination Component ---
const Pagination = ({ currentPage, totalPages, onPageChange }: any) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mt-4 gap-4">
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="p-2 rounded-xl border border-gray-100 hover:bg-gray-50 disabled:opacity-30 transition-all"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="p-2 rounded-xl border border-gray-100 hover:bg-gray-50 disabled:opacity-30 transition-all"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default function VisitTable({ filter }: { filter: string }) {
    const [visits, setVisits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [visitType, setVisitType] = useState("all"); 
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    const router = useRouter();

    const fetchVisits = async () => {
        let endpoint = "/visit/all";
        if (filter === "active") endpoint = "/visit/active";
        if (filter === "today") endpoint = "/visit/today";

        const res = await fetchAPI(endpoint);
        if (res.success) setVisits(res.visits);
        setIsLoading(false);
    };

    useEffect(() => {
        setIsLoading(true);
        fetchVisits();
        if (filter === "active") {
            const interval = setInterval(fetchVisits, 5000);
            return () => clearInterval(interval);
        }
    }, [filter]);

    const filteredVisits = useMemo(() => {
        return visits.filter((v: any) => {
            const matchesSearch = 
                v.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                v.userId?.mobile?.includes(searchTerm) ||
                v.meetPerson?.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesType = 
                visitType === "all" ? true :
                visitType === "group" ? v.isGroupVisit === true :
                v.isGroupVisit !== true;

            return matchesSearch && matchesType;
        });
    }, [visits, searchTerm, visitType]);

    const totalPages = Math.ceil(filteredVisits.length / itemsPerPage);
    const paginatedData = filteredVisits.slice(
        (currentPage - 1) * itemsPerPage, 
        currentPage * itemsPerPage
    );

    const handleCheckout = async (id: string) => {
        const res = await fetchAPI(`/visit/checkout/${id}`, { method: "PUT" });
        if (res.success) fetchVisits();
    };

    if (isLoading && visits.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <Loader2 className="animate-spin mb-4" size={40} />
                <p className="text-sm font-black uppercase tracking-widest italic">Loading Data...</p>
            </div>
        );
    }

    return (
        <div className="w-full space-y-4">
            {/* --- CONTROLS --- */}
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-white p-4 rounded-[1.5rem] lg:rounded-[2rem] border border-gray-100 shadow-sm">
                <div className="relative w-full lg:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    <input 
                        type="text"
                        placeholder="Search visitor or staff..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium"
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
                    {[
                        { label: "All", value: "all" },
                        { label: "Single", value: "single" },
                        { label: "Group", value: "group" }
                    ].map((btn) => (
                        <button
                            key={btn.value}
                            onClick={() => {
                                setVisitType(btn.value);
                                setCurrentPage(1);
                            }}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border whitespace-nowrap ${
                                visitType === btn.value 
                                ? "bg-gray-900 text-white border-gray-900 shadow-md" 
                                : "bg-white text-gray-400 border-gray-100 hover:bg-gray-50"
                            }`}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* --- TABLE (Desktop) & CARDS (Mobile) --- */}
            <div className="overflow-hidden rounded-[1.5rem] lg:rounded-[2.5rem] border border-gray-100 bg-white shadow-sm">
                
                {/* Desktop View */}
                <table className="w-full text-left hidden md:table">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="p-5 text-[10px] font-black uppercase text-gray-400 w-16 text-center italic">S.No</th>
                            <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500 italic">Visitor & Contact</th>
                            <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500 italic">Meet To / Purpose</th>
                            <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500 italic text-center">Timeline</th>
                            <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500 italic text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {paginatedData.map((v: any, index: number) => (
                            <tr key={v._id} className="hover:bg-gray-50/30 transition-all group">
                                <td className="p-5 text-center font-black text-xs text-gray-300">
                                    {(currentPage - 1) * itemsPerPage + index + 1}
                                </td>
                                <td className="p-5">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-black text-xs border border-orange-100 shadow-sm">
                                                {v.userId?.name?.charAt(0) || 'V'}
                                            </div>
                                            {v.isGroupVisit && (
                                                <div className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white p-1 rounded-lg border-2 border-white">
                                                    <Users size={10} />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <span className="font-black text-gray-900 text-sm block leading-tight">{v.userId?.name}</span>
                                            <span className="text-[10px] font-bold text-gray-400">{v.userId?.mobile}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-5">
                                    <span className="text-[9px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 mb-1 inline-block">
                                        {v.meetPerson}
                                    </span>
                                    <p className="text-xs font-medium text-gray-500 truncate max-w-[150px] italic">
                                        {v.purpose}
                                    </p>
                                </td>
                                <td className="p-5 text-center">
                                    <div className="flex items-center justify-center gap-3">
                                        <p className="text-[10px] font-black text-gray-900">
                                            {new Date(v.inTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                        <ArrowRight size={14} className="text-gray-200" />
                                        <p className={`text-[10px] font-black ${v.status === 'OUT' ? 'text-gray-900' : 'text-gray-200 italic'}`}>
                                            {v.status === 'OUT' ? new Date(v.outTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                                        </p>
                                    </div>
                                </td>
                                <td className="p-5">
                                    <div className="flex items-center justify-end gap-2">
                                        <button onClick={() => router.push(`/dashboard/user/${v.userId?._id}`)} className="p-2.5 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-100"><User size={18} /></button>
                                        {!v.hasTicket ? (
                                            <button onClick={() => router.push(`/dashboard/tickets/create?visitId=${v._id}`)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm flex items-center gap-2"><Ticket size={14} /> Ticket</button>
                                        ) : (
                                            <span className="text-green-600 px-3 py-1.5 bg-green-50 rounded-xl text-[10px] font-black uppercase border border-green-100 flex items-center gap-1"><CheckCircle2 size={12} /> Done</span>
                                        )}
                                        {v.status === "IN" && (
                                            <button onClick={() => handleCheckout(v._id)} className="p-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all border border-red-100"><LogOut size={18} /></button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Mobile View */}
                <div className="md:hidden divide-y divide-gray-50">
                    {paginatedData.map((v: any, index: number) => (
                        <div key={v._id} className="p-4 space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-black text-xs border border-orange-100 shadow-sm">
                                            {v.userId?.name?.charAt(0) || 'V'}
                                        </div>
                                        {v.isGroupVisit && <div className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white p-1 rounded-lg border-2 border-white"><Users size={10} /></div>}
                                    </div>
                                    <div>
                                        <span className="font-black text-gray-900 text-sm block leading-tight">{v.userId?.name}</span>
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400"><Phone size={10} /> {v.userId?.mobile}</div>
                                    </div>
                                </div>
                                <span className="text-[10px] font-black text-gray-300 italic">#{(currentPage - 1) * itemsPerPage + index + 1}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 bg-gray-50/50 p-3 rounded-2xl border border-gray-100">
                                <div>
                                    <p className="text-[8px] font-black text-gray-400 uppercase mb-1 flex items-center gap-1"><Target size={10}/> Meeting To</p>
                                    <p className="text-[10px] font-black text-blue-600 uppercase truncate">{v.meetPerson}</p>
                                </div>
                                <div>
                                    <p className="text-[8px] font-black text-gray-400 uppercase mb-1 flex items-center gap-1"><Clock size={10}/> Timeline</p>
                                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-900">
                                        {new Date(v.inTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        <ArrowRight size={10} className="text-gray-300"/>
                                        <span className={v.status === 'OUT' ? '' : 'text-gray-300'}>
                                            {v.status === 'OUT' ? new Date(v.outTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-2 pt-2">
                                <button onClick={() => router.push(`/dashboard/user/${v.userId?._id}`)} className="flex-1 py-2 bg-white border border-gray-100 rounded-xl text-gray-400 flex items-center justify-center gap-2 text-[10px] font-black uppercase"><User size={14}/> Profile</button>
                                {!v.hasTicket ? (
                                    <button onClick={() => router.push(`/dashboard/tickets/create?visitId=${v._id}`)} className="flex-[2] py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm"><Ticket size={14} /> Create Ticket</button>
                                ) : (
                                    <div className="flex-[2] py-2 bg-green-50 border border-green-100 text-green-600 rounded-xl text-[10px] font-black uppercase flex items-center justify-center gap-2"><CheckCircle2 size={14} /> Completed</div>
                                )}
                                {v.status === "IN" && (
                                    <button onClick={() => handleCheckout(v._id)} className="p-2 bg-red-50 text-red-500 rounded-xl border border-red-100"><LogOut size={20} /></button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={(page: number) => setCurrentPage(page)} 
            />

            {!isLoading && filteredVisits.length === 0 && (
                <div className="text-center py-20 bg-gray-50/50 rounded-[2rem] border-2 border-dashed border-gray-100 font-black text-gray-300 uppercase tracking-widest italic text-xs px-4">
                    No results found in records
                </div>
            )}
        </div>
    );
}