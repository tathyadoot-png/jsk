import express from "express";
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicketStatus,
  getTicketsByRepresentative,
  getTicketsByUser
} from "./ticket.controller";
import upload from "../../middlewares/upload.middleware";
import { protectAdmin } from "../../middlewares/adminAuth.middleware";
import { allowPermissions } from "../../middlewares/permission.middleware";

const router = express.Router();

// ✅ CREATE
router.post(
  "/create",
  protectAdmin,
  allowPermissions("ticket_create"),
  upload.array("images", 5),
  createTicket
);

// 📄 LIST
router.get(
  "/list",
  protectAdmin,
  allowPermissions("ticket_view"),
  getTickets
);

// 🔍 GET ONE
router.get(
  "/:id",
  protectAdmin,
  allowPermissions("ticket_view"),
  getTicketById
);

// 🔄 UPDATE
router.put(
  "/status/:id",
  protectAdmin,
  allowPermissions("ticket_update"),
  updateTicketStatus
);

router.get("/representative/:userId", getTicketsByRepresentative);
router.get("/user/:userId", getTicketsByUser);

export default router;