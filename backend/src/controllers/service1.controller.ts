import type { Request, Response } from "express";

export const service1 = async (req: Request, res: Response) => {
  return res.status(200).json({ message: "SERVICE 1 ACCESSED" });
};

