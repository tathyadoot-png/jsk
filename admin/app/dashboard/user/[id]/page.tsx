"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getUserFullProfile } from "@/services/user.service";
import { useLang } from "@/context/LanguageContext";
import { userProfileContent } from "@/modules/pages/profile/userProfile.content";

import UserProfile from "@/modules/pages/profile/UserProfile";
import VisitList from "@/modules/pages/profile/VisitList";
import TicketList from "@/modules/pages/profile/TicketList";
import Timeline from "@/modules/pages/profile/Timeline";

export default function UserPage() {
  const { lang } = useLang();
  const t = userProfileContent[lang];

  const params = useParams();
  const id = params?.id as string;

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    getUserFullProfile(id).then((res) => {
      setData(res);
    });
  }, [id]);

  if (!data) return <p>{t.loading}</p>;

  return (
    <div className="space-y-6">
      <UserProfile user={data.user} title={t.sections.profile} />
      <VisitList visits={data.visits} title={t.sections.visits} />
      <TicketList tickets={data.tickets} title={t.sections.tickets} />
      <Timeline timeline={data.timeline} title={t.sections.timeline} />
      <TicketList
        tickets={data.raisedTickets}
        title={t.sections.raisedTickets}
      />
    </div>
  );
}