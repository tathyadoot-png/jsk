"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PermissionGuard({
  permission,
  children,
}: {
  permission: string | string[];
  children: React.ReactNode;
}) {
  const { admin, hasPermission } = useAuth();
  const router = useRouter();

  if (admin === null) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const hasAccess = Array.isArray(permission)
    ? permission.some((p) => hasPermission(p))
    : hasPermission(permission);

  useEffect(() => {
    if (!hasAccess) {
      router.replace("/dashboard");
    }
  }, [hasAccess]);

  if (!hasAccess) return null;

  return <>{children}</>;
}