-- DropIndex
DROP INDEX "sessions_familyId_key";

-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "isRevoked" SET DEFAULT false;
