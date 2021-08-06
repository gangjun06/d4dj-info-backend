/*
  Warnings:

  - You are about to drop the column `attributePrimaryKey` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `rarityPrimaryKey` on the `Card` table. All the data in the column will be lost.
  - Added the required column `attribute` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rarity` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Attribute" AS ENUM ('STREET', 'PARTY', 'CUTE', 'COOL', 'ELEGANT');

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "attributePrimaryKey",
DROP COLUMN "rarityPrimaryKey",
ADD COLUMN     "attribute" "Attribute" NOT NULL,
ADD COLUMN     "rarity" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Skill" (
    "id" INTEGER NOT NULL,
    "minRecoveryValue" INTEGER NOT NULL,
    "maxRecoveryValue" INTEGER NOT NULL,
    "comboSupportCount" INTEGER NOT NULL,
    "scoreUpRate" INTEGER NOT NULL,
    "minSeconds" DOUBLE PRECISION NOT NULL,
    "maxSeconds" DOUBLE PRECISION NOT NULL,
    "perfectScoreUpRate" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Card" ADD FOREIGN KEY ("skillParameterPrimaryKey") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
