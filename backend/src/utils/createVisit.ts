import Visit from "../modules/visit/visit.model";

export const createVisit = async (userId: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const exists = await Visit.findOne({
    userId,
    visitDate: { $gte: today },
  });

  if (!exists) {
    await Visit.create({
      userId,
      visitDate: new Date(),
    });
  }
};