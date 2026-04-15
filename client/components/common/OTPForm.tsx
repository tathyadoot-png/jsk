"use client";

import { useState, useEffect } from "react";
import { fetchAPI } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function OTPForm({
  mobile,
  name,
  whatsapp,
  email,
  gender,
  onSuccess,
}: {
  mobile: string;
  name?: string;
  whatsapp?: string;
  email?: string;
  gender?: string;
  onSuccess?: () => void;
}) {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // ⏱️ TIMER
  useEffect(() => {
    let interval: any;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  // 🔥 VERIFY OTP
  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      alert("सही OTP डालें");
      return;
    }

    setLoading(true);

    try {
      const res = await fetchAPI("/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({
  mobile,
  otp,
  name,
  whatsapp,
  email,
 gender: gender || undefined, 
})
      });

      if (res.success) {
        if (onSuccess) {
          onSuccess();
        } else {
          router.push("/dashboard");
        }
      } else {
        alert(res.message);
      }
    } catch {
      alert("OTP गलत है");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 RESEND
  const handleResend = async () => {
    setTimer(30);

    await fetchAPI("/auth/send-otp", {
      method: "POST",
      body: JSON.stringify({ mobile }),
    });
  };

  return (
    <div className="space-y-8">
      {/* OTP INPUT */}
      <div>
        <label className="text-[11px] font-bold text-slate-400 uppercase block text-center mb-3">
          सुरक्षा कोड दर्ज करें
        </label>

        <div className="flex justify-between gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              className="w-full h-16 bg-slate-50 border rounded-2xl text-center font-black text-2xl"
              onChange={(e) => {
                const value = e.target.value;
                const newOtp = otp.split("");
                newOtp[i - 1] = value;
                setOtp(newOtp.join(""));
              }}
            />
          ))}
        </div>

        {/* RESEND */}
        <div className="flex justify-end mt-4">
          <button
            disabled={timer > 0}
            onClick={handleResend}
            className="text-sm font-bold text-blue-600 disabled:text-gray-400"
          >
            {timer > 0 ? `पुनः भेजें (${timer}s)` : "पुनः भेजें"}
          </button>
        </div>
      </div>

      {/* VERIFY BUTTON */}
      <button
        onClick={handleVerifyOtp}
        disabled={loading}
        className="w-full bg-green-700 text-white font-black py-4 rounded-2xl"
      >
        {loading ? "प्रक्रिया जारी है..." : "पोर्टल में प्रवेश करें"}
      </button>
    </div>
  );
}