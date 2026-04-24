import mongoose, { Schema, Document } from "mongoose";
export interface ITicket extends Document {
  userId: mongoose.Types.ObjectId;
  visitId: mongoose.Types.ObjectId;

  ticketNumber: string;
  department: string;

  aadhar?: string;
  voterId?: string;

  subject: string;
  description: string;

  // 🔥 NEW CLEAN STRUCTURE
  createdBy: mongoose.Types.ObjectId;
  entryType: "DIRECT" | "REPRESENTATIVE";
  representativeId?: mongoose.Types.ObjectId | null;

  letterBody?: string;
  images?: string[];

  status: "pending" | "in_progress" | "resolved";

  remarks: {
    text: string;
    addedBy: mongoose.Types.ObjectId;
    createdAt: Date;
  }[];

  createdAt: Date;
  updatedAt: Date;
}
const TicketSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    visitId: {
      type: Schema.Types.ObjectId,
      ref: "Visit",
      required: true,
      index: true, // 🔥 ADD THIS
    },

    // 🔥 WHO CREATED (admin/nodal)
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    // 🔥 TYPE OF ENTRY
    entryType: {
      type: String,
      enum: ["DIRECT", "REPRESENTATIVE"],
      required: true,
    },

    // 🔥 ONLY IF REPRESENTATIVE
    representativeId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    ticketNumber: {
      type: String,
      required: true,
      unique: true,
    },

    department: {
      type: String,
      required: true,
    },

    aadhar: String,
    voterId: String,

    subject: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    letterBody: String,
    images: [String],

    status: {
      type: String,
      enum: ["pending", "in_progress", "resolved"],
      default: "pending",
    },

    remarks: [
      {
        text: String,
        addedBy: { type: Schema.Types.ObjectId, ref: "Admin" },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);


// 🔥 INDEXES
TicketSchema.index({ status: 1 });
TicketSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model<ITicket>("Ticket", TicketSchema);