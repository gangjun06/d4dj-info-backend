/*
  Warnings:

  - Added the required column `canFairUse` to the `Music` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_characterPrimaryKey_fkey";

-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_skillParameterPrimaryKey_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_unitPrimaryKey_fkey";

-- DropForeignKey
ALTER TABLE "Chart" DROP CONSTRAINT "Chart_designerPrimaryKey_fkey";

-- DropForeignKey
ALTER TABLE "Chart" DROP CONSTRAINT "Chart_musicPrimaryKey_fkey";

-- DropForeignKey
ALTER TABLE "ChartNoteCount" DROP CONSTRAINT "ChartNoteCount_chartId_fkey";

-- DropForeignKey
ALTER TABLE "Music" DROP CONSTRAINT "Music_unitPrimaryKey_fkey";

-- DropForeignKey
ALTER TABLE "MusicMix" DROP CONSTRAINT "MusicMix_musicPrimaryKey_fkey";

-- AlterTable
ALTER TABLE "Music" ADD COLUMN     "canFairUse" BOOLEAN NOT NULL;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_unitPrimaryKey_fkey" FOREIGN KEY ("unitPrimaryKey") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_characterPrimaryKey_fkey" FOREIGN KEY ("characterPrimaryKey") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_skillParameterPrimaryKey_fkey" FOREIGN KEY ("skillParameterPrimaryKey") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Music" ADD CONSTRAINT "Music_unitPrimaryKey_fkey" FOREIGN KEY ("unitPrimaryKey") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chart" ADD CONSTRAINT "Chart_musicPrimaryKey_fkey" FOREIGN KEY ("musicPrimaryKey") REFERENCES "Music"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chart" ADD CONSTRAINT "Chart_designerPrimaryKey_fkey" FOREIGN KEY ("designerPrimaryKey") REFERENCES "ChartDesigner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusicMix" ADD CONSTRAINT "MusicMix_musicPrimaryKey_fkey" FOREIGN KEY ("musicPrimaryKey") REFERENCES "Music"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChartNoteCount" ADD CONSTRAINT "ChartNoteCount_chartId_fkey" FOREIGN KEY ("chartId") REFERENCES "Chart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "Resource.name_unique" RENAME TO "Resource_name_key";

-- RenameIndex
ALTER INDEX "User.email_unique" RENAME TO "User_email_key";

-- RenameIndex
ALTER INDEX "VerifyEmail.email_unique" RENAME TO "VerifyEmail_email_key";
