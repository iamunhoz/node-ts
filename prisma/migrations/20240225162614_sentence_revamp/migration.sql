/*
  Warnings:

  - You are about to drop the column `parentPhraseId` on the `Phrase` table. All the data in the column will be lost.
  - Added the required column `parentId` to the `Phrase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Phrase" DROP COLUMN "parentPhraseId",
ADD COLUMN     "parentId" TEXT NOT NULL;
