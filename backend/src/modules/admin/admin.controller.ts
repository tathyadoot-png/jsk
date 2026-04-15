import { Request, Response } from "express";
import * as adminService from "./admin.service";

interface Params {
  id: string;
}

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await adminService.getAllUsers();
  res.json({ success: true, users });
};

export const getSingleUser = async (
  req: Request<Params>,
  res: Response
) => {
  const user = await adminService.getUserById(req.params.id);
  res.json({ success: true, user });
};

export const updateUserByAdmin = async (
  req: Request<Params>,
  res: Response
) => {
  const updatedUser = await adminService.updateUser(
    req.params.id,
    req.body
  );

  res.json({ success: true, user: updatedUser });
};

export const deleteUser = async (
  req: Request<Params>,
  res: Response
) => {
  await adminService.deleteUser(req.params.id);

  res.json({
    success: true,
    message: "User deleted",
  });
};



//Nodal CRUD API's

export const createAdmin = async (req: any, res: any) => {
  try {
    const admin = await adminService.createAdminService(req.body);

    res.json({ success: true, admin });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getAllAdmins = async (req: any, res: any) => {
  const admins = await adminService.getAllAdminsService();
  res.json({ success: true, admins });
};

import mongoose from "mongoose";

export const getAdminById = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    // 🔥 THIS FIXES YOUR BUG
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Admin ID",
      });
    }

    const admin = await adminService.getAdminByIdService(id);

    res.json({ success: true, admin });
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};    

export const updateAdmin = async (req: any, res: any) => {
  try {
    const admin = await adminService.updateAdminService(
      req.params.id,
      req.body
    );

    res.json({ success: true, admin });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteAdmin = async (req: any, res: any) => {
  try {
    await adminService.deleteAdminService(req.params.id);

    res.json({ success: true, message: "Deleted successfully" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};


