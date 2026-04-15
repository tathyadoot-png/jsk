import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: { type: String },

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["admin", "nodal"],
      default: "nodal",
    },

    permissions: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);