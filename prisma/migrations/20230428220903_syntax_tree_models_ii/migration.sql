/*
  Warnings:

  - Added the required column `body` to the `Phrase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Phrase" ADD COLUMN     "body" TEXT NOT NULL,
ADD COLUMN     "extraInfo" JSONB,
ADD COLUMN     "head" TEXT;
