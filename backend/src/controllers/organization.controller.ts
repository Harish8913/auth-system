import { prisma } from "../lib/prisma.js";
import type { Request, Response } from "express";
import type { RegisterOrgBody } from "../types/organization.types.js";
import { Prisma } from "../generated/prisma/client.js";
import * as z from "zod";

export const registerOrg = async (
  req: Request<{}, {}, RegisterOrgBody>,
  res: Response,
) => {
  const { body } = req;
  const { adminDetails } = body;

  try {
    await prisma.$transaction(async (ax) => {
      await ax.organizations.create({ data: body });
      await ax.guest.create({ data: adminDetails });
    });

    return res
      .status(200)
      .json({ message: "Organization Registered Successfully" });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(400).json({
          message: `Creation Failed: A RECORD already exists`,
        });
      } else {
        return res.status(400).json({
          message: `Prisma error occured ${err.code} --- ${err.message}`,
        });
      }
    } else {
      return res
        .status(500)
        .json({ message: `UNEXPECTED ERROR OCCURED: ${err}` });
    }
  }
};
