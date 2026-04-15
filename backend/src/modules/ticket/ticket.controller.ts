import { Request, Response } from "express";
import * as TicketService from "./ticket.service";


interface Params {
    id: string;
}

interface UpdateTicketBody {
    status: "pending" | "in_progress" | "resolved";
    remark?: string;
}

// ✅ CREATE
export const createTicket = async (req: Request, res: Response) => {
  try {
    const files = req.files as any[];
    const imageUrls = files?.map((file) => file.path);

    const ticket = await TicketService.createTicketService(
      {
        ...req.body,
        images: imageUrls,
      },
      (req as any).admin._id
    );

    res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      data: ticket,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// 📄 LIST
export const getTickets = async (_req: Request, res: Response) => {
    try {
        const tickets = await TicketService.getAllTicketsService();

        res.json({
            success: true,
            data: tickets,
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// 🔍 GET ONE
export const getTicketById = async (
    req: Request<Params>,
    res: Response
) => {
    try {
        const ticket = await TicketService.getTicketByIdService(req.params.id);

        res.json({
            success: true,
            data: ticket,
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message,
        });
    }
};

// 🔄 UPDATE STATUS
export const updateTicketStatus = async (
    req: Request<Params, {}, UpdateTicketBody>,
    res: Response
) => {
    try {
        const { status, remark } = req.body;

        const ticket = await TicketService.updateTicketStatusService(
            req.params.id,
            status,
            (req as any).admin._id,
            remark
        );

        res.json({
            success: true,
            message: "Status updated",
            data: ticket,
        });
    } catch (error: any) {
        res.status(400).json({
            message: error.message,
        });
    }
};