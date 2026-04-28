import {
  LayoutDashboard,
  Users,
  Ticket,
  UserCog,
  ClipboardList,
} from "lucide-react";

import { MenuKey } from "./types";

export const menuConfig: {
  key: MenuKey;
  path: string;
  permission?: string;
  icon: any;
}[] = [
  {
    key: "dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    key: "visits",
    path: "/dashboard/visits",
    permission: "visit_view",
    icon: ClipboardList,
  },
  {
    key: "tickets",
    path: "/dashboard/tickets",
    permission: "ticket_view",
    icon: Ticket,
  },
  {
    key: "users",
    path: "/dashboard/user",
    permission: "visitor_create",
    icon: Users,
  },
  {
    key: "nodal",
    path: "/dashboard/nodal",
    permission: "admin_panel",
    icon: UserCog,
  },
];