import { Lang } from "../layout/types";

type TicketChartContent = {
  title: string;
  subtitle: string;
  total: string;
  footer: string;
};

const ticketChartContent: Record<Lang, TicketChartContent> = {
  hi: {
    title: "टिकट स्थिति",
    subtitle: "जीवनचक्र अवलोकन",
    total: "कुल",
    footer: "प्राथमिकता कतार: उच्च",
  },
  en: {
    title: "Ticket Status",
    subtitle: "Lifecycle Overview",
    total: "Total",
    footer: "Priority Queue: High",
  },
};

export default ticketChartContent;