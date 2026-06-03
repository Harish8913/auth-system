import type { Express, Request, Response } from "express";
import express from "express";
import { config } from "./config/config.js";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";

const app: Express = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", authRoutes);

app.listen(config.server.port, () => {
  console.log(
    `Server Running on port: ${config.server.port} in ${config.server.nodeEnv} mode`,
  );
});
