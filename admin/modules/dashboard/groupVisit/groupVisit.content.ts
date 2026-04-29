import { Lang } from "../layout/types";

type GroupVisitContent = {
  groupTitle: string;
  normalTitle: string;
  bulk: string;
  single: string;
  entries: string;
};

const groupVisitContent: Record<Lang, GroupVisitContent> = {
  hi: {
    groupTitle: "समूह भेंट",
    normalTitle: "सामान्य भेंट",
    bulk: "समूह",
    single: "एकल",
    entries: "प्रविष्टियाँ",
  },
  en: {
    groupTitle: "Group Visits",
    normalTitle: "Normal Visits",
    bulk: "Bulk",
    single: "Single",
    entries: "entries",
  },
};

export default groupVisitContent;