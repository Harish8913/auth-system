/*
  Warnings:

  - You are about to drop the column `email` on the `organization_users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `auth` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "organization_users" DROP COLUMN "email";

-- CreateIndex
CREATE UNIQUE INDEX "auth_email_key" ON "auth"("email");

-- CreateIndex
CREATE INDEX "auth_email_idx" ON "auth"("email");
