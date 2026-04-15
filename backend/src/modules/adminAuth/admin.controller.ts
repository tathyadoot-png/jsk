import { Request, Response } from "express";
import * as adminService from "./admin.service";

export const loginAdmin = async (req: Request, res: Response) => {
  try {
     console.log("BODY:", req.body);
    const { email, password } = req.body;

    const { admin, token } = await adminService.loginAdminService(
      email,
      password
    );

  res.cookie("admin_token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
});

    res.json({
      success: true,
      admin,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


export const getMeAdmin = async (req: any, res: Response) => {
  try {
    const admin = req.admin;

    res.json({
      success: true,
      user: admin,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


export const logoutAdmin = async (req: Request, res: Response) => {
  try {
    res.clearCookie("admin_token");

    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
