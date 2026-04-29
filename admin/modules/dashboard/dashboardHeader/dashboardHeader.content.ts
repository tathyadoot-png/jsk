import { Lang } from "../layout/types";

type DashboardHeaderContent = {
  badge: string;
  title: string;
  refresh: string;
  updating: string;
};

const dashboardHeaderContent: Record<Lang, DashboardHeaderContent> = {
  hi: {
    badge: "इंटेलिजेंस ओवरव्यू",
    title: "मुख्य डैशबोर्ड",
    refresh: "डेटा रीफ्रेश करें",
    updating: "अपडेट हो रहा है...",
  },
  en: {
    badge: "Intelligence Overview",
    title: "Main Dashboard",
    refresh: "Refresh Data",
    updating: "Updating...",
  },
};

export default dashboardHeaderContent;