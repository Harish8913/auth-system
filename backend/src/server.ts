console.log('ENV CHECK: ', process.env.DB_USER)
import type { Express, Request, Response } from "express";
import express, { response } from "express";
import { config } from "./config/config.js";
import { Pool } from "pg";

const app: Express = express();

const pool = new Pool(config.db);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/index", async (req: Request, res: Response) => {
  try {
    const results = await pool.query("SELECT * FROM users");
    response.status(200).json(results.rows);
  } catch (err) {
    throw err;
  }
});

app.listen(config.server.port, () => {
  console.log(
    `Server Running on port: ${config.server.port} in ${config.server.nodeEnv} mode`,
  );
});
