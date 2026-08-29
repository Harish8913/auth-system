import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const registerController = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const user = await prisma.auth.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      const createdUser = await prisma.auth.create(body);
      return res.status(201).json({ created: createdUser });
    } else {
      return res.status(400).json({ message: "Duplicate email" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};
