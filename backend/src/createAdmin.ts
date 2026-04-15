import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "./modules/adminAuth/admin.model";

const createAdmin = async () => {
  try {
await mongoose.connect(
  "mongodb+srv://inedconetworks_db_user:cdsIW5Fs4JAzRlOc@cluster0.bolo6dx.mongodb.net/jsk_db"
);


    const hashedPassword = await bcrypt.hash("admin123", 10); // 👈 yaha change

    await Admin.create({
      name: "Super Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin created with password: admin123");
    process.exit();
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

createAdmin();
