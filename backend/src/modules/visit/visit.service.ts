import Visit from "./visit.model";
import mongoose from "mongoose";

// 🔥 CHECK-IN
export const checkInService = async (userId: string, data: any) => {
  const { purpose, meetPerson, isGroupVisit } = data;

  if (!purpose || !meetPerson) {
    throw new Error("Purpose and meet person required");
  }

  // 🔒 prevent multiple active visits
const existing = await Visit.findOne({
  userId: new mongoose.Types.ObjectId(userId),
  status: "IN",
});

  if (existing) {
    throw new Error("User already checked-in");
  }

  const visit = await Visit.create({
    userId,
    purpose,
    meetPerson,

    // 🔥 NEW
    isGroupVisit: isGroupVisit || false,
   groupLeaderId: isGroupVisit
    ? new mongoose.Types.ObjectId(userId)
    : undefined,
  });

  return visit;
};

// 🔥 CHECK-OUT
export const checkOutService = async (visitId: string) => {
  const visit = await Visit.findById(visitId);

  if (!visit) {
    throw new Error("Visit not found");
  }

  if (visit.status === "OUT") {
    throw new Error("Already checked-out");
  }

  visit.outTime = new Date();
  visit.status = "OUT";

  await visit.save();

  return visit;
};

// 🔥 MY VISITS
export const getMyVisitsService = async (userId: string) => {
  return await Visit.find({ userId })
    .sort({ createdAt: -1 });
};

// 🔥 TODAY VISITS
export const getTodayVisitsService = async () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  return await Visit.find({
    visitDate: { $gte: start },
  })
    .populate("userId")
    .populate("groupLeaderId");
};

export const getActiveVisitsService = async () => {
  return await Visit.find({ status: "IN" })
    .populate("userId")
    .populate("groupLeaderId");
};

export const getAllVisitsService = async () => {
  return await Visit.find()
    .populate("userId")
    .populate("groupLeaderId")
    .sort({ createdAt: -1 });
};