"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TicketForm from "@/components/ticket/TicketForm";
import { fetchAPI } from "@/lib/api";
import LetterPreview from "@/components/ticket/LetterPreview";

export default function TicketCreatePage() {
  const params = useSearchParams();
  const visitId = params.get("visitId");

  const [visit, setVisit] = useState<any>(null);

  const [formData, setFormData] = useState({
    department: "",
    subject: "",
    description: "",
    letterBody: "",
    name: "",
    address: "",
    mobile: "",
  });

  // 🔥 Load Visit
  useEffect(() => {
    if (!visitId) return;

    const loadVisit = async () => {
      const res = await fetchAPI(`/visit/${visitId}`);
      setVisit(res.visit);

      // ✅ Pre-fill user data
      setFormData((prev) => ({
        ...prev,
        name: res.visit?.userId?.name || "",
        address: res.visit?.userId?.address || "",
      }));
    };

    loadVisit();
  }, [visitId]);

  if (!visitId) return <p>Invalid visit</p>;
  if (!visit) return <p>Loading...</p>;

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* LEFT → FORM */}
      <div className="bg-white p-4 rounded shadow">
        <TicketForm
          visitId={visitId}
          visitUserId={visit.userId._id}
          formData={formData}
          setFormData={setFormData}
        />
      </div>

      {/* RIGHT → LETTER PREVIEW */}
      <div className="bg-gray-50 p-4 rounded shadow">
        <LetterPreview
          formData={formData}
          setFormData={setFormData}
        />
      </div>

    </div>
  );
}