import { Lang } from "../layout/types";

type FiltersContent = {
  today: string;
  week: string;
  month: string;
};

const filtersContent: Record<Lang, FiltersContent> = {
  hi: {
    today: "आज",
    week: "इस सप्ताह",
    month: "मासिक",
  },
  en: {
    today: "Today",
    week: "This Week",
    month: "Monthly",
  },
};

export default filtersContent;