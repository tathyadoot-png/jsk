import { Request, Response } from "express";
import * as userService from "./user.service";
import User from "./user.model";
import Visit from "../visit/visit.model";
import mongoose from "mongoose";
import Otp from "../auth/otp.model";

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    res.json({
      success: true,
      user,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const { name, whatsapp, email, gender, constituency, address } = req.body;

    const updatedUser = await userService.updateUserProfile(user._id, {
      name,
      whatsapp,
      email,
      gender,
      constituency,
      address,
    });

    res.json({
      success: true,
      message: "Profile updated",
      user: updatedUser,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


//api's for nodal
export const userEntryByNodal = async (req: any, res: any) => {
  try {
    const {
      mobile,
      otp,
      name,
      purpose,
      meetPerson,
      constituency,
      address,
      whatsapp,
      email,
      gender,
    } = req.body;

    console.log("📥 REQUEST:", req.body);

    if (!mobile) {
      return res.status(400).json({ message: "Mobile required" });
    }

    // =========================
    // 🟡 STEP 1: SEND OTP
    // =========================
    if (!otp) {
      const generatedOtp = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      console.log("📤 GENERATED OTP:", generatedOtp);

      await Otp.create({
        mobile,
        otp: generatedOtp,
        userData: {
          name,
          purpose,
          meetPerson,
          constituency,
          address,
          whatsapp,
          email,
          gender,
        },
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      });

      return res.json({
        success: true,
        step: "OTP_SENT",
        message: "OTP sent successfully",
        devOtp: generatedOtp,
      });
    }

    // =========================
    // 🟢 VERIFY OTP
    // =========================
    const validOtp = await Otp.findOne({
      mobile,
      otp,
      expiresAt: { $gt: new Date() },
    });

    if (!validOtp) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    // =========================
    // 🧑 USER CREATE/UPDATE
    // =========================
    const user = await userService.createOrUpdateUser({
      mobile,
      name,
      constituency,
      address,
      whatsapp,
      email,
      gender,
    });

    // =========================
    // 🚫 DUPLICATE CHECK
    // =========================
    const existing = await Visit.findOne({
      userId: user._id,
      status: "IN",
    });

    if (existing) {
      return res.status(400).json({
        message: "User already checked-in",
      });
    }

    // =========================
    // ✅ CREATE VISIT
    // =========================
    const visit = await Visit.create({
      userId: user._id,
      purpose,
      meetPerson,
      createdBy: req.admin._id,
      entryType: "NODAL",
      isGroupVisit: req.body.isGroupVisit || false,
      groupLeaderId: req.body.isGroupVisit ? user._id : null,
    }); // ✅ FIXED

    console.log("✅ VISIT CREATED:", visit._id);

    // 🧹 DELETE OTP
    await Otp.deleteMany({ mobile });

    return res.json({
      success: true,
      step: "COMPLETED",
      user,
      visit,
    });

  } catch (err: any) {
    console.log("❌ ERROR:", err);
    res.status(400).json({ message: err.message });
  }
};


// 🔥 FULL USER PROFILE (VISITS + TICKETS + TIMELINE)
export const getFullUserProfile = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const data = await userService.getFullUserProfileService(id);

    res.json({
      success: true,
      ...data,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

// 🔍 SEARCH USER BY MOBILE
export const searchUserByMobile = async (req: any, res: any) => {
  try {
    const { mobile } = req.query;

    if (!mobile) {
      return res.json({
        success: true,
        user: null,
      });
    }

    const user = await User.findOne({ mobile });

    res.json({
      success: true,
      user,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// 🔥 UPDATE USER BY ADMIN
export const updateUserByAdmin = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const {
      name,
      mobile,
      constituency,
      address,
      whatsapp,
      email,
      gender,
    } = req.body;

    // 🔍 check existing user
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 🔥 USE CENTRALIZED FUNCTION
    const updatedUser = await userService.createOrUpdateUser({
      mobile: mobile || existingUser.mobile,
      name,
      constituency,
      address,
      whatsapp,
      email,
      gender,
    });

    res.json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};