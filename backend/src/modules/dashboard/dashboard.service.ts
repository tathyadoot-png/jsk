import User from "../user/user.model";
import Visit from "../visit/visit.model";
import Ticket from "../ticket/ticket.model";

// 🔥 SUMMARY
export const getDashboardSummary = async () => {
  const totalUsers = await User.countDocuments();
  const totalVisits = await Visit.countDocuments();
  const activeVisits = await Visit.countDocuments({ status: "IN" });
  const totalTickets = await Ticket.countDocuments();

  return {
    totalUsers,
    totalVisits,
    activeVisits,
    totalTickets,
  };
};

// 📊 VISIT GRAPH (daily)
export const getVisitAnalytics = async () => {
  const data = await Visit.aggregate([
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt",
          },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return data;
};

// 🎫 TICKET STATUS CHART
export const getTicketStats = async () => {
  const data = await Ticket.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  return data;
};


export const getRepresentativeAnalytics = async () => {
  const data = await Ticket.aggregate([
    {
      $match: {
        entryType: "REPRESENTATIVE", // ✅ FIXED
        representativeId: { $ne: null }, // optional safety
      },
    },
    {
      $group: {
        _id: "$representativeId", // 🔥 correct field
        totalTickets: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $project: {
        name: "$user.name",
        mobile: "$user.mobile",
        totalTickets: 1,
      },
    },
    { $sort: { totalTickets: -1 } },
  ]);

  return data;
};



export const getDepartmentAnalytics = async () => {
  const data = await Ticket.aggregate([
    {
      $group: {
        _id: "$department",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
  ]);

  return data;
};


export const getConstituencyAnalytics = async () => {
  const data = await Ticket.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $group: {
        _id: "$user.constituency",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
  ]);

  return data;
};


export const getTicketAnalytics = async () => {
  const data = await Ticket.aggregate([
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt",
          },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return data;
};



export const getGroupVisitAnalytics = async () => {
  const totalGroupVisits = await Visit.countDocuments({
    isGroupVisit: true,
  });

  const normalVisits = await Visit.countDocuments({
    isGroupVisit: false,
  });

  return {
    totalGroupVisits,
    normalVisits,
  };
};


export const getActiveVisits = async () => {
  return await Visit.find({ status: "IN" })
    .populate("userId");
};