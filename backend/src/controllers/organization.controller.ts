import { prisma } from "../lib/prisma.js";
import type { Request, Response } from "express";
import { Prisma } from "../generated/prisma/client.js";
import { OrganizationSchema } from "../schema/organization.schema.js";
import type { OrganizationType } from "../schema/organization.schema.js";

export const registerOrg = async (
  req: Request<{}, {}, OrganizationType>,
  res: Response,
) => {
  const result = OrganizationSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ message: result.error.format() });
  }
  
  const { adminDetails } = req.body;

  let roleDescription;
  switch (adminDetails.role) {
    case 1001:
      roleDescription = "ADMIN";
    default:
      roleDescription = "GUEST";
  }

  const guestDTO = {
    name: adminDetails.name,
    email: adminDetails.email,
    status: adminDetails.status,
    roleDescription,
  };

  try {
    await prisma.$transaction(async (ax) => {
      await ax.organizations.create({ data: req.body });
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
