/*
  Warnings:

  - Made the column `adminAvatarImg` on table `OrgAdmin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `orgAvatarImg` on table `Organisation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "OrgAdmin" ALTER COLUMN "adminAvatarImg" SET NOT NULL;

-- AlterTable
ALTER TABLE "Organisation" ALTER COLUMN "orgAvatarImg" SET NOT NULL;
