import express from "express";
import * as dashboardController from "./dashboard.controller";
import { protectAdmin } from "../../middlewares/adminAuth.middleware";
import { allowPermissions } from "../../middlewares/permission.middleware"; 
import { PERMISSIONS } from "../../utils/permissions";

const router = express.Router();

// 🔥 SUMMARY
router.get(
  "/summary",
  protectAdmin,
  allowPermissions(PERMISSIONS.VISIT_VIEW),
  dashboardController.getSummary
);

// 📊 VISITS GRAPH
router.get(
  "/visits",
  protectAdmin,
  allowPermissions(PERMISSIONS.VISIT_VIEW),
  dashboardController.getVisitAnalytics
);

// 🎫 TICKET STATS
router.get(
  "/tickets",
  protectAdmin,
  allowPermissions(PERMISSIONS.TICKET_VIEW),
  dashboardController.getTicketStats
);

// 🚀 ADVANCED DASHBOARD
router.get(
  "/advanced",
  protectAdmin,
  allowPermissions(PERMISSIONS.ADVANCED_VIEW),
  dashboardController.getAdvancedDashboard
);

export default router;