import type { Express, Request, Response } from "express";
import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/auth.route.js";
import healthRoutes from "./routes/health.route.js";
import serviceRoutes from "./routes/service.route.js";
import { authCheck } from "./middlewares/auth.middleware.js";

const app: Express = express();

app.use(cors());

app.use(cookieParser())

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", authRoutes);
app.use(authCheck);
app.use("/api", healthRoutes);
app.use("/api", serviceRoutes);

export default app;
