import express from "express";
import cors from "cors";
import aiRoutes from "./ai/ai.routes.js";
import saathiRoutes from "./ai/saathi.routes.js";

const app = express();

const frontendOrigin = process.env.FRONTEND_ORIGIN || "*";
app.use(cors({
  origin: frontendOrigin === "*" ? true : frontendOrigin.split(",").map((x) => x.trim()),
}));
app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Swasthya Setu API is running",
    service: "Swasthya Setu",
  });
});

app.get("/api/health", (_req, res) => {
  res.json({ success: true, status: "healthy", service: "Swasthya Setu" });
});

app.use("/api/ai", aiRoutes);
app.use("/api/saathi", saathiRoutes);

app.use((err, _req, res, _next) => {
  console.error("Request error:", err.message);

  const status = Number(err.status || err.statusCode || 500);
  res.status(status >= 400 && status <= 599 ? status : 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

export default app;
