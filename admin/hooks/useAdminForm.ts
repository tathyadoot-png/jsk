// hooks/admin/useAdminForm.ts
import { useState } from "react";

export const useAdminForm = (initialData?: any) => {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    password: "",
  });

  const [permissions, setPermissions] = useState(
    initialData?.permissions || []
  );

  return {
    form,
    setForm,
    permissions,
    setPermissions,
  };
};