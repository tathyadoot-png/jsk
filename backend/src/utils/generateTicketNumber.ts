
import Ticket from "../modules/ticket/ticket.model";


export const generateTicketNumber = async (department: string) => {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const deptMap: any = {
    water: "WTR",
    road: "RD",
    electricity: "ELC",
    pension: "PEN",
  };

  const deptCode = deptMap[department] || "GEN";

  // 🔥 count tickets today
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const count = await Ticket.countDocuments({
    createdAt: { $gte: startOfDay },
  });

  const sequence = String(count + 1).padStart(4, "0");

  return `TKT-${year}-${month}-${day}-${deptCode}-${sequence}`;
};