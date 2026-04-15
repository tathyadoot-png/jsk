import mongoose, { Schema, Document } from "mongoose";

export interface IOtp extends Document {
  mobile: string;
  otp: string;
  userData: any;
  expiresAt: Date;
}

const OtpSchema = new Schema(
  {
    mobile: { type: String, required: true },
    otp: { type: String, required: true },
    userData: { type: Object, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

// 🔥 auto delete after expiry (TTL index)
OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model<IOtp>("Otp", OtpSchema);
