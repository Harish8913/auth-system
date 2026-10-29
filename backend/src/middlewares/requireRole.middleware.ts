import type { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import type { JwtData } from "../types/auth.types.js";

const requirePermission = async (req: Request, res:Response, next:NextFunction) => {
    try{
        const token:string = req.headers.authorization?.split('Bearer ')[1] || '';
        const payload = jwt.verify(token, process.env.ACCESS_JWT_SECRET || "") as JwtData;
        if(payload.permission.includes('employee:delete')){
            next();
        }
    }catch(err){
        
    }
}