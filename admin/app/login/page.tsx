// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { fetchAPI } from "@/lib/api";
// import { Eye, EyeOff, Lock, User, ShieldCheck, LayoutGrid } from "lucide-react";

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     setLoading(true);
//     try {
//       const res = await fetchAPI("/adminAuth/login", {
//         method: "POST",
//         body: JSON.stringify({ email, password }),
//       });
//       if (res.success) {
//         router.push("/dashboard");
//       } else {
//         alert(res.message);
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#080808] flex items-center justify-center p-6 relative overflow-hidden">
      
//       {/* Background Ambient Glows */}
//       <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] animate-pulse" />
//       <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-green-600/10 rounded-full blur-[120px] animate-pulse delay-700" />

//       <div className="w-full max-w-5xl grid md:grid-cols-2 gap-0 overflow-hidden rounded-[40px] border border-white/5 shadow-2xl backdrop-blur-xl">
        
//         {/* Left Side: Logo & Branding Space */}
//         <div className="bg-white/5 p-12 flex flex-col items-center justify-center border-r border-white/5 relative">
//           <div className="relative z-10 flex flex-col items-center">
//             {/* Main Logo Container */}
//             <div className="w-24 h-24 bg-gradient-to-br from-white/10 to-white/5 rounded-[30px] border border-white/10 flex items-center justify-center mb-8 shadow-2xl backdrop-blur-md group hover:border-orange-500/50 transition-all duration-500">
//                <ShieldCheck size={48} className="text-white opacity-80 group-hover:text-orange-500 transition-colors" />
//             </div>
            
//             <div className="text-center">
//               <h1 className="text-3xl font-bold text-white tracking-tight uppercase">Admin <span className="text-orange-500">Portal</span></h1>
//               <div className="flex items-center justify-center gap-2 mt-3">
//                 <div className="h-[1px] w-8 bg-orange-500/50" />
//                 <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">Management System</span>
//                 <div className="h-[1px] w-8 bg-green-500/50" />
//               </div>
//             </div>
//           </div>
          
//           {/* Subtle Bottom Badge */}
//           <div className="absolute bottom-10 flex items-center gap-2 opacity-30">
//             <LayoutGrid size={14} className="text-white" />
//             <span className="text-[10px] font-mono text-white tracking-widest uppercase text-center">Authorized Control Interface</span>
//           </div>
//         </div>

//         {/* Right Side: Login Input Terminal */}
//         <div className="bg-white p-12 md:p-16 flex flex-col justify-center">
//           <div className="mb-10 text-center md:text-left">
//              <h2 className="text-3xl font-bold text-gray-900 leading-none">Welcome</h2>
//              <p className="text-gray-400 mt-3 text-sm font-medium">Please sign in to your administrative account</p>
//           </div>

//           <div className="space-y-6">
//             {/* Email Field */}
//             <div className="space-y-2">
//               <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Account Identifier</label>
//               <div className="relative">
//                 <input
//                   type="email"
//                   className="w-full bg-gray-50 border-2 border-transparent py-4.5 px-6 rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all text-gray-800 font-semibold"
//                   placeholder="admin@gov.in"
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <User className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
//               </div>
//             </div>

//             {/* Password Field */}
//             <div className="space-y-2">
//               <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Security Key</label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   className="w-full bg-gray-50 border-2 border-transparent py-4.5 px-6 rounded-2xl outline-none focus:border-green-600 focus:bg-white transition-all text-gray-800 font-semibold"
//                   placeholder="••••••••"
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600 transition-colors"
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               onClick={handleLogin}
//               disabled={loading}
//               className="w-full group relative flex items-center justify-center gap-3 bg-black py-4.5 rounded-2xl text-white font-bold overflow-hidden transition-all active:scale-[0.97] mt-4 shadow-xl shadow-black/10"
//             >
//               {/* Gradient Hover Effect */}
//               <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
//               <span className="relative z-10 flex items-center gap-2 tracking-wide uppercase text-sm">
//                 {loading ? (
//                   <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
//                 ) : (
//                   "Unlock Dashboard"
//                 )}
//               </span>
//             </button>

//             <div className="pt-6 flex justify-center">
//                <div className="flex items-center gap-2">
//                   <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
//                   <span className="text-[10px] font-bold text-gray-300 tracking-[0.3em] uppercase">Encrypted Connection</span>
//                </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import LoginPage from "@/modules/auth/login/LoginPage";

export default function Page() {
  return <LoginPage lang="en" />;
}