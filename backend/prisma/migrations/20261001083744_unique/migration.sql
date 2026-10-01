/*
  Warnings:

  - A unique constraint covering the columns `[email,tenantId]` on the table `guest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "guest_email_tenantId_key" ON "guest"("email", "tenantId");
