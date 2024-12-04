/*
  Warnings:

  - You are about to alter the column `name` on the `Admins` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `email` on the `Admins` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `password` on the `Admins` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `position` on the `Admins` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `avatar` on the `Admins` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `Organisations` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `email` on the `Organisations` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `password` on the `Organisations` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `avatar` on the `Organisations` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `Roles` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `skills` on the `Roles` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Admins" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "position" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "avatar" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Organisations" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "avatar" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Roles" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "skills" SET DATA TYPE VARCHAR(255);

-- CreateTable
CREATE TABLE "Candidates" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "organisation" VARCHAR(255) NOT NULL,
    "experience" INTEGER NOT NULL,
    "role" UUID NOT NULL,
    "cv" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phoneNo" VARCHAR(20) NOT NULL,
    "selected" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Candidates_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Candidates" ADD CONSTRAINT "Candidates_role_fkey" FOREIGN KEY ("role") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
