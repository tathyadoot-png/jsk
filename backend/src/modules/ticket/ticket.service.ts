import Ticket from "./ticket.model";
import Visit from "../visit/visit.model";
import User from "../user/user.model";
import { generateTicketNumber } from "../../utils/generateTicketNumber";
import * as userService from "../user/user.service";

// ✅ CREATE TICKET
export const createTicketService = async (data: any, adminId: string) => {
  const {
    visitId,
    department,
    subject,
    description,
    aadhar,
    voterId,
    letterBody,
    images,
    name,
    mobile,
    address,
    constituency,
    whatsapp,
    email,
    gender,
  } = data;

  const visit = await Visit.findById(visitId).populate("userId");
  if (!visit) throw new Error("Visit not found");

  const visitUser: any = visit.userId;

  let targetUser;

  if (mobile) {
    targetUser = await userService.createOrUpdateUser({
      mobile,
      name,
      address,
      constituency,
      whatsapp,
      email,
      gender,
    });
  } else {
    targetUser = visitUser;
  }

  if (!targetUser) throw new Error("User not found");

  const isRepresentative =
    mobile && visitUser.mobile !== mobile;

  const ticketNumber = await generateTicketNumber(department);

  const ticket = await Ticket.create({
    userId: targetUser._id,
    visitId,

    createdByUserId: visitUser._id,
    isRepresentative,

    ticketNumber,
    department,
    subject,
    description,
    aadhar,
    voterId,
    letterBody,
    images,

    createdBy: adminId,
  });

  return ticket;
};


// 📄 GET ALL
export const getAllTicketsService = async () => {
    return await Ticket.find()
        .populate("userId")
        .populate("visitId")
        .sort({ createdAt: -1 });
};

// 🔍 GET ONE
export const getTicketByIdService = async (id: string) => {
    const ticket = await Ticket.findById(id)
        .populate("userId")
        .populate("visitId");

    if (!ticket) throw new Error("Ticket not found");

    return ticket;
};

// 🔄 UPDATE STATUS + REMARK
export const updateTicketStatusService = async (
    id: string,
    status: string,
    adminId: string,
    remark?: string
) => {
    const ticket = await Ticket.findById(id);
    if (!ticket) throw new Error("Ticket not found");

    ticket.status = status as any;

    if (remark) {
        ticket.remarks.push({
            text: remark,
            addedBy: adminId,
        } as any);
    }

    await ticket.save();

    return ticket;
};