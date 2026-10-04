import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export const authZ = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.headers?.authorization?.split("Bearer ")[1] || "";
    const payload = jwt.verify(token, process.env.ACCESS_JWT_SECRET || "");
    if (typeof payload === "string") {
      return next();
    }
    
    console.log(payload?.role)
};
};
