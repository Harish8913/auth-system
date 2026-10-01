/*
  Warnings:

  - You are about to drop the column `orgId` on the `guest` table. All the data in the column will be lost.
  - You are about to drop the column `orgId` on the `organization_users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email,tenantId]` on the table `auth` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,tenantId,roleId]` on the table `organization_users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tenantId` to the `auth` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenantId` to the `guest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenantId` to the `organization_users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "guest" DROP CONSTRAINT "guest_orgId_fkey";

-- DropForeignKey
ALTER TABLE "organization_users" DROP CONSTRAINT "organization_users_orgId_fkey";

-- DropIndex
DROP INDEX "auth_email_idx";

-- DropIndex
DROP INDEX "auth_email_key";

-- DropIndex
DROP INDEX "organization_users_orgId_idx";

-- DropIndex
DROP INDEX "organization_users_userId_orgId_roleId_key";

-- AlterTable
ALTER TABLE "auth" ADD COLUMN     "tenantId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "guest" DROP COLUMN "orgId",
ADD COLUMN     "tenantId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "organization_users" DROP COLUMN "orgId",
ADD COLUMN     "tenantId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "auth_email_tenantId_key" ON "auth"("email", "tenantId");

-- CreateIndex
CREATE INDEX "organization_users_tenantId_idx" ON "organization_users"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "organization_users_userId_tenantId_roleId_key" ON "organization_users"("userId", "tenantId", "roleId");

-- AddForeignKey
ALTER TABLE "auth" ADD CONSTRAINT "auth_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guest" ADD CONSTRAINT "guest_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_users" ADD CONSTRAINT "organization_users_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
