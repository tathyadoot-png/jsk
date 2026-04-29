import { Lang } from "../layout/types";

type StatsItem = {
  label: string;
  trend: string;
  live?: string;
};

const statsContent: Record<Lang, Record<string, StatsItem>> = {
  hi: {
    users: {
      label: "कुल उपयोगकर्ता",
      trend: "+12%",
    },
    visits: {
      label: "कुल भेंट",
      trend: "+5.4%",
    },
    active: {
      label: "सक्रिय सत्र",
      trend: "लाइव",
      live: "ऑनलाइन",
    },
    tickets: {
      label: "उठाए गए मुद्दे",
      trend: "दैनिक",
    },
  },
  en: {
    users: {
      label: "Total Users",
      trend: "+12%",
    },
    visits: {
      label: "Total Visits",
      trend: "+5.4%",
    },
    active: {
      label: "Active Sessions",
      trend: "Live",
      live: "Online",
    },
    tickets: {
      label: "Issues Raised",
      trend: "Daily",
    },
  },
};

export default statsContent;