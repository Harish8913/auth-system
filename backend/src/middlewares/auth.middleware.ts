import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authCheck = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token: string = req.headers.authorization?.split("Bearer ")[1] || "";
  const jwtSecret = process.env.JWT_SECRET || "";
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if(err) return res.status(401).json({err: err})
  });

  next();
};
