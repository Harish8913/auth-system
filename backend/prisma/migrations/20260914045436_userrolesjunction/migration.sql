/*
  Warnings:

  - The `description` column on the `roles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `rolesId` on the `users` table. All the data in the column will be lost.
  - Added the required column `passwordHash` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MANAGER', 'EMPLOYEE', 'GUEST');

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_rolesId_fkey";

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "description",
ADD COLUMN     "description" "Role" NOT NULL DEFAULT 'GUEST';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "password",
DROP COLUMN "rolesId",
ADD COLUMN     "passwordHash" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "users_roles" (
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "users_roles_pkey" PRIMARY KEY ("userId","roleId")
);

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
