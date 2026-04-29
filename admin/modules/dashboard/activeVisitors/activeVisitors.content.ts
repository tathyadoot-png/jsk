import { Lang } from "../layout/types";

type ActiveVisitorsContent = {
  title: string;
  empty: string;
  verified: string;
  footer: string;
  live: string;
  unknown: string;
};

const activeVisitorsContent: Record<Lang, ActiveVisitorsContent> = {
  hi: {
    title: "सक्रिय आगंतुक",
    empty: "कोई सक्रिय सत्र नहीं",
    verified: "सत्यापित",
    footer: "रियल-टाइम सत्र निगरानी",
    live: "लाइव",
    unknown: "अज्ञात उपयोगकर्ता",
  },
  en: {
    title: "Active Visitors",
    empty: "No Active Sessions",
    verified: "Verified",
    footer: "Real-time Session Monitoring",
    live: "Live",
    unknown: "Unknown User",
  },
};

export default activeVisitorsContent;