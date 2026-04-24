import express from "express";
import { generatePDF } from "./pdf.controller";

const router = express.Router();

router.post("/generate", generatePDF);

export default router;