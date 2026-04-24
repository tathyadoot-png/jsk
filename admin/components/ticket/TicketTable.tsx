// "use client";

// import { useEffect, useState } from "react";
// import { getTickets, updateTicketStatus } from "@/services/ticket.service";

// export default function TicketTable() {
//   const [tickets, setTickets] = useState<any[]>([]);
//   const [filteredTickets, setFilteredTickets] = useState<any[]>([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [openRow, setOpenRow] = useState<string | null>(null);

//   const fetchTickets = async () => {
//     try {
//       setLoading(true);
//       const res = await getTickets();
//       setTickets(res.data);
//       setFilteredTickets(res.data);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTickets();
//   }, []);

//   useEffect(() => {
//     const filtered = tickets.filter((t) =>
//       `${t.ticketNumber} ${t.userId?.mobile || ""}`
//         .toLowerCase()
//         .includes(search.toLowerCase())
//     );
//     setFilteredTickets(filtered);
//   }, [search, tickets]);

//   const handleStatusChange = async (id: string, status: any) => {
//     await updateTicketStatus(id, status);
//     fetchTickets();
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="bg-white p-6 rounded shadow space-y-4">
//       <h2 className="text-xl font-bold">Tickets</h2>

//       <input
//         type="text"
//         placeholder="Search by ticket number or mobile..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="w-full max-w-md border p-2 rounded"
//       />

//       <table className="w-full">
//         <thead>
//           <tr className="bg-gray-100 text-left">
//             <th className="p-3">Ticket</th>
//             <th className="p-3">Name</th>
//             <th className="p-3">Mobile</th>
//             <th className="p-3">Department</th>
//             <th className="p-3">Type</th>
//             <th className="p-3">Status</th>
//             <th className="p-3">Date</th>
//             <th className="p-3">Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {filteredTickets.map((t: any) => (
//             <>
//               <tr key={t._id} className="border-t">
//                 <td className="p-3 font-semibold">{t.ticketNumber}</td>
//                 <td className="p-3">{t.userId?.name}</td>
//                 <td className="p-3">{t.userId?.mobile || "N/A"}</td>
//                 <td className="p-3">{t.department}</td>

//                 {/* 🔥 ENTRY TYPE */}
//                 <td className="p-3">
//                   {t.entryType === "REPRESENTATIVE"
//                     ? "Representative"
//                     : "Direct"}
//                 </td>

//                 <td className="p-3">
//                   <select
//                     value={t.status}
//                     onChange={(e) =>
//                       handleStatusChange(t._id, e.target.value)
//                     }
//                     className="border p-1 rounded"
//                   >
//                     <option value="pending">Pending</option>
//                     <option value="in_progress">In Progress</option>
//                     <option value="resolved">Resolved</option>
//                   </select>
//                 </td>

//                 <td className="p-3">
//                   {new Date(t.createdAt).toLocaleDateString("en-IN")}
//                 </td>

//                 {/* 🔥 VIEW BUTTON */}
//                 <td className="p-3">
//                   <button
//                     onClick={() =>
//                       setOpenRow(openRow === t._id ? null : t._id)
//                     }
//                     className="text-blue-600 underline"
//                   >
//                     {openRow === t._id ? "Hide" : "View"}
//                   </button>
//                 </td>
//               </tr>

//               {/* 🔥 EXPANDED ROW */}
//               {openRow === t._id && (
//                 <tr className="bg-gray-50">
//                   <td colSpan={8} className="p-4 space-y-3">

//                     {/* DESCRIPTION */}
//                     <div>
//                       <b>Description:</b>
//                       <p className="text-sm">{t.description}</p>
//                     </div>

//                     {/* LETTER */}
//                     <div>
//                       <b>Letter:</b>
//                       <pre className="whitespace-pre-wrap text-sm bg-white p-3 rounded border">
//                         {t.letterBody || "No letter"}
//                       </pre>
//                     </div>

//                     {/* IMAGES */}
//                     {t.images?.length > 0 && (
//                       <div>
//                         <b>Images:</b>
//                         <div className="flex gap-2 mt-2">
//                           {t.images.map((img: string, i: number) => (
//                             <img
//                               key={i}
//                               src={img}
//                               className="w-20 h-20 rounded"
//                             />
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               )}
//             </>
//           ))}

//           {filteredTickets.length === 0 && (
//             <tr>
//               <td colSpan={8} className="text-center p-4">
//                 No tickets found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }


"use client";

import React from "react";
import { useEffect, useState, useMemo } from "react";
import { getTickets, updateTicketStatus } from "@/services/ticket.service";
import {
  Search, Ticket, User, Building2, Calendar,
  ChevronDown, ChevronUp, Clock, CheckCircle2,
  Loader2, Filter, Image as ImageIcon, FileText,
  ChevronLeft, ChevronRight, Hash, Phone
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

export default function TicketTable() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [openRow, setOpenRow] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const itemsPerPage = 8;

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await getTickets();
      setTickets(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTickets(); }, []);

  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      const matchesSearch = `${t.ticketNumber} ${t.userId?.mobile || ""} ${t.userId?.name || ""}`
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus = statusFilter === "all" ? true : t.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, tickets, statusFilter]);

  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const paginatedData = filteredTickets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleStatusChange = async (id: string, status: any) => {
    await updateTicketStatus(id, status);
    fetchTickets();
  };

  if (loading && tickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400">
        <Loader2 className="animate-spin mb-4" size={40} />
        <p className="text-sm font-black uppercase tracking-widest italic">Syncing Tickets...</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-5">
      {/* --- CONTROLS --- */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-white p-4 rounded-[1.5rem] lg:rounded-[2rem] border border-gray-100 shadow-sm">
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
          <input
            type="text"
            placeholder="Ticket #, Name or Mobile..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
          {["all", "pending", "in_progress", "resolved"].map((f) => (
            <button
              key={f}
              onClick={() => { setStatusFilter(f); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border whitespace-nowrap ${statusFilter === f
                  ? "bg-gray-900 text-white border-gray-900 shadow-md"
                  : "bg-white text-gray-400 border-gray-100 hover:bg-gray-50"
                }`}
            >
              {f.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* --- TABLE & CARDS --- */}
      <div className="overflow-hidden rounded-[1.5rem] lg:rounded-[2.5rem] border border-gray-100 bg-white shadow-sm">

        {/* Desktop View */}
        <table className="w-full text-left hidden md:table">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="p-5 text-[10px] font-black uppercase text-gray-400 w-16 text-center italic">S.No</th>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500 italic">Ticket Info</th>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500 italic">User & Mobile</th>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500 italic">Dept / Type</th>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500 italic text-center">Status</th>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500 italic text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginatedData.map((t: any, index: number) => (
              <React.Fragment key={t._id}>
                <tr className={`hover:bg-gray-50/30 transition-all group ${openRow === t._id ? 'bg-blue-50/20' : ''}`}>
                  <td className="p-5 text-center font-black text-xs text-gray-300">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gray-900 text-white flex items-center justify-center shadow-lg">
                        <Ticket size={18} />
                      </div>
                      <div>
                        <span className="font-black text-gray-900 text-sm block leading-tight tracking-tight">{t.ticketNumber}</span>
                        <span className="text-[10px] font-bold text-gray-400">{new Date(t.createdAt).toLocaleDateString("en-IN")}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="font-black text-gray-900 text-sm block leading-tight">{t.userId?.name}</span>
                    <span className="text-[10px] font-bold text-gray-400">{t.userId?.mobile || "N/A"}</span>
                  </td>
                  <td className="p-5">
                    <span className="text-[9px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 mb-1 inline-block">
                      {t.department}
                    </span>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                      {t.entryType === "REPRESENTATIVE" ? "Representative" : "Direct"}
                    </p>
                  </td>
                  <td className="p-5 text-center">
                    <select
                      value={t.status}
                      onChange={(e) => handleStatusChange(t._id, e.target.value)}
                      className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border-2 outline-none transition-all cursor-pointer ${t.status === 'resolved' ? 'bg-green-50 border-green-100 text-green-600' :
                          t.status === 'in_progress' ? 'bg-blue-50 border-blue-100 text-blue-600' :
                            'bg-orange-50 border-orange-100 text-orange-600'
                        }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </td>
                  <td className="p-5 text-right">
                    <button
                      onClick={() => setOpenRow(openRow === t._id ? null : t._id)}
                      className={`p-2 rounded-xl transition-all ${openRow === t._id ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-400 hover:text-gray-900'}`}
                    >
                      {openRow === t._id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  </td>
                </tr>
                {/* Expanded Row Desktop */}
                {openRow === t._id && (
                  <tr className="bg-gray-50/50">
                    <td colSpan={6} className="p-4 md:p-8">
                      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 animate-in fade-in slide-in-from-top-4 duration-500">

                        {/* --- LEFT SIDE: Metadata & Assets (2 Columns) --- */}
                        <div className="xl:col-span-2 space-y-4">
                          {/* Description Card */}
                          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-2 mb-4">
                              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                <FileText size={16} />
                              </div>
                              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Subject / Description</h4>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed font-medium">
                              {t.description || "No description provided."}
                            </p>
                          </div>

                          {/* Attachments Card */}
                          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                              <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                                <ImageIcon size={16} />
                              </div>
                              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Supporting Documents</h4>
                            </div>
                            {t.images?.length > 0 ? (
                              <div className="flex flex-wrap gap-3">
                                {t.images.map((img: string, i: number) => (
                                  <div key={i} className="group relative w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                                    <img src={img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer" />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                      <Search className="text-white" size={16} />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="py-6 border-2 border-dashed border-gray-50 rounded-2xl text-center text-[10px] font-bold text-gray-300 uppercase tracking-tighter">
                                No Attachments Found
                              </div>
                            )}
                          </div>
                        </div>

                        {/* --- RIGHT SIDE: Formal Letter (3 Columns) --- */}
                        <div className="xl:col-span-3">
                          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden relative min-h-[400px] flex flex-col">
                            {/* Paper Header */}
                            <div className="bg-gray-900 px-8 py-4 flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-[10px] font-black text-white/70 uppercase tracking-[0.3em]">Official Letter</span>
                              </div>
                              <div className="px-3 py-1 bg-white/10 rounded-md text-[9px] font-bold text-white/50 uppercase">
                                ID: {t.ticketNumber}
                              </div>
                            </div>

                            {/* Letter Content */}
                            <div className="p-8 md:p-12 relative flex-grow bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
                              <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white" />

                              <div className="relative z-10">
                                {t.letterBody ? (
                                  <div className="space-y-6">
                                    {/* Placeholder for Address/Date if needed */}
                                    <div className="text-[10px] font-bold text-gray-400 uppercase text-right mb-8">
                                      Dated: {new Date(t.createdAt).toLocaleDateString('en-IN', { dateStyle: 'long' })}
                                    </div>

                                    <p className="text-gray-800 text-sm md:text-base leading-[2] font-serif whitespace-pre-wrap">
                                      {t.letterBody}
                                    </p>

                                    {/* Digital Sign Placeholder */}
                                    <div className="mt-12 pt-12 border-t border-gray-50">
                                      <div className="flex justify-between items-end">
                                        <div className="opacity-30 grayscale contrast-200">
                                          <img src="/logo.png" className="h-8 w-auto opacity-20" alt="" />
                                        </div>
                                        <div className="text-right">
                                          <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Status Verified</p>
                                          <p className="text-xs font-black text-gray-900 italic tracking-tighter">SNHC India Foundation</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex flex-col items-center justify-center py-20 text-gray-300">
                                    <FileText size={48} strokeWidth={1} className="mb-4" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Formal content body is missing</p>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Paper Edge Detail */}
                            <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* Mobile View */}
        <div className="md:hidden divide-y divide-gray-50">
          {paginatedData.map((t: any) => (
            <div key={t._id} className="p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gray-900 text-white flex items-center justify-center shadow-lg"><Ticket size={18} /></div>
                  <div>
                    <span className="font-black text-gray-900 text-sm block">{t.ticketNumber}</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{t.userId?.name}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400"><Calendar size={10} /> {new Date(t.createdAt).toLocaleDateString("en-IN")}</div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50/50 p-3 rounded-2xl border border-gray-100">
                  <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Department</p>
                  <p className="text-[10px] font-black text-blue-600 uppercase truncate">{t.department}</p>
                </div>
                <div className="bg-gray-50/50 p-3 rounded-2xl border border-gray-100">
                  <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Mobile</p>
                  <p className="text-[10px] font-black text-gray-900">{t.userId?.mobile || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                <select
                  value={t.status}
                  onChange={(e) => handleStatusChange(t._id, e.target.value)}
                  className={`flex-1 text-[10px] font-black uppercase tracking-widest px-3 py-2.5 rounded-xl border-2 outline-none ${t.status === 'resolved' ? 'bg-green-50 border-green-100 text-green-600' :
                      t.status === 'in_progress' ? 'bg-blue-50 border-blue-100 text-blue-600' :
                        'bg-orange-50 border-orange-100 text-orange-600'
                    }`}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
                <button
                  onClick={() => setOpenRow(openRow === t._id ? null : t._id)}
                  className="px-4 py-2.5 bg-gray-50 text-gray-900 rounded-xl text-[10px] font-black uppercase border border-gray-100 flex items-center gap-2"
                >
                  {openRow === t._id ? "Hide" : "View Details"}
                </button>
              </div>

              {openRow === t._id && (
                <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 space-y-4 animate-in fade-in duration-300">
                  <div>
                    <h5 className="text-[8px] font-black text-gray-400 uppercase mb-1 flex items-center gap-1"><FileText size={10} /> Description</h5>
                    <p className="text-xs text-gray-600 italic leading-relaxed">{t.description}</p>
                  </div>
                  {t.images?.length > 0 && (
                    <div>
                      <h5 className="text-[8px] font-black text-gray-400 uppercase mb-2">Attachments</h5>
                      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {t.images.map((img: string, i: number) => (
                          <img key={i} src={img} className="w-16 h-16 object-cover rounded-xl border border-white shadow-sm flex-shrink-0" />
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <h5 className="text-[8px] font-black text-gray-400 uppercase mb-1">Full Letter</h5>
                    <div className="bg-white p-3 rounded-xl text-[10px] text-gray-500 leading-normal max-h-40 overflow-y-auto border border-gray-100">
                      {t.letterBody || "No letter content."}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page: number) => setCurrentPage(page)}
      />

      {!loading && filteredTickets.length === 0 && (
        <div className="text-center py-20 bg-gray-50/50 rounded-[2rem] border-2 border-dashed border-gray-100 font-black text-gray-300 uppercase tracking-widest italic text-xs px-4">
          No records matching your search
        </div>
      )}
    </div>
  );
}