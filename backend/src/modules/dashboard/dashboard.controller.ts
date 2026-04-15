import { Request, Response } from "express";
import * as dashboardService from "./dashboard.service";

// 🔥 SUMMARY
export const getSummary = async (req: Request, res: Response) => {
  try {
    const data = await dashboardService.getDashboardSummary();

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// 📊 VISIT GRAPH
export const getVisitAnalytics = async (req: Request, res: Response) => {
  try {
    const data = await dashboardService.getVisitAnalytics();

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// 🎫 TICKET CHART
export const getTicketStats = async (req: Request, res: Response) => {
  try {
    const data = await dashboardService.getTicketStats();

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message,
    });
  }
};


export const getAdvancedDashboard = async (_req: any, res: any) => {
  try {
    const [
      summary,
      visitGraph,
      ticketStats,
      representative,
      department,
      constituency,
      ticketTrend,
      groupVisits,
        activeVisits,
    ] = await Promise.all([
      dashboardService.getDashboardSummary(),
      dashboardService.getVisitAnalytics(),
      dashboardService.getTicketStats(),
      dashboardService.getRepresentativeAnalytics(),
      dashboardService.getDepartmentAnalytics(),
      dashboardService.getConstituencyAnalytics(),
      dashboardService.getTicketAnalytics(),
      dashboardService.getGroupVisitAnalytics(),
      dashboardService.getActiveVisits(),
    ]);

    res.json({
      success: true,
      data: {
        summary,
        visitGraph,
        ticketStats,
        representative,
        department,
        constituency,
        ticketTrend,
        groupVisits,
         activeVisits, 
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};