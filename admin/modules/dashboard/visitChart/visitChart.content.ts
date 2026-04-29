import { Lang } from "../layout/types";

type VisitChartContent = {
  title: string;
  subtitle: string;
  range: string;
  footerLeft: string;
  footerRight: string;
};

const visitChartContent: Record<Lang, VisitChartContent> = {
  hi: {
    title: "दैनिक विज़िट रुझान",
    subtitle: "ट्रैफिक विश्लेषण",
    range: "पिछले 30 दिन",
    footerLeft: "रीयल-टाइम डेटा स्ट्रीम",
    footerRight: "नोड: VIS_ALPHA_01",
  },
  en: {
    title: "Daily Visits Trend",
    subtitle: "Traffic Analysis",
    range: "Last 30 Days",
    footerLeft: "Real-time Data Stream",
    footerRight: "Node: VIS_ALPHA_01",
  },
};

export default visitChartContent;