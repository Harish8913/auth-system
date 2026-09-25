import type { OrganizationType } from "../schema/organization.schema.js";
import { prisma } from "../lib/prisma.js";
import { email } from "zod";

export const registerOrgService = async (body: OrganizationType) => {
  const { adminDetails } = body;

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
    status: "PENDING",
    roleDescription,
  };

  const orgDTO = {
    name: body.name,
    email: body.email,
    description: body.description,
  };

  try {
    const result = await prisma.$transaction(async (ax) => {
      await ax.organizations.create({ data: orgDTO });
      await ax.guest.create({ data: guestDTO });
    });

    return result;
  } catch (err) {
    throw err;
  }
};
