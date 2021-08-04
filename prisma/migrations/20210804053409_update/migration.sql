-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VerifyEmail" (
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_VerifyEmail" ("code", "email") SELECT "code", "email" FROM "VerifyEmail";
DROP TABLE "VerifyEmail";
ALTER TABLE "new_VerifyEmail" RENAME TO "VerifyEmail";
CREATE UNIQUE INDEX "VerifyEmail.email_unique" ON "VerifyEmail"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
