/*
  Warnings:

  - A unique constraint covering the columns `[refresh]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Users_refresh_key" ON "Users"("refresh");
