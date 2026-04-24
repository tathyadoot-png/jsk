"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getUserFullProfile } from "@/services/user.service";
import UserProfile from "@/components/user/UserProfile";
import VisitList from "@/components/user/VisitList";
import TicketList from "@/components/user/TicketList";
import Timeline from "@/components/user/Timeline";

export default function UserPage() {
  const params = useParams();
  const id = params?.id as string;

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    getUserFullProfile(id).then((res) => {
      console.log("API RESPONSE:", res);
      setData(res); // ✅ FIX
    });
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <UserProfile user={data.user} />
      <VisitList visits={data.visits} />
      <TicketList tickets={data.tickets} />
      <Timeline timeline={data.timeline} />
      <TicketList
        tickets={data.raisedTickets}
        title="Raised Tickets"
      />
    </div>
  );
}