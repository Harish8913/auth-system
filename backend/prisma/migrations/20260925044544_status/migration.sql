/*
  Warnings:

  - The `status` column on the `guest` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `name` to the `guest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleDescription` to the `guest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "guest" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "roleDescription" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "GuestStatus";
