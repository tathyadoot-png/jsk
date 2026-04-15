import User from "./user.model";
import Visit from "../visit/visit.model";
import Ticket from "../ticket/ticket.model";


export const updateUserProfile = async (
  userId: string,
  data: {
    name?: string;
    whatsapp?: string;
    email?: string;
    gender?: "male" | "female" | "other";
       constituency?: string; // ✅
    address?: string;  
  }
) => {
  return await User.findByIdAndUpdate(userId, data, { new: true });
};


export const getFullUserProfileService = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");

  const visits = await Visit.find({ userId })
    .sort({ createdAt: -1 });

  const tickets = await Ticket.find({ userId })
    .sort({ createdAt: -1 });

  // 🔥 timeline combine
  const timeline = [
    ...visits.map((v) => ({
      type: "visit",
 date: v.createdAt || v.visitDate,
      data: v,
    })),
    ...tickets.map((t) => ({
      type: "ticket",
      date: t.createdAt,
      data: t,
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  return {
    user,
    visits,
    tickets,
    timeline,
  };
};


export const createOrUpdateUser = async (data: {
  mobile: string;
  name?: string;
  constituency?: string;
  address?: string;
  whatsapp?: string;
  email?: string;
  gender?: "male" | "female" | "other";
}) => {
  const {
    mobile,
    name,
    constituency,
    address,
    whatsapp,
    email,
    gender,
  } = data;

  if (!mobile) {
    throw new Error("Mobile is required");
  }

  let user = await User.findOne({ mobile });

  if (!user) {
    // 🆕 CREATE
    user = await User.create({
      mobile,
      name,
      constituency,
      address,
      whatsapp,
      email,
      gender,
      uniqueId: "USR-" + Date.now(),
    });
  } else {
    // 🔄 UPDATE ONLY IF VALUE PROVIDED
    user.name = name ?? user.name;
    user.constituency = constituency ?? user.constituency;
    user.address = address ?? user.address;
    user.whatsapp = whatsapp ?? user.whatsapp;
    user.email = email ?? user.email;
    user.gender = gender ?? user.gender;

    await user.save();
  }

  return user;
};

