-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PhraseType" ADD VALUE 'Noun';
ALTER TYPE "PhraseType" ADD VALUE 'Verb';
ALTER TYPE "PhraseType" ADD VALUE 'Adjective';
ALTER TYPE "PhraseType" ADD VALUE 'Preposition';
ALTER TYPE "PhraseType" ADD VALUE 'Determiner';
ALTER TYPE "PhraseType" ADD VALUE 'Adverb';
