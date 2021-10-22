-- CreateEnum
CREATE TYPE "MusicCategory" AS ENUM ('Instrumental', 'Original', 'Cover', 'Game', 'Collabo');

-- CreateEnum
CREATE TYPE "ChartDifficulty" AS ENUM ('Easy', 'Normal', 'Hard', 'Expert');

-- CreateEnum
CREATE TYPE "MusicSection" AS ENUM ('Full', 'Begin', 'Middle', 'End');

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
    "musicBpm" INTEGER NOT NULL,
    "openKey" INTEGER NOT NULL,
    "sectionTrend" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "hasMovie" BOOLEAN NOT NULL,
    "isHidden" BOOLEAN NOT NULL,
    "excludeChallenge" BOOLEAN NOT NULL,
    "isTutorial" BOOLEAN NOT NULL,

    PRIMARY KEY ("id")
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

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChartDesigner" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MusicMix" (
    "id" SERIAL NOT NULL,
    "musicPrimaryKey" INTEGER NOT NULL,
    "section" "MusicSection" NOT NULL,
    "startTime" DOUBLE PRECISION NOT NULL,
    "startTimeBpm" INTEGER NOT NULL,
    "endTime" DOUBLE PRECISION NOT NULL,
    "endTimeBpm" INTEGER NOT NULL,
    "enableLongMixStart" BOOLEAN NOT NULL,
    "enableLongMixEnd" BOOLEAN NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChartNoteCount" (
    "id" SERIAL NOT NULL,
    "chartId" INTEGER NOT NULL,
    "section" "MusicSection" NOT NULL,
    "count" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Music" ADD FOREIGN KEY ("unitPrimaryKey") REFERENCES "Unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chart" ADD FOREIGN KEY ("musicPrimaryKey") REFERENCES "Music"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chart" ADD FOREIGN KEY ("designerPrimaryKey") REFERENCES "ChartDesigner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusicMix" ADD FOREIGN KEY ("musicPrimaryKey") REFERENCES "Music"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChartNoteCount" ADD FOREIGN KEY ("chartId") REFERENCES "Chart"("id") ON DELETE CASCADE ON UPDATE CASCADE;
