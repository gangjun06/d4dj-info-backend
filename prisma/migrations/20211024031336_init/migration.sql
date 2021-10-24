-- CreateEnum
CREATE TYPE "Attribute" AS ENUM ('STREET', 'PARTY', 'CUTE', 'COOL', 'ELEGANT');

-- CreateEnum
CREATE TYPE "MusicCategory" AS ENUM ('Instrumental', 'Original', 'Cover', 'Game', 'Collabo');

-- CreateEnum
CREATE TYPE "ChartDifficulty" AS ENUM ('Easy', 'Normal', 'Hard', 'Expert');

-- CreateEnum
CREATE TYPE "MusicSection" AS ENUM ('Full', 'Begin', 'Middle', 'End', 'DJSimulator');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('Raid', 'Slot', 'Poker', 'Medley', 'Bingo');

-- CreateEnum
CREATE TYPE "StockCategory" AS ENUM ('Diamond', 'Fragment', 'Exp', 'SkillExp', 'LimitBreak', 'VoltageRecovery', 'Boost', 'MusicShop', 'Event', 'GachaTicket', 'Random', 'ParameterLevelUp', 'Other');

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
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
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

-- CreateTable
CREATE TABLE "Event" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "receptionCloseDate" TIMESTAMP(3) NOT NULL,
    "rankFixStartDate" TIMESTAMP(3) NOT NULL,
    "resultAnnouncementDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "stockId" INTEGER NOT NULL,
    "entryBonusStockAmount" INTEGER NOT NULL,
    "stockAmountPerUse" INTEGER NOT NULL,
    "episodeCharacters" INTEGER[],
    "storyUnlockDate" TIMESTAMP(3) NOT NULL,
    "showExchangeButton" BOOLEAN NOT NULL,
    "sxchangeShopId" INTEGER NOT NULL,
    "isD4FesStory" BOOLEAN NOT NULL,
    "topPrefabPath" TEXT NOT NULL,
    "showMissionButton" BOOLEAN NOT NULL,
    "bgmPath" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventAggregation" (
    "id" INTEGER NOT NULL,
    "eventPrimaryKey" INTEGER NOT NULL,
    "aggregationType" TEXT NOT NULL,
    "pointTypeName" TEXT NOT NULL,
    "pointTypeIconName" TEXT NOT NULL,

    CONSTRAINT "EventAggregation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventMedleySetlist" (
    "id" SERIAL NOT NULL,
    "aggregationPrimaryKey" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "musicIds" INTEGER[],
    "requiredPoint" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "order" INTEGER NOT NULL,
    "specificBonusCharacterIds" INTEGER[],
    "characterMatchParameterBonusId" INTEGER NOT NULL,
    "characterMatchParameterBonusValue" INTEGER NOT NULL,

    CONSTRAINT "EventMedleySetlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventMedleySetlistItem" (
    "id" SERIAL NOT NULL,
    "eventMedleySetlistId" INTEGER NOT NULL,
    "musicId" INTEGER NOT NULL,

    CONSTRAINT "EventMedleySetlistItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stock" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "category" "StockCategory" NOT NULL,
    "viewCategoryPrimaryKey" INTEGER NOT NULL,
    "summary" TEXT NOT NULL,
    "attributeId" INTEGER NOT NULL,
    "rarity" INTEGER NOT NULL,
    "exp" INTEGER NOT NULL,
    "buffCharacterId" INTEGER NOT NULL,
    "recoveryAmount" INTEGER NOT NULL,
    "consumeAmount" INTEGER NOT NULL,
    "maxAmount" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isAppropriateSales" BOOLEAN NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reward" (
    "id" INTEGER NOT NULL,
    "category" INTEGER NOT NULL,
    "rewardId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Reward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockViewCategory" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "StockViewCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resource_name_key" ON "Resource"("name");

-- CreateIndex
CREATE UNIQUE INDEX "EventMedleySetlist_aggregationPrimaryKey_key" ON "EventMedleySetlist"("aggregationPrimaryKey");

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
ALTER TABLE "Event" ADD CONSTRAINT "Event_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAggregation" ADD CONSTRAINT "EventAggregation_eventPrimaryKey_fkey" FOREIGN KEY ("eventPrimaryKey") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventMedleySetlist" ADD CONSTRAINT "EventMedleySetlist_aggregationPrimaryKey_fkey" FOREIGN KEY ("aggregationPrimaryKey") REFERENCES "EventAggregation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventMedleySetlistItem" ADD CONSTRAINT "EventMedleySetlistItem_eventMedleySetlistId_fkey" FOREIGN KEY ("eventMedleySetlistId") REFERENCES "EventMedleySetlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventMedleySetlistItem" ADD CONSTRAINT "EventMedleySetlistItem_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "Music"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_viewCategoryPrimaryKey_fkey" FOREIGN KEY ("viewCategoryPrimaryKey") REFERENCES "StockViewCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reward" ADD CONSTRAINT "Reward_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
