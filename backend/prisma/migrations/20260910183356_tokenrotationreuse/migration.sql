/*
  Warnings:

  - A unique constraint covering the columns `[familyId]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "familyId" TEXT,
ADD COLUMN     "isRevoked" BOOLEAN;

-- CreateIndex
CREATE UNIQUE INDEX "sessions_familyId_key" ON "sessions"("familyId");
