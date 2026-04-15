"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAPI } from "@/lib/api";
import { checkAuth } from "@/lib/auth";
import { useSearchParams } from "next/navigation";
import OTPForm from "@/components/common/OTPForm"; 

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const mobileFromURL = params.get("mobile");

  const [mobile, setMobile] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mobileFromURL) {
      setMobile(mobileFromURL);
    }
  }, [mobileFromURL]);

  const handleSendOtp = async () => {
    if (mobile.length !== 10) {
      alert("कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें");
      return;
    }

    setLoading(true);

    try {
      const res = await fetchAPI("/auth/send-otp", {
        method: "POST",
        body: JSON.stringify({ mobile }),
      });

      if (res.success) {
        setStep(2);
      } else {
        alert(res.message);
      }
    } catch {
      alert("OTP भेजने में समस्या आई");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 CHECK AUTH
  useEffect(() => {
    const check = async () => {
      const user = await checkAuth();
      if (user) {
        router.push("/dashboard");
      }
    };

    check();
  }, []);

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
        <div className="w-full max-w-5xl bg-white rounded-[3rem] shadow-xl flex flex-col lg:flex-row border">

          {/* LEFT PANEL SAME */}
          <div className="lg:w-5/12 bg-[#0F172A] p-12 text-white">
            <h2 className="text-4xl font-black mb-6">
              सुरक्षित <br />
              <span className="text-orange-400">लॉगिन</span>
            </h2>
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:w-7/12 p-10">

            <h3 className="text-2xl font-black mb-6">
              {step === 1 ? "लॉगिन करें" : "OTP सत्यापित करें"}
            </h3>

            {step === 1 ? (
              <>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="मोबाइल नंबर"
                  className="w-full p-4 border rounded-xl mb-6"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />

                <button
                  onClick={handleSendOtp}
                  className="w-full bg-black text-white py-4 rounded-xl font-bold"
                >
                  {loading ? "लोड हो रहा है..." : "OTP प्राप्त करें"}
                </button>
              </>
            ) : (
              <>
                {/* 🔥 REUSABLE OTP FORM */}
                <OTPForm
                  mobile={mobile}
                  onSuccess={() => router.push("/dashboard")}
                />

                <button
                  onClick={() => setStep(1)}
                  className="mt-6 text-sm text-gray-500 underline"
                >
                  नंबर बदलें
                </button>
              </>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}