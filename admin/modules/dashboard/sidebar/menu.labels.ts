import { Lang, MenuKey } from "./types";

const menuLabels: Record<Lang, Record<MenuKey, string>> = {
  hi: {
    dashboard: "डैशबोर्ड",
    visits: "भेंट",
    tickets: "टिकट",
    users: "उपयोगकर्ता प्रबंधन",
    nodal: "नोडल प्रबंधन",
  },
  en: {
    dashboard: "Dashboard",
    visits: "Visits",
    tickets: "Tickets",
    users: "User Management",
    nodal: "Nodal Management",
  },
};

export default menuLabels;