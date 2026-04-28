import { Lang } from "./types";

type SidebarContentType = {
  header: string;
  subHeader: string;
  menuTitle: string;
  logout: string;
  roleFallback: string;
};

const sidebarContent: Record<Lang, SidebarContentType> = {
  hi: {
    header: "कंट्रोल",
    subHeader: "पैनल v4.0",
    menuTitle: "मुख्य मेनू",
    logout: "लॉग आउट",
    roleFallback: "सिस्टम उपयोगकर्ता",
  },
  en: {
    header: "Control",
    subHeader: "Panel v4.0",
    menuTitle: "Main Menu",
    logout: "Sign Out",
    roleFallback: "System User",
  },
};

export default sidebarContent;