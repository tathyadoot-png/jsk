import express from "express";
import { protectAdmin } from "../../middlewares/adminAuth.middleware";
import Admin from "../adminAuth/admin.model";
import {
  getAllUsers,
  getSingleUser,
  updateUserByAdmin,
  deleteUser,
} from "./admin.controller";

import {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
} from "./admin.controller";

import { allowPermissions } from "../../middlewares/permission.middleware";
import { PERMISSIONS } from "../../utils/permissions";

const router = express.Router();

/* =========================
   🔹 USER MANAGEMENT
========================= */

/* =========================
   🔹 USER MANAGEMENT
========================= */

// 👁️ VIEW USERS
router.get(
  "/users",
  protectAdmin,
  allowPermissions(PERMISSIONS.ADMIN_PANEL),
  getAllUsers
);

// 👁️ SINGLE USER
router.get(
  "/users/:id",
  protectAdmin,
  allowPermissions(PERMISSIONS.ADMIN_PANEL),
  getSingleUser
);

// ✏️ UPDATE USER
router.put(
  "/users/:id",
  protectAdmin,
  allowPermissions(PERMISSIONS.ADMIN_PANEL),
  updateUserByAdmin
);

// ❌ DELETE USER
router.delete(
  "/users/:id",
  protectAdmin,
  allowPermissions(PERMISSIONS.ADMIN_PANEL),
  deleteUser
);

/* =========================
   🔹 NODAL / ADMIN MANAGEMENT
========================= */

// ✅ CREATE
router.post(
  "/create",
  protectAdmin,
  allowPermissions(PERMISSIONS.ADMIN_PANEL),
  createAdmin
);

// ✅ READ ALL
router.get(
  "/list",
  protectAdmin,
  allowPermissions(PERMISSIONS.ADMIN_PANEL),
  getAllAdmins
);

// ✅ NODALS LIST
router.get(
  "/nodals",
  protectAdmin,
  allowPermissions(PERMISSIONS.ADMIN_PANEL),
  async (req, res) => {
    const nodals = await Admin.find({ role: "nodal" }).select("-password");
    res.json({ success: true, nodals });
  }
);

/* =========================
   ⚠️ DYNAMIC ROUTES LAST
========================= */

// ✅ NO REGEX
router.get(
  "/:id",
  protectAdmin,
  allowPermissions(PERMISSIONS.ADMIN_PANEL),
  getAdminById
);

router.put(
  "/:id",
  protectAdmin,
  allowPermissions(PERMISSIONS.ADMIN_PANEL),
  updateAdmin
);

router.delete(
  "/:id",
  protectAdmin,
  allowPermissions(PERMISSIONS.ADMIN_PANEL),
  deleteAdmin
);

export default router;