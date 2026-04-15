import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // 👇 ADD THIS (MOST IMPORTANT)
    console.log("📂 Database Name:", conn.connection.name);

  } catch (error: any) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};
