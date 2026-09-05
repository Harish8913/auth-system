import type { Request, Response } from "express";

export const service2 = async (req: Request, res: Response) => {
  return res.status(200).json({ message: "SERVICE 2 ACCESSED" });
};

