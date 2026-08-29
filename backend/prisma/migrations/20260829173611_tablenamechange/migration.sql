/*
  Warnings:

  - You are about to drop the `Auth` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Auth";

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "logical_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_logical_id_key" ON "Users"("logical_id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
