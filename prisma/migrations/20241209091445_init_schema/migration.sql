/*
  Warnings:

  - Added the required column `gender` to the `Candidates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Candidates" ADD COLUMN     "gender" VARCHAR(255) NOT NULL;
