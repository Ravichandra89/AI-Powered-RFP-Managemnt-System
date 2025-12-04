import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

import proposalRouter from "./routes/proposal.routes";
import vendorRouter from "./routes/vendor.routes";
import rfpRouter from "./routes/rfp.routes";
import cors from "cors";
import { verifyEmailTransporter } from "./services/email.service";
import { startEmailListener } from "./services/emailListner.service";

// Load env variables
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Connect Database
connectDB()
  .then(() => console.log("📦 Database connected"))
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

verifyEmailTransporter();
startEmailListener();

// Routes
app.use("/api/v1/proposals", proposalRouter);
app.use("/api/v1/vendors", vendorRouter);
app.use("/api/v1/rfps", rfpRouter);

// Health check route
app.get("/", (_req, res) => {
  res.send("⚡ AI-Powered RFP Management System Backend Running");
});

app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error("🔥 Unexpected Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
