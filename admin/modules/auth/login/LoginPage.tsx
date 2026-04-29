"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "./useLogin";
import loginContent, { Lang } from "./login.content";
import { Eye, EyeOff, Mail, Lock, ShieldCheck, Landmark, ArrowRight } from "lucide-react";

export default function LoginPage({ lang = "en" as Lang }) {
  const content = loginContent[lang];
  const router = useRouter();
  const { login, loading } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    const res = await login(email, password);
    if (res.success) router.push("/dashboard");
    else alert(res.message);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background Saffron & Green Accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#f4fbf4] -skew-x-12 translate-x-32 z-0" />
      <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-[#FF9933]/5 blur-[100px] rounded-full" />

      <div className="w-full max-w-5xl grid md:grid-cols-2 rounded-[40px] overflow-hidden shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] border border-gray-100 z-10">
        
        {/* LEFT PANEL: Vidhan Sabha Branding */}
        <div className="relative hidden md:flex flex-col justify-between p-12 bg-[#080808] text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#FF9933] rounded-2xl flex items-center justify-center shadow-lg shadow-[#FF9933]/20">
              <Landmark size={24} className="text-white" />
            </div>
            <div>
              <span className="block text-lg font-black   leading-none">
                {content.brandName}
              </span>
              <span className="text-[10px] font-bold text-[#FF9933] uppercase  ">
                {content.subBrand}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#138808]/20 border border-[#138808]/30">
              <div className="w-2 h-2 rounded-full bg-[#138808] animate-pulse" />
              <span className="text-[10px] font-bold text-[#138808] uppercase">
                {content.district}
              </span>
            </div>
            
            {/* Split Tagline logic for coloring */}
            <h1 className="text-4xl lg:text-5xl font-black leading-[1.1] whitespace-pre-line">
              {lang === "hi" ? (
                <>
                  सशक्त <span className="text-[#FF9933]">नागरिक</span>,<br />
                  समृद्ध <span className="text-[#138808]">मंडला</span>.
                </>
              ) : (
                <>
                  Sashakt <span className="text-[#FF9933]">Nagrik</span>,<br />
                  Samriddh <span className="text-[#138808]">Mandla</span>.
                </>
              )}
            </h1>
            
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
              Official portal for administrative services and citizen assistance.
            </p>
          </div>

          <div className="pt-8 border-t border-white/10 flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase  ">
            <span>© 2026 Digital Mandla</span>
            <div className="flex gap-2">
              <div className="w-8 h-1 bg-[#FF9933]" />
              <div className="w-8 h-1 bg-white" />
              <div className="w-8 h-1 bg-[#138808]" />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Login Form */}
        <div className="bg-white p-8 md:p-16 flex flex-col justify-center border-l border-gray-50">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-4xl font-black text-gray-900  er">
              {content.welcome}
            </h2>
            <p className="text-gray-400 mt-2 font-medium text-sm italic">{content.subtitle}</p>
          </div>

          <div className="space-y-5">
            {/* EMAIL */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase   ml-1">
                {content.emailLabel}
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF9933] transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  className="w-full bg-gray-50 border-2 border-transparent text-gray-900 text-sm rounded-2xl p-4 pl-12 outline-none focus:bg-white focus:border-[#FF9933]/30 transition-all font-semibold"
                  placeholder={lang === "hi" ? "ईमेल दर्ज करें" : "Enter registered email"}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase   ml-1">
                {content.passwordLabel}
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#138808] transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-gray-50 border-2 border-transparent text-gray-900 text-sm rounded-2xl p-4 pl-12 pr-12 outline-none focus:bg-white focus:border-[#138808]/30 transition-all font-semibold"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-[#080808] text-white font-black py-4 rounded-2xl transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3 mt-4 group overflow-hidden relative shadow-xl shadow-black/10"
            >
              <span className="relative z-10">
                {loading ? (lang === "hi" ? "प्रक्रिया जारी है..." : "PROCESSING...") : content.button}
              </span>
              {!loading && <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF9933] to-[#138808] opacity-0 group-hover:opacity-10 transition-opacity" />
            </button>
          </div>

          <div className="mt-12 pt-6 border-t border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-[#138808]" />
              <p className="text-[9px] font-black text-gray-300 uppercase  ">
                {content.secure}
              </p>
            </div>
            {/* <span className="text-[9px] font-bold text-gray-300">V4.2.1</span> */}
          </div>
        </div>
      </div>
    </div>
  );
}