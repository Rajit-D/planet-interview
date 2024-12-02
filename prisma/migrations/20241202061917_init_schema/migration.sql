/*
  Warnings:

  - You are about to drop the `Orgadmin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Organisation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Orgadmin" DROP CONSTRAINT "Orgadmin_orgId_fkey";

-- DropTable
DROP TABLE "Orgadmin";

-- DropTable
DROP TABLE "Organisation";

-- CreateTable
CREATE TABLE "Organisations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "adminNo" INTEGER NOT NULL,
    "avatar" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organisations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admins" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "organisation" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organisations_email_key" ON "Organisations"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admins_email_key" ON "Admins"("email");

-- AddForeignKey
ALTER TABLE "Admins" ADD CONSTRAINT "Admins_organisation_fkey" FOREIGN KEY ("organisation") REFERENCES "Organisations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
