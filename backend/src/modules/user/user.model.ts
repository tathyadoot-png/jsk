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

  isVerified: boolean;
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
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);