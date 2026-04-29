import { Lang } from "../layout/types";

type ConstituencyContent = {
  title: string;
  subtitle: string;
  footer: string;
};

const constituencyContent: Record<Lang, ConstituencyContent> = {
  hi: {
    title: "क्षेत्र अनुसार वितरण",
    subtitle: "निर्वाचन क्षेत्र विश्लेषण",
    footer: "भौगोलिक डेटा सक्रिय",
  },
  en: {
    title: "Area-wise Distribution",
    subtitle: "Constituency Analytics",
    footer: "Geographic Data Active",
  },
};

export default constituencyContent;