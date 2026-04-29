// "use client";

// import { useState } from "react";
// import React from "react";

// export default function TicketList({ tickets, title = "Tickets" }: any) {
//   const [openId, setOpenId] = useState<string | null>(null);

//   const downloadPDF = async (t: any) => {
//     const res = await fetch("http://localhost:5000/api/pdf/generate", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         content: t.letterBody,
//         name: t.userId?.name,
//         mobile: t.userId?.mobile,
//       }),
//     });

//     const blob = await res.blob();
//     const url = window.URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "letter.pdf";
//     a.click();
//   };

//   return (
//     <div className="bg-white p-5 rounded shadow">
//       <h2 className="text-xl font-bold mb-3">{title}</h2>

//       <table className="w-full">
//         <thead>
//           <tr className="bg-gray-100">
//             <th>Ticket</th>
//             <th>Name</th>
//             <th>Mobile</th>
//             <th>Department</th>
//             <th>Type</th>
//             <th>Status</th>
//             <th>Date</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {tickets.map((t: any) => (
//             <React.Fragment key={t._id}>

//               <tr className="border-t">
//                 <td>{t.ticketNumber}</td>
//                 <td>{t.userId?.name || "N/A"}</td>
//                 <td>{t.userId?.mobile || "N/A"}</td>
//                 <td>{t.department}</td>
//                 <td>{t.entryType}</td>
//                 <td>{t.status}</td>
//                 <td>{new Date(t.createdAt).toLocaleString("en-IN")}</td>

//                 <td>
//                   <button
//                     onClick={() =>
//                       setOpenId(openId === t._id ? null : t._id)
//                     }
//                     className="text-blue-600 mr-2 underline"
//                   >
//                     {openId === t._id ? "Hide" : "View"}
//                   </button>

//                   <button
//                     onClick={() => downloadPDF(t)}
//                     className="text-green-600 underline"
//                   >
//                     PDF
//                   </button>
//                 </td>
//               </tr>

//               {openId === t._id && (
//                 <tr className="bg-gray-50">
//                   <td colSpan={8} className="p-4">
//                     <b>Letter:</b>

//                     <pre className="whitespace-pre-wrap text-sm bg-white p-3 rounded border mt-2">
//                       {t.letterBody || "No letter found"}
//                     </pre>
//                   </td>
//                 </tr>
//               )}

//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }



"use client";

import React, { useState } from "react";
import { Ticket, Download, Eye, EyeOff, Phone, Building, ChevronDown } from "lucide-react";

export default function TicketList({ tickets = [], title = "Tickets" }: any) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black uppercase  er text-gray-900 italic px-2">{title}</h2>
      
      <div className="flex flex-col gap-3">
        {tickets.map((t: any) => (
          <div 
            key={t._id}
            className={`transition-all duration-500 rounded-[2rem] border ${
              openId === t._id ? "bg-indigo-50/30 border-indigo-200 shadow-lg" : "bg-white border-gray-100 shadow-sm"
            }`}
          >
            <div className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-colors ${
                  openId === t._id ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-400"
                }`}>
                  <Ticket size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-indigo-500 uppercase   italic">#{t.ticketNumber}</span>
                    <span className="px-2 py-0.5 rounded-md bg-gray-100 text-[9px] font-black text-gray-500 uppercase  er">
                      {t.entryType || "General"}
                    </span>
                  </div>
                  <h3 className="text-md font-black text-gray-800 uppercase italic">{t.userId?.name || "N/A"}</h3>
                </div>
              </div>

              <div className="grid grid-cols-2 md:flex items-center gap-6">
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase italic">Department</p>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600 italic">
                    <Building size={12} /> {t.department}
                  </div>
                </div>
                <div className="text-right md:text-left">
                  <p className="text-[9px] font-black text-gray-400 uppercase italic">Status</p>
                  <p className="text-xs font-black text-indigo-600 uppercase italic">{t.status}</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 border-t md:border-none pt-4 md:pt-0">
                <button
                  onClick={() => setOpenId(openId === t._id ? null : t._id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
                    openId === t._id ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {openId === t._id ? <EyeOff size={14} /> : <Eye size={14} />}
                  {openId === t._id ? "Close" : "View Details"}
                </button>
              </div>
            </div>

            {/* Letter Body Expansion */}
            {openId === t._id && (
              <div className="px-4 pb-6 animate-in slide-in-from-top-2 duration-300">
                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-indigo-100 shadow-inner">
                  <p className="text-[10px] font-black text-indigo-400 uppercase italic mb-3 flex items-center gap-2">
                    Message Content
                  </p>
                  <div className="text-sm text-gray-700 italic leading-relaxed whitespace-pre-wrap font-medium">
                    {t.letterBody || "No message attached."}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}