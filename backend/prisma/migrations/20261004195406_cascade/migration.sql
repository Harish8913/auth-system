-- DropForeignKey
ALTER TABLE "auth" DROP CONSTRAINT "auth_tenantId_fkey";

-- AddForeignKey
ALTER TABLE "auth" ADD CONSTRAINT "auth_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
