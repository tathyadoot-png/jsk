import Counter from "../modules/counter/counter.model";

export const generateSequenceId = async (name: string) => {
  const counter = await Counter.findOneAndUpdate(
    { name },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  return `JSK-${String(counter.seq).padStart(3, "0")}`;
};
