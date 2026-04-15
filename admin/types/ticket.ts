export type TicketStatus = "pending" | "in_progress" | "resolved";

export interface Ticket {
  _id: string;
  ticketNumber: string;
  department: string;
  subject: string;
  description: string;
  status: TicketStatus;

  userId: {
    name: string;
    mobile: string;
  };

  visitId: {
    purpose: string;
  };

  createdAt: string;
}