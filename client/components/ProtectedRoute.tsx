"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/lib/auth";

export default function ProtectedRoute({ children }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      const user = await checkAuth();

      if (!user) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    };

    check();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold">
        लोड हो रहा है...
      </div>
    );
  }

  return children;
}
