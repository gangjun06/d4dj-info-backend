/*
  Warnings:

  - Changed the type of `category` on the `Reward` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RewardCategory" AS ENUM ('Stock', 'Stamp', 'Music', 'Honor', 'ClubItem', 'Card');

-- AlterTable
ALTER TABLE "Reward" DROP COLUMN "category",
ADD COLUMN     "category" "RewardCategory" NOT NULL;
