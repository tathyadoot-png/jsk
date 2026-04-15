"use client";

import { useEffect, useState } from "react";
import { visitorService } from "@/services/visitor.service";

export default function VisitorEntryForm() {
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
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  // 🔍 SEARCH USER
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
        setForm((prev) => ({
          ...prev,
          name: "",
        }));
        setStatus("new");
      }
    } catch {
      setStatus("new");
    } finally {
      setSearching(false);
    }
  };

  // 🚀 AUTO SEARCH ON INPUT
  const handleMobileChange = async (value: string) => {
    setMobile(value);

    if (value.length === 10) {
      handleSearch();
    } else {
      setStatus("idle");
      setForm((prev) => ({ ...prev, name: "" }));
    }
  };

  // 🚀 SUBMIT ENTRY
  const handleSubmit = async () => {
    try {
      if (!mobile) {
        alert("Mobile required");
        return;
      }

      setLoading(true);

      // 🟡 STEP 1 → SEND OTP
      if (step === "FORM") {
        const res = await visitorService.createEntry({ mobile });

        if (res.step === "OTP_SENT") {
          setStep("OTP");
          setTimer(30); // ⏳ start timer
          alert("OTP: " + res.devOtp); // dev only
        } else {
          alert(res.message);
        }
      }

      // 🟢 STEP 2 → VERIFY + CREATE
      else {
        if (!otp) {
          alert("Enter OTP");
          return;
        }

        const res = await visitorService.createEntry({
          mobile,
          otp,
          ...form,
          isGroupVisit,
        });

        if (res.success) {
          alert("✅ Visit created");

          // RESET
          setMobile("");
          setOtp("");
          setStep("FORM");
          setTimer(0);

          setForm({
            name: "",
            purpose: "",
            meetPerson: "",
            whatsapp: "",
            email: "",
            gender: "",
            address: "",
            constituency: "",
          });

          setStatus("idle");
        } else {
          alert(res.message);
        }
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md p-6 bg-white shadow-lg rounded-xl space-y-4">
      <h2 className="text-2xl font-bold text-center">
        Visitor Entry
      </h2>

      {/* MOBILE */}
      <div className="space-y-1">
        <div className="flex gap-2">
          <input
            className="w-full border p-2 rounded"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) =>
              handleMobileChange(e.target.value)
            }
          />

          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 rounded"
          >
            Search
          </button>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isGroupVisit}
            onChange={(e) => setIsGroupVisit(e.target.checked)}
          />
          <label>Group Visit (Neta / Representative)</label>
        </div>

        {/* STATUS */}
        {searching && (
          <p className="text-blue-500 text-sm">Searching...</p>
        )}

        {status === "found" && (
          <p className="text-green-600 text-sm">
            ✅ Existing user found
          </p>
        )}

        {status === "new" && (
          <p className="text-yellow-600 text-sm">
            ⚠️ New user (will be created)
          </p>
        )}
      </div>

      {/* NAME */}
      <input
        className={`w-full border p-2 rounded ${status === "found"
          ? "border-green-500 bg-green-50"
          : ""
          }`}
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      {/* WhatsApp */}
      <input
        className="w-full border p-2 rounded"
        placeholder="WhatsApp"
        value={form.whatsapp}
        onChange={(e) =>
          setForm({ ...form, whatsapp: e.target.value })
        }
      />

      {/* Email */}
      <input
        className="w-full border p-2 rounded"
        placeholder="Email (optional)"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      {/* Gender */}
      <select
        className="w-full border p-2 rounded"
        value={form.gender}
        onChange={(e) =>
          setForm({ ...form, gender: e.target.value })
        }
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      {/* Address */}
      <input
        className="w-full border p-2 rounded"
        placeholder="Address"
        value={form.address}
        onChange={(e) =>
          setForm({ ...form, address: e.target.value })
        }
      />

      {/* Constituency */}
      <input
        className="w-full border p-2 rounded"
        placeholder="Constituency"
        value={form.constituency}
        onChange={(e) =>
          setForm({ ...form, constituency: e.target.value })
        }
      />

      {/* PURPOSE */}
      <input
        className="w-full border p-2 rounded"
        placeholder="Purpose"
        value={form.purpose}
        onChange={(e) =>
          setForm({ ...form, purpose: e.target.value })
        }
      />

      {/* MEET PERSON */}
      <select
        className="w-full border p-2 rounded"
        value={form.meetPerson}
        onChange={(e) =>
          setForm({
            ...form,
            meetPerson: e.target.value,
          })
        }
      >
        <option value="">Select Person</option>
        <option value="MLA">MLA</option>
        <option value="PA">PA</option>
        <option value="Other">Other</option>
      </select>

      {/* 🔐 OTP SECTION */}
      {step === "OTP" && (
        <div className="space-y-2">

          <input
            className="w-full border p-2 rounded"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          {/* ⏳ TIMER */}
          {timer > 0 ? (
            <p className="text-sm text-gray-500">
              Resend OTP in {timer}s
            </p>
          ) : (
            <button
              onClick={async () => {
                const res = await visitorService.createEntry({ mobile });

                if (res.step === "OTP_SENT") {
                  setTimer(30);
                  alert("OTP resent: " + res.devOtp);
                }
              }}
              className="text-blue-600 text-sm underline"
            >
              Resend OTP
            </button>
          )}

        </div>
      )}

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold"
      >
        {loading
          ? "Saving..."
          : step === "FORM"
            ? "Send OTP"
            : "Verify & Create Entry"}
      </button>
    </div>
  );
}