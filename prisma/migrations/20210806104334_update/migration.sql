-- CreateTable
CREATE TABLE "Character" (
    "id" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "firstNameEnglish" TEXT NOT NULL,
    "unitPrimaryKey" INTEGER NOT NULL,
    "fullNameEnglish" TEXT NOT NULL,
    "colorCode" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" INTEGER NOT NULL,
    "rarityPrimaryKey" INTEGER NOT NULL,
    "cardName" TEXT NOT NULL,
    "attributePrimaryKey" INTEGER NOT NULL,
    "characterPrimaryKey" INTEGER NOT NULL,
    "skillParameterPrimaryKey" INTEGER NOT NULL,
    "skillName" TEXT NOT NULL,
    "maxParameters" INTEGER[],
    "gachaMessage" TEXT NOT NULL,
    "clothCardId" INTEGER NOT NULL,
    "debutOrder" INTEGER NOT NULL,
    "cardIllustHeadDistanceY" INTEGER[],
    "cardIllustCenterDistanceX" INTEGER[],
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Character" ADD FOREIGN KEY ("unitPrimaryKey") REFERENCES "Unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD FOREIGN KEY ("characterPrimaryKey") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
