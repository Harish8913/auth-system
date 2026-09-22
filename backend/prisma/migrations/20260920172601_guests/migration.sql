-- CreateEnum
CREATE TYPE "GuestStatus" AS ENUM ('PENDING', 'ACCEPTED');

-- CreateTable
CREATE TABLE "guest" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "status" "GuestStatus" NOT NULL,

    CONSTRAINT "guest_pkey" PRIMARY KEY ("id")
);
