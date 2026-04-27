import { Request, Response } from "express";
import * as authService from "./auth.service";
import { verifyToken } from "../../utils/jwt";
import User from "../user/user.model";

export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { mobile, name } = req.body;

    if (!mobile || mobile.length !== 10) {
      return res.status(400).json({
        success: false,
        message: "मान्य मोबाइल नंबर दर्ज करें",
      });
    }

    const existingUser = await User.findOne({ mobile });

    // 🔥 अगर user already exist है (registration case)
    if (name && existingUser) {
      return res.json({
        success: false,
        isExisting: true,
        message: "आप पहले से पंजीकृत हैं, लॉगिन करें",
      });
    }


    await authService.sendOtpService(mobile);
    const result = await authService.sendOtpService(mobile);

    return res.json({
      success: true,
      isLogin: !!existingUser,
      isNewUser: !existingUser,
      message: "OTP भेजा गया",
      otp: result.otp
    });

  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};


export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { mobile, otp, name, whatsapp, email, gender } = req.body;

    const { user, token, isNew } = await authService.verifyOtpService(
      mobile,
      otp,
      { name, whatsapp, email, gender }
    );

    res.cookie("user_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.json({
      success: true,
      user,
      isNew,
      message: isNew ? "पंजीकरण सफल" : "लॉगिन सफल",
    });

  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};


export const logout = (req: Request, res: Response) => {
  res.clearCookie("user_token");
  res.json({
    success: true,
  });
};

export const getMe = async (req: any, res: Response) => {
  res.json({
    success: true,
    user: req.user,
  });
};
