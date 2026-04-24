import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes";
import adminAuth from "./modules/adminAuth/adminAuth.routes";
import adminRoutes from "./modules/admin/admin.routes";
import visitRoutes from "./modules/visit/visit.routes";
import ticketRoutes from "./modules/ticket/ticket.routes";
import dashboardRoutes from "./modules/dashboard/dashboard.routes";
import pdfRoutes from "./modules/pdf/pdf.routes";

const app = express();

// Allowed origins
const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.ADMIN_URL,
].filter(Boolean) as string[];

// ✅ CORS FIRST
app.use(
  cors({
    origin: function (origin, callback) {
      // console.log("🌍 Incoming origin:", origin);
      // console.log("✅ Allowed:", allowedOrigins);

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked:", origin);
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);


// ✅ middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/adminAuth", adminAuth);
app.use("/api/admin", adminRoutes);
app.use("/api/visit", visitRoutes);
app.use("/api/ticket", ticketRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/pdf", pdfRoutes);


app.get("/health", (req, res) => {
  res.send("Backend Running");
});

export default app;
