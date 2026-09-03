import type { Express, Request, Response } from "express";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import healthRoutes from "./routes/health.route.js";

const app: Express = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", authRoutes);
app.use("/api", healthRoutes);

export default app;
