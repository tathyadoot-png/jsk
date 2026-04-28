import { Lang } from "./types";

type HeaderContentType = {
  title: string;
  subtitle: string;
  langSwitch: string;
};

const headerContent: Record<Lang, HeaderContentType> = {
  hi: {
    title: "डैशबोर्ड",
    subtitle: "प्रशासनिक नियंत्रण पैनल",
    langSwitch: "भाषा",
  },
  en: {
    title: "Dashboard",
    subtitle: "Administrative Control Panel",
    langSwitch: "Language",
  },
};

export default headerContent;