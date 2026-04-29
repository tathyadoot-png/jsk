import { Lang } from "../layout/types";

type RecentActivityContent = {
  title: string;
  subtitle: string;
  empty: string;
  visit: string;
  ticket: string;
  footer: string;
};

const recentActivityContent: Record<Lang, RecentActivityContent> = {
  hi: {
    title: "हाल की गतिविधि",
    subtitle: "लाइव फीड",
    empty: "कोई लॉग नहीं",
    visit: "भेंट दर्ज",
    ticket: "टिकट उत्पन्न",
    footer: "सिस्टम लॉग सत्यापित",
  },
  en: {
    title: "Recent Activity",
    subtitle: "Live Feed",
    empty: "Log Empty",
    visit: "Visit Logged",
    ticket: "Ticket Generated",
    footer: "System Logs Verified",
  },
};

export default recentActivityContent;