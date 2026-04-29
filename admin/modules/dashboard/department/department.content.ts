import { Lang } from "../layout/types";

type DepartmentContent = {
  title: string;
  subtitle: string;
  live: string;
  footer: string;
};

const departmentContent: Record<Lang, DepartmentContent> = {
  hi: {
    title: "विभागीय विश्लेषण",
    subtitle: "मुद्दों का वितरण",
    live: "लाइव मेट्रिक्स",
    footer: "डेटा नोड: विभाग_प्राथमिक",
  },
  en: {
    title: "Department Analytics",
    subtitle: "Issue Distribution",
    live: "Live Metrics",
    footer: "Data Node: Dept_Primary",
  },
};

export default departmentContent;