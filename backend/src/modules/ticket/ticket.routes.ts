import express from "express";
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicketStatus,
  getTicketsByRepresentative,
  getTicketsByUser,
  getTopRepresentatives
} from "./ticket.controller";
import upload from "../../middlewares/upload.middleware";
import { protectAdmin } from "../../middlewares/adminAuth.middleware";
import { allowPermissions } from "../../middlewares/permission.middleware";
import { PERMISSIONS } from "../../utils/permissions";

const router = express.Router();

// ✅ CREATE
router.post(
  "/create",
  protectAdmin,
  allowPermissions(PERMISSIONS.TICKET_CREATE),
  upload.array("images", 5),
  createTicket
);

// 📄 LIST
router.get(
  "/list",
  protectAdmin,
  allowPermissions(PERMISSIONS.TICKET_VIEW),
  getTickets
);

// 🔍 GET ONE
router.get(
  "/:id",
  protectAdmin,
  allowPermissions(PERMISSIONS.TICKET_VIEW),
  getTicketById
);

// 🔄 UPDATE
router.put(
  "/status/:id",
  protectAdmin,
  allowPermissions(PERMISSIONS.TICKET_UPDATE),
  updateTicketStatus
);

// 🔐 Representative tickets
router.get(
  "/representative/:userId",
  protectAdmin,
  allowPermissions(PERMISSIONS.TICKET_VIEW),
  getTicketsByRepresentative
);

// 🔐 User tickets
router.get(
  "/user/:userId",
  protectAdmin,
  allowPermissions(PERMISSIONS.TICKET_VIEW),
  getTicketsByUser
);

// 🔐 Top representatives (analytics type)
router.get(
  "/representatives/top",
  protectAdmin,
  allowPermissions(PERMISSIONS.TICKET_VIEW),
  getTopRepresentatives
);

export default router;