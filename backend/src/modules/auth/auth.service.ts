import User from "../user/user.model";
import { generateSequenceId } from "../../utils/generateUniqueId";
import { generateToken } from "../../utils/jwt";
import Otp from "./otp.model";


const OTP_EXPIRY = 5 * 60 * 1000;

export const sendOtpService = async (mobile: string) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await Otp.findOneAndUpdate(
    { mobile },
    {
      otp,
      expiresAt: new Date(Date.now() + OTP_EXPIRY),
    },
    { upsert: true }
  );

  console.log("🔥 OTP:", otp);

  return {
    success: true,
    message: "OTP sent",
    otp
  };
};


export const verifyOtpService = async (
  mobile: string,
  otp: string,
  userData?: any
) => {
  const record = await Otp.findOne({ mobile });

  if (!record) throw new Error("OTP expired or not found");
  if (record.otp !== otp) throw new Error("Invalid OTP");
  if (record.expiresAt.getTime() < Date.now()) {
    throw new Error("OTP expired");
  }

  // 🔥 CHECK EXISTING USER
  let user = await User.findOne({ mobile });

  // ✅ LOGIN CASE
if (user) {
  await Otp.deleteMany({ mobile });

  // 🔥 ADD THIS
  user.isVerified = true;
  user.verifiedAt = new Date();
  await user.save();

  const token = generateToken(user._id.toString(), "user");

  return { user, token, isNew: false };
}

  // 🔥 REGISTER CASE
  const uniqueId = await generateSequenceId("user");

user = await User.create({
  mobile,
  name: userData?.name || "",
  whatsapp: userData?.whatsapp || "",
  email: userData?.email || "",
  gender: userData?.gender || undefined, 
  uniqueId,
  role: "user",

  isVerified: true,
  verifiedAt: new Date(),   // 🔥 ADD THIS
});

  await Otp.deleteMany({ mobile });

  const token = generateToken(user._id.toString(), "user");

  return { user, token, isNew: true };
};

