-- CreateEnum
CREATE TYPE "Attribute" AS ENUM ('STREET', 'PARTY', 'CUTE', 'COOL', 'ELEGANT');

-- CreateEnum
CREATE TYPE "MusicCategory" AS ENUM ('Instrumental', 'Original', 'Cover', 'Game', 'Collabo');

-- CreateEnum
CREATE TYPE "ChartDifficulty" AS ENUM ('Easy', 'Normal', 'Hard', 'Expert');

-- CreateEnum
CREATE TYPE "MusicSection" AS ENUM ('Full', 'Begin', 'Middle', 'End', 'DJSimulator');

-- CreateTable
CREATE TABLE "Resource" (
    "name" TEXT NOT NULL,
    "lastUpdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "canTraining" BOOLEAN NOT NULL,
    "summary" TEXT NOT NULL,
    "mainColorCode" TEXT NOT NULL,
    "subColorCode" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "initDeckCharacterIds" INTEGER[],

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "firstNameEnglish" TEXT NOT NULL,
    "unitPrimaryKey" INTEGER NOT NULL,
    "fullNameEnglish" TEXT NOT NULL,
    "colorCode" TEXT NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

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

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" INTEGER NOT NULL,
    "rarity" INTEGER NOT NULL,
    "cardName" TEXT NOT NULL,
    "attribute" "Attribute" NOT NULL,
    "characterPrimaryKey" INTEGER NOT NULL,
    "skillParameterPrimaryKey" INTEGER NOT NULL,
    "skillName" TEXT NOT NULL,
    "maxParameters" INTEGER[],
    "gachaMessage" TEXT NOT NULL,
    "clothCardId" INTEGER NOT NULL,
    "debutOrder" INTEGER NOT NULL,
    "cardIllustHeadDistanceY" DOUBLE PRECISION[],
    "cardIllustCenterDistanceX" DOUBLE PRECISION[],
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Music" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "readName" TEXT NOT NULL,
    "lyrist" TEXT NOT NULL,
    "composer" TEXT NOT NULL,
    "arranger" TEXT NOT NULL,
    "specialUnitName" TEXT NOT NULL,
    "category" "MusicCategory" NOT NULL,
    "unitPrimaryKey" INTEGER NOT NULL,
    "defaultOrder" INTEGER NOT NULL,
    "musicBpm" DOUBLE PRECISION NOT NULL,
    "openKey" INTEGER NOT NULL,
    "sectionTrend" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "hasMovie" BOOLEAN NOT NULL,
    "isHidden" BOOLEAN NOT NULL,
    "excludeChallenge" BOOLEAN NOT NULL,
    "isTutorial" BOOLEAN NOT NULL,
    "canFairUse" BOOLEAN NOT NULL,

    CONSTRAINT "Music_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chart" (
    "id" INTEGER NOT NULL,
    "musicPrimaryKey" INTEGER NOT NULL,
    "difficulty" "ChartDifficulty" NOT NULL,
    "level" DOUBLE PRECISION NOT NULL,
    "achieveId" INTEGER NOT NULL,
    "trends" DOUBLE PRECISION[],
    "overrideLevel" TEXT NOT NULL,
    "designerPrimaryKey" INTEGER NOT NULL,
    "noteCount" INTEGER NOT NULL,

    CONSTRAINT "Chart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChartDesigner" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ChartDesigner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MusicMix" (
    "id" SERIAL NOT NULL,
    "musicPrimaryKey" INTEGER NOT NULL,
    "section" "MusicSection" NOT NULL,
    "startTime" DOUBLE PRECISION NOT NULL,
    "startTimeBpm" DOUBLE PRECISION NOT NULL,
    "endTime" DOUBLE PRECISION NOT NULL,
    "endTimeBpm" DOUBLE PRECISION NOT NULL,
    "enableLongMixStart" BOOLEAN NOT NULL,
    "enableLongMixEnd" BOOLEAN NOT NULL,

    CONSTRAINT "MusicMix_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChartNoteCount" (
    "id" SERIAL NOT NULL,
    "chartId" INTEGER NOT NULL,
    "section" "MusicSection" NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "ChartNoteCount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resource_name_key" ON "Resource"("name");

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
