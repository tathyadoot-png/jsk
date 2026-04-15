"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, User as UserIcon, LogOut, ChevronRight } from "lucide-react";
import { fetchAPI } from "@/lib/api";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  mobile: string;
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  // 🔥 SCROLL EFFECT
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 FETCH USER (AUTO AUTH)
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetchAPI("/user/me");

        if (res.success) {
          setUser(res.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };

    getUser();
  }, []);

  // 🔥 LOGOUT
  const handleLogout = async () => {
    try {
      await fetchAPI("/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/login");
    } catch {
      alert("Logout failed");
    }
  };

  const navLinks = [
    { name: "होम", href: "/" },
    { name: "योजनाएं", href: "/schemes" },
    { name: "सफलता की कहानियां", href: "/success-stories" },
    { name: "संपर्क करें", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-md h-16"
          : "bg-white h-20"
      }`}
    >
      {/* Top Bar */}
      <div className="w-full h-[3px] flex">
        <div className="flex-1 bg-orange-500"></div>
        <div className="flex-1 bg-slate-100"></div>
        <div className="flex-1 bg-green-600"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
            <span className="text-white font-black text-sm">JSK</span>
          </div>
          <span className="font-black">जनता सुविधा केंद्र</span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              {link.name}
            </Link>
          ))}

          {/* 🔥 USER SECTION */}
          {user ? (
            <div className="flex items-center gap-4">
              <span className="font-bold">{user.name || user.mobile}</span>

              <button onClick={handleLogout}>
                <LogOut />
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link href="/login">लॉगिन</Link>
              <Link href="/register">पंजीकरण</Link>
            </div>
          )}
        </div>

        {/* Mobile Button */}
        <button
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
}