import { Lang } from "../layout/types";

type RepresentativeContent = {
  title: string;
  subtitle: string;
  columns: {
    name: string;
    contact: string;
    tickets: string;
    action: string;
  };
  footer: string;
};

const representativeContent: Record<Lang, RepresentativeContent> = {
  hi: {
    title: "शीर्ष प्रतिनिधि",
    subtitle: "प्रदर्शन मीट्रिक्स",
    columns: {
      name: "प्रतिनिधि",
      contact: "संपर्क विवरण",
      tickets: "टिकट संख्या",
      action: "कार्यवाही",
    },
    footer: "कुल समाधान किए गए मुद्दों के आधार पर रैंकिंग",
  },
  en: {
    title: "Top Representatives",
    subtitle: "Performance Metrics",
    columns: {
      name: "Representative",
      contact: "Contact Details",
      tickets: "Ticket Volume",
      action: "Action",
    },
    footer: "Ranked by total issues resolved",
  },
};

export default representativeContent;