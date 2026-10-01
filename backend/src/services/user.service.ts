import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import type { UserType } from "../schema/user.schema.js";

export const registerUserService = async (body: UserType) => {
  try {
    const hash = await bcrypt.hash(body.password, 10);
    const UserDTO = {
      firstName: body.firstName,
      lastName: body.lastName || "",
      userName: body.userName,
      email: body.email,
      passwordHash: hash,
      tenantId: body.orgId,
    };

    const save_user = await prisma.$transaction(async (tx) => {
      const new_user = await tx.auth.create({ data: UserDTO });
      await tx.organization_users.create({
        data: {
          userId: new_user.id,
          tenantId: body.orgId,
          roleId: body.roleId,
        },
      });   

      await tx.guest.deleteMany({
        where: { email: new_user.email, tenantId: new_user.tenantId },
      });

      return new_user;
    });

    return save_user;
  } catch (err) {
    throw err;
  }
};
