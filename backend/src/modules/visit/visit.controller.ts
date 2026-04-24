import { Request, Response } from "express";
import * as visitService from "./visit.service";
import Visit from "./visit.model";

// 🔥 CHECK-IN
export const checkIn = async (req: any, res: Response) => {
  
  try {
    const visit = await visitService.checkInService(
      req.user._id,
      req.body
    );

    res.json({
      success: true,
      visit,
      message: "Visitor checked-in successfully",
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// 🔥 CHECK-OUT
export const checkOut = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    const visit = await visitService.checkOutService(id);

    res.json({
      success: true,
      visit,
      message: "Visitor checked-out successfully",
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// 🔥 MY VISITS
export const getMyVisits = async (req: any, res: Response) => {
  try {
    const visits = await visitService.getMyVisitsService(req.user._id);

    res.json({
      success: true,
      visits,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// 🔥 TODAY VISITS (ADMIN)
export const getTodayVisits = async (req: Request, res: Response) => {
  try {
    const visits = await visitService.getTodayVisitsService();

    res.json({
      success: true,
      visits,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// 🔥 ACTIVE VISIT (LIVE)
export const getActiveVisits = async (req: Request, res: Response) => {
  try {
    const visits = await visitService.getActiveVisitsService();

    res.json({
      success: true,
      visits,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// 🔥 ALL VISITS (ADMIN)
export const getAllVisits = async (req: Request, res: Response) => {
  try {
    const visits = await visitService.getAllVisitsService();

    res.json({
      success: true,
      visits,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// visit.controller.ts

export const getVisitById = async (req: Request, res: Response) => {
  try {
    const visit = await Visit.findById(req.params.id).populate("userId");

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "Visit not found",
      });
    }

    return res.json({
      success: true,
      visit,
    });

  } catch (err) {
    console.error("❌ getVisitById error:", err);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};