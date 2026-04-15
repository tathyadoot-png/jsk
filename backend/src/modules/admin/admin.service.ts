import User from "../user/user.model";
import Admin from "../adminAuth/admin.model";
import bcrypt from "bcryptjs";


export const getAllUsers = async () => {
  return await User.find().sort({ createdAt: -1 });
};

export const getUserById = async (id: string) => {
  return await User.findById(id);
};

export const updateUser = async (id: string, data: any) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

export const deleteUser = async (id: string) => {
  return await User.findByIdAndDelete(id);
};


//Nodal CRUD API's

export const createAdminService = async (data: any) => {
  const { email, password } = data;

  const existing = await Admin.findOne({ email });
  if (existing) throw new Error("Email already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await Admin.create({
    ...data,
    password: hashedPassword,
  });

  return admin;
};

export const getAllAdminsService = async () => {
  return Admin.find().select("-password");
};

export const getAdminByIdService = async (id: string) => {
  const admin = await Admin.findById(id).select("-password");
  if (!admin) throw new Error("Admin not found");
  return admin;
};

export const updateAdminService = async (id: string, data: any) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  const admin = await Admin.findByIdAndUpdate(id, data, {
    new: true,
  }).select("-password");

  if (!admin) throw new Error("Admin not found");

  return admin;
};

export const deleteAdminService = async (id: string) => {
  const admin = await Admin.findByIdAndDelete(id);

  if (!admin) throw new Error("Admin not found");

  return true;
};