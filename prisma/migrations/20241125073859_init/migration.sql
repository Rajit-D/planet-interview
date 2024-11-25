/*
  Warnings:

  - You are about to drop the column `avatarImg` on the `Organisation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrgAdmin" ADD COLUMN     "adminAvatarImg" TEXT;

-- AlterTable
ALTER TABLE "Organisation" DROP COLUMN "avatarImg",
ADD COLUMN     "orgAvatarImg" TEXT;
