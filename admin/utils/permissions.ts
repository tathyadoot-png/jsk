export const PERMISSIONS = {
  ADMIN_PANEL: "admin_panel",
  VISITOR_CREATE: "visitor_create",

  VISIT_CREATE: "visit_create",
  VISIT_VIEW: "visit_view",
  VISIT_UPDATE: "visit_update",

  TICKET_CREATE: "ticket_create",
  TICKET_VIEW: "ticket_view",
  TICKET_UPDATE: "ticket_update",

  ADVANCED_VIEW: "advanced_view",
} as const;

export const permissionsMap = {
  [PERMISSIONS.ADMIN_PANEL]: {
    en: "Admin Panel Access",
    hi: "एडमिन पैनल एक्सेस",
  },
  [PERMISSIONS.VISITOR_CREATE]: {
    en: "Create Visitor",
    hi: "आगंतुक बनाएं",
  },
  [PERMISSIONS.VISIT_CREATE]: {
    en: "Create Visit",
    hi: "मुलाकात बनाएं",
  },
  [PERMISSIONS.VISIT_VIEW]: {
    en: "View Visits",
    hi: "मुलाकात देखें",
  },
  [PERMISSIONS.VISIT_UPDATE]: {
    en: "Update Visit",
    hi: "मुलाकात अपडेट करें",
  },
  [PERMISSIONS.TICKET_CREATE]: {
    en: "Create Ticket",
    hi: "टिकट बनाएं",
  },
  [PERMISSIONS.TICKET_VIEW]: {
    en: "View Tickets",
    hi: "टिकट देखें",
  },
  [PERMISSIONS.TICKET_UPDATE]: {
    en: "Update Ticket",
    hi: "टिकट अपडेट करें",
  },
  [PERMISSIONS.ADVANCED_VIEW]: {
    en: "Advanced Dashboard",
    hi: "उन्नत डैशबोर्ड",
  },
};