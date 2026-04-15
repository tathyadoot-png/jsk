import express from "express";
import * as dashboardController from "./dashboard.controller";
import { protectAdmin } from "../../middlewares/adminAuth.middleware";

const router = express.Router();

// 🔥 SUMMARY
router.get("/summary", protectAdmin, dashboardController.getSummary);

// 📊 VISITS GRAPH
router.get("/visits", protectAdmin, dashboardController.getVisitAnalytics);

// 🎫 TICKET STATS
router.get("/tickets", protectAdmin, dashboardController.getTicketStats);
router.get(
  "/advanced",
  protectAdmin,
  dashboardController.getAdvancedDashboard
);

export default router;