import express from "express";
import * as visitController from "./visit.controller";
import { verifyToken } from "../../utils/jwt";
import { protectAdmin } from "../../middlewares/adminAuth.middleware";
import { allowPermissions } from "../../middlewares/permission.middleware";
import { PERMISSIONS } from "../../utils/permissions";

const router = express.Router();

// 🔐 USER ROUTES
router.post("/check-in", verifyToken, visitController.checkIn);
router.get("/my", verifyToken, visitController.getMyVisits);

// 🔐 ADMIN / NODAL ROUTES

// 📅 TODAY VISITS
router.get(
  "/today",
  protectAdmin,
  allowPermissions(PERMISSIONS.VISIT_VIEW),
  visitController.getTodayVisits
);

// 🟢 ACTIVE VISITS
router.get(
  "/active",
  protectAdmin,
  allowPermissions(PERMISSIONS.VISIT_VIEW),
  visitController.getActiveVisits
);

// 📄 ALL VISITS
router.get(
  "/all",
  protectAdmin,
  allowPermissions(PERMISSIONS.VISIT_VIEW),
  visitController.getAllVisits
);

// 🔄 CHECKOUT
router.put(
  "/checkout/:id",
  protectAdmin,
  allowPermissions(PERMISSIONS.VISIT_CREATE),
  visitController.checkOut
);

// 🔍 SINGLE VISIT
router.get(
  "/:id",
  protectAdmin,
  allowPermissions(PERMISSIONS.VISIT_VIEW),
  visitController.getVisitById
);

export default router;