import { fetchAPI } from "@/lib/api";
import { TicketStatus } from "@/types/ticket";

// ✅ CREATE
export const createTicket = (data: any) =>
  fetchAPI("/ticket/create", {
    method: "POST",
    body: data, // ✅ NO stringify
  });

// 📄 LIST
export const getTickets = () =>
  fetchAPI("/ticket/list");

// 🔄 UPDATE STATUS
export const updateTicketStatus = (
  id: string,
  status: TicketStatus,
  remark?: string
) =>
  fetchAPI(`/ticket/status/${id}`, {
    method: "PUT",
    body: JSON.stringify({ status, remark }),
  });