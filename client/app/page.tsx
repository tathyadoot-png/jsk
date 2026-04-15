"use client";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Welcome 🚀</h1>

      <div className="flex gap-4">
        <button onClick={() => router.push("/login")} className="bg-black text-white px-4 py-2 rounded">
          Login
        </button>

        <button onClick={() => router.push("/register")} className="border px-4 py-2 rounded">
          Register
        </button>
      </div>
    </div>
  );
}
