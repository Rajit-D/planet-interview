/*
  Warnings:

  - You are about to drop the column `address` on the `Candidates` table. All the data in the column will be lost.
  - You are about to drop the column `organisation` on the `Candidates` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Candidates` table. All the data in the column will be lost.
  - Added the required column `country` to the `Candidates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dob` to the `Candidates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Candidates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `highestDegree` to the `Candidates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `highestDegreeCGPA` to the `Candidates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isEmployed` to the `Candidates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobRole` to the `Candidates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `links` to the `Candidates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `Candidates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prevEmployer` to the `Candidates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prevJobTitle` to the `Candidates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referralCode` to the `Candidates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referralName` to the `Candidates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skills` to the `Candidates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yog` to the `Candidates` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Candidates" DROP CONSTRAINT "Candidates_role_fkey";

-- AlterTable
ALTER TABLE "Candidates" DROP COLUMN "address",
DROP COLUMN "organisation",
DROP COLUMN "role",
ADD COLUMN     "country" VARCHAR(255) NOT NULL,
ADD COLUMN     "dob" VARCHAR(255) NOT NULL,
ADD COLUMN     "duration" VARCHAR(255) NOT NULL,
ADD COLUMN     "highestDegree" VARCHAR(255) NOT NULL,
ADD COLUMN     "highestDegreeCGPA" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "isEmployed" BOOLEAN NOT NULL,
ADD COLUMN     "jobRole" UUID NOT NULL,
ADD COLUMN     "links" TEXT NOT NULL,
ADD COLUMN     "photo" VARCHAR(255) NOT NULL,
ADD COLUMN     "prevEmployer" VARCHAR(255) NOT NULL,
ADD COLUMN     "prevJobTitle" VARCHAR(255) NOT NULL,
ADD COLUMN     "referralCode" VARCHAR(255) NOT NULL,
ADD COLUMN     "referralName" VARCHAR(255) NOT NULL,
ADD COLUMN     "skills" VARCHAR(255) NOT NULL,
ADD COLUMN     "yog" VARCHAR(4) NOT NULL;

-- AlterTable
ALTER TABLE "Roles" ADD COLUMN     "expired" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Candidates" ADD CONSTRAINT "Candidates_jobRole_fkey" FOREIGN KEY ("jobRole") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
