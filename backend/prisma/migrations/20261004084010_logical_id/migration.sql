/*
  Warnings:

  - A unique constraint covering the columns `[logical_id]` on the table `auth` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[logical_id]` on the table `guest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[logical_id]` on the table `organization_users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[logical_id]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[logical_id]` on the table `permissions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[logical_id]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[logical_id]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "auth" ADD COLUMN     "logical_id" TEXT;

-- AlterTable
ALTER TABLE "guest" ADD COLUMN     "logical_id" TEXT;

-- AlterTable
ALTER TABLE "organization_users" ADD COLUMN     "logical_id" TEXT;

-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "logical_id" TEXT;

-- AlterTable
ALTER TABLE "permissions" ADD COLUMN     "logical_id" TEXT;

-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "logical_id" TEXT;

-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "logical_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "auth_logical_id_key" ON "auth"("logical_id");

-- CreateIndex
CREATE UNIQUE INDEX "guest_logical_id_key" ON "guest"("logical_id");

-- CreateIndex
CREATE UNIQUE INDEX "organization_users_logical_id_key" ON "organization_users"("logical_id");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_logical_id_key" ON "organizations"("logical_id");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_logical_id_key" ON "permissions"("logical_id");

-- CreateIndex
CREATE UNIQUE INDEX "roles_logical_id_key" ON "roles"("logical_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_logical_id_key" ON "sessions"("logical_id");
