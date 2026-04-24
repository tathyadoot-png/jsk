import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name?: string;
  mobile: string;
  whatsapp?: string;
  email?: string;
  gender?: "male" | "female" | "other";
  uniqueId: string;
  role: string;
  constituency?: string;
  address?: string;
  verifiedAt?: Date | null;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;  

}

const UserSchema: Schema = new Schema(
  {
    name: String,

    mobile: {
      type: String,
      required: true,
      unique: true,
    },

    whatsapp: String,
    email: String,
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    uniqueId: String,

    role: {
      type: String,
      default: "user",
    },
    constituency: String,
    address: String,

    isVerified: {
      type: Boolean,
      default: false,
    },
    verifiedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);