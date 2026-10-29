import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtData } from "../types/auth.types.js";

export const authZ = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token: string =
        req.headers?.authorization?.split("Bearer ")[1] || "";
      const payload = jwt.verify(
        token,
        process.env.ACCESS_JWT_SECRET || "",
      ) as JwtData;
      console.log(payload);
      const hashAccess = payload.role.some((role) =>
        allowedRoles.includes(role),
      );

      if (!hashAccess) {
        return res
          .status(403)
          .json({ message: "Forbidden: Insufficient Permissions" });
      }

      next();
    } catch (err) {
      return res.status(500).json({ message: "Some Issue" });
    }
  };
};
