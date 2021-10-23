/*
  Warnings:

  - Added the required column `noteCount` to the `Chart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noteCount` to the `MusicMix` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chart" ADD COLUMN     "noteCount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "MusicMix" ADD COLUMN     "noteCount" INTEGER NOT NULL;
