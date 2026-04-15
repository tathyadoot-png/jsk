"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TicketForm from "@/components/ticket/TicketForm";
import { fetchAPI } from "@/lib/api";

export default function TicketCreatePage() {
  const params = useSearchParams();
  const visitId = params.get("visitId");

  const [visit, setVisit] = useState<any>(null);

  useEffect(() => {
    if (!visitId) return;

    const loadVisit = async () => {
      const res = await fetchAPI(`/visit/${visitId}`); 
      setVisit(res.visit);
    };

    loadVisit();
  }, [visitId]);

  if (!visitId) return <p>Invalid visit</p>;
  if (!visit) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <TicketForm
        visitId={visitId}
        visitUserId={visit.userId._id} // ✅ now safe
      />
    </div>
  );
}