import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerAdmin = async (req: Request, res: Response) => {
  const reqBody = req.body;

  try {
    const user = await prisma.users.findUnique({
      where: {
        email: reqBody.email,
      },
    });

    const hash = await bcrypt.hash(req.body.password, 10);
    const body = {
      ...reqBody,
      password: hash,
    };

    console.log(hash.length);

    if (!user) {
      const createdUser = await prisma.users.create({
        data: body,
      });
      return res.status(201).json({ created: createdUser });
    } else {
      return res.status(400).json({ message: "Duplicate email" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const reqBody = req.body;

  try {
    const user = await prisma.users.findUnique({
      where: {
        email: reqBody.email,
      },
    });

    const hash = await bcrypt.hash(reqBody.password, 10);
    const body = {
      ...reqBody,
      password: hash,
    };

    if (!user) {
      const createdUser = await prisma.users.create({
        data: body,
      });

      return res.status(201).json({ created: createdUser });
    } else {
      return res.status(400).json({ message: "Duplicate email" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const userExist = await prisma.users.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!userExist)
      return res.status(401).json({ message: "User Doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      body.password,
      userExist.password,
    );

    if (isPasswordCorrect) {
      
    }
    
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};
