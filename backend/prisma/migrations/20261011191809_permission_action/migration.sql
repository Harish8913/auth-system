/*
  Warnings:

  - Added the required column `action` to the `permissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "permissions" ADD COLUMN     "action" TEXT NOT NULL;
