// app/admin/nodal/create/page.tsx
"use client";

import NodalForm from "@/components/admin/nodal/NodalForm";
import { adminService } from "@/services/admin.service";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { nodalCreateContent } from "@/modules/pages/nodal/nodalCreate.content";

export default function CreatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lang } = useLang();
  const t = nodalCreateContent[lang];
  const id = searchParams.get("id"); // 🔥 get id from query
  const isEdit = !!id;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 Fetch data if edit mode
  useEffect(() => {
    if (id) {
      setLoading(true);

      adminService.getById(id).then((res) => {
        setData(res.admin);
        setLoading(false);
      });
    }
  }, [id]);

  // 🔥 Submit handler
  const handleSubmit = async (formData: any) => {
    if (isEdit) {
      await adminService.update(id!, formData);
    } else {
      await adminService.create(formData);
    }

    router.push("/dashboard/nodal");
  };

  if (isEdit && loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{isEdit ? t.header.edit : t.header.create}</h1>

      <NodalForm
        initialData={data}
        onSubmit={handleSubmit}
      />
    </div>
  );
}