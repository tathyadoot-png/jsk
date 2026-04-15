"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAPI } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetchAPI("/adminAuth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    console.log(res);
    console.log(email, password);

    if (res.success) {
       console.log("Redirecting...");
      router.push("/dashboard");
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[320px]">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Admin Login
        </h2>

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-4 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-black text-white w-full p-2 rounded hover:bg-gray-800"
        >
          Login
        </button>
      </div>
    </div>
  );
}
