import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { safeParse } from "zod";
import bcrypt from "bcrypt";
import { User, type UserType } from "../schema/user.schema.js";

export const registerUser = async (
  req: Request<{}, {}, UserType>,
  res: Response,
) => {
  const reqBody = req.body;
  const result = safeParse(User, reqBody);
  if (!result.success) return res.status(400).json({ message: result.error });

  try {
    const found_user = await prisma.auth.findUnique({
      where: { email: reqBody.email, tenanId: reqBody.orgId },
    });

    if (found_user) return res.status(400).json({ message: "Duplicte User" });

    const hash = await bcrypt.hash(reqBody.password, 10);
    const UserDTO = {
      userName: reqBody.userName,
      email: reqBody.email,
      passwordHash: hash,
      tenantId: reqBody.orgId,
    };

    const save_user = await prisma.$transaction(async (tx) => {
      const new_user = await tx.auth.create({ data: UserDTO });
      const new_org_user = await tx.organization_users.create({
        data: {
          userId: new_user.id,
          orgId: reqBody.orgId,
          roleId: reqBody.roleId,
        },
      });

      return res.status(201).json({ created: "User Created" });
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: err instanceof Error ? err.message : String(err),
    });
  }
};
