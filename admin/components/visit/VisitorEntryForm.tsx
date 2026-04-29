// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { visitorService } from "@/services/visitor.service";
// import { 
//   Phone, User, MessageSquare, Mail, MapPin, 
//   Search, ShieldCheck, Landmark, Users, 
//   ChevronRight, RefreshCcw, CheckCircle2,
//   ArrowLeft, Info, HelpCircle
// } from "lucide-react";

// export default function VisitorEntryForm() {
//   const router = useRouter();
//   const [mobile, setMobile] = useState("");
//   const [isGroupVisit, setIsGroupVisit] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     purpose: "",
//     meetPerson: "",
//     whatsapp: "",
//     email: "",
//     gender: "",
//     address: "",
//     constituency: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [searching, setSearching] = useState(false);
//   const [status, setStatus] = useState<"idle" | "found" | "new">("idle");
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState<"FORM" | "OTP">("FORM");
//   const [timer, setTimer] = useState(0);

//   useEffect(() => {
//     let interval: any;
//     if (timer > 0) {
//       interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
//     }
//     return () => clearInterval(interval);
//   }, [timer]);

//   const handleSearch = async () => {
//     if (mobile.length !== 10) return;
//     try {
//       setSearching(true);
//       setStatus("idle");
//       const res = await visitorService.searchByMobile(mobile);
//       if (res.user) {
//         setForm((prev) => ({
//           ...prev,
//           name: res.user.name || "",
//           purpose: "",
//           meetPerson: "",
//           whatsapp: res.user.whatsapp || "",
//           email: res.user.email || "",
//           gender: res.user.gender || "",
//           address: res.user.address || "",
//           constituency: res.user.constituency || "",
//         }));
//         setStatus("found");
//       } else {
//         setForm((prev) => ({ ...prev, name: "" }));
//         setStatus("new");
//       }
//     } catch {
//       setStatus("new");
//     } finally {
//       setSearching(false);
//     }
//   };

//   const handleMobileChange = (value: string) => {
//     setMobile(value);
//     if (value.length === 10) handleSearch();
//     else {
//       setStatus("idle");
//       setForm((prev) => ({ ...prev, name: "" }));
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       if (!mobile) return alert("Mobile required");
//       setLoading(true);

//       if (step === "FORM") {
//         const res = await visitorService.createEntry({ mobile });
//         if (res.step === "OTP_SENT") {
//           setStep("OTP");
//           setTimer(30);
//           alert("OTP: " + res.devOtp);
//         } else alert(res.message);
//       } else {
//         if (!otp) return alert("Enter OTP");
//         const res = await visitorService.createEntry({
//           mobile, otp, ...form, isGroupVisit,
//         });

//         if (res.success) {
//           alert("✅ Visit created");
//           setMobile(""); setOtp(""); setStep("FORM"); setTimer(0);
//           setForm({ name: "", purpose: "", meetPerson: "", whatsapp: "", email: "", gender: "", address: "", constituency: "" });
//           setStatus("idle");
//           router.push("/dashboard/visits");
//         } else alert(res.message);
//       }
//     } catch (err: any) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto bg-white rounded-[32px] border border-gray-100 shadow-2xl overflow-hidden mb-10">
//       {/* Header */}
//       <div className="bg-gray-900 p-8 text-center relative overflow-hidden">
//         <button 
//           onClick={() => router.push("/dashboard/visits")}
//           className="absolute left-6 top-8 z-20 flex items-center gap-2 text-gray-400 hover:text-white transition-all group"
//         >
//           <div className="p-2 rounded-xl bg-white/5 group-hover:bg-white/10 transition-all">
//             <ArrowLeft size={18} />
//           </div>
//           <span className="text-[10px] font-black uppercase   hidden md:block">Back to List</span>
//         </button>
//         <h2 className="text-3xl font-black text-white   relative z-10 uppercase">Visitor Registration</h2>
//         <p className="text-gray-400 text-xs font-bold uppercase   mt-2 relative z-10">Digital Entry Portal</p>
//       </div>

//       <div className="p-6 md:p-10 space-y-8">
//         {step === "FORM" ? (
//           <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
//             {/* Identity Verification */}
//             <div className="space-y-4">
//               <label className="text-[11px] font-black text-orange-500 uppercase   flex items-center gap-2">
//                 <Info size={14} /> Identity Verification
//               </label>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
//                 <div className="relative group">
//                   <div className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-orange-500">
//                     <Phone size={18} />
//                   </div>
//                   <input
//                     className="w-full bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-orange-500 p-4 pl-12 rounded-2xl text-sm font-bold"
//                     placeholder="10-digit Mobile Number"
//                     value={mobile}
//                     onChange={(e) => handleMobileChange(e.target.value)}
//                   />
//                   <button onClick={handleSearch} className="absolute right-2 top-2 bottom-2 px-4 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase  ">
//                     {searching ? <RefreshCcw size={14} className="animate-spin" /> : "Search"}
//                   </button>
//                 </div>
                
//                 <label className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-100 rounded-2xl cursor-pointer">
//                   <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500" checked={isGroupVisit} onChange={(e) => setIsGroupVisit(e.target.checked)} />
//                   <span className="text-[11px] font-bold text-gray-600 flex items-center gap-2">
//                     <Users size={16} className="text-orange-500" /> Group Visit
//                   </span>
//                 </label>
//               </div>

//               {status !== "idle" && (
//                 <div className={`px-4 py-2 rounded-xl inline-flex items-center gap-2 text-[10px] font-black uppercase  er ${status === 'found' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-yellow-50 text-yellow-700 border border-yellow-100'}`}>
//                   {status === "found" ? <><ShieldCheck size={14} /> Existing User Found</> : <><HelpCircle size={14} /> New User Entry</>}
//                 </div>
//               )}
//             </div>

//             <hr className="border-gray-100" />

//             {/* Personal Details */}
//             <div className="space-y-4">
//               <label className="text-[11px] font-black text-orange-500 uppercase  ">Personal Details</label>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <div className="relative">
//                   <User className="absolute left-4 top-3.5 text-gray-400" size={16} />
//                   <input className={`w-full bg-gray-50 border-none ring-1 p-3.5 pl-11 rounded-2xl text-sm font-bold ${status === "found" ? "ring-green-500/30 bg-green-50/30" : "ring-gray-200 focus:ring-orange-500"}`} placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
//                 </div>

//                 <div className="relative">
//                   <MessageSquare className="absolute left-4 top-3.5 text-gray-400" size={16} />
//                   <input className="w-full bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-orange-500 p-3.5 pl-11 rounded-2xl text-sm font-bold" placeholder="WhatsApp Number" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} />
//                 </div>

//                 <div className="relative">
//                   <Mail className="absolute left-4 top-3.5 text-gray-400" size={16} />
//                   <input className="w-full bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-orange-500 p-3.5 pl-11 rounded-2xl text-sm font-bold" placeholder="Email (Optional)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
//                 </div>

//                 <select className="w-full bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-orange-500 p-3.5 px-4 rounded-2xl text-sm font-bold appearance-none" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
//                   <option value="">Select Gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                 </select>

//                 <div className="relative">
//                   <MapPin className="absolute left-4 top-3.5 text-gray-400" size={16} />
//                   <input className="w-full bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-orange-500 p-3.5 pl-11 rounded-2xl text-sm font-bold" placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
//                 </div>

//                 <div className="relative">
//                   <Landmark className="absolute left-4 top-3.5 text-gray-400" size={16} />
//                   <input className="w-full bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-orange-500 p-3.5 pl-11 rounded-2xl text-sm font-bold" placeholder="Constituency" value={form.constituency} onChange={(e) => setForm({ ...form, constituency: e.target.value })} />
//                 </div>
//               </div>
//             </div>

//             {/* Visit Info */}
//             <div className="space-y-4 pt-2">
//               <label className="text-[11px] font-black text-orange-500 uppercase  ">Visit Information</label>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <input className="w-full bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-orange-500 p-3.5 px-4 rounded-2xl text-sm font-bold" placeholder="Purpose of Visit" value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} />
//                 <select className="w-full bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-orange-500 p-3.5 px-4 rounded-2xl text-sm font-bold appearance-none" value={form.meetPerson} onChange={(e) => setForm({ ...form, meetPerson: e.target.value })}>
//                   <option value="">Select Person to Meet</option>
//                   <option value="MLA">MLA</option>
//                   <option value="PA">PA</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         ) : (
//           /* Security Verification Section (6-Digit) */
//           <div className="py-10 text-center space-y-6 animate-in zoom-in-95 duration-300">
//             <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-xl">
//               <ShieldCheck size={40} />
//             </div>
//             <div className="space-y-2">
//               <h3 className="text-xl font-black text-gray-900 uppercase  er">Security Verification</h3>
//               <p className="text-[11px] font-bold text-gray-400 uppercase  ">6-Digit code sent to <span className="text-gray-900">+{mobile}</span></p>
//             </div>
//             <div className="max-w-[320px] mx-auto space-y-4">
//               <input 
//                 className="w-full bg-gray-50 border-none ring-1 ring-orange-200 focus:ring-2 focus:ring-orange-500 p-5 text-center text-3xl font-black   rounded-3xl" 
//                 maxLength={6}
//                 value={otp} 
//                 onChange={(e) => setOtp(e.target.value)} 
//                 placeholder="000000"
//               />
//               {timer > 0 ? (
//                 <p className="text-[10px] font-black text-gray-400 uppercase">Resend in {timer}s</p>
//               ) : (
//                 <button 
//                   onClick={async () => {
//                     const res = await visitorService.createEntry({ mobile });
//                     if (res.step === "OTP_SENT") {
//                       setTimer(30);
//                       alert("OTP resent: " + res.devOtp);
//                     }
//                   }}
//                   className="text-orange-600 text-[10px] font-black uppercase   hover:underline"
//                 >
//                   Resend OTP Now
//                 </button>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Action Button */}
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="w-full group bg-gray-900 hover:bg-orange-600 text-white p-5 rounded-2xl font-black uppercase   text-[11px] flex items-center justify-center gap-3 transition-all duration-500 shadow-xl shadow-black/10 active:scale-[0.98] disabled:opacity-50"
//         >
//           {loading ? (
//             <RefreshCcw size={18} className="animate-spin" />
//           ) : (
//             <>
//               {step === "FORM" ? "Generate Access OTP" : "Confirm & Save Entry"}
//               <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
//             </>
//           )}
//         </button>
//       </div>

//       {/* Bottom Trim */}
//       <div className="h-2 w-full flex">
//         <div className="flex-1 bg-[#FF9933]" />
//         <div className="flex-1 bg-white" />
//         <div className="flex-1 bg-[#138808]" />
//       </div>
//     </div>
//   );
// }





"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { visitorService } from "@/services/visitor.service";
import { useLang } from "@/context/LanguageContext";
import registrationContent from "@/modules/pages/visits/create/registration.content"
import { 
  Phone, User, MessageSquare, Mail, MapPin, 
  Search, ShieldCheck, Landmark, Users, 
  ChevronRight, RefreshCcw, CheckCircle2,
  ArrowLeft, Info, HelpCircle
} from "lucide-react";

export default function VisitorEntryForm() {
  const router = useRouter();
  const { lang } = useLang();
  const t = registrationContent[lang as keyof typeof registrationContent] || registrationContent.en;

  const [mobile, setMobile] = useState("");
  const [isGroupVisit, setIsGroupVisit] = useState(false);
  const [form, setForm] = useState({
    name: "",
    purpose: "",
    meetPerson: "",
    whatsapp: "",
    email: "",
    gender: "",
    address: "",
    constituency: "",
  });

  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [status, setStatus] = useState<"idle" | "found" | "new">("idle");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"FORM" | "OTP">("FORM");
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSearch = async () => {
    if (mobile.length !== 10) return;
    try {
      setSearching(true);
      setStatus("idle");
      const res = await visitorService.searchByMobile(mobile);
      if (res.user) {
        setForm((prev) => ({
          ...prev,
          name: res.user.name || "",
          purpose: "",
          meetPerson: "",
          whatsapp: res.user.whatsapp || "",
          email: res.user.email || "",
          gender: res.user.gender || "",
          address: res.user.address || "",
          constituency: res.user.constituency || "",
        }));
        setStatus("found");
      } else {
        setForm((prev) => ({ ...prev, name: "" }));
        setStatus("new");
      }
    } catch {
      setStatus("new");
    } finally {
      setSearching(false);
    }
  };

  const handleMobileChange = (value: string) => {
    setMobile(value);
    if (value.length === 10) handleSearch();
    else {
      setStatus("idle");
      setForm((prev) => ({ ...prev, name: "" }));
    }
  };

  const handleSubmit = async () => {
    try {
      if (!mobile) return alert(t.alerts.mobileRequired);
      setLoading(true);

      if (step === "FORM") {
        const res = await visitorService.createEntry({ mobile });
        if (res.step === "OTP_SENT") {
          setStep("OTP");
          setTimer(30);
          alert("OTP: " + res.devOtp);
        } else alert(res.message);
      } else {
        if (!otp) return alert(t.alerts.otpRequired);
        const res = await visitorService.createEntry({
          mobile, otp, ...form, isGroupVisit,
        });

        if (res.success) {
          alert(`✅ ${t.alerts.visitCreated}`);
          setMobile(""); setOtp(""); setStep("FORM"); setTimer(0);
          setForm({ name: "", purpose: "", meetPerson: "", whatsapp: "", email: "", gender: "", address: "", constituency: "" });
          setStatus("idle");
          router.push("/dashboard/visits");
        } else alert(res.message);
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-[32px] border border-gray-100 shadow-2xl overflow-hidden mb-10">
      {/* Header */}
      <div className="bg-gray-900 p-8 text-center relative overflow-hidden">
        <button 
          onClick={() => router.push("/dashboard/visits")}
          className="absolute left-6 top-8 z-20 flex items-center gap-2 text-gray-400 hover:text-white transition-all group"
        >
          <div className="p-2 rounded-xl bg-white/5 group-hover:bg-white/10 transition-all">
            <ArrowLeft size={18} />
          </div>
          <span className="text-[10px] font-black uppercase hidden md:block">{t.header.back}</span>
        </button>
        <h2 className="text-3xl font-black text-white relative z-10 uppercase">{t.header.title}</h2>
        <p className="text-gray-400 text-xs font-bold uppercase mt-2 relative z-10">{t.header.subtitle}</p>
      </div>

      <div className="p-6 md:p-10 space-y-8">
        {step === "FORM" ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Identity Verification */}
            <div className="space-y-4">
              <label className="text-[11px] font-black text-orange-500 uppercase flex items-center gap-2">
                <Info size={14} /> {t.verification.label}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-orange-500">
                    <Phone size={18} />
                  </div>
                  <input
                    className="w-full bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-orange-500 p-4 pl-12 rounded-2xl text-sm font-bold"
                    placeholder={t.verification.placeholder}
                    value={mobile}
                    onChange={(e) => handleMobileChange(e.target.value)}
                  />
                  <button onClick={handleSearch} className="absolute right-2 top-2 bottom-2 px-4 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase">
                    {searching ? <RefreshCcw size={14} className="animate-spin" /> : t.verification.search}
                  </button>
                </div>
                
                <label className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-100 rounded-2xl cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500" checked={isGroupVisit} onChange={(e) => setIsGroupVisit(e.target.checked)} />
                  <span className="text-[11px] font-bold text-gray-600 flex items-center gap-2">
                    <Users size={16} className="text-orange-500" /> {t.verification.groupVisit}
                  </span>
                </label>
              </div>

              {status !== "idle" && (
                <div className={`px-4 py-2 rounded-xl inline-flex items-center gap-2 text-[10px] font-black uppercase ${status === 'found' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-yellow-50 text-yellow-700 border border-yellow-100'}`}>
                  {status === "found" ? <><ShieldCheck size={14} /> {t.verification.statusFound}</> : <><HelpCircle size={14} /> {t.verification.statusNew}</>}
                </div>
              )}
            </div>

            <hr className="border-gray-100" />

            {/* Personal Details */}
            <div className="space-y-4">
              <label className="text-[11px] font-black text-orange-500 uppercase">{t.personalDetails.label}</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-gray-400" size={16} />
                  <input className={`w-full bg-gray-50 border-none ring-1 p-3.5 pl-11 rounded-2xl text-sm font-bold ${status === "found" ? "ring-green-500/30 bg-green-50/30" : "ring-gray-200 focus:ring-orange-500"}`} placeholder={t.personalDetails.name} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>

                <div className="relative">
                  <MessageSquare className="absolute left-4 top-3.5 text-gray-400" size={16} />
                  <input className="w-full bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-orange-500 p-3.5 pl-11 rounded-2xl text-sm font-bold" placeholder={t.personalDetails.whatsapp} value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} />
                </div>

                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-gray-400" size={16} />
                  <input className="w-full bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-orange-500 p-3.5 pl-11 rounded-2xl text-sm font-bold" placeholder={t.personalDetails.email} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>

                <select className="w-full bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-orange-500 p-3.5 px-4 rounded-2xl text-sm font-bold appearance-none" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                  <option value="">{t.personalDetails.gender}</option>
                  <option value="male">{t.personalDetails.genders.male}</option>
                  <option value="female">{t.personalDetails.genders.female}</option>
                  <option value="other">{t.personalDetails.genders.other}</option>
                </select>

                <div className="relative">
                  <MapPin className="absolute left-4 top-3.5 text-gray-400" size={16} />
                  <input className="w-full bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-orange-500 p-3.5 pl-11 rounded-2xl text-sm font-bold" placeholder={t.personalDetails.address} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                </div>

                <div className="relative">
                  <Landmark className="absolute left-4 top-3.5 text-gray-400" size={16} />
                  <input className="w-full bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-orange-500 p-3.5 pl-11 rounded-2xl text-sm font-bold" placeholder={t.personalDetails.constituency} value={form.constituency} onChange={(e) => setForm({ ...form, constituency: e.target.value })} />
                </div>
              </div>
            </div>

            {/* Visit Info */}
            <div className="space-y-4 pt-2">
              <label className="text-[11px] font-black text-orange-500 uppercase">{t.visitInfo.label}</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input className="w-full bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-orange-500 p-3.5 px-4 rounded-2xl text-sm font-bold" placeholder={t.visitInfo.purpose} value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} />
                <select className="w-full bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-orange-500 p-3.5 px-4 rounded-2xl text-sm font-bold appearance-none" value={form.meetPerson} onChange={(e) => setForm({ ...form, meetPerson: e.target.value })}>
                  <option value="">{t.visitInfo.meetLabel}</option>
                  <option value="MLA">MLA</option>
                  <option value="PA">PA</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
        ) : (
          /* Security Verification Section (6-Digit) */
          <div className="py-10 text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-xl">
              <ShieldCheck size={40} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-gray-900 uppercase">{t.otpSection.title}</h3>
              <p className="text-[11px] font-bold text-gray-400 uppercase">{t.otpSection.subtitle} <span className="text-gray-900">+{mobile}</span></p>
            </div>
            <div className="max-w-[320px] mx-auto space-y-4">
              <input 
                className="w-full bg-gray-50 border-none ring-1 ring-orange-200 focus:ring-2 focus:ring-orange-500 p-5 text-center text-3xl font-black rounded-3xl" 
                maxLength={6}
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
                placeholder={t.otpSection.placeholder}
              />
              {timer > 0 ? (
                <p className="text-[10px] font-black text-gray-400 uppercase">{t.otpSection.resendLabel} {timer}s</p>
              ) : (
                <button 
                  onClick={async () => {
                    const res = await visitorService.createEntry({ mobile });
                    if (res.step === "OTP_SENT") {
                      setTimer(30);
                      alert("OTP resent: " + res.devOtp);
                    }
                  }}
                  className="text-orange-600 text-[10px] font-black uppercase hover:underline"
                >
                  {t.otpSection.resendAction}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full group bg-gray-900 hover:bg-orange-600 text-white p-5 rounded-2xl font-black uppercase text-[11px] flex items-center justify-center gap-3 transition-all duration-500 shadow-xl shadow-black/10 active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? (
            <RefreshCcw size={18} className="animate-spin" />
          ) : (
            <>
              {step === "FORM" ? t.actions.generate : t.actions.confirm}
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>

      {/* Bottom Trim */}
      <div className="h-2 w-full flex">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>
    </div>
  );
}