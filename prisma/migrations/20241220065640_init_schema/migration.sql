/*
  Warnings:

  - You are about to alter the column `selected` on the `Candidates` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE "Candidates" ALTER COLUMN "selected" SET DATA TYPE VARCHAR(20);
