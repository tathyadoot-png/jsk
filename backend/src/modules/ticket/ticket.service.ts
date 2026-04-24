import Ticket from "./ticket.model";
import Visit from "../visit/visit.model";
import User from "../user/user.model";
import { generateTicketNumber } from "../../utils/generateTicketNumber";
import * as userService from "../user/user.service";

// ✅ CREATE TICKET
export const createTicketService = async (data: any, adminId: string) => {
  const {
    visitId,
    userId, // ✅ ONLY THIS
    department,
    subject,
    description,
    aadhar,
    voterId,
    letterBody,
    images,
  } = data;

  if (!visitId || !userId || !department || !subject || !description) {
    throw new Error("Required fields missing");
  }

  const visit = await Visit.findById(visitId).populate("userId");
  if (!visit) throw new Error("Visit not found");

  const visitUser: any = visit.userId;

  const targetUser = await User.findById(userId);
  if (!targetUser) throw new Error("User not found");

  // 🔥 DETERMINE TYPE
const isRepresentative =
  visitUser._id.toString() !== String(userId);

const entryType: "DIRECT" | "REPRESENTATIVE" =
  isRepresentative ? "REPRESENTATIVE" : "DIRECT";

// 🔐 OTP CHECK ONLY FOR REPRESENTATIVE
if (isRepresentative) {
  const now = Date.now();

  const verifiedAt = targetUser.verifiedAt
    ? new Date(targetUser.verifiedAt).getTime()
    : 0;

  const OTP_VALID_WINDOW = 5 * 60 * 1000;

  if (!targetUser.isVerified || now - verifiedAt > OTP_VALID_WINDOW) {
    throw new Error("User not verified via OTP or session expired");
  }

  // 🔁 STRICT MODE (recommended)
  targetUser.isVerified = false;
  targetUser.verifiedAt = null;
  await targetUser.save();
}

  const ticketNumber = await generateTicketNumber(department);

  const ticket = await Ticket.create({
    userId,
    visitId,
    createdBy: adminId,

    entryType,
    representativeId: isRepresentative ? visitUser._id : null,

    ticketNumber,
    department,
    subject,
    description,
    aadhar,
    voterId,
    letterBody,
    images,
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


export const getTicketsByRepresentativeService = async (userId: string) => {
  return await Ticket.find({ representativeId: userId })
    .populate("userId") // complaint user
    .sort({ createdAt: -1 });
};