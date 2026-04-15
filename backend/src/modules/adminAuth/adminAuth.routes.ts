import express from "express";
import {
  loginAdmin,
  getMeAdmin,
  logoutAdmin,
} from "./admin.controller";

import { protectAdmin } from "../../middlewares/adminAuth.middleware";
import { allowPermissions  } from "../../middlewares/adminRole.middleware";

const router = express.Router();

// 🔐 Auth
router.post("/login", loginAdmin);
router.get("/me", protectAdmin, getMeAdmin);
router.post("/logout", protectAdmin, logoutAdmin);

// 🔥 Example protected routes

// Only ADMIN (full access)
router.get(
  "/all-users",
  protectAdmin,
  allowPermissions("admin_panel"),
  (req, res) => {
    res.send("Only admin with permission");
  }
);

// ADMIN + NODAL
router.get(
  "/dashboard",
  protectAdmin,
  allowPermissions("visit_view"),
  (req, res) => {
    res.send("Visit dashboard");
  }
);

export default router;
