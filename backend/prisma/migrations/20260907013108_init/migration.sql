/*
  Warnings:

  - You are about to drop the column `logical_id` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userName]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Users_logical_id_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "logical_id",
ADD COLUMN     "refresh" TEXT,
ADD COLUMN     "rolesId" INTEGER,
ADD COLUMN     "status" TEXT;

-- CreateTable
CREATE TABLE "Roles" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_userName_key" ON "Users"("userName");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_rolesId_fkey" FOREIGN KEY ("rolesId") REFERENCES "Roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
