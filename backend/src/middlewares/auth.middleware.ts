import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authCheck = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Provide JWT Token" });
    }

    const token = authHeader.split(" ")[1] || "";

    if(!token || token.trim() == ""){
      return res.status(401).json({message: "JWT Token is missing"});
    }

    const ACCESS_JWT_SECRET = process.env.ACCESS_JWT_SECRET;

    if (!ACCESS_JWT_SECRET)
      return res.status(500).json({ message: "Server Config Error" });

    const decoded = jwt.verify(token, ACCESS_JWT_SECRET);
    (req as any).user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid JWT Token" });
  }
};
