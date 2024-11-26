/*
  Warnings:

  - You are about to drop the `OrgAdmin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrgAdmin" DROP CONSTRAINT "OrgAdmin_orgId_fkey";

-- DropTable
DROP TABLE "OrgAdmin";

-- CreateTable
CREATE TABLE "Orgadmin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "adminAvatarImg" TEXT NOT NULL,

    CONSTRAINT "Orgadmin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Orgadmin_email_key" ON "Orgadmin"("email");

-- AddForeignKey
ALTER TABLE "Orgadmin" ADD CONSTRAINT "Orgadmin_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organisation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
