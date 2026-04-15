import Admin from "./admin.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/jwt";

export const loginAdminService = async (email: string, password: string) => {
  const admin = await Admin.findOne({ email });
const allAdmins = await Admin.find();
console.log("ALL ADMINS:", allAdmins);

  if (!admin) {
    throw new Error("Admin not found");
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

 const token = generateToken(admin._id.toString(), "admin");
 
  return { admin, token };
};
