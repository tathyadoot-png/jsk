"use client";

import { useEffect } from "react";
import { PERMISSIONS } from "@/utils/permissions";
import { useAdminForm } from "@/hooks/useAdminForm";

export default function NodalForm({ initialData, onSubmit }: any) {
  const { form, setForm, permissions, setPermissions } =
    useAdminForm(initialData);

  // 🔥 IMPORTANT: sync data for edit mode
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        email: initialData.email || "",
        password: "",
      });

      setPermissions(initialData.permissions || []);
    }
  }, [initialData]);

  const togglePermission = (perm: string) => {
    setPermissions((prev: string[]) =>
      prev.includes(perm)
        ? prev.filter((p) => p !== perm)
        : [...prev, perm]
    );
  };

  const handleSubmit = () => {
    const payload: any = {
      ...form,
      permissions,
      role: "nodal",
    };

    // 🔥 password only if entered
    if (!payload.password) {
      delete payload.password;
    }

    onSubmit(payload);
  };

  return (
    <div className="p-6 border rounded-lg space-y-4 max-w-md">
      <h2 className="text-xl font-semibold">
        {initialData ? "Edit Nodal" : "Create Nodal"}
      </h2>

      <input
        placeholder="Name"
        className="border p-2 w-full"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Email"
        className="border p-2 w-full"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder={
          initialData
            ? "New Password (optional)"
            : "Password"
        }
        className="border p-2 w-full"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <div>
        <h3 className="font-medium mb-2">Permissions</h3>

        <div className="grid grid-cols-2 gap-2">
          {PERMISSIONS.map((perm) => (
            <label
              key={perm}
              className="flex items-center gap-2"
            >
              <input
                type="checkbox"
                checked={permissions.includes(perm)}
                onChange={() => togglePermission(perm)}
              />
              <span className="text-sm">{perm}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {initialData ? "Update" : "Create"}
      </button>
    </div>
  );
}