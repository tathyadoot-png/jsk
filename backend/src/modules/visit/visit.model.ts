import mongoose, { Schema, Document } from "mongoose";

export interface IVisit extends Document {
  userId: mongoose.Types.ObjectId;

  purpose: string;
  meetPerson: string; // MLA / PA / Others

  inTime: Date;
  outTime?: Date;
  status: "IN" | "OUT";
  visitDate: Date;
  createdBy?: mongoose.Types.ObjectId;
  entryType: "USER" | "NODAL";
  isGroupVisit: boolean;
groupLeaderId?: mongoose.Types.ObjectId | null;
  

  createdAt: Date;
  updatedAt: Date;
}

const VisitSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    purpose: {
      type: String,
      required: true,
    },

    meetPerson: {
      type: String,
      required: true,
    },

    inTime: {
      type: Date,
      default: Date.now,
    },

    outTime: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["IN", "OUT"],
      default: "IN",
    },

    visitDate: {
      type: Date,
      default: Date.now,
    },
   isGroupVisit: {
  type: Boolean,
  default: false,
},

// 🔥 ADD THIS
groupLeaderId: {
  type: Schema.Types.ObjectId,
  ref: "User",
  default: null, // 🔥 ADD THIS
},
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
    entryType: {
      type: String,
      enum: ["USER", "NODAL"],
      default: "NODAL",
    },
  },
  { timestamps: true }
);

VisitSchema.index({ userId: 1, status: 1 });

export default mongoose.model<IVisit>("Visit", VisitSchema);