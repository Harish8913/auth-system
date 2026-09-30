/*
  Warnings:

  - You are about to drop the `_organization_usersToroles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_rolesTousers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `orgId` to the `guest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `organization_users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_organization_usersToroles" DROP CONSTRAINT "_organization_usersToroles_A_fkey";

-- DropForeignKey
ALTER TABLE "_organization_usersToroles" DROP CONSTRAINT "_organization_usersToroles_B_fkey";

-- DropForeignKey
ALTER TABLE "_rolesTousers" DROP CONSTRAINT "_rolesTousers_A_fkey";

-- DropForeignKey
ALTER TABLE "_rolesTousers" DROP CONSTRAINT "_rolesTousers_B_fkey";

-- DropForeignKey
ALTER TABLE "organization_users" DROP CONSTRAINT "organization_users_userId_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_userId_fkey";

-- AlterTable
ALTER TABLE "guest" ADD COLUMN     "orgId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "organization_users" ADD COLUMN     "email" TEXT NOT NULL;

-- DropTable
DROP TABLE "_organization_usersToroles";

-- DropTable
DROP TABLE "_rolesTousers";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "auth" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,

    CONSTRAINT "auth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auth_id_key" ON "auth"("id");

-- AddForeignKey
ALTER TABLE "guest" ADD CONSTRAINT "guest_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_users" ADD CONSTRAINT "organization_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_users" ADD CONSTRAINT "organization_users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
