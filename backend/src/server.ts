import type { Express, Request, Response } from "express";
import express from "express";
import config from "./config/config.js";

const app: Express = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.listen(config.port, () => {
  console.log(
    `Server Running on port: ${config.port} in ${config.nodeEnv} mode`,
  );
});
