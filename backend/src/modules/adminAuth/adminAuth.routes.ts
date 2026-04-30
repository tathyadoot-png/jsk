import express from "express";
import {
  loginAdmin,
  getMeAdmin,
  logoutAdmin,
} from "./admin.controller";
import { PERMISSIONS } from "../../utils/permissions";
import { protectAdmin } from "../../middlewares/adminAuth.middleware";
import { allowPermissions  } from "../../middlewares/adminRole.middleware";

const router = express.Router();

// 🔐 Auth
router.post("/login", loginAdmin);
router.get("/me", protectAdmin, getMeAdmin);
router.post("/logout", protectAdmin, logoutAdmin);


// Only ADMIN (full access)
router.get(
  "/all-users",
  protectAdmin,
  allowPermissions(PERMISSIONS.ADMIN_PANEL),
  (req, res) => {
    res.send("Only admin with permission");
  }
);

// ADMIN + NODAL
router.get(
  "/dashboard",
  protectAdmin,
  allowPermissions(PERMISSIONS.VISIT_VIEW),
  (req, res) => {
    res.send("Visit dashboard");
  }
);

export default router;
