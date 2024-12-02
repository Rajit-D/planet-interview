-- DropForeignKey
ALTER TABLE "Admins" DROP CONSTRAINT "Admins_organisation_fkey";

-- AddForeignKey
ALTER TABLE "Admins" ADD CONSTRAINT "Admins_organisation_fkey" FOREIGN KEY ("organisation") REFERENCES "Organisations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
