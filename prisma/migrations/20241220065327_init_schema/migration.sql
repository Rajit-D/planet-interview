/*
  Warnings:

  - Added the required column `highestDegreeOrg` to the `Candidates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Candidates" ADD COLUMN     "highestDegreeOrg" VARCHAR(255) NOT NULL,
ALTER COLUMN "selected" SET DEFAULT 'pending',
ALTER COLUMN "selected" SET DATA TYPE TEXT;
