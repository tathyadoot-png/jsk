"use client";

import { PERMISSIONS } from "@/utils/permissions";

export default function PermissionSelector({ selected, setSelected }: any) {
  const toggle = (perm: string) => {
    if (selected.includes(perm)) {
      setSelected(selected.filter((p: string) => p !== perm));
    } else {
      setSelected([...selected, perm]);
    }
  };

  return (
    <div>
      <h3 className="font-bold mb-2">Permissions</h3>

      {PERMISSIONS.map((perm) => (
        <label key={perm} className="block">
          <input
            type="checkbox"
            checked={selected.includes(perm)}
            onChange={() => toggle(perm)}
          />
          <span className="ml-2">{perm}</span>
        </label>
      ))}
    </div>
  );
}