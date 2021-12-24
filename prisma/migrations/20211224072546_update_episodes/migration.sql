-- CreateEnum
CREATE TYPE "EpisodeCategory" AS ENUM ('Unit', 'Event', 'Card', 'LiveResult', 'Map', 'Character');

-- CreateEnum
CREATE TYPE "Live2DUIChatCategory" AS ENUM ('MenuCommon', 'Training', 'LoginBonus', 'Mission');

-- CreateTable
CREATE TABLE "Episode" (
    "id" INTEGER NOT NULL,
    "category" "EpisodeCategory" NOT NULL,
    "conditionsPrimaryKey" INTEGER[],
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "rewardsPrimaryKey" INTEGER[],
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "hasVoice" BOOLEAN NOT NULL,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitEpisode" (
    "id" INTEGER NOT NULL,
    "backgroundId" INTEGER NOT NULL,
    "season" INTEGER NOT NULL,
    "unitPrimaryKey" INTEGER NOT NULL,
    "chapterNumber" INTEGER NOT NULL,

    CONSTRAINT "UnitEpisode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventEpisode" (
    "id" INTEGER NOT NULL,
    "backgroundId" INTEGER NOT NULL,
    "eventPrimaryKey" INTEGER NOT NULL,
    "chapterNumber" INTEGER NOT NULL,

    CONSTRAINT "EventEpisode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterEpisode" (
    "id" INTEGER NOT NULL,
    "backgroundId" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,
    "chapterNumber" INTEGER NOT NULL,

    CONSTRAINT "CharacterEpisode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LiveResultEpisode" (
    "id" INTEGER NOT NULL,
    "charactersPrimaryKey" INTEGER[],

    CONSTRAINT "LiveResultEpisode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Live2DUIChat" (
    "id" INTEGER NOT NULL,
    "categories" "Live2DUIChatCategory"[],
    "characterPrimaryKey" INTEGER NOT NULL,
    "clothId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "motion" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Live2DUIChat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UnitEpisode" ADD CONSTRAINT "UnitEpisode_unitPrimaryKey_fkey" FOREIGN KEY ("unitPrimaryKey") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitEpisode" ADD CONSTRAINT "UnitEpisode_id_fkey" FOREIGN KEY ("id") REFERENCES "Episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventEpisode" ADD CONSTRAINT "EventEpisode_eventPrimaryKey_fkey" FOREIGN KEY ("eventPrimaryKey") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventEpisode" ADD CONSTRAINT "EventEpisode_id_fkey" FOREIGN KEY ("id") REFERENCES "Episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterEpisode" ADD CONSTRAINT "CharacterEpisode_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterEpisode" ADD CONSTRAINT "CharacterEpisode_id_fkey" FOREIGN KEY ("id") REFERENCES "Episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Live2DUIChat" ADD CONSTRAINT "Live2DUIChat_characterPrimaryKey_fkey" FOREIGN KEY ("characterPrimaryKey") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
