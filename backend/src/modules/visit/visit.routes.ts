import express from "express";
import * as visitController from "./visit.controller";
import { verifyToken } from "../../utils/jwt";
import { protectAdmin } from "../../middlewares/adminAuth.middleware";

const router = express.Router();

// 🔐 USER ROUTES
router.post("/check-in", verifyToken, visitController.checkIn);

router.get("/my", verifyToken, visitController.getMyVisits);

// 🔐 ADMIN ROUTES
router.get("/today", protectAdmin, visitController.getTodayVisits);
router.get("/active", protectAdmin, visitController.getActiveVisits);
router.get("/all", protectAdmin, visitController.getAllVisits);
router.put("/checkout/:id", protectAdmin, visitController.checkOut);
router.get("/:id", protectAdmin, visitController.getVisitById);

export default router;