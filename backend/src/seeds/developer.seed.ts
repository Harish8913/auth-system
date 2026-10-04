import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";

try {
  console.log("Seeding Developer");

  const passwordHash = await bcrypt.hash("devharish", 10);
  const result = await prisma.$transaction(async (tx) => {
    const organization = await tx.organizations.upsert({
      where: { name: "UIM" },
      update: {},
      create: {
        name: "UIM",
        email: "uim@im.in",
        description: "Handling all IAM application",
      },
    });

    const developer = await tx.auth.create({
      data: {
        firstName: "The",
        lastName: "Developer",
        userName: "TheDeveloper",
        email: "developer@iam.in",
        passwordHash,
        tenantId: organization.id,
      },
    });

    await tx.organization_users.create({
      data: {
        userId: developer.id,
        tenantId: organization.id,
        roleId: 1,
      },
    });

    return developer;
  });

  if (result) console.log("Developer Created");
} catch (err) {
  console.log(`Error: while creating developer`);
}
    