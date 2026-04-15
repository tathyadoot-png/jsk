"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAPI } from "@/lib/api";
import OTPForm from "@/components/common/OTPForm";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    whatsapp: "",
    email: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await fetchAPI("/auth/send-otp", {
        method: "POST",
        body: JSON.stringify(form),
      });

      if (res.success) {
        setStep(2);
      } else if (res.isExisting) {
        alert("आप पहले से पंजीकृत हैं, लॉगिन करें");
        router.push(`/login?mobile=${form.mobile}`); // ✅ redirect
      } else {
        alert(res.message);
      }
    } catch {
      alert("सर्वर त्रुटि");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* HEADER */}
      <div className="w-full bg-white shadow-md sticky top-0 z-50">
        <div className="w-full h-1.5 flex">
          <div className="flex-1 bg-[#FF9933]"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-[#128807]"></div>
        </div>
      </div>

      <main className="flex-1 flex items-center justify-center p-4 lg:p-12">
        <div className="w-full max-w-6xl bg-white rounded-[3rem] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.1)] flex flex-col lg:flex-row border border-slate-100">

          {/* LEFT PANEL (UNCHANGED UI) */}
          <div className="lg:w-5/12 bg-[#0F172A] p-12 lg:p-16 text-white">
            <h2 className="text-4xl font-black leading-[1.1] mb-6">
              आपकी <span className="text-orange-400">शिकायत</span><br />
              हमारा <span className="text-green-500">समाधान</span>
            </h2>
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:w-7/12 p-8 lg:p-16 bg-white">

            {/* HEADER */}
            <header className="mb-10">
              <h3 className="text-2xl font-black text-slate-800">
                {step === 1 ? "नागरिक पंजीकरण फॉर्म" : "OTP सत्यापन"}
              </h3>

              <p className="text-slate-500 text-sm mt-1">
                {step === 1
                  ? "त्वरित सेवा के लिए सटीक जानकारी दर्ज करें"
                  : `हमने ${form.mobile} पर OTP भेजा है`}
              </p>
            </header>

            {/* 🔥 STEP SWITCH */}
            {step === 1 ? (
              <>
                {/* FULL ORIGINAL FORM */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

                  {/* NAME */}
                  <div className="md:col-span-2">
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">
                      पूरा नाम *
                    </label>
                    <input
                      type="text"
                      className="w-full px-5 py-4 border rounded-2xl"
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>

                  {/* GENDER */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">
                      लिंग
                    </label>
                    <select
                      className="w-full px-5 py-4 border rounded-2xl"
                      onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    >
                      <option value="">चुनें</option>
                      <option value="male">पुरुष</option>
                      <option value="female">महिला</option>
                      <option value="other">अन्य</option>
                    </select>
                  </div>

                  {/* WHATSAPP */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">
                      WhatsApp नंबर (वैकल्पिक)
                    </label>
                    <input
                      maxLength={10}
                      className="w-full px-5 py-4 border rounded-2xl"
                      onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="md:col-span-2">
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">
                      Email (वैकल्पिक)
                    </label>
                    <input
                      className="w-full px-5 py-4 border rounded-2xl"
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>

                  {/* MOBILE */}
                  <div className="md:col-span-2">
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">
                      मोबाइल नंबर *
                    </label>
                    <input
                      maxLength={10}
                      className="w-full px-5 py-4 border rounded-2xl"
                      onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    />
                  </div>

                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full mt-10 bg-green-700 text-white py-4 rounded-2xl font-bold"
                >
                  {loading ? "प्रक्रिया जारी है..." : "OTP भेजें"}
                </button>
              </>
            ) : (
              <>
                {/* OTP STEP */}
                <OTPForm
                  mobile={form.mobile}
                  name={form.name}
                  whatsapp={form.whatsapp}
                  email={form.email}
                  gender={form.gender}
                  onSuccess={() => router.push("/dashboard")}
                />

                <button
                  onClick={() => setStep(1)}
                  className="mt-6 text-sm text-gray-500 underline"
                >
                  वापस जाएं
                </button>
              </>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}