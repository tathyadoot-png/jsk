"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchAPI } from "@/lib/api";

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
     name: "",
  mobile: "",
  whatsapp: "",
  email: "",
  gender: "",
  address: "",
  constituency: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔥 GET USER DATA
  useEffect(() => {
    if (!id) return;

fetchAPI(`/user/profile/${id}`).then((res) => {
  const u = res.user;

  setForm({
    name: u.name || "",
    mobile: u.mobile || "",
    whatsapp: u.whatsapp || "",
    email: u.email || "",
    gender: u.gender || "",
    address: u.address || "",
    constituency: u.constituency || "",
  });
});
  }, [id]);

  // 🔥 UPDATE
  const handleUpdate = async () => {
    try {
      setLoading(true);

      const res = await fetchAPI(`/user/${id}`, {
        method: "PUT",
        body: JSON.stringify(form),
      });

      if (res.success) {
        alert("✅ Updated successfully");
        router.push(`/dashboard/user/${id}`);
      } else {
        alert(res.message);
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="max-w-lg bg-white p-6 rounded shadow space-y-4">
  <h2 className="text-xl font-bold">Edit User</h2>

  {/* NAME */}
  <input
    className="w-full border p-2 rounded"
    placeholder="Name"
    value={form.name}
    onChange={(e) =>
      setForm({ ...form, name: e.target.value })
    }
  />

  {/* MOBILE (LOCKED) */}
  <input
    className="w-full border p-2 rounded bg-gray-100"
    placeholder="Mobile"
    value={form.mobile}
    disabled
  />

  {/* WHATSAPP */}
  <input
    className="w-full border p-2 rounded"
    placeholder="WhatsApp Number"
    value={form.whatsapp}
    onChange={(e) =>
      setForm({ ...form, whatsapp: e.target.value })
    }
  />

  {/* EMAIL */}
  <input
    className="w-full border p-2 rounded"
    placeholder="Email"
    value={form.email}
    onChange={(e) =>
      setForm({ ...form, email: e.target.value })
    }
  />

  {/* GENDER */}
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

  {/* ADDRESS */}
  <input
    className="w-full border p-2 rounded"
    placeholder="Address"
    value={form.address}
    onChange={(e) =>
      setForm({ ...form, address: e.target.value })
    }
  />

  {/* CONSTITUENCY */}
  <input
    className="w-full border p-2 rounded"
    placeholder="Constituency"
    value={form.constituency}
    onChange={(e) =>
      setForm({ ...form, constituency: e.target.value })
    }
  />

  {/* SUBMIT */}
  <button
    onClick={handleUpdate}
    className="w-full bg-blue-600 text-white py-2 rounded"
  >
    {loading ? "Saving..." : "Update User"}
  </button>
</div>
  );
}