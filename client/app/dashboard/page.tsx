"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAPI } from "@/lib/api";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ GET CURRENT USER
  const getUser = async () => {
    try {
      const res = await fetchAPI("/user/me");

      if (res.success) {
        setUser(res.user);
      } else {
        router.push("/login");
      }
    } catch (err) {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // ✅ LOGOUT
  const handleLogout = async () => {
    try {
      await fetchAPI("/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (err) {
      alert("Logout failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold">
        लोड हो रहा है...
      </div>
    );
  }

  return (

       <ProtectedRoute>
    <div className="min-h-screen bg-slate-50">

      {/* 🔥 NAVBAR */}
      <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-black text-slate-800">
          🇮🇳 नागरिक पोर्टल
        </h1>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <p className="font-bold text-slate-700">
            👤 {user?.mobile}
          </p>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-bold"
          >
            लॉगआउट
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </nav>

      {/* 🔥 MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4">
          <p className="font-bold">👤 {user?.mobile}</p>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 rounded-xl font-bold"
          >
            लॉगआउट
          </button>
        </div>
      )}

      {/* 🔥 MAIN DASHBOARD */}
      <main className="p-6 lg:p-10">

        <h2 className="text-2xl font-black text-slate-800 mb-6">
          स्वागत है 👋
        </h2>

        {/* USER CARD */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
          <h3 className="text-lg font-bold mb-4">आपकी जानकारी</h3>

          <div className="space-y-2 text-slate-700">
            <p><b>मोबाइल:</b> {user?.mobile}</p>
            <p><b>नाम:</b> {user?.name || "N/A"}</p>
            <p><b>पता:</b> {user?.address || "N/A"}</p>
          </div>
        </div>

        {/* ACTION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h4 className="font-bold text-lg mb-2">📄 शिकायत दर्ज करें</h4>
            <p className="text-sm text-slate-500 mb-4">
              नई शिकायत दर्ज करें
            </p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-xl font-bold">
              शुरू करें
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h4 className="font-bold text-lg mb-2">📊 शिकायत स्थिति</h4>
            <p className="text-sm text-slate-500 mb-4">
              अपनी शिकायत ट्रैक करें
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold">
              देखें
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h4 className="font-bold text-lg mb-2">👤 प्रोफाइल</h4>
            <p className="text-sm text-slate-500 mb-4">
              अपनी जानकारी अपडेट करें
            </p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-xl font-bold">
              खोलें
            </button>
          </div>

        </div>

      </main>
    </div>

    </ProtectedRoute>
  );
}
